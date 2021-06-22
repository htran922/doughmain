package com.launchacademy.reviews.controllers;

import java.util.HashMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/pizza-styles")
public class PizzaStylesApiV1Controller {
  private PizzaStyleService pizzaStyleService;

  @Autowired
  public PizzaStylesApiV1Controller(PizzaStyleService pizzaStyleService) {
    this.pizzaStyleService = pizzaStyleService;
  }

  @GetMapping
  public Map<String, List<PizzaStyle>> getAllPizzaStyles() {
    Map<String, List<PizzaStyle>> pizzaStylesMap = new HashMap<>();
    pizzaStylesMap.put("pizzaStyles", pizzaStyleService.findAll());
    return pizzaStylesMap;
  }
}
