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
# run migration
sequelize db:migrate

# generate Sequelize model
sequelize model:generate --name Post --attributes title:string,body:string

# generate migration file
sequelize migration:generate --name add-index-to-posts
```

## References

- [Nuxt](https://nuxtjs.org/guides/get-started/installation)
- [Sequelize](https://sequelize.org/master/)
- [ExpressJS](https://expressjs.com/en/guide/routing.html)
