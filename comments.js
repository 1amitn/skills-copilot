// Create web server

// Import express
const express = require('express');

// Import comment model
const Comment = require('../models/comment');

// Create router
const router = express.Router();

// Get all comments
router.get('/', (req, res) => {
    Comment.find()
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Get comment by id
router.get('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Add comment
router.post('/', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    comment.save()
        .then(comment => {
            res.json(comment);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Update comment
router.put('/:id', (req, res) => {
    Comment.findById(req.params.id)
        .then(comment => {
            comment.name = req.body.name;
            comment.email = req.body.email;
            comment.message = req.body.message;

            comment.save()
                .then
