FROM ubuntu:18.04

ENV LANG C.UTF-8
RUN apt-get update --fix-missing
RUN apt-get install -y ffmpeg
RUN apt-get install -y python
RUN apt-get install -y python-dev
RUN apt-get install -y python-pip
RUN apt-get install -y libssl-dev
RUN apt-get install -y libpq-dev
RUN apt-get install -y git
RUN apt-get install -y build-essential
RUN apt-get install -y libfontconfig1
RUN apt-get install -y libfontconfig1-dev
RUN apt-get install -y curl
RUN apt-get install -y libmysqlclient-dev
RUN apt-get install -y redis-server
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs
RUN pip install --upgrade pip

WORKDIR ~

# Copy and install everything from the requirements file
COPY ./requirements.txt ./requirements.txt
RUN cat requirements.txt | xargs -n 1 pip install || true
RUN rm ./requirements.txt

# To build:
# docker image build -t magrooveindie:1.0 .

# To run:
# docker run -i -t -d --name magrooveindie --publish 80:80 -v $PWD:/root/magrooveIndie --env DJANGO_ENV=local magrooveindie:1.27.0
# docker run -i -t -d --name magrooveindie --publish 80:80 -v $PWD:/root/magrooveIndie -v /Users/fafaschiavo/projects/magroove_folders:/root/magroove_folders --env DJANGO_ENV=local magrooveindie:1.0
# docker exec magrooveindie redis-server --daemonize yes

# To get a new terminal
# docker start magrooveindie
# docker exec -i -t magrooveindie /bin/bash

# To execute
# docker exec -w /root/magrooveIndie -i -t magrooveindie python manage.py runserver 0.0.0.0:8000