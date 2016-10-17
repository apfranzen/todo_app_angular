(function() {
  'use strict';

  const app = angular.module('todoApp');

  app.controller('TodoListCtrl', function() {
    this.todoToAdd = '';
    this.todos = [];

    this.addTodo = function(todoText) {
      this.todos.push({
        completed: false,
        text: todoText
      });
      this.todoToAdd = '';
    };
  });

  app.controller('PeopleCtrl', function() {
    this.nameToAdd = '';
    this.people = [];

    this.addPerson = function(personName) {
      this.people.push({ name: personName });
      this.nameToAdd = '';
    };
  });
}());
