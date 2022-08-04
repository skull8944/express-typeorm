FROM node:12

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY ./ $APP_HOME

RUN apt-get -y update
RUN npm install

EXPOSE 4000

CMD npm start