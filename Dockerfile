FROM node:alpine

RUN apk update && apk upgrade;
RUN apk add --update ca-certificates
RUN mkdir /tls

# Cache node_modules
WORKDIR /data
COPY ./package.json /data/
RUN ["yarn", "install"]

COPY . /data

EXPOSE 80 443

ENTRYPOINT ["yarn"]
CMD ["start"]
