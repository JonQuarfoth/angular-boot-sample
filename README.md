# angular-boot-sample
Angular 1.6/Spring Boot sample Todo app

A simple todo list app where a user can add a list of things to do and check them off when completed.

Frontend: Angular 1.6

Backend: Spring Boot

The project is configured as a multiproject gradle build. The gradle build file in `frontend` wraps NPM tasks that do the actual work. The Gradle tasks are provided for easy interopability with Spring Boot.

Angular code is in the `frontend` directory. NPM is used to manage dependencies and run tasks. Webpack is used to build and bundle the code. Gradle tasks are also provided for the npm tasks for easier build integration with the spring boot app. A simple ui for managing items on a todo list.

Spring Boot code is in the `backend` directory. Gradle is used for building and running. Provides a REST API for Todo Items and saves to an in-memory database.

This was developed and tested in Mac OSX, and will likely not work in windows due to dependencies being unavailable.

### Gradle tasks (from project root)
* `./gradlew runJar`: creates and runs a runnable jar including all front and backend code
* `./gradlew dev --parallel`: runs the frontend and backend development servers (without --parallel, only one will start)
* `./gradlew build`: runs the frontend and backend compile and test tasks
* `./gradlew bootRepackage`: creates a runnable jar containing frontend and backend code (in backend/build/libs)
* `./gradlew e2eSetup --parallel`: run backend jar and webdriver selenium server in parallel
* `./gradlew e2e` : run protractor e2e tests (relies on e2eSetup servers running locally)
