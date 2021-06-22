package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.repositories.PizzaStyleRepository;
import java.util.List;
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

  public List<PizzaStyle> findAll() {
    return (List<PizzaStyle>)repository.findAll();
  }
}
