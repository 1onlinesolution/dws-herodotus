# =======================================================================
# To build a docker image:
# docker build -t dws-herodotus:1.0 .
# =======================================================================
# To create/run a container from an image (with image_id)
# docker run --rm -d -p 7001:7005 --name dws-herodotus image_id
# =======================================================================
FROM node:alpine

LABEL version="1.0"

WORKDIR ./
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]

