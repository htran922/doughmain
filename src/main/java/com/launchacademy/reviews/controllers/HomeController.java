package com.launchacademy.reviews.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
  @GetMapping(value = {
    "/pizza-styles", 
    "/pizza-styles/{id}", 
    "/pizza-styles/new", 
    "/reviews/new",
    "/reviews/{id}/edit",
    "/404"
  })
  
  public String forward() {
    return "forward:/";
  }

  @RequestMapping(value = "/**/{path:[^\\\\.]*}")
  public String redirect() {
      return "forward:/404";
  }
}
