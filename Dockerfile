FROM cycleplatform/nodejs:latest
EXPOSE 80
COPY . /data
ENTRYPOINT ["/usr/bin/npm"]
CMD ["start"]
