FROM node:alpine

RUN apk update && apk upgrade;
RUN apk add --update ca-certificates
RUN mkdir /tls

# Cache node_modules
WORKDIR /data
COPY ./package.json /data/
RUN ["npm", "install"]

COPY . /data

EXPOSE 80 443


ENTRYPOINT ["npm"]
CMD ["start"]
