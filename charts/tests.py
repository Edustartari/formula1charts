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
from django.http import JsonResponse
import re

print('edu testing test')

def get_poles():
	print('')
	print('get_poles')

	# get path to src/json folder
	main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	print('main_path: ' + main_path)

	html_path = os.path.join(main_path, 'assets/src/html')
	print('html_path: ' + html_path)

	circuit_path = os.path.join(main_path, 'assets/src/json/circuits/list_of_all_circuits_within_a_year')
	print('circuit_path: ' + circuit_path)

	drivers_path = os.path.join(main_path, 'assets/src/json/drivers/statistics')
	print('drivers_path: ' + drivers_path)
	drivers = os.listdir(drivers_path)

	current_year = datetime.now().year
	years = [str(i) for i in range(1950, current_year + 1)]

	max_limit = 0

	all_drivers = {}

	for year in years:
		# year = '2000'
		print('')
		print('year: ' + year)

		# Open html file
		with open(html_path + '/' + year + '.html') as html_file:
			html = html_file.read()

		# Get table where a tag Pole position is present
		soup = BeautifulSoup(html, 'html.parser')
		tables = soup.find_all('table', class_='wikitable')
		table = None
		found_table = False
		for e in tables:
			if e.find('a', title='List of Formula One polesitters') is not None:
				table = e
				found_table = True
				break

			if not found_table:
				if year == '1982':
					main_list = ['Round','Race','Pole Position','Fastest Lap','Winning driver','Report']
				else:
					main_list = ['Round','Grand Prix','Pole position','Fastest lap','Winning driver','Report']

				temporary_list = []
				# Find text inside th tag
				for element in e.find_all('th'):
					text_format = element.text.replace('\n', '').replace('\xa0', ' ').strip()
					temporary_list.append(text_format)
				
				all_items_in_list = 0
				for item in main_list:
					if item in temporary_list:
						all_items_in_list += 1

				if all_items_in_list == 6:
					table = e
					break

		# id="Results_and_standings": 73 (50,93)
		# Winning driver
		# Winning constructor: 71 (82, 97,98,99)

		if isinstance(table, list):
			table = table[0]

		# print(table)

		# Get all rows inside tbody
		rows = table.find_all('tr')
		for row in rows[1:]:
			try:
				# print('')
				# print(row)
				# Get the second column
				columns = row.find_all('td')
				# print('columns: ' + str(columns))
				pole_driver = columns[1]
				# print('pole_driver: ' + str(pole_driver))
				# print('pole_driver.text: ' + str(pole_driver.text))

				driver_name = pole_driver.text

				def is_ascii(s):
					return all(ord(c) < 128 for c in s)

				if not is_ascii(driver_name):
					print('YES is_ascii!!!!')
					driver_name = re.sub(r'[^\x00-\x7f]',r'', driver_name)
				# else:
				# 	pole_driver = pole_driver.find_all('a')
				# 	# print('pole_driver: ' + str(pole_driver))
				# 	pole_driver = pole_driver[1]
				# 	pole_driver = pole_driver['href']
				# 	pole_driver = pole_driver.replace('/wiki/', '')
				# 	pole_driver = pole_driver.replace('\n', '').strip()
				# 	driver_name = pole_driver
				driver_name = driver_name.replace('\n', '').strip()
				driver_name = ('_').join(driver_name.split(' '))

				driver_name = driver_name.split('[')[0]
				print('driver_name: ' + str(driver_name))

				if driver_name not in all_drivers:
					all_drivers[driver_name] = 1
				else:
					all_drivers[driver_name] += 1

			except Exception as e:
				if str(e) != "list index out of range":
					print('e: ' + str(e))
					break
				else:
					print('e: ' + str(e))
					continue


		# with open(circuit_path + '/' + year + '_circuits.json') as json_file:
		# 	data = json.load(json_file)
		# total_races = data['MRData']['total']
		# print('total_races: ' + str(total_races))
	
		# Enter each file and rename the key name with the file name.
		# for driver in tqdm(drivers[:10]):
		# 	print('')
		# 	print('driver: ' + str(driver))
		# 	with open(drivers_path + '/' + driver) as driver_file:
		# 		driver_data = json.load(driver_file)
		# 		driver_data['seasons_results'] = {}

		# 		if not driver_data['seasons_years']:
		# 			continue

		# 		for year in driver_data['seasons_years']:
		# 			if year == 2023:
		# 				continue

		# 			year = str(year)
		# 			print('year: ' + year)
		# 			driver_data['seasons_results'][year] = {}
		# 			driver_data['seasons_results'][year]['title'] = 0
		# 			driver_data['seasons_results'][year]['races'] = 0
		# 			driver_data['seasons_results'][year]['wins'] = 0
		# 			driver_data['seasons_results'][year]['points'] = 0
		# 			driver_data['seasons_results'][year]['poles'] = 0
		# 			driver_data['seasons_results'][year]['podiums'] = 0

		# 			try:
		# 				# Go after folder circuits/list_of_all_circuits_within_a_year, find the year and open the json
		# 				with open(circuit_path + '/' + year + '_circuits.json') as circuit_file:
		# 					circuit_data = json.load(circuit_file)
		# 			except:
		# 				continue
						
		# 			total_races = circuit_data['MRData']['total']
		# 			print('total_races: ' + str(total_races))

		# 			for race in range(1, int(total_races) + 1):
		# 				race_dict = {}
		# 				with open(standings_path + '/' + year + '/' + year + '_race_' + str(race) + '.json', 'r') as race_file:
		# 					race_data = json.load(race_file)
		# 					DriverStandings = race_data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings']
		# 					for pilot in DriverStandings:
		# 						if driver_data['id'] in pilot['Driver']['url']:
		# 							driver_data['seasons_results'][year]['races'] += 1

		# 							if race == int(total_races):
		# 								driver_data['seasons_results'][year]['wins'] = int(pilot['wins'])
		# 								driver_data['seasons_results'][year]['points'] = float(pilot['points'])
		# 								driver_data['seasons_results'][year]['title'] = 1 if pilot['position'] == '1' else 0

		# 		with open(drivers_path + '/' + driver, 'w', encoding='utf-8') as outfile:
		# 			json.dump(driver_data, outfile)

	print('all_drivers: ' + str(all_drivers))

	return


get_poles()



# def is_ascii(s):
# 	return all(ord(c) < 128 for c in s)

# main_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# print('main_path: ' + main_path)

# drivers_path = os.path.join(main_path, 'assets/src/json/drivers/statistics')
# print('drivers_path: ' + drivers_path)
# drivers = os.listdir(drivers_path)

# count = 0
# for driver in tqdm(drivers):
# 	print('')
# 	driver_name = driver.split('.')[0]
# 	print('driver: ' + str(driver_name))

# 	if not is_ascii(driver_name):
# 		count += 1
# 		print('YES!!!!')
# 		print(re.sub(r'[^\x00-\x7f]',r'', driver_name))

# print(count)





# =-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=-=-=
# # Use this fo check if name is ascii
# def is_ascii(s):
# 	return all(ord(c) < 128 for c in s)

# print(re.sub(r'[^\x00-\x7f]',r'', "Mika H\u00e4kkinen"))
# print(re.sub(r'[^\x00-\x7f]',r'', "Mika Häkkinen"))


# if not is_ascii("Mika Häkkinen"):
# 	print('YES!!!!')
# 	print(re.sub(r'[^\x00-\x7f]',r'', "Mika Häkkinen"))