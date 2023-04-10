package edu.unc.teamm.repository;

import edu.unc.teamm.model.Goal;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface GoalRepository extends MongoRepository<Goal, String>{
    List<Goal> findByTitleContaining(String title);


}
