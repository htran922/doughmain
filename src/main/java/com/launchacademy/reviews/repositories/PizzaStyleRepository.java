package com.launchacademy.reviews.repositories;

import com.launchacademy.reviews.models.PizzaStyle;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PizzaStyleRepository extends CrudRepository<PizzaStyle, Integer> {

  List<PizzaStyle> findByName(String name);

  List<PizzaStyle> findByNameIgnoreCase(String name);
}
