package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MainSeeder implements CommandLineRunner {
  ReviewService reviewService;

  @Autowired
  public MainSeeder(ReviewService service) {
    this.reviewService = service;
    System.out.println(service);
  }

  public void run(String... args){
    new ReviewSeeder(reviewService).run();

  }

}
