package com.mnzc.todo.web.controller;

import com.mnzc.todo.domain.service.TodoItemService;
import com.mnzc.todo.persistance.entity.TodoItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class TodoFormController {

    @Autowired
    private TodoItemService todoItemService;

    @PostMapping("/create-todo")
    public ResponseEntity<Void> createTodo(@RequestBody TodoItem todoItem) {
        todoItemService.save(todoItem);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete-todo/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("id") String id) {
        return new ResponseEntity<>(todoItemService.delete(id)
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND);
    }

    @PutMapping("/edit-todo/{id}")
    public ResponseEntity<Void> editTodo(@RequestBody TodoItem todoItem) {
        return new ResponseEntity<Void>(todoItemService.update(todoItem)
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND);
    }

    @PutMapping("/complete-todo/{id}")
    public ResponseEntity<Void> completeTodo(@RequestBody TodoItem todoItem) {
        return new ResponseEntity<Void>(todoItemService.completeTodo(todoItem)
                ? HttpStatus.OK
                : HttpStatus.NOT_FOUND);
    }




}
