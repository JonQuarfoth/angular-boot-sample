(function() {
    'use strict';

    angular
        .module('todoApp')
        .component('todo', {
            bindings: {
                todo: '<value',
                onUpdate: '&',
                onDelete: '&'
            },
            controller: TodoItemCtrl,
            templateUrl: '/templates/todo-item.html'
        });

        TodoItemCtrl.$inject = [];

        function TodoItemCtrl() {
            var vm = this;
            vm.checkboxToggle = checkboxToggle;

            function checkboxToggle() {
                vm.todo.done = !vm.todo.done;
                vm.onUpdate();
            }
        }
})();