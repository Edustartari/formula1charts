import pytest
from django.test import TestCase, Client
from charts.views import edu_test
import time

def test_2():
    assert edu_test() == 'test'

@pytest.mark.skip(reason='No way to test it')
def test_3():
    assert 1 == 1

def test_true():
    assert True == True


