package edu.unc.teamm.repository;


import edu.unc.teamm.model.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByTitleContaining(String title);

    List<Project> findByCategory(String category);
}