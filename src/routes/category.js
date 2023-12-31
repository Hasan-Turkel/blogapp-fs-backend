"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/category:

const {isAdmin} = require('../middlewares/permissions')
const category = require('../controllers/category')

// URL: /categories



router.route('/')
    .get(category.list)
    .post(isAdmin, category.create)

router.route('/:id')
    .get(isAdmin, category.read)
    .put(isAdmin, category.update)
    .patch(isAdmin, category.update)
    .delete(isAdmin, category.delete)

/* ------------------------------------------------------- */
module.exports = router