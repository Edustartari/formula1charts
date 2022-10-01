from django.shortcuts import render

# Create your views here.
def index(request):
    print("")
    print("index")
    context = {}
    # return render(request, 'templates/front-end/index.html', context)
    return render(request, 'front-end/index.html', context)