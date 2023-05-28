import os
from datetime import datetime
from django.shortcuts import HttpResponseRedirect, render
from bs4 import BeautifulSoup
import requests
import copy
import pydash
import json
import random
import time

# ================================================================================================
# =================================================================================================
# =================================================================================================
# Create your procedures here.

def get_drivers_standings():

	# get path to src/json folder
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	print('main_path: ' + main_path)

	circuit_path = os.path.join(main_path, 'assets/src/json/circuits/list_of_all_circuits_within_a_year')
	print('circuit_path: ' + circuit_path)

	current_year = datetime.now().year
	years = [str(i) for i in range(1950, current_year + 1)]

	max_limit = 0

	# url = f"http://ergast.com/api/f1/2008/0/driverStandings.json"
	# results = requests.get(url)
	
	# print('url: ' + url)

	# results = requests.get(url)

	# print('results')
	# print(results.content)
	# print(type(results.content))
	# results_json = json.loads(results.content)

	for year in years:

		# Go after folder circuits/list_of_all_circuits_within_a_year, find the year and open the json
		with open(circuit_path + '/' + year + '_circuits.json') as json_file:
			data = json.load(json_file)
			
		total_races = data['MRData']['total']
		print('total_races: ' + str(total_races))

		standings_path = os.path.join(main_path, 'assets/src/json/standings/driver_standings_after_a_race')
		print('standings_path: ' + standings_path)

		for race in range(1, int(total_races) + 1):
			url = f"http://ergast.com/api/f1/{year}/{race}/driverStandings.json"
			json_name = f"{year}_race_{race}.json"
			
			# print('url: ' + url)

			results = requests.get(url)

			results_json = json.loads(results.content)

			# If folder does not exist inside standings_path, create it.
			if not os.path.exists(standings_path + '/' + year):
				os.makedirs(standings_path + '/' + year)

			# Save json_example to a file inside path
			with open(standings_path + '/' + year + '/' + json_name, 'w') as outfile:
				json.dump(results_json, outfile)

			max_limit += 1
			print('max_limit: ' + str(max_limit))
			time.sleep(5)

			if max_limit == 150:
				max_limit = 0
				time.sleep(3600)

	return True

# =================================================================================================
# =================================================================================================
# =================================================================================================
# Create your views here.
def index(request):
	print("")
	print("")
	context = {}

	return render(request, 'front-end/index.html', context)

def season_view(request, year):
	print('')
	print('season_view 2')
	print('')
	print(year)
	print(type(year))

	# Make a list of year beginning with 1951 until the current year.
	current_year = datetime.now().year
	years = [str(i) for i in range(1950, current_year + 1)]
	# Redirect user to homepage if year is not in the list.
	if year not in years:
		return HttpResponseRedirect('/')

	# Return a list with 80 positive adjetives.
	adjetives = [
		'amazing', 'awesome', 'incredible', 'brilliant', 'excellent', 'fabulous', 'fantastic', 'fun', 'great', 'inspiring', 'interesting', 'perfect', 'remarkable', 'satisfying', 'super', 'superb', 'wonderful', 'amusing', 'engaging', 'entertaining', 'fascinating', 'impressive', 'inviting', 'magnificent', 'memorable', 'mesmerizing', 'stunning'
	]
	# Get random adjetive from the list.
	season_adjetive = random.choice(adjetives)

	# Get path to the folder where the json files are stored.
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

	# Go after folder circuits/list_of_all_circuits_within_a_year, find the year and open the json
	circuit_path = os.path.join(main_path, 'assets/src/json/circuits/list_of_all_circuits_within_a_year')
	with open(circuit_path + '/' + year + '_circuits.json') as json_file:
		circuits = json.load(json_file)

	circuits_dict = {e['round']:e['circuitId'] for e in circuits['MRData']['CircuitTable']['Circuits']}

	total_races = circuits['MRData']['total']
	print('total_races: ' + str(total_races))

	standings_path = os.path.join(main_path, 'assets/src/json/standings/driver_standings_after_a_race')
	print('standings_path: ' + standings_path)

	final_result_test = []
	already_added = []
	champion_name = ''
	for race in range(1, int(total_races) + 1):
		print('')
		print('total_races:' + str(total_races))
		print('race:' + str(race))

		data = {}
		with open(standings_path + '/' + year + '/' + year + '_race_' + str(race) + '.json', 'r') as outfile:
			data = json.load(outfile)

		circuit_name = circuits_dict[data['MRData']['StandingsTable']['round']]
		circuit_name = circuit_name.replace('-', ' ')
		circuit_name = circuit_name.replace('_', ' ')
		circuit_name = circuit_name.capitalize()

		driver_standings = data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
		for driver in driver_standings:
			driver_name = driver['Driver']['givenName'] + ' ' + driver['Driver']['familyName']
			position = driver['position'] + 'º'
			points = driver['points'] + ' pts' if driver['points'] != '1' else driver['points'] + ' pt'
			formated_text = position + ' ' + driver_name + ': ' + points
			if int(race) == int(total_races) and driver['position'] == '1':
				champion_name = driver_name

			if driver_name not in already_added:
				final_result_test.append(
					{
						'id': driver_name,
						'data': [{'x': circuit_name, 'y':  driver['position'], 'z': formated_text}]

					}
				)
				already_added.append(driver_name)
			else:
				for i in final_result_test:
					if i['id'] == driver_name:
						i['data'].append({'x': circuit_name, 'y':  driver['position'], 'z': formated_text})

	context = {
		'final_result': json.dumps(final_result_test),
		'year': year,
		'champion_name': json.dumps(champion_name),
		'season_title': json.dumps(season_adjetive)
	}

	return render(request, 'front-end/season.html', context)