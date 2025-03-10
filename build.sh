set -o errexit

pip install -r requirements.txt

npm run build

python manage.py collectstatic --noinput
python manage.py migrate