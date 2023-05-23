FROM node:16

ARG UID
RUN adduser frontend --uid $UID --disabled-password --gecos ""

ENV APP /usr/src/app
RUN mkdir $APP
WORKDIR $APP

COPY package.json $APP/
COPY yarn.lock $APP/
RUN yarn install

COPY . $APP/

CMD ./start-dev.sh