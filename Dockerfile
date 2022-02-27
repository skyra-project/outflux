FROM --platform=linux/amd64 node:17-alpine

WORKDIR /usr/src/app

RUN \
	echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
	&& echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
	&& echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
	&& apk --no-cache  update \
	&& apk --no-cache  upgrade \
	&& apk add --no-cache \
	chromium \
	dumb-init \
	libjpeg-turbo-utils \
	optipng \
	pngquant \
	ttf-opensans \
	gifsicle \
	udev \
	&& rm -rf /var/cache/apk/* /tmp/*

ENV CHROME_BIN /usr/bin/chromium-browser
ENV LIGHTHOUSE_CHROMIUM_PATH /usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser
ENV NODE_ENV production

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node .yarnrc.yml .
COPY --chown=node:node dist dist/
COPY --chown=node:node .yarn/ .yarn/

RUN yarn install --immutable

ENV PORT 8286
EXPOSE 8286

USER node

CMD [ "dumb-init", "yarn", "start" ]