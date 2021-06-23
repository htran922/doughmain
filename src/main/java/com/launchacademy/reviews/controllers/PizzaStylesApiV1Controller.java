package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptionHandlers.CustomError;
import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.services.PizzaStyleService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/api/v1/pizza-styles")
public class PizzaStylesApiV1Controller {
  private PizzaStyleService pizzaStyleService;
  private CustomError customError;

  @Autowired
  public PizzaStylesApiV1Controller(PizzaStyleService pizzaStyleService, CustomError customError) {
    this.pizzaStyleService = pizzaStyleService;
    this.customError = customError;
  }

  @GetMapping
  public Map<String, List<PizzaStyle>> getAllPizzaStyles() {
    Map<String, List<PizzaStyle>> pizzaStylesMap = new HashMap<>();
    pizzaStylesMap.put("pizzaStyles", pizzaStyleService.findAll());
    return pizzaStylesMap;
  }

  @PostMapping
  public Object addPizzaStyle(@Valid @RequestBody PizzaStyle pizzaStyle, BindingResult bindingResult) {
    if(bindingResult.hasErrors()) {
      System.out.println("\nBINDINGRESULT: " + bindingResult.getFieldErrors());
      return customError.handleBindingErrors(bindingResult);
    } else {
      Map<String, PizzaStyle> newStyle = new HashMap<>();
//      List<PizzaStyle> checkForType = pizzaStyleService.findByNameIgnoreCase(pizzaStyle.getName());
//      if (checkForType.isEmpty()) {
      pizzaStyleService.save(pizzaStyle);
      newStyle.put("pizzaStyle", pizzaStyle);
      return newStyle;
//      }
    }
  }

//  @PostMapping
//  public ResponseEntity addStyle(@Valid @RequestBody  PizzaStyle pizzaStyle, BindingResult bindingResult) {
//    if (bindingResult.hasErrors()) {
//      Map<String, String> errorList = new HashMap<>();
//      for (FieldError fieldError : bindingResult.getFieldErrors()) {
//        errorList.put(fieldError.getField(), fieldError.getDefaultMessage());
//      }
//      Map<String, Map> errors = new HashMap<>();
//      errors.put("errors", errorList);
//      return new ResponseEntity<Map<String, Map>>(errors, HttpStatus.UNPROCESSABLE_ENTITY);
//    } else {
//      return new ResponseEntity<PizzaStyle>(pizzaStyleService.save(pizzaStyle), HttpStatus.CREATED);
//    }
//  }
}
