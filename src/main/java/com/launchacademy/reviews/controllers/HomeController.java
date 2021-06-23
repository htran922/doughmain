package com.launchacademy.reviews.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
  @GetMapping(value = {"/pizza-styles", "/pizza-styles/{id}", "/pizza-styles/new"})
  public String forward() {
    return "forward:/";
  }
}
