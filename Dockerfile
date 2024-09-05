#This is an example webapp.io configuration for Django!
FROM vm/ubuntu:18.04

ENV NODE_VERSION=14.17.6
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# To note: Layerfiles create entire VMs, *not* containers!

# node is a memory hog
ENV NODE_OPTIONS=--max-old-space-size=8192

COPY . .
RUN npm install
RUN BACKGROUND npm start

# Install python 3 & postgresql
RUN apt-get update && \
    apt-get install python3.8 python3-pip python3.8-dev libpq-dev \
            postgresql postgresql-contrib nginx curl

RUN cat requirements.txt | xargs -n 1 pip3 install || true
RUN pip3 install tqdm==4.64.0
RUN pip3 install pydash==5.1.2
RUN pip3 install redis==4.3.6
RUN pip3 install django-utils-six

# Allow local connections to the site
RUN echo "ALLOWED_HOSTS = ['localhost']" >> settings.py

# Run migrations (implicitly checks that they work)
RUN python3 manage.py makemigrations && python3 manage.py migrate

# Start the server
RUN BACKGROUND python3 manage.py runserver 0.0.0.0:8000
EXPOSE WEBSITE localhost:8000
