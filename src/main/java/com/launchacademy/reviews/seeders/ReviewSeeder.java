package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.services.PizzaStyleService;
import com.launchacademy.reviews.services.ReviewService;
import com.launchacademy.reviews.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewSeeder {
  private ReviewService service;
  private PizzaStyleService pizzaService;

  @Autowired
  public ReviewSeeder(ReviewService service, PizzaStyleService pizzaService) {
    this.service = service;
    this.pizzaService = pizzaService;
  }

  public void run(){
    if(service.count() == 0) {
      service.save(new Review("First Review", "This being my first review, I'll keep it brief.",
          0, "https://francospizza.com/wp-content/uploads/banner__pizza-1.png",
          pizzaService.findByName("Chicago").get(0)));
      service.save(new Review("Second Review", "My best second review of a great pizza.",
          3,
          "https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=6&m=938742222&s=612x612&w=0&h=on_9ZYG1SG4Xgk7BLZSlaXJl8VYb6ZePDHTN6zukDHM=",
          pizzaService.findByName("Neapolitan").get(0)));
      service.save(
          new Review("Third Review", "Fantastic Pizza that won't burn the roof of your mouth!",
              5,
              "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/27/0/KC1812_Spaghetti-Squash-Crust-Pizza_s4x3.jpg.rend.hgtvcom.616.462.suffix/1538057934894.jpeg",
              pizzaService.findByName("Sicilian").get(0)));
      service.save(
          new Review("Forth Review", "It doesn't get better than this!",
              4,
              "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/27/0/KC1812_Spaghetti-Squash-Crust-Pizza_s4x3.jpg.rend.hgtvcom.616.462.suffix/1538057934894.jpeg",
              pizzaService.findByName("Sicilian").get(0)));
    }
  }
}
