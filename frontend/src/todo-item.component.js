import angular from "angular"
import templateUrl from "./todo-item.html"

export default angular
    .module('todoItem.component', [])
    .component('todo', {
        bindings: {
            todo: '<value',
            onUpdate: '&',
            onDelete: '&'
        },
        controller: TodoItemCtrl,
        templateUrl: templateUrl
    })
    .name;

TodoItemCtrl.$inject = [];

function TodoItemCtrl() {
    var vm = this;
    vm.editMode = false;
    vm.editTask = '';
    vm.checkboxToggle = checkboxToggle;
    vm.edit = edit;
    vm.saveEdit = saveEdit;
    vm.cancelEdit = cancelEdit;

    function edit() {
        vm.editTask = vm.todo.task;
        vm.editMode = true;
    }

    function cancelEdit() {
        vm.editTask = '';
        vm.editMode = false;
    }

    function saveEdit() {
        vm.todo.task = vm.editTask;
        vm.onUpdate().then(function() {
            vm.editMode = false;
            vm.editTask = '';
        });
    }

    function checkboxToggle() {
        vm.todo.done = !vm.todo.done;
        vm.onUpdate();
    }
}
