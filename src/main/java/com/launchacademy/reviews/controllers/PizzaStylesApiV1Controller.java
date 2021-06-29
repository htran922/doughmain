package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptionHandlers.CustomError;
import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.PizzaStyleService;
import com.launchacademy.reviews.services.ReviewService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/pizza-styles")
public class PizzaStylesApiV1Controller {

  private PizzaStyleService pizzaStyleService;
  private ReviewService reviewService;
  private CustomError customError;

  @Autowired
  public PizzaStylesApiV1Controller(PizzaStyleService pizzaStyleService,ReviewService reviewService, CustomError customError) {
    this.pizzaStyleService = pizzaStyleService;
    this.reviewService = reviewService;
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
    Optional pizzaStyleOptional = pizzaStyleService.findById(id);
    if(pizzaStyleOptional.isPresent()){
      PizzaStyle pizzaStyle = (PizzaStyle) pizzaStyleOptional.get();
      map.put("pizzaStyle", pizzaStyle);
      return map;
    } else {
      return customError.doesntExists();
    }
  }

  @GetMapping("/{id}/{sortField}/{sortOrder}")
  public Object getByIdAndSortReviews(@PathVariable Integer id, @PathVariable String sortField, @PathVariable String sortOrder){
    Map<String, PizzaStyle> map = new HashMap<>();
    Optional pizzaStyleOptional = pizzaStyleService.findById(id);
    if(pizzaStyleOptional.isPresent()){
      PizzaStyle pizzaStyle = (PizzaStyle) pizzaStyleOptional.get();
      if (sortOrder.equals("descending")) {
        pizzaStyle.setReviews(reviewService.findByPizzaStyleId(id, Sort.by(sortField).descending()));
      } else if (sortOrder.equals("ascending")) {
        pizzaStyle.setReviews(reviewService.findByPizzaStyleId(id, Sort.by(sortField).ascending()));
      }
      map.put("pizzaStyle", pizzaStyle);
      return map;
    } else {
      return customError.doesntExists();
    }
  }
}
