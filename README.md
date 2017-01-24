# angular-boot-sample
Angular 1.6/Spring Boot sample Todo app

A simple todo list app where a user can add a list of things to do and check them off when completed.

Frontend: Angular 1.6

Backend: Spring Boot

The project is configured as a multiproject gradle build. The gradle build file in `frontend` wraps NPM tasks that do the actual work. The Gradle tasks are provided for easy interopability with Spring Boot.

Angular code is in the `frontend` directory. NPM is used to manage dependencies and run tasks. Webpack is used to build and bundle the code. Gradle tasks are also provided for the npm tasks for easier build integration with the spring boot app. A simple ui for managing items on a todo list.

Spring Boot code is in the `backend` directory. Gradle is used for building and running. Provides a REST API for Todo Items and saves to an in-memory database.

This was developed and tested in Mac OSX, and should work fine there. Linux is untested, but should work fine.

Windows 7 was lightly tested. Use just `gradlew` instead of `./gradlew` in windows. Everything should work, at least the first time you issue a gradle command. I had problems with gradle not properly shutting down server tasks when the terminal process was ended. This would cause issues on subsequent tasks until I opened the Task Manager and force closed all the running java processes. So, run it in windows at your own risk, and be prepared to do some process cleanup if you do.

### Gradle tasks (from project root)
* `./gradlew runJar`: builds a deployable jar containing frontend and backend code, available at http://localhost:8080
* `./gradlew dev --parallel`: runs webpack dev server, proxying backend requests to the backend server. webpack dev server will be available at http://localhost:9090
* `./gradlew build`: runs the frontend and backend compile and test tasks
* `./gradlew bootRepackage`: creates a runnable jar containing frontend and backend code (in backend/build/libs)
* `./gradlew e2eSetup --parallel`: run backend jar and webdriver selenium server in parallel
* `./gradlew e2e` : run protractor e2e tests (relies on e2eSetup servers running locally in a different terminal instance)

###Troubleshooting
Sometimes gradle won't run tasks if it thinks nothing has changed since the last time it has run. This is mostly a problem with the frontend tasks. If this happens, frontend tasks can be run using npm directly in the `frontend` directory.
* `npm run clean`: clean the dist directory
* `npm run build`: run webpack
* `npm run test`: run karma/jasmine
* `npm run test:live`: run karma/jasmine and watch for changes
* `npm run dev`: run the webpack dev server so you can see ui changes on reload without needing to restart the backend server.
* `npm run webdriver`: run the selenium webdriver server needed for e2e tests
* `npm run e2e`: run the protractor e2e tests