#!/usr/bin/env bash

echo "Building project packages"
python3.8 -m pip install -r requirements.txt

echo "Collecting static files"
python3.8 manage.py collectstatic --noinput