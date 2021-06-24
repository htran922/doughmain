package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.services.ReviewService;
import com.launchacademy.reviews.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewSeeder {
  private ReviewService service;

  @Autowired
  public ReviewSeeder(ReviewService service) {
    this.service = service;
  }

  public void run(){
    if(service.count() == 0) {
      service.save(new Review("Deepest Nightmare", "Chicago pizza is just too much. Like an inferior lasagna.",
          0, "https://francospizza.com/wp-content/uploads/banner__pizza-1.png"
          ), 1);
      service.save(new Review("My Cheesy Dream!", "I can never have enough cheese on my pizza and deep dish alwaaaaays hits the spot.",
          5, "https://images.unsplash.com/photo-1582476927499-65372fb1a458?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          ), 1);
      service.save(new Review("Neat-O-Politan", "The freshest pizza ever! The Margherita version is a must-try!",
          5,
          "https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=6&m=938742222&s=612x612&w=0&h=on_9ZYG1SG4Xgk7BLZSlaXJl8VYb6ZePDHTN6zukDHM="), 2);
      service.save(
          new Review("Meh", "It's an ok pizza, depending on where you order it from.",
              3,
              "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/27/0/KC1812_Spaghetti-Squash-Crust-Pizza_s4x3.jpg.rend.hgtvcom.616.462.suffix/1538057934894.jpeg"), 3);
      service.save(
          new Review("The best 'real' pizza you may ever have", "I love some good Neapolitan pizza, especially if it has some garlic in it.",
              4,
              "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/27/0/KC1812_Spaghetti-Squash-Crust-Pizza_s4x3.jpg.rend.hgtvcom.616.462.suffix/1538057934894.jpeg"), 2);
    }
  }
}
