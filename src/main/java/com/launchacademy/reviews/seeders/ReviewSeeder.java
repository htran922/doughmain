package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.services.ReviewService;
import com.launchacademy.reviews.models.Review;
import org.springframework.beans.factory.annotation.Autowired;

public class ReviewSeeder {
  private ReviewService service;

  @Autowired
  public ReviewSeeder(ReviewService service) {
    this.service = service;
  }

  public void run(){
    service.save(new Review("First Review", "This being my first review, I'll keep it brief.",
        0, "https://francospizza.com/wp-content/uploads/banner__pizza-1.png"));
    service.save(new Review("Second Review", "My best second review of a great pizza.",
        3, "https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=6&m=938742222&s=612x612&w=0&h=on_9ZYG1SG4Xgk7BLZSlaXJl8VYb6ZePDHTN6zukDHM="));
    service.save(new Review("Third Review", "Fantastic Pizza that won't burn the roof of your mouth!",
        5, "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/27/0/KC1812_Spaghetti-Squash-Crust-Pizza_s4x3.jpg.rend.hgtvcom.616.462.suffix/1538057934894.jpeg"));
  }
}
