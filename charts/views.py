from datetime import datetime
from django.shortcuts import HttpResponseRedirect, render

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

    context = {}
    # Make a list of year beginning with 1951 until the current year.
    current_year = datetime.now().year
    years = [str(i) for i in range(1951, current_year + 1)]
    # Redirect user to homepage if year is not in the list.
    if year not in years:
        return HttpResponseRedirect('/')

    # Return a list with 80 positive adjetives.
    adjetives = [
        'amazing', 'awesome', 'incredible', 'brilliant', 'excellent', 'fabulous', 'fantastic', 'fun', 'great', 'inspiring', 'interesting', 'perfect', 'remarkable', 'satisfying', 'super', 'superb', 'wonderful', 'amusing', 'engaging', 'entertaining', 'fascinating', 'impressive', 'inviting', 'magnificent', 'memorable', 'mesmerizing', 'stunning'
    ]


    return render(request, 'front-end/season.html', context)