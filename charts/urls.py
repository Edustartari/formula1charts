from django.urls import path
from charts import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all-seasons', views.index, name='index'),
    path('pilots', views.pilots, name='pilots'),
    path('pilots-list', views.pilots_list, name='pilots_list'),
    path('all-time', views.all_time, name='all_time'),
    path('season/<slug:year>', views.season_view, name='season_view'),
]