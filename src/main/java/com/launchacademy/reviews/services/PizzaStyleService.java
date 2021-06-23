package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.repositories.PizzaStyleRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PizzaStyleService {
  private PizzaStyleRepository repository;

  @Autowired
  public PizzaStyleService(PizzaStyleRepository repository) {
    this.repository = repository;
  }


  public PizzaStyle save(PizzaStyle pizzaStyle) {
    return repository.save(pizzaStyle);
  }

  public List<PizzaStyle> findByName(String name) {
    return repository.findByName(name);
  }

  public Iterable<PizzaStyle> findAll() {
    return repository.findAll();
  }

  public Long count() {
    return repository.count();
  }

  public Optional<PizzaStyle> findById(Integer id) {
    return repository.findById(id);
  }

  public List<PizzaStyle> findByNameIgnoreCase(String name) {
    return repository.findByNameIgnoreCase(name);
  }
}
