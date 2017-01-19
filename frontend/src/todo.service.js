import angular from "angular"

export default angular
    .module('todo.service', [])
    .factory('todoService', todoService)
    .name;

todoService.$inject = ['$http'];

function todoService($http) {
    var endpoint = '/todos';

    var todoService = {
        create: create,
        update: update,
        get: get,
        list: list,
        remove: remove
    };
    return todoService;

    function list() {
        return $http.get(endpoint).then(parseData);
    }

    function create(todo) {
        return $http.post(endpoint, todo).then(parseData);
    }

    function update(todo) {
        return $http.put(endpoint + '/' + todo.id, todo).then(parseData);;
    }

    function get(id) {
        return $http.get(endpoint + '/' + id).then(parseData);
    }

    function remove(id) {
        return $http.delete(endpoint + '/' + id)
    }

    function parseData(response) {
        return response.data;
    }
}
