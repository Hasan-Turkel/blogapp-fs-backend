"use strict"

// Category Controller:

const Category = require('../models/category')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "List Category"
            
        */

        const data = await res.getModelList(Category)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Category),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Create Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "name": "category",
            
                }
            }
        */

        const data = await Category.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Get Single Category"
        */

        const data = await Category.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
         /*
            #swagger.tags = ["Ctegories"]
            #swagger.summary = "Update Category"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   "name": "category",
                  
                }
            }
        */

        const data = await Category.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Category.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
          /*
            #swagger.tags = ["Categories"]
            #swagger.summary = "Delete Category"
        */

        const data = await Category.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}