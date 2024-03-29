package edu.unc.teamm.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;

@Document(collection = "tasks")
public class Task {
    @Id //assign unique ID everytime a new Task collection entry is created
    private String id;

    private String title;
    private LocalTime dueDate;
    private LocalTime doDate;
    private String priority;
    private String description;
    private String category;

    public Task(){}

    public Task(String title, LocalTime dueDate, LocalTime doDate, String priority, String description, String category) {
        this.title = title;
        this.dueDate = dueDate;
        this.doDate = doDate;
        this.priority = priority;
        this.description = description;
        this.category = category;
    }

    public Task(Task task) {
        this.title = task.title;
        this.category = task.category;
        this.dueDate = task.dueDate;
        this.doDate = task.doDate;
        this.priority = task.priority;
        this.description = task.description;
    }

    public void update(Task task) {
        this.title = task.title;
        this.category = task.category;
        this.dueDate = task.dueDate;
        this.doDate = task.doDate;
        this.priority = task.priority;
        this.description = task.description;
    }

    public String getId(){
        return id;
    }

    //title
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    //due date
    public LocalTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalTime dueDate) {
        this.dueDate = dueDate;
    }

    //do date
    public LocalTime getDoDate() {
        return doDate;
    }

    public void setDoDate(LocalTime doDate) {
        this.doDate = doDate;
    }

    //priority
    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    // description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // category
    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
