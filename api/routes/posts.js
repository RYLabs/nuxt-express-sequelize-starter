const { Router } = require('express')
const { Post } = require('../../models')

const router = Router()

/* GET post listing. */
router.get('/posts', function (req, res, next) {
  Post.findAll({ limit: 15 })
    .then(posts => res.json(posts))
    .catch(error => res.json({ error }))
})

/* GET user by ID. */
router.get('/posts/:id', function (req, res, next) {
  Post.findByPk(req.params.id, { include: "comments" })
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => res.json({ error }))
})

module.exports = router
