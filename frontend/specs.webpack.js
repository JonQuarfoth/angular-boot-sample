// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
import angular from 'angular';

// Built by the core Angular team for mocking dependencies
import mocks from 'angular-mocks';

const context = require.context('./src', true, /\.spec\.js$/);

context.keys().forEach(context);
