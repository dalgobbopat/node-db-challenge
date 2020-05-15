const db = require('../data/db-config')

module.exports = {
    getProjects,
    getTasks,
    getResources,
    addProject,
    addResource,
    addTask,
    

}

function getProjects() {
    return db('projects')
}

function addProject(project) {
    return db('projects')
    .insert(project, 'id')
    .then(ids => ({id: ids[0]}));
}

function getResources() {
    return db('resources')
}

function addResource(resource) {
    return db('resources')
    .insert(resource, 'id')
    .then(ids => ({id: ids[0]}));
}

function getTasks() {
    return db('tasks')
    .select('project_Name', 'project_description', 'task_description', 'notes', 'tasks.completed')
    .join('projects', 'projects.id', 'tasks.Project_id')
}

function addTask(task) {
    return db('tasks')
    .insert(task, 'id')
    .then(ids => ({id: ids[0]}));
}



