package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.services.PizzaStyleService;
import com.launchacademy.reviews.services.ReviewService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pizza-styles")
public class PizzaStylesApiV1Controller {
  private PizzaStyleService pizzaStyleService;
  private ReviewService reviewService;

  @Autowired
  public PizzaStylesApiV1Controller(PizzaStyleService pizzaStyleService, ReviewService reviewService) {
    this.pizzaStyleService = pizzaStyleService;
    this.reviewService = reviewService;
  }

  @GetMapping
  public Map<String, Iterable<PizzaStyle>> getAllPizzaStyles() {
    Map<String, Iterable<PizzaStyle>> pizzaStylesMap = new HashMap<>();
    pizzaStylesMap.put("pizzaStyles", pizzaStyleService.findAll());
    return pizzaStylesMap;
  }

  @GetMapping("/{id}")
  public Map<String, PizzaStyle> getById(@PathVariable Integer id){
    Map<String, PizzaStyle> map = new HashMap<>();
    Optional optional = pizzaStyleService.findById(id);
    if(optional.isPresent()){
      map.put("pizzaStyle", (PizzaStyle) optional.get());
    } else {
      System.out.println("PizzaStyle with type with id " + id + " was not found");
      PizzaStyle ps = new PizzaStyle();
      map.put("pizzaStyle", ps );
    }
    return map;
  }

  @DeleteMapping("/delete/{id}")
  public void deleteById(@PathVariable Integer id){
    System.out.println("deleteById( " + id + " )");
    reviewService.deleteById(id);
    System.out.println("post deleteById( " + id + " )");
  }



}
