const db = require('../data/db-config')

module.exports = {
    getProjects,
    getTasks,
    getResources,
    addProject,
    addResource,
    addTask,
    specificTasks,
    specificProjects,
    specificResources,
    

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


function specificProjects(id) {
    return db('projects')
    .where('projects.id', id)
}

function specificResources(id) {
    return db('projectResources AS pr')
    .select('resource_name', 'resource_description')
    .join('resources AS r', 'r.id', 'pr.Resource_id' )
    .where('pr.Project_id', id)
}

function specificTasks(id) {
    return db('tasks')
    .select('task_description', 'notes', 'tasks.completed')
    .where('Project_id', id)

}
