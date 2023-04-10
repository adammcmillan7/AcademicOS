package edu.unc.teamm.controller;


import edu.unc.teamm.model.Goal;
import edu.unc.teamm.model.Objective;
import edu.unc.teamm.repository.GoalRepository;
import edu.unc.teamm.repository.ObjectiveRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class GoalController {
    public static final Logger logger = LoggerFactory.getLogger(GoalController.class);

    @Autowired
    GoalRepository repository;
    @Autowired
    ObjectiveRepository objectiveRepository;

    // get all goals
    @GetMapping("/goals")
    public ResponseEntity<List<Goal>> getAllGoals(@RequestParam(required = false) String title) {
        logger.info("Fetch all goals");
        List<Goal> goals = new ArrayList<>();
        if (title == null)
            goals.addAll(repository.findAll());
        else
            goals.addAll(repository.findByTitleContaining(title));

        if (goals.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(goals, HttpStatus.OK);
    }

    // get a single goal by ID
    // also returns list of child objectives
    @GetMapping("/goals/{id}")
    public ResponseEntity<Goal> getGoalById(@PathVariable("id") String id) {
        Optional<Goal> goal = repository.findById(id);

        if (goal.isPresent())
            return new ResponseEntity<>(goal.get(), HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // create a new goal
    @PostMapping("/goals")
    public ResponseEntity<Goal> createGoal(@RequestBody Goal goal) {
        try {
            Goal newGoal = repository.save(new Goal(goal));
            logger.info("created new goal");
            return new ResponseEntity<>(newGoal, HttpStatus.CREATED);
        }
        //todo vague catch
        catch (Exception e) {
            logger.info(e.toString());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // create a new child obj
    @PostMapping("/goals/{gid}/create")
    public ResponseEntity<Goal> createChildObjective(@PathVariable("gid") String goal_id, @RequestBody Objective objective){

        try{
            Objective newObj = objectiveRepository.save(new Objective(objective));
            ResponseEntity<Goal> goalResponseEntity = getGoalById(goal_id);
            Goal parentGoal = goalResponseEntity.getBody();
            parentGoal.addObjective(newObj);
            return new ResponseEntity<>(repository.save(parentGoal), HttpStatus.CREATED);
        }
        catch (Exception e){
            logger.info(e.toString());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // deletes all goals - meant for testing
    @DeleteMapping("/goals")
    public ResponseEntity<HttpStatus> deleteAllGoals() {
        repository.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // assign an objective using /goal/{gid}/add/?oid={objective_id}
    @PutMapping("/goals/{gid}/add")
    public ResponseEntity<Goal> assignObjective(@PathVariable("gid") String goal_id,@RequestParam("oid") String obj_id){
        Optional<Goal> goal = repository.findById(goal_id);
        Optional<Objective> obj = objectiveRepository.findById(obj_id);

        if ((goal.isPresent()) & (obj.isPresent())){
            Goal updated_goal = goal.get();
            Objective objective = obj.get();

            updated_goal.addObjective(objective);
            return new ResponseEntity<>(repository.save(updated_goal), HttpStatus.OK);
        }
        //todo if one is not found
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // unassign an objective using /goal/{gid}/remove/?oid={objective_id}
    @PutMapping("/goals/{gid}/remove")
    public ResponseEntity<Goal> removeObjective(@PathVariable("gid") String goal_id, @RequestParam("oid") String obj_id){
        Optional<Goal> goal = repository.findById(goal_id);
        Optional<Objective> obj = objectiveRepository.findById(obj_id);

        if ((goal.isPresent()) & (obj.isPresent())){
            Goal updated_goal = goal.get();
            Objective objective = obj.get();
            System.out.println(objective.getId());
            try {
                updated_goal.removeObjective(objective);
                System.out.println("removed obj");
                return new ResponseEntity<>(repository.save(updated_goal), HttpStatus.OK);
            } catch (NoSuchElementException e){
                //this objective was not assigned to this goal
                System.out.println("catch");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
        //todo if one is not found
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
