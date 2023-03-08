package edu.unc.teamm.controller;
import edu.unc.teamm.repository.TaskRepository;
import edu.unc.teamm.repository.ProjectRepository;
import edu.unc.teamm.model.Task;
import edu.unc.teamm.model.Project;
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
public class ProjectController {
    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);
    @Autowired
    ProjectRepository repository;


    @GetMapping("/projects/category/{category}")
    public ResponseEntity<List<Project>> getProjectByCategory(@PathVariable("category") String category) {
        List<Project> tasks = new ArrayList<>();
        if (category != null)
            tasks = repository.findByCategory(category);

        if (tasks.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProjects(@RequestParam(required = false) String title) {
        logger.info("Came to getAllProjects");
        List<Project> projects = new ArrayList<>();
        if (title == null)
            repository.findAll().forEach(projects::add);
        else
            repository.findByTitleContaining(title).forEach(projects::add);

        if (projects.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/projects/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable("id") String id) {
        Optional<Project> projectData = repository.findById(id);

        if (projectData.isPresent())
            return new ResponseEntity<>(projectData.get(), HttpStatus.OK);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/projects")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        try {
            Project newProject = repository.save(new Project(project));
            return new ResponseEntity<>(newProject, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable("id") String id, @RequestBody Project project) {
        Optional<Project> projectData = repository.findById(id);

        if (projectData.isPresent()) {
            Project projectToUpdate = projectData.get();
            projectToUpdate.update(project);
            return new ResponseEntity<>(repository.save(projectToUpdate), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<HttpStatus> deleteProject(@PathVariable("id") String id) {
        try {
            repository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/projects")
    public ResponseEntity<HttpStatus> deleteAllProjects() {
        try {
            repository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
