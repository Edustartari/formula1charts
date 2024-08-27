#!/usr/bin/env bash

echo "Building project packages"
python -m pip install -r requirements.txt

echo "Collecting static files"
python manage.py collectstatic --noinput