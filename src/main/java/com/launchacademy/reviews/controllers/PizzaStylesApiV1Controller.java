package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.services.PizzaStyleService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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

  @PostMapping
  public Map<String, PizzaStyle> addPizzaStyle(@RequestBody @Valid PizzaStyle pizzaStyle) {
    Map<String, PizzaStyle> newStyle = new HashMap<>();
    List<PizzaStyle> checkForType = pizzaStyleService.findByNameIgnoreCase(pizzaStyle.getName());
    if(checkForType.isEmpty()) {
      pizzaStyleService.save(pizzaStyle);
      newStyle.put("pizzaStyle", pizzaStyle);
    } else {
      newStyle.put("pizzaStyle", checkForType.get(0));
    }
    return newStyle;
  }
}
