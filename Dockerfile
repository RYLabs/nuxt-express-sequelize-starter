FROM node:lts

RUN apt-get update -qq \
  && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    postgresql-client

RUN yarn global add @vue/cli @vue/cli-init

ENV PATH="/myapp/node_modules/.bin:${PATH}"

WORKDIR /myapp
CMD '/bin/bash'
