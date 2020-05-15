const express = require('express');
const server = express.Router();
const projects = require('./project-model.js')

server.get('/', (req, res) => {
    projects.getProjects()
    .then(project => {

        res.status(200).json({ data: project})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message })
    })
})

server.post('/', (req, res) => {
    const newProject = req.body
    projects.addProject(newProject)
    .then(project => {
        res.status(201).json({ project})
    })
})

server.get('/resources', (req, res) => {
    projects.getResources()
    .then(resources => {

        res.status(200).json({ data: resources})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message })
    })
})


server.post('/resources', (req, res) => {
    const newResource = req.body
    projects.addResource(newResource)
    .then(resource => {
        res.status(201).json({resource})
    })
})


server.get('/tasks', (req, res) => {
    projects.getTasks()
    .then(tasks => {
        tasks.map( e => {
            e.completed? e.completed = true : e.completed = false
        })
        res.status(200).json({ data: tasks})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message })
    })
})


server.post('/:id/tasks', (req, res) => {
    req.body.project_id = req.params.id
    const newTask = req.body
    projects.addTask(newTask)
    .then(task => {
        res.status(201).json({task})
    })
})



module.exports = server