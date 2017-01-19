import jasmine from "jasmine"
import "angular-mocks"
import todoApp from "./todo.app"
import todoItem from "./todo-item.component"

describe('Todo List Component', function () {

    var todoListCtrl,
        todoService,
        mockTodoData,
        $q,
        $rootScope;

    beforeEach(angular.mock.module('todoApp'));

    beforeEach(inject(function ($componentController, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        $q = _$q_;

        var todo1 = {id: 1, task: 'Be ridiculously wealthy', done: false};
        var todo2 = {id: 2, task: 'Learn to fight', done: true};
        var todo3 = {id: 3, task: 'Become Batman', done: false};

        mockTodoData = {
            todo1: todo1,
            todo2: todo2,
            todo3: todo3,
            list: [todo1, todo2, todo3]
        };

        todoService = jasmine.createSpyObj('todoService', [
            'list',
            'create',
            'update',
            'remove'
        ]);

        todoListCtrl = $componentController('todoList', {todoService: todoService});
    }));

    describe('$onInit:', function () {

        var resolveList;

        beforeEach(function () {
            var defer = $q.defer();
            todoService.list.and.returnValue(defer.promise);

            resolveList = function (data) {
                defer.resolve(data);
                $rootScope.$digest();
            };

            todoListCtrl.$onInit();
        });

        it('initializes variables and calls list', function () {
            expect(todoListCtrl.addTask).toEqual('');
            expect(todoListCtrl.todos).toEqual([]);
            expect(todoListCtrl.filters).toBeDefined();
            expect(todoListCtrl.filter).toBe(todoListCtrl.filters.all);
            expect(todoService.list).toHaveBeenCalled();
        });

        it('todos are initialized after list call returns', function () {
            resolveList(mockTodoData.list);
            expect(todoListCtrl.todos).toEqual(mockTodoData.list);
        });

    });

    describe('after $onInit,', function() {

         beforeEach(function() {
             todoService.list.and.returnValue($q.when(mockTodoData.list));
             todoListCtrl.$onInit();
             $rootScope.$digest();
         });

        describe('createTodo:', function () {

            var resolveCreate;

            beforeEach(function () {
                var defer = $q.defer();
                todoService.create.and.returnValue(defer.promise);

                resolveCreate = function (data) {
                    defer.resolve(data);
                    $rootScope.$digest();
                };
            });

            it('calls todoService create', function () {
                var newTask = 'Create a new todo item';
                todoListCtrl.addTask = newTask;

                var result = undefined;
                todoListCtrl.createTodo().then(function (created) {
                    result = created;
                });

                resolveCreate(mockTodoData.todo1);

                expect(todoService.create).toHaveBeenCalledWith({task: newTask, done: false});
                expect(result).toBeDefined();
                expect(result).toEqual(mockTodoData.todo1);
            });

            it('addTask is cleared', function () {
                todoListCtrl.addTask = 'Create a new todo item';
                todoListCtrl.createTodo();
                resolveCreate(mockTodoData.todo1);
                expect(todoListCtrl.addTask).toEqual('');
            });

            it('new todo added to list', function () {
                todoListCtrl.addTask = 'Create a new todo item';
                expect(todoListCtrl.todos.length).toBe(3);
                todoListCtrl.createTodo();
                resolveCreate(mockTodoData.todo1);
                expect(todoListCtrl.todos.length).toBe(4);
            });
        });

        describe('updateTodo:', function () {

            var resolveUpdate;

            beforeEach(function () {
                var defer = $q.defer();
                todoService.update.and.returnValue(defer.promise);

                resolveUpdate = function (data) {
                    defer.resolve(data);
                    $rootScope.$digest();
                };
            });

            it('calls todoService update', function () {
                var input = angular.copy(mockTodoData.todo1);
                input.task = 'fall in a hole';
                input.done = true;

                var expected = angular.copy(input);

                var result = undefined;
                todoListCtrl.updateTodo(input).then(function (updated) {
                    result = updated;
                });

                resolveUpdate(expected);
                expect(result).not.toBe(expected);
                expect(result).toEqual(expected);
            });
        });

        describe('deleteTodo:', function () {

            var resolveDelete;

            beforeEach(function () {
                var defer = $q.defer();
                todoService.remove.and.returnValue(defer.promise);

                resolveDelete = function (deletedTodo) {
                    defer.resolve(deletedTodo);
                    $rootScope.$digest();
                };
            });

            it('calls todoService.remove()', function () {
                expect(todoListCtrl.todos.length).toBe(3);
                expect(todoListCtrl.todos).toContain(mockTodoData.todo1);

                var result = undefined;
                todoListCtrl.deleteTodo(mockTodoData.todo1).then(function (deleted) {
                    result = deleted;
                });

                resolveDelete(angular.copy(mockTodoData.todo1));
                expect(result).toEqual(mockTodoData.todo1);
                expect(todoListCtrl.todos.length).toBe(2);
                expect(todoListCtrl.todos).not.toContain(mockTodoData.todo1);
            });
        });


    });
});
