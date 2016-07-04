FROM node:5.11.1
MAINTAINER Zhe Zhang https://github.com/zhe
ENV NGINX_VERSION 1.10.1-1~jessie

RUN apt-key adv --keyserver hkp://pgp.mit.edu:80 --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62 \
  && echo "deb http://nginx.org/packages/debian/ jessie nginx" >> /etc/apt/sources.list \
  && apt-get update \
  && apt-get install --no-install-recommends --no-install-suggests -y \
            ca-certificates \
            nginx=${NGINX_VERSION} \
            nginx-module-xslt \
            nginx-module-geoip \
            nginx-module-image-filter \
            nginx-module-perl \
            nginx-module-njs \
            gettext-base \
  && rm -rf /var/lib/apt/lists/*

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log \
  && mkdir -p /app

COPY . /app
WORKDIR /app

ENV BASE_URL http://demo.zhezhang.co/lightning-talk
ENV API_URL http://demo.zhezhang.co/lightning-talk/api

RUN npm install \
  && npm run deploy:prod

EXPOSE 80

CMD cp -r ./dist/* /usr/share/nginx/html/ \
    && nginx -g 'daemon off;'
