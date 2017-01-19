# angular-boot-sample
Angular 1.6/Spring Boot sample Todo app

A simple todo list app where a user can add a list of things to do and check them off when completed.

Frontend: Angular 1.6
Backend: Spring Boot

Angular code is in the `frontend` directory. NPM is used to manage dependencies and run tasks. Webpack is used to build and bundle the code. Connects to backend REST Api to access todos.

Spring Boot code is in the `src` directory. Gradle is used for building and running. Some Gradle tasks have been augmented to run frontend builds as well so that when you run or build your server, you'll get the latest code. Provides a REST API for Todo Items and saves to an in-memory database.

### Gradle tasks (run from project root)
* `./gradlew bootRun`: Builds frontend dependencies, moves them into backend resources folder, runs server on http://localhost:8080
* `.gradlew test`: run the app unit tests

### npm tasks (run from the `frontend` directory)
* `npm run build`: runs webpack - bundles code and outputs to the backend project's resources directory
* `npm run test`: runs karma unit tests once
* `npm run test:live`: runs karma unit tests, watches for changes and re-runs as necessary
* `npm run webdriver`: starts a selenium server for end-to-end testing
* `npm run e2e`

### End-to-end tests
Running the protractor e2e tests requires 3 processes running simultaneously.
* `./gradlew bootRun` to run the app locally
* `npm run webdriver` to start up the selenium server protractor connects to
* `npm run e2e` to actually run  protractor tests.

The e2e test assumes a blank slate (no todos in the database). You can terminate the bootRun and start it again to clear out the database.
