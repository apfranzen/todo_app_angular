(function() {
  'use strict';
  const server = 'http://localhost:3000';

  angular
    .module('todoApp')
    .controller('PeopleCtrl', PeopleCtrl)
    .controller('TodoListCtrl', TodoListCtrl);

    PeopleCtrl.$inject = ['$http', '$q'];
    TodoListCtrl.$inject = ['$http'];



    function PeopleCtrl($http, $q) {
      this.nameToAdd = '';
      this.people = [];
      const activate = () => {
        return $http.get(`${server}/persons`)
          .then((people) => {
            console.log(people);
            this.people = people.data;

            let promises = this.people.map((person) => {
              return $http.get(`${server}/persons/${person.id}/todos`)
                .then((todos) => person.todos = todos.data)
            });

            return $q.all(promises)
          })
          .catch((err) => {
            throw err;
          });
      };

      activate();
      // let promises = this.people.map((person) => {
      // return $http.get(`${server}/persons/${person.id}/todos`)
      // .then((todos) => {
      //   console.log(todos)
      //   person.todos = todos.data
      // })
      // });
      // $q.all(promises)

      this.addPerson = () => {
        console.log('problems')
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
          console.log(res);
          person.todos.push(res.data);
          this.todoToAdd = '';
        })
        .catch((err) => {
          throw err;
        });
      };
    }
}());
