'use strict';

var tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks)
  },
  add: function (name, task) {
    // saves a task for a given person
    // console.log('addfunction', task)
    // if (!Object.prototype.hasOwnProperty(task, 'complete')) {task.complete = false}
    if (!task.hasOwnProperty('complete')) {task.complete = false}
    // console.log('addfunction', task)
    if (tasks[name]) {
      // var x = tasks[name]
      // x
      tasks[name].push(task)
    } else {
      tasks[name] = [task]
    }
    // return []
  },
  list: function (name) {
    return tasks[name]
  },
  complete: function (name, idx) {
    tasks[name][idx].complete = true
  },
  remove: function (name, idx) {
    tasks[name].splice(idx,1)
    if (tasks[name].length < 1) {
      delete tasks[name]
      return true
    } else {
      return false
    }
  }

};
