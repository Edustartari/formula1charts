from django.urls import path
from charts import views

urlpatterns = [
    path('', views.index, name='index'),
    path('all-seasons', views.index, name='index'),
    path('pilots', views.index, name='index'),
    path('season/<slug:year>', views.season_view, name='season_view'),
]