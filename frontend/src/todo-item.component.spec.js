import todoItem from "./todo-item.component"

describe('Todo Item Component', function() {

    var todoItemCtrl,
        onDeleteSpy,
        onUpdateSpy,
        $scope;

    beforeEach(angular.mock.module(todoItem));

    beforeEach(inject(function($componentController, $rootScope) {
        onDeleteSpy = jasmine.createSpy('onDeleteSpy');
        onUpdateSpy = jasmine.createSpy('onUpdateSpy');
        $scope = $rootScope.$new();

        var locals = {
            $scope: $scope
        };
        var bindings = {
            todo: {
                id: 1,
                task: 'do something',
                done: true
            },
            onUpdate: onUpdateSpy,
            onDelete: onDeleteSpy
        };
        todoItemCtrl = $componentController('todo', locals, bindings);
    }));

    it('onUpdate() invokes update callback', function() {
        todoItemCtrl.onUpdate();
        expect(onUpdateSpy).toHaveBeenCalled();
    });

    it('onDelete() invokes delete callback', function() {
        todoItemCtrl.onDelete();
        expect(onDeleteSpy).toHaveBeenCalled();
    });

    it('toggleCheckbox marks item done and updates', function() {
        testCheckboxToggle(false);
    });

    it('toggleCheckbox marks item incomplete and updates', function() {
        testCheckboxToggle(true);
    });

    function testCheckboxToggle(initial) {
        todoItemCtrl.todo.done = initial;

        todoItemCtrl.checkboxToggle();
        expect(onUpdateSpy).toHaveBeenCalled();

        expect(todoItemCtrl.todo.done).toBe(!initial);
    }
});
