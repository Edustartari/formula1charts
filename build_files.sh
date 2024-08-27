#!/usr/bin/env bash

echo "Building project packages"
apt install libsqlite3-dev
python3 -m pip install -r requirements.txt

echo "Collecting static files"
python3 manage.py collectstatic --noinput