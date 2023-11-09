"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/category:

// const { isAdmin } = require('../middlewares/permissions')
const category = require('../controllers/category')

// URL: /categories

// router.use(isAdmin)

router.route('/')
    .get(category.list)
    .post(category.create)

router.route('/:id')
    .get(category.read)
    .put(category.update)
    .patch(category.update)
    .delete(category.delete)

/* ------------------------------------------------------- */
module.exports = router