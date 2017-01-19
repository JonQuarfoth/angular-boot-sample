describe('Todo App E2E tests', function() {

    it('Page loads', function() {
        browser.get('http://localhost:8080');
        expect(browser.getTitle()).toEqual('Angular/SpringBoot Demo');
    });

    it('Todo List appears', function() {
        browser.get('http://localhost:8080');
        expect(element(by.className('todo-list')).isPresent()).toBe(true);
        var todos = element.all(by.tagName('todo'));
        expect(todos.count()).toBe(0);
    });

    it('Add a task with enter', function() {
        browser.get('http://localhost:8080');
        var addTaskInput = element(by.id('add-task-input'));

        var todos = element.all(by.tagName('todo'));
        expect(todos.count()).toBe(0);
        addTaskInput.sendKeys('Create a new todo with enter key', protractor.Key.ENTER);
        expect(todos.count()).toBe(1);
    });

    it('Add a task with button', function() {
        browser.get('http://localhost:8080');
        var addTaskInput = element(by.id('add-task-input'));
        var addTaskButton = element(by.id('add-task-button'));

        var todos = element.all(by.tagName('todo'));
        expect(todos.count()).toBe(1);
        addTaskInput.sendKeys('Create a new todo with add button');
        addTaskButton.click();
        expect(todos.count()).toBe(2);
    });

    it('Delete a task', function() {
        browser.get('http://localhost:8080');
        var trashButton = element(by.className('todo-trash'));

        var todos = element.all(by.tagName('todo'));
        expect(todos.count()).toBe(2);
        trashButton.click();
        expect(todos.count()).toBe(1);
    });

    it('complete task', function() {
        browser.get('http://localhost:8080');
        var check = element(by.className('todo-check'));

        expect(check.getAttribute('class')).not.toMatch('done')

        check.click();
        expect(check.getAttribute('class')).toMatch('done')
    });

    it('uncomplete task', function() {
        browser.get('http://localhost:8080');
        var check = element(by.className('todo-check'));

        expect(check.getAttribute('class')).toMatch('done')

        check.click();
        expect(check.getAttribute('class')).not.toMatch('done')
    });

    it('edit task and cancel', function() {
        browser.get('http://localhost:8080');
        var edit = element(by.className('edit'));
        var taskSpan = element(by.css('span.todo-task'));
        var taskInput = element(by.css('input.todo-task'));
        var editCancel = element(by.className('edit-cancel'));

        expect(taskSpan.isPresent()).toBe(true);

        edit.click();

        expect(taskSpan.isPresent()).toBe(false);
        expect(taskInput.isPresent()).toBe(true);

        taskInput.sendKeys('garbage');
        editCancel.click();

        expect(taskSpan.isPresent()).toBe(true);
        expect(taskSpan.getText()).not.toMatch(/.*garbage$/);
        expect(taskInput.isPresent()).toBe(false);
    });

    it('edit task and save', function() {
        browser.get('http://localhost:8080');
        var edit = element(by.className('edit'));
        var taskSpan = element(by.css('span.todo-task'));
        var taskInput = element(by.css('input.todo-task'));
        var editSave = element(by.className('edit-save'));

        expect(taskSpan.isPresent()).toBe(true);

        edit.click();

        expect(taskSpan.isPresent()).toBe(false);
        expect(taskInput.isPresent()).toBe(true);

        taskInput.sendKeys('garbage');
        editSave.click();

        expect(taskSpan.isPresent()).toBe(true);
        expect(taskSpan.getText()).toMatch(/.*garbage$/);
        expect(taskInput.isPresent()).toBe(false);
    });

});
