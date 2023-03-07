package edu.unc.teamm.repository;


import edu.unc.teamm.model.Objective;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ObjectiveRepository extends MongoRepository<Objective, String> {
    List<Objective> findByTitleContaining(String title);

    List<Objective> findByCategory(String category);
}