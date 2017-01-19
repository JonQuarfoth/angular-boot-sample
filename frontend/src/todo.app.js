import angular from "angular"
import styles from "./todo.css"
import todoList from "./todo-list.component"
import todoItem from "./todo-item.component"
import todoService from "./todo.service"

export default angular
  .module('todoApp', [
    todoList,
    todoItem,
    todoService
  ])
  .name;
