import os, sys, requests, json
import pytest
from charts.views import pilots_complete_info
from rest_framework.test import APIClient

client = APIClient()

