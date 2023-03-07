package edu.unc.teamm.controller;
import edu.unc.teamm.model.Objective;
import edu.unc.teamm.repository.ObjectiveRepository;
import edu.unc.teamm.repository.TaskRepository;
import edu.unc.teamm.model.Task;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ObjectiveController {
    private static final Logger logger = LoggerFactory.getLogger(ObjectiveController.class);

    @Autowired
    ObjectiveRepository repository;

    @GetMapping("/objectives")
    public ResponseEntity<List<Objective>> getAllObjectives(@RequestParam(required = false) String title){
        logger.info("Fetch all objectives");
        List<Objective> objs = new ArrayList<>();
        if (title == null)
            repository.findAll().forEach(objs::add);
        else
            repository.findByTitleContaining(title).forEach(objs::add);

        if (objs.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(objs, HttpStatus.OK);

    }

    @GetMapping("/objectives/{id}")
    public ResponseEntity<Objective> getObjectiveById(@PathVariable("id") String id){
        Optional<Objective> objective = repository.findById(id);

        if (objective.isPresent())
            return new ResponseEntity<>(objective.get(), HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/objectives")
    public ResponseEntity<Objective> createObjective(@RequestBody Objective objective){
        try{
            Objective newObj = repository.save(new Objective(objective));
            return new ResponseEntity<>(newObj, HttpStatus.OK);
        }
        catch (Exception e){
            logger.info(e.toString());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/objectives/{id}")
    public ResponseEntity<Objective> updateObjective(@PathVariable("id") String id, @RequestBody Objective objective){
        Optional<Objective> obj = repository.findById(id);

        if (obj.isPresent()){
            Objective original_obj = obj.get();
            original_obj.update(objective);
            return new ResponseEntity<>(repository.save(original_obj), HttpStatus.OK);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


}


