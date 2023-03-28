package edu.unc.teamm.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "projects")
public class Project {
    @Id // automatically assigns project a unique ID when created
    private String id;

    private String title;
    private LocalTime dueDate;
    private String category;
    private List<Task> relatedTasks; // each project should have some tasks/steps in the project

    public Project(){}

    public Project(String title, LocalTime dueDate, String category){
        this.title = title;
        this.dueDate = dueDate;
        this.category = category;
        this.relatedTasks = new ArrayList<Task>();
    }

    public Project(Project project){
        this.title = project.title;
        this.dueDate = project.dueDate;
        this.category = project.category;
        this.relatedTasks = project.relatedTasks;
    }

    public void update(Project project){
        this.title = project.title;;
        this.dueDate = project.dueDate;
        this.category = project.category;
        this.relatedTasks = project.relatedTasks;
    }

    public String getId(){return this.id;}


    public String getTitle(){return this.title;}

    public void setTitle(String title){this.title = title;}

    public LocalTime getDueDate(){return this.dueDate;}
    public void setDueDate(LocalTime dueDate){this.dueDate = dueDate;}

    public String getCategory(){return this.category;}
    public void setCategory(String category){ this.category = category;}

    public List<Task> getRelatedTasks(){return this.relatedTasks;}
    public void addRelatedTask(Task task){ this.relatedTasks.add(task);}


}
