"use strict"

// Comment Controller:

const Comment = require('../models/comment')
const Blog = require('../models/blog')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            
        */

        const data = await res.getModelList(Comment)

        // res.status(200).send({
        //     error: false,
        //     details: await res.getModelListDetails(Comment),
        //     data
        // })
        
        // FOR REACT PROJECT:
        res.status(200).send(data)
    },

    create: async (req, res) => {
          /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "user": "test",
                    "comment": "comment",
                    "post":"id"
            
                }
            }
        */
        req.body.user = req.user.username
        req.body.post = req.params.id

        const data = await Comment.create(req.body)

        const comments = await Comment.find({post:req.params.id})

        const blogCommentUpdate = await Blog.updateOne({_id:req.params.id}, {comments:comments})
        const blogCommentCountUpdate = await Blog.updateOne({_id:req.params.id}, { $inc: { comment_count: +1, post_views: -1 } })

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
         /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Get Single Comment"
        */

        const data = await Comment.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })
    },

    update: async (req, res) => {
       /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Comment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   "user": "test",
                    "post": "id",
                    "comment":"comment"
                  
                }
            }
        */

        const data = await Comment.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        const comments = await Comment.find({post:req.params.id})
        const blogCommentUpdate = await Blog.updateOne({_id:req.params.id}, {comments:comments})

        res.status(202).send({
            error: false,
            data,
            new: await Comment.findOne({ _id: req.params.id })
        })
    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Comment"
        */
        const comment = await Comment.findOne({_id:req.params.id})

        const data = await Comment.deleteOne({ _id: req.params.id })

        const comments = await Comment.find({post:comment.post})
        const blogCommentUpdate = await Blog.updateOne({_id:comment.post}, {comments:comments})
        const blogCommentCountUpdate = await Blog.updateOne({_id:comment.post}, { $inc: { comment_count: -1 } })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })
    },
}