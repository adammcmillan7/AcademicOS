package edu.unc.teamm.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Document(collection = "goals")
public class Goal {
    @Id
    private String id;

    private String title;
    private String status;
    private String area;
    private List<Objective> objectives = new ArrayList<>();


    public Goal(String title){
        this.title = title;
        this.objectives = new ArrayList<>();
        this.status = null;
        this.area = null;
    }

    public Goal(String title, String status, String area){
        this.title = title;
        this.status = status;
        this.area = area;
        this.objectives = new ArrayList<>();
    }

    public Goal(Goal goal){
        id = goal.id;
        title = goal.title;
        status = goal.status;
        area = goal.area;
        objectives = goal.objectives;
    }

    public Goal(){}


    public void addObjective(Objective objective){
        objectives.add(objective);
    }

    public void removeObjective(Objective objective){
        // must compare via ID - else argument obj has diff pointer ? than obj in list, even with same ID
        String objID = objective.getId();
        for (int i=0; i< objectives.size(); i++){
            Objective objective1 = objectives.get(i);
            if (objID.equalsIgnoreCase(objective1.getId())){
                objectives.remove(i);
                return;
            }
        }

        throw new NoSuchElementException();
    }

    public String getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public List<Objective> getObjectives() {
        return objectives;
    }
}
