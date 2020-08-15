FROM node:lts

RUN yarn global add @vue/cli @vue/cli-init

WORKDIR /myapp
CMD '/bin/bash'
