package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptionHandlers.CustomError;
import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.services.PizzaStyleService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/pizza-styles")
public class PizzaStylesApiV1Controller {

  private PizzaStyleService pizzaStyleService;
  private CustomError customError;

  @Autowired
  public PizzaStylesApiV1Controller(PizzaStyleService pizzaStyleService,
      CustomError customError) {
    this.pizzaStyleService = pizzaStyleService;
    this.customError = customError;
  }

  @GetMapping
  public Map<String, Iterable<PizzaStyle>> getAllPizzaStyles() {
    Map<String, Iterable<PizzaStyle>> pizzaStylesMap = new HashMap<>();
    pizzaStylesMap.put("pizzaStyles", pizzaStyleService.findAll());
    return pizzaStylesMap;
  }

  @PostMapping
  public Object addPizzaStyle(@RequestBody @Valid PizzaStyle pizzaStyle,
      BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return customError.handleBindingErrors(bindingResult);
    } else {
      Map<String, PizzaStyle> newStyle = new HashMap<>();
      List<PizzaStyle> checkForType = pizzaStyleService.findByNameIgnoreCase(pizzaStyle.getName());
      if (checkForType.isEmpty()) {
        pizzaStyleService.save(pizzaStyle);
        newStyle.put("pizzaStyle", pizzaStyle);
        return newStyle;
      } else {
        return customError.alreadyExists();
      }
    }
  }

  @GetMapping("/{id}")
  public Object getById(@PathVariable Integer id){
    Map<String, PizzaStyle> map = new HashMap<>();

    if(pizzaStyleService.findById(id).isPresent()){
      PizzaStyle pizzaStyle = pizzaStyleService.findById(id).get();
      map.put("pizzaStyle", pizzaStyle);
      return map;
    } else {
      return customError.doesntExists();
    }
  }
}
