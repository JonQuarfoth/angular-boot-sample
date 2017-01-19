module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
        	'node_modules/angular/angular.js',
        	'node_modules/angular-mocks/angular-mocks.js',
        	'todo/todo.app.js',
            'todo/**/*.js'
        ],
        browsers: ['Chrome']
    })
}