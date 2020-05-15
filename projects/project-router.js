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


server.get('/:id', (req, res) => {
    const id = req.params.id
    projects.specificProjects(id) 
    .then( res1 => {console.log(res1[0].completed)
        res1[0].completed ? res1[0].completed = true : res1[0].completed = false
        projects.specificResources(id)
       .then( res2 => {
            res1[0].resources = res2
            projects.specificTasks(id)
                .then( res3 => {
                    res3.map( e => {
                        e.completed ? e.completed = true : e.completed = false
                    })
                    res1[0].tasks = res3
                    res.status(200).json(res1[0])
                })
                .catch(err => {
                console.log(err)
                })
       })
       .catch(err => {
        console.log(err)
       })
    })
    .catch(err => {
        console.log(err)
    })
})



module.exports = server