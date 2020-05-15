
exports.seed = function(knex) {
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        {project_Name: 'DB Sprint', project_description: 'Build a database'},
        {project_Name: 'Sleep', project_description: 'Take a Nap'}
      ]);
    })
    .then(function () {
      return knex('resources').truncate()
    })
    .then(function () {
      return knex('resources').insert([
        {resource_name: 'computer', resource_description: 'it\'s a computer'},
        {resource_name: 'Visual Studio Code', resource_description: 'it\'s a code editor'},
        {resource_name: 'Lambda Student', resource_description: 'it\'s you'},
        {resource_name: 'Bed', resource_description: 'you know what this is'}
      ]);
    })
    .then(function () {
      return knex('tasks').truncate()
    })
    .then(function () {
      return knex('tasks').insert([
        {Project_id: 1, task_description: 'Open your code editor', notes: 'or do not ' },
        {Project_id: 1, task_description: 'Code probably', notes: 'if you feel like it' },
        {Project_id: 1, task_description: '???????', notes: 'You got this' },
        {Project_id: 2, task_description: 'lay in bed', notes: 'that is it ' }
      ]);
    })
    .then(function () {
      return knex('projectResources').truncate()
    })
    .then(function () {
      return knex('projectResources').insert([
        {Project_id: 1, Resource_id: 1},
        {Project_id: 1, Resource_id: 2},
        {Project_id: 1, Resource_id: 3},
        {Project_id: 2, Resource_id: 3},
        {Project_id: 2, Resource_id: 4}
      ]);
    });
};