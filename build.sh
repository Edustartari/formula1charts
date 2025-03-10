set -o errexit

pip install -r requirements.txt

npm install -D webpack-cli
npm run build

python manage.py collectstatic --noinput
python manage.py migrate