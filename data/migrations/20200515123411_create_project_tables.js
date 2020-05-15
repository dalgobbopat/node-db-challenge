exports.up = function(knex) {
    return knex.schema
      .createTable('projects', tbl => {
          tbl.increments();
          tbl.text('project_Name', 24)
              .notNullable();
          tbl.text('project_description', 255);
          tbl.boolean('completed')
              .defaultTo(false);
      })
      .createTable('resources', tbl => {
          tbl.increments();
          tbl.text('resource_name', 24)
              .unique()
              .notNullable();
          tbl.text('resource_description', 255);
      })
      .createTable('tasks', tbl => {
          tbl.increments();
          tbl.integer('Project_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('projects')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.text('task_description', 255)
              .notNullable()
          tbl.text('notes', 255)
          tbl.boolean('completed')
              .defaultTo(false)
              .notNullable();
      })
      .createTable('projectResources', tbl => {
          tbl.increments()
          tbl.integer('Project_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('projects')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.integer('Resource_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('resources')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
      })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('projectResources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects');
  };
