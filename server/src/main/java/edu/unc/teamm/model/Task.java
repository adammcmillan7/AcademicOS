package edu.unc.teamm.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
public class Task {
    @Id //assign unique ID everytime a new Task collection entry is created
    private String id;

    private String title;
    private String dueDate;
    private String category;

    public Task(){}

    public Task(String title, String dueDate, String category) {
        this.title = title;
        this.dueDate = dueDate;
        this.category = category;
    }

    public Task(Task task) {
        this.title = task.title;
        this.category = task.category;
        this.dueDate = task.dueDate;
    }

    public void update(Task task) {
        this.title = task.title;
        this.category = task.category;
        this.dueDate = task.dueDate;
    }

    public String getId(){
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDueDate() {
        return dueDate;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
