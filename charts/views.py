import os
from datetime import datetime
from django.shortcuts import HttpResponseRedirect, render
from bs4 import BeautifulSoup
import requests

# =================================================================================================
# =================================================================================================
# =================================================================================================
# Create your procedures here.

def get_positions_points(year):
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
    if int(year) == 1951:
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
        return positions_points

    return positions_points
        

def get_positions_data(year):

    # get path to src/html folder
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print('path: ', path)
    # get path to src/html/seasons folder
    path = os.path.join(path, 'assets\src\html')
    print('path: ', path)

    positions_list = []
    if int(year) == 1950:
        positions_points = get_positions_points(year)
        races = []
        current_positions_list = []
        total_points_list = []
        pilots = []

        with open(path + '\\' + year + '.html', 'rb') as f:
            soup = BeautifulSoup(f, 'html.parser')
            print('')
            # Get the first table soon after the id World_Championship_of_Drivers_standings from the h2 element
            table = soup.find('span', id='World_Championship_of_Drivers_standings').find_next('table')
            # from the second table inside table, get the first tr inside tbody
            second_table = table.find('table').find('tbody')
            # from second_table, get the first tr
            tr = second_table.find('tr')
            # print('table: ', tr)

            # Starting from the third td, get each th
            th = tr.find_all('th')[2:-1]
            # print('th: ', th)
            print('')
            # For each th, get the title property and title string inside a tag
            for element in th:
                race_info = element.find('a')
                title = race_info.get('title')
                title_string = race_info.string
                # Get image src inside img tag
                print('')
                print('title: ', title)
                print('title_string: ', title_string)        
                flag_icon = element.find('span')
                flag_icon = flag_icon.find('img').get('src')
                print('flag_icon: ', flag_icon)
                race_dict = {}
                race_dict['title'] = title
                race_dict['title_string'] = title_string
                race_dict['flag_icon'] = flag_icon
                races.append(race_dict)


            # from second_table, get all tr starting from the second
            tr = second_table.find_all('tr')[1:]

        {
        "id": "Giuseppe Farina",
        "data": [
            {
            "x": 2000,
            "y": 10
            },
            {
            "x": 2001,
            "y": 9
            },
            {
            "x": 2002,
            "y": 1
            },
            {
            "x": 2003,
            "y": 7
            },
            {
            "x": 2004,
            "y": 3
            }
        ]
        }

        return positions_list
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