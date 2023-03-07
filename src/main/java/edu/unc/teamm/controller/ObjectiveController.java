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




}


