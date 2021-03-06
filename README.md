# Starter Nuxt / Express / Sequelize App

## Docker Setup

```bash
# start up development server (yarn dev)
docker-compose up

# start up shell on running container
docker-compose exec node /bin/bash
```

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Sequelize Commands

```bash
# create database
sequelize db:create

# run migration
sequelize db:migrate

# run seeders
sequelize db:seed:all

# generate Sequelize model
sequelize model:generate --name Post --attributes title:string,body:string

# generate migration file
sequelize migration:generate --name add-index-to-posts
```

## ExpressJS

Express code sits in the `/api` directory.  Define new routes in `/api/routes` and add them to the server in `/api/index.js`

## CDK

This started also provides a CDK script to provision the app on AWS.  To use:

- Enter Docker container: `docker-compose exec node /bin/bash`
- Edit `infra/bin/app.ts` and enter the account id, region and VPC id values
- Set `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in your environment
- Deploy the app: `cdk deploy appProd`

## References

- [Nuxt](https://nuxtjs.org/guides/get-started/installation)
- [Sequelize](https://sequelize.org/master/)
- [ExpressJS](https://expressjs.com/en/guide/routing.html)
