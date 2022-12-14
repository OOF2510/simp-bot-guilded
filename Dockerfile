FROM oof2510/discordbot-base:latest

RUN mkdir -p /usr/src/SimpBot \
&& pip3 install --no-cache-dir --upgrade pip \
&& pip3 install --no-cache-dir gTTS

WORKDIR /usr/src/SimpBot
COPY . ./

RUN corepack enable \
&& yarn set version latest

RUN yarn install 

WORKDIR /

RUN apk del build-base g++

WORKDIR /usr/src/SimpBot

CMD ["yarn", "start"]
