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
from tqdm import tqdm
import urllib.parse
import base64
import re
from django.http import JsonResponse

# ================================================================================================
# =================================================================================================
# =================================================================================================
# Create your procedures here.

def get_race_results():	
	print('')
	print('get_race_results')

	# get path to src/json folder
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	print('main_path: ' + main_path)

	circuit_path = os.path.join(main_path, 'src/json/circuits/list_of_all_circuits_within_a_year')
	print('circuit_path: ' + circuit_path)

	current_year = datetime.now().year
	years = [str(i) for i in range(1950, current_year + 1)]

	max_limit = 0

	for year in years:
		print("year: " + str(year))

		# Go after folder circuits/list_of_all_circuits_within_a_year, find the year and open the json
		with open(circuit_path + '/' + year + '_circuits.json') as json_file:
			data = json.load(json_file)
			
		total_races = data['MRData']['total']
		print('total_races: ' + str(total_races))

		race_results_path = os.path.join(main_path, 'src/json/standings/race_results')
		print('race_results_path: ' + race_results_path)

		for race in range(1, int(total_races) + 1):
			url = f"http://ergast.com/api/f1/{year}/{race}/results.json"
			json_name = f"{year}_race_results_{race}.json"
			
			# print('url: ' + url)

			results = requests.get(url)

			results_json = json.loads(results.content)

			# If folder does not exist inside race_results_path, create it.
			if not os.path.exists(race_results_path + '/' + year):
				os.makedirs(race_results_path + '/' + year)

			# Save json_example to a file inside path
			with open(race_results_path + '/' + year + '/' + json_name, 'w') as outfile:
				json.dump(results_json, outfile)

			max_limit += 1
			print('max_limit: ' + str(max_limit))
			time.sleep(5)

			if max_limit == 150:
				max_limit = 0
				time.sleep(3600)

	return

def update_drivers_info():
	# get path to src/json folder
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	print('main_path: ' + main_path)

	standings_path = os.path.join(main_path, 'src/json/standings/driver_standings_after_a_race')
	print('standings_path: ' + standings_path)

	circuit_path = os.path.join(main_path, 'src/json/circuits/list_of_all_circuits_within_a_year')
	print('circuit_path: ' + circuit_path)

	drivers_path = os.path.join(main_path, 'src/json/drivers/statistics')
	drivers = os.listdir(drivers_path)
	
	# Enter each file and rename the key name with the file name.
	for driver in tqdm(drivers):
		print('')
		with open(drivers_path + '/' + driver) as driver_file:
			driver_data = json.load(driver_file)
			driver_data['seasons_results'] = {}

			if not driver_data['seasons_years']:
				continue

			driver_name = driver.split('.')[0]
			# print('driver: ' + str(driver_name))

			print('')
			print('====================================')
			print('====================================')
			print('====================================')
			print(driver_name)
			print(re.sub(r'[^\x00-\x7f]',r'', driver_name))
			edited_name = re.sub(r'[^\x00-\x7f]',r'', driver_name)
			first_name = edited_name.split('_')[:-1]
			first_name = ' '.join(first_name)
			last_name = edited_name.split('_')[-1]
			print('first_name: ' + str(first_name))
			print('last_name: ' + str(last_name))

			for year in driver_data['seasons_years']:
				if year == 2023:
					continue

				year = str(year)
				print('year: ' + year)
				driver_data['seasons_results'][year] = {}
				driver_data['seasons_results'][year]['title'] = 0
				driver_data['seasons_results'][year]['races'] = 0
				driver_data['seasons_results'][year]['wins'] = 0
				driver_data['seasons_results'][year]['points'] = 0
				driver_data['seasons_results'][year]['poles'] = 0
				driver_data['seasons_results'][year]['podiums'] = 0

				try:
					# Go after folder circuits/list_of_all_circuits_within_a_year, find the year and open the json
					with open(circuit_path + '/' + year + '_circuits.json') as circuit_file:
						circuit_data = json.load(circuit_file)
				except:
					continue
					
				total_races = circuit_data['MRData']['total']
				print('total_races: ' + str(total_races))

				for race in range(1, int(total_races) + 1):
					race_dict = {}
					with open(standings_path + '/' + year + '/' + year + '_race_' + str(race) + '.json', 'r') as race_file:
						race_data = json.load(race_file)
						DriverStandings = race_data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
						for pilot in DriverStandings:
							givenName = re.sub(r'[^\x00-\x7f]',r'', pilot['Driver']['givenName'])
							familyName = re.sub(r'[^\x00-\x7f]',r'', pilot['Driver']['familyName'])
							if givenName == first_name and familyName == last_name:
								driver_data['seasons_results'][year]['races'] += 1

								if race == int(total_races):
									driver_data['seasons_results'][year]['wins'] = int(pilot['wins'])
									driver_data['seasons_results'][year]['points'] = float(pilot['points'])
									driver_data['seasons_results'][year]['title'] = 1 if pilot['position'] == '1' else 0

				with open(drivers_path + '/' + driver, 'w', encoding='utf-8') as outfile:
					json.dump(driver_data, outfile)

	return


def update_poles_and_podiums():
	print("")
	print("update_poles_and_podiums")

	# get path to src/json folder
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	print('main_path: ' + main_path)

	standings_path = os.path.join(main_path, 'src/json/standings/driver_standings_after_a_race')
	print('standings_path: ' + standings_path)

	circuit_path = os.path.join(main_path, 'src/json/circuits/list_of_all_circuits_within_a_year')
	print('circuit_path: ' + circuit_path)

	drivers_path = os.path.join(main_path, 'src/json/drivers/statistics')
	drivers = os.listdir(drivers_path)

	race_results_path = os.path.join(main_path, 'src/json/standings/race_results')
	print('race_results_path: ' + race_results_path)

	current_year = datetime.now().year
	years = [str(i) for i in range(1950, current_year + 1)]

	all_drivers = {}
	for year in years:
		# print("year: " + str(year))

		# Go after folder circuits/list_of_all_circuits_within_a_year, find the year and open the json
		with open(circuit_path + '/' + year + '_circuits.json') as json_file:
			data = json.load(json_file)
			
		total_races = data['MRData']['total']
		# print('total_races: ' + str(total_races))

		for race in range(1, int(total_races) + 1):
			with open(race_results_path + '/' + year + '/' + year + '_race_results_' + str(race) + '.json', 'r') as race_file:
				race_data = json.load(race_file)
				# print(race_data)
				try:
					for driver in race_data['MRData']['RaceTable']['Races'][0]['Results']:
						givenName = re.sub(r'[^\x00-\x7f]',r'', driver['Driver']['givenName'])
						familyName = re.sub(r'[^\x00-\x7f]',r'', driver['Driver']['familyName'])
						driver_id = givenName + '_' + familyName

						if driver_id not in all_drivers:
							all_drivers[driver_id] = {
								year: {
									'poles': 0,
									'podiums': 0
								}
							}

						if year not in all_drivers[driver_id]:
							all_drivers[driver_id][year] = {
								'poles': 0,
								'podiums': 0
							}

						if driver['grid'] == '1':
							all_drivers[driver_id][year]['poles'] += 1

						if driver['position'] in ['1', '2', '3']:
							all_drivers[driver_id][year]['podiums'] += 1
				except:
					continue

	for driver in tqdm(drivers):

		with open(drivers_path + '/' + driver) as driver_file:
			driver_data = json.load(driver_file)

		if 'seasons_results' not in driver_data:
			continue

		driver_name = driver.split('.')[0]
		edited_name = re.sub(r'[^\x00-\x7f]',r'', driver_name)
		first_name = edited_name.split('_')[:-1]
		first_name = ' '.join(first_name)
		last_name = edited_name.split('_')[-1]

		print('')
		print('first_name: ' + str(first_name))
		print('last_name: ' + str(last_name))

		driver_id = first_name + '_' + last_name

		if driver_id in all_drivers:
			for year,v in all_drivers[driver_id].items():
				if year in driver_data['seasons_results']:
					poles = v['poles']
					podiums = v['podiums']

					driver_data['seasons_results'][year]['poles'] = poles
					driver_data['seasons_results'][year]['podiums'] = podiums

		with open(drivers_path + '/' + driver, 'w', encoding='utf-8') as outfile:
			json.dump(driver_data, outfile)


def get_drivers_standings():

	# get path to src/json folder
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	print('main_path: ' + main_path)

	circuit_path = os.path.join(main_path, 'src/json/circuits/list_of_all_circuits_within_a_year')
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

		standings_path = os.path.join(main_path, 'src/json/standings/driver_standings_after_a_race')
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

def get_years(years_tag):
	season_years = []
	total_seasons = 0
	temporary_value = 0
	action = False
	for item in years_tag:
		print(item)
		# If item is a string, append it to season_years list
		if ',' in item or ' ' in item:
			print('if')
			pass
		# Check if item is the tag <br/>
		elif item.name == 'br':
			print('elif')
			pass
		elif '–' in item or '-' in item:
			action = True
		# If item is a tag, get the text inside it and append it to season_years list
		else:
			current_year = item.text
			if current_year == 'present':
				current_year = datetime.now().year

			if action:
				total_seasons += int(current_year) - int(temporary_value)
				action = False
				# For each year between temporary_value and current_year, append it to season_years list
				for i in range(int(temporary_value) + 1, int(current_year) + 1):
					season_years.append(int(i))
			else:
				season_years.append(int(current_year))
				total_seasons += 1
			temporary_value = current_year
	return season_years, total_seasons

def get_driver_info():

	# Create a list of alfabetic letters from A to Z.
	alfabet = [chr(i) for i in range(ord('A'), ord('Z') + 1)]
	print('alfabet: ' + str(alfabet))

	for letter in alfabet:
	# for letter in alfabet[:1]:
		print('letter: ' + letter)
		# time.sleep(5)
		# Use BeautifulSoup to get the html of each pilot, starting by letter A.
		url = 'https://f1.fandom.com/wiki/Category:Drivers?from=' + letter
		html = requests.get(url).text
		soup = BeautifulSoup(html, 'html.parser')

		# Get drivers list
		elements = soup.find_all('ul', class_='category-page__members-for-char')

		# Get all the links (each link is a driver)
		a_tags = []
		for element in elements:
			a_tags += element.find_all('a', class_='category-page__member-link')
		
		# From each a tag, get the info that we need.
		for a_tag in tqdm(a_tags):
		# for a_tag in tqdm(a_tags[:1]):
			print('')
			# time.sleep(5)
			driver_id = a_tag['href']
			driver_id = urllib.parse.unquote(driver_id)
			driver_id = driver_id.replace('/wiki/', '')
			driver_id = "Alan_Jones"
			print('driver_id: ' + driver_id)
			new_driver = {
				'nationality': {}
			}
			html = requests.get('https://f1.fandom.com/wiki/' + driver_id).text
			soup = BeautifulSoup(html, 'html.parser')

			# Get aside_tag that contains the mais stats we want
			aside_tag = soup.find_all('aside', class_='pi-theme-f1-wide-label')

			try:
				name = aside_tag[0].find('h2', {'data-source': 'name'}).text
				new_driver['name'] = name
				new_driver['id'] = driver_id
			except Exception as e:
				print(e)
				continue

			# Get driver image
			try:
				figure_tag = aside_tag[0].find('figure')
				img_link = figure_tag.find('img')['src']
				new_driver['image'] = img_link
			except:
				new_driver['image'] = False

			# Get section element inside aside_tag
			section_tag = aside_tag[0].find('section')

			# Get birth_date
			try:
				birth_date = section_tag.find('div', {'data-source': 'birth date'})
				birth_date = birth_date.find('div', class_='pi-data-value')
				birth_date = birth_date.find('span', class_='bday').text
				new_driver['birth_date'] = birth_date
			except:
				new_driver['birth_date'] = False

			# Get death_date
			try:
				death_date = section_tag.find('div', {'data-source': 'death date'})
				death_date = death_date.find('div', class_='pi-data-value')
				death_date = death_date.find('span', class_='dday').text
				new_driver['death_date'] = death_date
			except:
				new_driver['death_date'] = False

			# Get nationality
			try:
				nationality_tag = section_tag.find('div', {'data-source': 'nationality'})
				nationality_tag = nationality_tag.find('div', class_='pi-data-value')
				nationality_acronym = nationality_tag.find_all('a')[1].text
				nationality_href = nationality_tag.find_all('a')[1]['href']
				nationality_title = nationality_tag.find_all('a')[1]['title']
				span_tag = nationality_tag.find_all('span')[0]
				nationality_flag = span_tag.find('a')['href']
				
				new_driver['nationality'] = {
					'nationality_acronym': nationality_acronym,
					'nationality_href': nationality_href,
					'nationality_title': nationality_title,
					'nationality_flag': nationality_flag
				}
			except:
				new_driver['nationality'] = False
				
			try:
				section_tag = aside_tag[0].find_all('section')[1]
			except:
				continue

			# Get status
			try:
				status_tag = section_tag.find('div', {'data-source': 'status'})
				status = status_tag.find('div', class_='pi-data-value').text
				new_driver['status'] = status
			except:
				new_driver['status'] = False

			# Get years and total seasons
			try:
				years_tag = section_tag.find('div', {'data-source': 'years'})
				years_tag = years_tag.find('div', class_='pi-data-value')
				years_tag = years_tag.contents

				seasons_years, total_seasons = get_years(years_tag)
				new_driver['total_seasons'] = total_seasons
				new_driver['seasons_years'] = seasons_years
				# If the info is not found here, go after wikipedia link.
				# The id is the same, just change to https://en.wikipedia.org/wiki/DRIVER_ID
				# Example: https://en.wikipedia.org/wiki/Fernando_Alonso
			except:
				try:
					html = requests.get('https://en.wikipedia.org/wiki/' + driver_id).text
					new_html = BeautifulSoup(html, 'html.parser')

					table_tag = new_html.find_all('table', class_='biography')
					tr_tag = table_tag[0].find('th', text='Active years')
					td_tag = tr_tag.find_next_sibling('td').contents

					seasons_years, total_seasons = get_years(td_tag)
					new_driver['total_seasons'] = total_seasons
					new_driver['seasons_years'] = seasons_years
				except:
					new_driver['total_seasons'] = False
					new_driver['seasons_years'] = False

			# Get world titles 
			try:
				titles_tag = section_tag.find('div', {'data-source': 'championships'})
				titles = titles_tag.find('div', class_='pi-data-value').text
				new_driver['titles'] = titles
			except:
				new_driver['titles'] = False

			# Get races 
			try:
				races_tag = section_tag.find('div', {'data-source': 'races'})
				races = races_tag.find('div', class_='pi-data-value').text
				new_driver['races'] = races
			except:
				new_driver['races'] = False

			# Get poles 
			try:
				poles_tag = section_tag.find('div', {'data-source': 'poles'})
				poles = poles_tag.find('div', class_='pi-data-value').text
				new_driver['poles'] = poles
			except:
				new_driver['poles'] = False

			# Get wins 
			try:
				wins_tag = section_tag.find('div', {'data-source': 'wins'})
				wins = wins_tag.find('div', class_='pi-data-value').text
				new_driver['wins'] = wins
			except:
				new_driver['wins'] = False

			# Get podiums 
			try:
				podiums_tag = section_tag.find('div', {'data-source': 'podiums'})
				podiums = podiums_tag.find('div', class_='pi-data-value').text
				new_driver['podiums'] = podiums
			except:
				new_driver['podiums'] = False

			# Get fastestlaps 
			try:
				fastestlaps_tag = section_tag.find('div', {'data-source': 'fastestlaps'})
				fastestlaps = fastestlaps_tag.find('div', class_='pi-data-value').text
				new_driver['fastestlaps'] = fastestlaps
			except:
				new_driver['fastestlaps'] = False

			# Get points 
			try:
				points_tag = section_tag.find('div', {'data-source': 'points'})
				points = points_tag.find('div', class_='pi-data-value').text
				new_driver['points'] = points
			except:
				new_driver['points'] = False

			# Get introduction text
			try:
				introduction_tag = soup.find_all('div', class_='mw-parser-output')		
				introduction_tag = introduction_tag[0].find_all('p')[1]
				introduction = introduction_tag.text
				introduction = introduction.encode('ascii', 'ignore').decode('ascii')
				introduction = introduction.replace('\n', '')
				new_driver['introduction'] = str(introduction)
			except:
				new_driver['introduction'] = False

			# Save json_example to a file inside path
			with open('src/json/drivers/' + driver_id + '.json', 'w') as outfile:
				json.dump(new_driver, outfile)

	return

def add_percentage_info():
	# Get all files inside src/json/drivers
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	drivers_path = os.path.join(main_path, 'src/json/drivers')
	drivers = os.listdir(drivers_path)
	
	# Enter each file and rename the key name with the file name.
	for driver in tqdm(drivers):
		with open(drivers_path + '/' + driver) as json_file:
			data = json.load(json_file)
			print('')
			print(driver)
			try:
				races = data['races'].split('(')[0]
				races = int(races)
				titles = int(data['titles'])
				poles = int(data['poles'])
				wins = int(data['wins'])
				podiums = int(data['podiums'])
				total_seasons = int(data['total_seasons'])

				try:
					titles_percentage = round(((titles*100) / total_seasons), 2)
					data['titles_percentage'] = titles_percentage
				except:
					data['titles_percentage'] = 0

				try:
					poles_percentage = round(((poles*100) / races), 2)
					data['poles_percentage'] = poles_percentage
				except:
					data['poles_percentage'] = 0

				try:
					wins_percentage = round(((wins*100) / races), 2)
					data['wins_percentage'] = wins_percentage
				except:
					data['wins_percentage'] = 0

				try:
					podiums_percentage = round(((podiums*100) / races), 2)
					data['podiums_percentage'] = podiums_percentage
				except:
					data['podiums_percentage'] = 0

				with open(drivers_path + '/' + driver, 'w', encoding='utf-8') as outfile:
					json.dump(data, outfile)
			except Exception as e:
				print("***********************************")
				print(e)
	return True

def save_images():
	# Get all files inside src/json/drivers
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	print('main_path: ' + str(main_path))
	drivers_path = "/Users/magroove/coding/edu_projects/formula1charts/src/json/drivers/statistics"
	print('drivers_path: ' + str(drivers_path))
	drivers = os.listdir(drivers_path)

	# Upload each image from each driver to the folder src/img/drivers_imgages
	for driver in tqdm(drivers[:1]):
	# for driver in tqdm(drivers):
		time.sleep(5)
		print('')
		print(driver)
		with open(drivers_path + '/' + driver) as json_file:
			data = json.load(json_file)
			try:
				img_link = data['image']
				if img_link:
					img_name = driver.replace('.json', '.jpg')
					img_path = os.path.join(main_path, 'src/img/drivers_images')
					img_path = img_path + '/' + img_name
					img_data = requests.get(img_link).content
					with open(img_path, 'wb') as handler:
						handler.write(img_data)
			except Exception as e:
				print("***********************************")
				print(e)

# =================================================================================================
# =================================================================================================
# =================================================================================================
# Create your views here.
def index(request):
	print("")
	print("")
	# update_drivers_info()
	context = {}

	return render(request, 'front-end/index.html', context)

def season_view(request, year):

	# Make a list of year beginning with 1951 until the current year.
	current_year = datetime.now().year
	years = [str(i) for i in range(1950, current_year + 1)]
	# Redirect user to homepage if year is not in the list.
	if year not in years:
		return HttpResponseRedirect('/')

	# Return a list with 80 positive adjetives.
	adjetives = ['Amazing','Awesome','Beautiful','satisfying','super','amusing','entertaining','Brilliant','memorable','Cool','Creative','Delicious','Elegant','Excellent','Fabulous','Fantastic','Fun','Gorgeous','Great','Impressive','Incredible','Interesting','Magnificent','Marvelous','Outstanding','Perfect','Powerful','Smart','Spectacular','Splendid','Stunning','Superb','Superior','Supreme','Terrific','Wonderful','Wondrous','Alluring','Appealing','Dazzling','Divine','Enchanting','Engaging','Enticing','Excellent','Exquisite','Fair','Fascinating','Glorious','Gorgeous','Grand','Heavenly','Magnetic','Marvelous','Mesmerizing','Miraculous','Mythical','Pleasant','Ravishing','Sublime','Amazing','Astonishing','Awe-inspiring','Breathtaking','Captivating','Delightful','remarkable']
	# Get random adjetive from the list.
	season_adjetive = random.choice(adjetives)

	# Get path to the folder where the json files are stored.
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

	# Go after folder circuits/list_of_all_circuits_within_a_year, find the year and open the json
	circuit_path = os.path.join(main_path, 'src/json/circuits/list_of_all_circuits_within_a_year')
	with open(circuit_path + '/' + year + '_circuits.json') as json_file:
		circuits = json.load(json_file)

	circuits_dict = {e['round']:e['circuitId'] for e in circuits['MRData']['CircuitTable']['Circuits']}

	total_races = circuits['MRData']['total']
	print('total_races: ' + str(total_races))

	standings_path = os.path.join(main_path, 'src/json/standings/driver_standings_after_a_race')

	final_result_test = []
	already_added = []
	champion_name = ''
	for race in range(1, int(total_races) + 1):

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


def pilots(request):
	context = {}
	return render(request, 'front-end/pilots.html', context)

def all_time(request):
	context = {}
	return render(request, 'front-end/all-time.html', context)

def load_nationalities(request):
	print('')
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	nationalities_path = os.path.join(main_path, 'src/json/drivers/nationalities')

	data = {}
	with open(nationalities_path + '/all_nationalities.json') as json_file:
		data = json.load(json_file)

	response_dict = {
		'nationalities': data
	}
	return JsonResponse(response_dict, safe=False) 

def pilots_list(request):

	# Get all files inside src/json/drivers
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	# drivers_path = "/Users/magroove/coding/edu_projects/formula1charts/src/json/drivers/statistics"
	drivers_path = main_path + "/src/json/drivers/statistics"
	drivers = os.listdir(drivers_path)

	drivers_list = []
	for driver in drivers:
		# print(driver)
		with open(drivers_path + '/' + driver) as json_file:
			data = json.load(json_file)
			try:
				driver_dict = {}
				driver_dict['nationality'] = data['nationality']
				driver_dict['name'] = data['name']
				driver_dict['id'] = data['id']
				driver_dict['birth_date'] = data['birth_date']
				driver_dict['death_date'] = data['death_date']
				driver_dict['status'] = data['status']
				driver_dict['total_seasons'] = data['total_seasons']
				driver_dict['seasons_years'] = data['seasons_years']
				driver_dict['titles'] = int(data['titles'])
				races = data['races'].split('(')[0]
				races = int(races)
				driver_dict['races'] = races
				driver_dict['poles'] = int(data['poles'])
				driver_dict['wins'] = int(data['wins'])
				driver_dict['podiums'] = int(data['podiums'])
				driver_dict['fastestlaps'] = data['fastestlaps']
				driver_dict['points'] = data['points']
				driver_dict['introduction'] = data['introduction']
				driver_dict['titles_percentage'] = data['titles_percentage']
				driver_dict['poles_percentage'] = data['poles_percentage']
				driver_dict['wins_percentage'] = data['wins_percentage']
				driver_dict['podiums_percentage'] = data['podiums_percentage']
				if data['image']:
					# Get image path from folder src/img/drivers_images
					img_name = driver.replace('.json', '.jpg')
					img_path = 'drivers_images' + '/' + img_name
					driver_dict['image'] = img_path

				else:
					driver_dict['image'] = False
				drivers_list.append(driver_dict)

				pass
			except Exception as e:
				pass

	# Order drivers_list by name
	drivers_list = pydash.sort_by(drivers_list, 'name')

	response_dict = {
		'drivers': drivers_list
	}

	return JsonResponse(response_dict, safe=False) 


def pilots_complete_info(request):

	# Get all files inside src/json/drivers
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	# drivers_path = "/Users/magroove/coding/edu_projects/formula1charts/src/json/drivers/statistics"
	drivers_path = main_path + "/src/json/drivers/statistics"
	drivers = os.listdir(drivers_path)

	drivers_list = []
	for driver in drivers:
		# print(driver)
		with open(drivers_path + '/' + driver) as json_file:
			data = json.load(json_file)
			try:
				driver_dict = data

				if not data['seasons_results']:
					continue

				if data['image']:
					# Get image path from folder src/img/drivers_images
					img_name = driver.replace('.json', '.jpg')
					img_path = 'drivers_images' + '/' + img_name
					driver_dict['image'] = img_path

				else:
					driver_dict['image'] = False
				drivers_list.append(driver_dict)

				pass
			except Exception as e:
				pass

	# Order drivers_list by name
	drivers_list = pydash.sort_by(drivers_list, 'name')

	response_dict = {
		'drivers': drivers_list
	}

	return JsonResponse(response_dict, safe=False) 