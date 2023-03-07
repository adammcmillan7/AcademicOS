package edu.unc.teamm.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "objectives")
public class Objective {
    @Id
    private String id;

    private String title;
    private Boolean status; //true -> active; false -> inactive
    private String timeframe_lower;
    private String timeframe_upper;
    private String parent_goal; //objectives are children of value goals

    //questionable
    private String measure;
    private int target;
    private int achieved;
    private int tenure_weight;
    private float progress; //calc from achieved/target

    public Objective(String title, Boolean status, String timeframe_lower, String timeframe_upper, String parent_goal){
        this.title = title;
        this.status = status;
        this.timeframe_lower = timeframe_lower;
        this.timeframe_upper = timeframe_upper;
        this.parent_goal = parent_goal;
    }

    public Objective(String title){
        this.title = title;
        this.status = false;
        this.timeframe_upper = null;
        this.timeframe_lower = null;
        this.parent_goal = null;
    }

    public Objective(Objective objective){
        title = objective.title;
        status = objective.status;
        timeframe_upper = objective.timeframe_upper;
        timeframe_lower = objective.timeframe_lower;
        parent_goal = objective.parent_goal;
    }

    public void update(Objective objective){
        title = objective.title;
        status = objective.status;
        timeframe_upper = objective.timeframe_upper;
        timeframe_lower = objective.timeframe_lower;
        parent_goal = objective.parent_goal;
    }

    public String getId(){
        return id; }

    public String getTitle(){
        return title;
    }

    public void setTitle(String title){
        this.title= title;
    }

    public void setTimeFrame(String timeframe_upper, String timeframe_lower){
        this.timeframe_upper = timeframe_upper;
        this.timeframe_lower = timeframe_lower;
    }

    public String getTimeFrame(){
        return timeframe_lower + "-" + timeframe_upper;
    }


}
