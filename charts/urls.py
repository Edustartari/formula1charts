from django.urls import path
from charts import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all-seasons', views.index, name='index'),
]