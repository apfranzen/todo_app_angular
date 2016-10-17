(function() {
  'use strict';

  const server = 'http://localhost:3000';

  angular
  .module('todoApp')
  .controller('PeopleCtrl', PeopleCtrl)
  .controller('TodoListCtrl', TodoListCtrl)

  PeopleCtrl.$inject = ['$http', '$q'];
  TodoListCtrl.$inject = ['$http', '$q'];


  function PeopleCtrl($http, $q) {
      this.nameToAdd = '';
      this.people = [];

      const activate = () => {
        console.log('activate');
        return $http.get(`${server}/persons`)
          .then((people) => {
            this.people = people.data;

            // Make requests for individual todos
          })
          .catch((err) => {
            throw err;
          });

          let promises = this.people.map((person) => {
            $http.get(`${server}/persons/${person.id}/todos`)
              .then((todos) => {
                console.log(this.people);
                return person.todos = todos.data

          })});

          return $q.all(promises)
      };

      activate();

      this.addPerson = () => {
        return $http.post(`${server}/persons`, { name: this.nameToAdd })
          .then((res) => {
            res.data.todos = [];
            this.people.push(res.data);
            this.nameToAdd = '';
          })
          .catch((err) => {
            throw err;
          });
      };
    }

    function TodoListCtrl($http) {
      this.todoToAdd = '';

      this.addTodo = (person) => {
        return $http.post(`${server}/persons/${person.id}/todos`, {
          completed: false,
          text: this.todoToAdd
        })
        .then((res) => {
          person.todos.push(res.data);
          this.todoToAdd = '';
        })
        .catch((err) => {
          throw err;
        });
      };
    }
}());
