package com.mnzc.todo.persistance.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;
import java.time.Instant;

@Data
@Entity
@NoArgsConstructor
@Table(name = "todo_items")
public class TodoItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    private Boolean isComplete;

    private Instant createdAt;

    private Instant updatedAt;

    public TodoItem(String description) {
        this.description = description;
        this.isComplete = false;
        this.createdAt = Instant.now();
        this.updatedAt = null;
    }

}
