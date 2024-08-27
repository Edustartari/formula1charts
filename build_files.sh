#!/usr/bin/env bash

echo "Building project packages"
python3 -m pip install pysqlite3==0.5.3
python3 -m pip install -r requirements.txt

echo "Collecting static files"
python3 manage.py collectstatic --noinput