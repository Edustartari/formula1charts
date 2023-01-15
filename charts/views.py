import os
from datetime import datetime
from django.shortcuts import HttpResponseRedirect, render
from bs4 import BeautifulSoup
import requests
import copy
import pydash

# ================================================================================================
# =================================================================================================
# =================================================================================================
# Create your procedures here.

def get_positions_points(year, result):
	print('')
	print('get_positions_points')
	total_points = 0
	positions_points = {
		'first': 25,
		'second': 18,
		'third': 15,
		'fourth': 12,
		'fifth': 10,
		'sixth': 8,
		'seventh': 6,
		'eighth': 4,
		'ninth': 2,
		'tenth': 1,
		'fastest_lap': 1,
		'shared': False,
		'sprint': {
			'first': 8,
			'second': 7,
			'third': 6,
			'fourth': 5,
			'fifth': 4,
			'sixth': 3,
			'seventh': 2,
			'eighth': 1
		}
	}
	def get_position_string(position):
		if position == 1:
			return 'first'
		elif position == 2:
			return 'second'
		elif position == 3:
			return 'third'
		elif position == 4:
			return 'fourth'
		elif position == 5:
			return 'fifth'
		elif position == 6:
			return 'sixth'
		elif position == 7:
			return 'seventh'
		elif position == 8:
			return 'eighth'
		elif position == 9:
			return 'ninth'
		elif position == 10:
			return 'tenth'
		else:
			return 'unknown'

	if int(year) == 1950:
		positions_points['first'] = 8
		positions_points['second'] = 6
		positions_points['third'] = 4
		positions_points['fourth'] = 3
		positions_points['fifth'] = 2
		positions_points['sixth'] = 0
		positions_points['seventh'] = 0
		positions_points['eighth'] = 0
		positions_points['ninth'] = 0
		positions_points['tenth'] = 0
		positions_points['sprint'] = False
		positions_points['shared'] = True

		shared = False
		# Create a switch for the 1950 season.
		total = len(result.contents)
		if total == 1:
			position = result.contents[0]
			# Check if the position is a number.
			try:
				position = int(position)
				position = get_position_string(position)
				total_points = positions_points[position]
			except:
				if '†' in position:
					shared = True
				if '(' in position and '(Ret)' not in position:
					return 0
				strings_list = ["Ret", "(", ")", "†", "DNS", "DNF", "DNP", "DSQ", "R", "/"]
				# Check if there is the following strings in the position.
				position = str(position)
				for string in strings_list:
					if string in position:
						position = position.replace(string, "")
				# Check if the position is a number.
				try:
					position = int(position)
					position = get_position_string(position)
					total_points = positions_points[position]
				except:
					pass
			
			if shared:
				try:
					total_points = total_points / 2
				except:
					pass
		else:
			# For each element inside result.contents, check if there is a tag <sup> with the letter "f"
			# If there is, then the driver got the fastest lap.
			fastest_lap = False
			for key, value in enumerate(result.contents):
				if key == 0:
					try:
						position = int(value)
						position = get_position_string(position)
						total_points = positions_points[position]
					except:
						continue
				else:
					try:
						sup_tag = value.find('sup')
						if sup_tag.string == 'F':
							fastest_lap = True
					except:
						continue

			if fastest_lap:
				total_points += positions_points['fastest_lap']

		return total_points

	return total_points
		

def get_positions_data(year):

	# get path to src/html folder
	path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	# get path to src/html/seasons folder
	path = os.path.join(path, 'assets\src\html')

	positions_list = []
	# if int(year) == 1950:
	# 	races = []
	# 	current_positions_list = []
	# 	total_positions_list = []
	# 	pilots = []

	# 	with open(path + '\\' + year + '.html', 'rb') as f:
	# 		soup = BeautifulSoup(f, 'html.parser')
	# 		# Get the first table soon after the id World_Championship_of_Drivers_standings from the h2 element
	# 		table = soup.find('span', id='World_Championship_of_Drivers_standings').find_next('table')
	# 		# from the second table inside table, get the first tr inside tbody
	# 		second_table = table.find('table').find('tbody')
	# 		# from second_table, get the first tr
	# 		tr = second_table.find('tr')

	# 		# Starting from the third td, get each th
	# 		th = tr.find_all('th')[2:-1]
	# 		# For each th, get the title property and title string inside a tag
	# 		for element in th:
	# 			race_info = element.find('a')
	# 			title = race_info.get('title')
	# 			title_string = race_info.string
	# 			# Get image src inside img tag
	# 			flag_icon = element.find('span')
	# 			flag_icon = flag_icon.find('img').get('src')
	# 			race_dict = {}
	# 			race_dict['title'] = title
	# 			race_dict['title_string'] = title_string
	# 			race_dict['flag_icon'] = flag_icon
	# 			races.append(race_dict)


	# 		# from second_table, get all tr starting from the second
	# 		tr = second_table.find_all('tr')[1:-1]
	# 		for element in tr:
	# 			pilot_dict = {}
	# 			# Get the first td inside tr
	# 			td = element.find('td')
	# 			pilot_dict['flag_icon'] = td.find('img').get('src')
	# 			# Find the second a tag inside td
	# 			pilot_dict['pilot_name'] = td.find_all('a')[1].string
	# 			pilots.append(pilot_dict)

	# 		default_races_values = []
	# 		for race in races:
	# 			race_dict = {}
	# 			race_dict['x'] = race['title_string']
	# 			race_dict['y'] = 0
	# 			default_races_values.append(race_dict)                

	# 		default_pilots_values = []
	# 		for pilot in pilots:
	# 			pilot_dict = {}
	# 			pilot_dict['id'] = pilot['pilot_name']
	# 			pilot_dict['data'] = []
	# 			default_pilots_values.append(pilot_dict)

	# 		ranking_test = []
	# 		ranking_test_2 = []

	# 		stop_now = 0
	# 		for race in range(0, len(races)):
	# 			ranking_points = []
	# 			race_string = races[race]['title_string']
	# 			data_info = {}
	# 			tr = second_table.find_all('tr')[1:-1]
				
	# 			ranking_pilots = []
	# 			for index, element in enumerate(tr):
	# 				# Get the first td inside tr
	# 				td = element.find('td')
	# 				pilot_name = td.find_all('a')[1].string
	# 				result = element.find_all('td')[race + 1]
	# 				total = len(result.contents)
	# 				points = get_positions_points(year, result)

	# 				ranking_points.append(points)
	# 				if len(current_positions_list) == 0 or len(current_positions_list) < len(default_pilots_values):
	# 					current_positions_list.append([points])
	# 					amount_total = points
	# 					total_positions_list.append([points])
	# 				else:
	# 					current_positions_list[tr.index(element)].append(points)
	# 					amount_total = points + total_positions_list[tr.index(element)][-1]
	# 					total_positions_list[tr.index(element)].append(amount_total)


	# 				ranking_pilots.append({'pilot_name': pilot_name, 'y': amount_total, 'race_string': race_string})

	# 				ranking_test_2.append(ranking_pilots)

	# 			# From ranking_pilots, find all highests values and change the value to 1, and then get the second highest value and change it to 2, and so on
	# 			test_2 = pydash.max_by(ranking_pilots, 'y')

	# 			# Use while to iterate over ranking_pilots and the find the highest values and change to 1. 
	# 			# Remove the item(s) after all found, then find all the second highets values and repeat the operation !
	# 			count = 1
	# 			current_points = False
	# 			continue_while = True
	# 			while continue_while:
	# 				test = pydash.max_by(ranking_pilots, 'y')
	# 				new_value = test

	# 				ranking_pilots = pydash.pull_all_by(ranking_pilots, [test], 'pilot_name')

	# 				if current_points == False:
	# 					current_points = new_value['y']

	# 				if current_points != new_value['y']:
	# 					count += 1
	# 				current_points = new_value['y']

	# 				new_value['y'] = count
	# 				ranking_test.append(new_value)

	# 				if len(ranking_pilots) == 0:
	# 					continue_while = False

	# 		for e in ranking_test:
	# 			for i in default_pilots_values:
	# 				if e['pilot_name'] == i['id']:
	# 					i['data'].append({'x': e['race_string'], 'y': e['y']})

	# 		print('')
	# 		print('default_pilots_values 2')
	# 		print(default_pilots_values)


	# 	return positions_list
	return positions_list


# =================================================================================================
# =================================================================================================
# =================================================================================================
# Create your views here.
def index(request):
	print("")
	print("")
	context = {}
	# return render(request, 'templates/front-end/index.html', context)
	return render(request, 'front-end/index.html', context)

def season_view(request, year):
	print('')
	print('season_view')
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



	for season in years:
		url_end_sufix = "_Formula_One_World_Championship"
		if int(season) <= 1980:
			url_end_sufix = "_Formula_One_season"
		
		# url = "https://en.wikipedia.org/wiki/2022_Formula_One_World_Championship"
		url = "https://en.wikipedia.org/wiki/"
		url = url + str(season) + url_end_sufix
		# print('url: ', url)

	data = get_positions_data(year)

	context = {}

	return render(request, 'front-end/season.html', context)