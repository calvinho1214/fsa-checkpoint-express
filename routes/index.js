'use strict';

var express = require('express');
var router = express.Router();
var todos = require('../models/todos')
module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/users/:name/tasks', (req, res) => {
    let newlist = todos.list(req.params.name)
    if (newlist)
        {
            if (req.query.status == 'complete') newlist = newlist.filter(x => x.complete)
            if (req.query.status == 'active') newlist = newlist.filter(x => !x.complete)
            res.json(newlist)
        }
    else
        {res.json(404, 'not found')}
})
router.post('/users/:name/tasks', (req, res) => {
    if (Object.keys(req.body).map(x => ['complete','content'].includes(x)).reduce((a, b) => a && b)) {
        todos.add(req.params.name, req.body)
        const newlist = todos.list(req.params.name)
        if (newlist)
            {res.json(201, newlist[newlist.length - 1])}
        else
            {res.json(404, 'not found')}
    } else {
        res.json(400, 'done')
    }
})
router.put('/users/:name/tasks/:id', (req, res) => {
    todos.complete(req.params.name, req.params.id)
    res.json('done')
})
router.delete('/users/:name/tasks/:id', (req, res) => {
    todos.remove(req.params.name, req.params.id)
    res.json(204, 'done')
})
router.get('/users', (req, res) => {
    res.json(todos.listPeople())
})