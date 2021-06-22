package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.services.PizzaStyleService;
import com.launchacademy.reviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MainSeeder implements CommandLineRunner {
  private PizzaStyleSeeder styleSeeder;
  private ReviewSeeder reviewSeeder;


  @Autowired
  public MainSeeder(PizzaStyleSeeder styleSeeder, ReviewSeeder reviewSeeder) {
      this.styleSeeder = styleSeeder;
      this.reviewSeeder = reviewSeeder;
  }

  public void run(String... args){
    styleSeeder.run();
    reviewSeeder.run();
  }

}
