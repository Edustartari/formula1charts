import os
from datetime import datetime
from django.shortcuts import HttpResponseRedirect, render
from bs4 import BeautifulSoup
import requests

# Create your views here.
def index(request):
    print("")
    print("index")
    context = {}
    # return render(request, 'templates/front-end/index.html', context)
    return render(request, 'front-end/index.html', context)

def season_view(request, year):
    print('')
    print('season_view')


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

    # get path to src/html folder
    path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    print('path: ', path)
    # get path to src/html/seasons folder
    path = os.path.join(path, 'assets\src\html')
    print('path: ', path)

    for season in years:
        url_end_sufix = "_Formula_One_World_Championship"
        if int(season) <= 1980:
            url_end_sufix = "_Formula_One_season"
        
        # url = "https://en.wikipedia.org/wiki/2022_Formula_One_World_Championship"
        url = "https://en.wikipedia.org/wiki/"
        url = url + str(season) + url_end_sufix
        # print('url: ', url)

    context = {}

    return render(request, 'front-end/season.html', context)