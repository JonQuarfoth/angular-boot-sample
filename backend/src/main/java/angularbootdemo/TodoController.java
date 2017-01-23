package angularbootdemo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class TodoController {

    private TodoRepository todoRepository;

    @Autowired
    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/todos")
    public Iterable<Todo> list() {
        return todoRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/todos")
    public ResponseEntity create(@RequestBody Todo todo) {

        if (todo.getId() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.ok(todoRepository.save(todo));
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/todos/{id}")
    public ResponseEntity update(@RequestBody Todo todo, @PathVariable Long id) {
        if (todo != null && todo.getId() != null && !todo.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        if (!todoRepository.exists(id)) {
            return ResponseEntity.notFound().build();
        }
        todo.setId(id);
        return ResponseEntity.ok(todoRepository.save(todo));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/todos/{id}")
    public ResponseEntity get(@PathVariable Long id) {
        Todo todo = todoRepository.findOne(id);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(todo);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/todos/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Todo todo = todoRepository.findOne(id);
        if (todo == null) {
            return ResponseEntity.notFound().build();
        } else {
            todoRepository.delete(id);
            return ResponseEntity.ok().build();
        }
    }
}
