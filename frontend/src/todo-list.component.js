import angular from "angular"
import templateUrl from "./todo-list.html"

export default angular
    .module('todoList.component', [])
    .component('todoList', {
        controller: TodoListCtrl,
        templateUrl: templateUrl
    })
    .name;

TodoListCtrl.$inject = ['todoService'];

function TodoListCtrl(todoService) {
    var vm = this;
    vm.$onInit = $onInit;
    vm.createTodo = createTodo;
    vm.updateTodo = updateTodo;
    vm.deleteTodo = deleteTodo;

    function $onInit() {
        vm.todos = [];
        vm.addTask = '';
        vm.filters = {
            all: undefined,
            incomplete : {done: false},
            complete : {done: true}
        };
        vm.filter = vm.filters.all;
        todoService.list().then(function(todos) {
            vm.todos = todos;
        });
    }

    function createTodo() {
        var todo = {task: vm.addTask, done: false};
        return todoService.create(todo)
            .then(function(savedTodo) {
                vm.todos.push(savedTodo);
                vm.addTask = '';
                return savedTodo;
            });
    }

    function updateTodo(todo) {
        return todoService.update(todo).then(function(updatedTodo) {
            var current = vm.todos.find(idMatcher(todo.id));
            angular.extend(current, updatedTodo);
            return current;
        });
    }

    function deleteTodo(todo) {
        return todoService.remove(todo.id).then(function() {
            var index = vm.todos.findIndex(idMatcher(todo.id));
            var deleted = vm.todos.splice(index, 1);
            return deleted[0];
        });
    }

    function idMatcher(id) {
        return function(todo) {
            return todo && todo.id == id;
        };
    }
}
