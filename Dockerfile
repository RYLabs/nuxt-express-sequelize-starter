FROM node:lts

RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    postgresql-client

RUN yarn global add @vue/cli @vue/cli-init aws-cdk

ENV PATH="/myapp/node_modules/.bin:${PATH}"

WORKDIR /myapp

COPY package.json yarn.lock /myapp/
RUN yarn install

COPY . /myapp/
RUN yarn build

ENV NUXT_HOST=0.0.0.0
CMD yarn start
