package edu.unc.teamm.repository;


import edu.unc.teamm.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {
    List<Task> findByTitleContaining(String title);

    List<Task> findByCategory(String category);
}
