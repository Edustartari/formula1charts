import os, sys, requests, json
import pytest
from charts.views import *
from rest_framework.test import APIClient

client = APIClient()

def test_update_drivers_info():
    assert update_drivers_info() == True

def test_add_percentage_info():
    assert add_percentage_info() == True

def test_get_constructors_stats():
    response = client.get('/get-constructors-stats')
    json_data = json.loads(response.content)
    assert response.status_code == 200
    assert 'constructors' in json_data, f"json_data don't possess constructors key"
    assert len(json_data['constructors']) > 0, f"constructors list is empty"

def test_index():
    response = client.get('')
    assert response.status_code == 200

def test_season_view():
    response = client.get('/season/2024')
    assert response.status_code == 200

def test_pilots():
    response = client.get('/pilots')
    assert response.status_code == 200

def test_all_time():
    response = client.get('/all-time')
    assert response.status_code == 200

def test_load_nationalities():
    response = client.get('/load-nationalities')
    json_data = json.loads(response.content)
    assert response.status_code == 200
    assert 'nationalities' in json_data, f"json_data don't possess nationalities key"
    assert len(json_data['nationalities']) > 0, f"nationalities list is empty"

def pilots_list():
    response = client.get('/pilots-list')
    json_data = json.loads(response.content)
    assert response.status_code == 200
    assert 'drivers' in json_data, f"json_data don't possess drivers key"
    assert len(json_data['drivers']) > 0, f"drivers list is empty"

def pilots_complete_info():
    response = client.get('/pilots-complete-info')
    json_data = json.loads(response.content)
    assert response.status_code == 200
    assert 'drivers' in json_data, f"json_data don't possess drivers key"
    assert len(json_data['drivers']) > 0, f"drivers list is empty"

def test_constructors():
    response = client.get('/constructors')
    assert response.status_code == 200

def test_others():
    response = client.get('/others')
    assert response.status_code == 200