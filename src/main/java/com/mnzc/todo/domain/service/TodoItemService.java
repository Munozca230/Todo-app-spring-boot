package com.mnzc.todo.domain.service;

import com.mnzc.todo.domain.repository.TodoItemRepository;
import com.mnzc.todo.persistance.entity.TodoItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;

@Service
public class TodoItemService {

    @Autowired
    private TodoItemRepository todoItemRepository;

    public Iterable<TodoItem> getAll() {
        return todoItemRepository.findAll();
    }

    public Optional<TodoItem> getById(Long id) {
        return todoItemRepository.findById(id);
    }

    public void save(TodoItem todoItem) {
        if (todoItem.getId()==null) {
            TodoItem item = new TodoItem(todoItem.getDescription());
            todoItemRepository.save(item);
        }
    }

    public boolean delete(String id) {
        return getById(Long.valueOf(id)).map(todoItem -> {
            todoItemRepository.deleteById(Long.valueOf(id));
            return true;
        }).orElse(false);
    }

    public boolean update(TodoItem todoItem) {
        if (todoItem.getId()!=null) {
            Optional<TodoItem> item = todoItemRepository.findById(todoItem.getId());
            if (item.isPresent()) {
                TodoItem updatedItem = item.get();
                updatedItem.setDescription(todoItem.getDescription());
                updatedItem.setUpdatedAt(Instant.now());
                todoItemRepository.save(updatedItem);
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    public boolean completeTodo(TodoItem todoItem) {
        if (todoItem.getId()!=null) {
            Optional<TodoItem> item = todoItemRepository.findById(todoItem.getId());
            if (item.isPresent()) {
                TodoItem updatedItem = item.get();
                updatedItem.setIsComplete(!todoItem.getIsComplete());
                todoItemRepository.save(updatedItem);
            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }
}
