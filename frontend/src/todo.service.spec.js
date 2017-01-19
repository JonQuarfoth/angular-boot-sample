import todoServiceModule from "./todo.service"

describe('Todo Service', function() {

    var todoService,
        $httpBackend,
        backendData;

    beforeEach(angular.mock.module(todoServiceModule));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(inject(function($injector, _$httpBackend_, _todoService_) {
        $httpBackend = _$httpBackend_;
        todoService = _todoService_;

        var todo1 = { id: 1, task: 'do something', done: true };
        var todo2 = { id: 2, task: 'do something else', done: false };

        backendData = {
            todo1: todo1,
            todo2: todo2,
            list: [todo1, todo2]
        }
    }));

    it('list sends GET to /todos', function() {

        $httpBackend.expectGET('/todos').respond(200, backendData.list);

        var result = undefined;
        todoService.list().then(function(todos) {
            result = todos;
        });

        $httpBackend.flush();

        expect(result).toBeDefined();
        expect(result).toEqual(backendData.list);
    });

    it('create sends POST to /todos', function() {
        var postData = {task: 'task', done: false};
        $httpBackend.expectPOST('/todos', postData).respond(200, backendData.todo1);

        var result = undefined;
        todoService.create(postData).then(function(todo) {
            result = todo;
        });

        $httpBackend.flush();

        expect(result).toBeDefined();
        expect(result).toEqual(backendData.todo1);
    });

    it('get(1) sends GET to /todos/1', function() {
        testGet(1);
    });

    it('get(12345) sends GET to /todos/12345', function() {
        testGet(12345)
    });

    it('remove(1) sends DELETE to /todos/1', function() {
        testDelete(1);
    });

    it('remove(54321) sends DELETE to /todos/54321', function() {
        testDelete(54321);
    });

    it('update() with id 1 sends PUT to /todos/1', function() {
        testUpdate(backendData.todo1);
    });

    it('update() with id 98765 sends PUT to /todos/98765', function() {
        angular.extend(backendData.todo2, {id: 98765});
        testUpdate(backendData.todo2);
    });

    function testGet(id) {
        $httpBackend.expectGET('/todos/' + id).respond(200, backendData.todo1);

        var result = undefined;
        todoService.get(id).then(function(todo) {
            result = todo;
        });

        $httpBackend.flush();

        expect(result).toBeDefined();
        expect(result).toEqual(backendData.todo1);
    }

    function testDelete(id) {
        $httpBackend.expectDELETE('/todos/' + id).respond(200);

        var result = undefined;
        todoService.remove(id).then(function() {
            result = true;
        });

        $httpBackend.flush();

        expect(result).toBeDefined();
        expect(result).toBe(true);
    }

    function testUpdate(putData) {
        $httpBackend.expectPUT('/todos/' + putData.id, putData).respond(200, backendData.todo2);

        var result = undefined;
        todoService.update(putData).then(function(todo) {
            result = todo;
        });

        $httpBackend.flush();

        expect(result).toBeDefined();
        expect(result).toEqual(backendData.todo2);
    }
});
