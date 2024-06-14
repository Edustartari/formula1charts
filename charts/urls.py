from django.urls import path
from charts import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all-seasons', views.index, name='index'),
    path('pilots', views.pilots, name='pilots'),
    path('pilots-list', views.pilots_list, name='pilots_list'),
    path('pilots-complete-info', views.pilots_complete_info, name='pilots_complete_info'),
    path('load-nationalities', views.load_nationalities, name='load_nationalities'),
    path('all-time', views.all_time, name='all_time'),
    path('constructors', views.constructors, name='constructors'),
    path('season/<slug:year>', views.season_view, name='season_view'),
]