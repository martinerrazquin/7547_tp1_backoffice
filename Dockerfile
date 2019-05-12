# base image
FROM node:8

# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable

ENV HOME=/usr/src/app

# set working directory
RUN mkdir $HOME
WORKDIR $HOME

# add `$HOME/node_modules/.bin` to $PATH
ENV PATH $HOME/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json package-lock.json $HOME/
RUN npm install
RUN npm install -g @angular/cli@1.7.1

EXPOSE 4200 49153

# start app
CMD ng serve --host 0.0.0.0 --poll=1000