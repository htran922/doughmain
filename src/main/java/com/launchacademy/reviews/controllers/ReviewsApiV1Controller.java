package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/reviews")
@RestController
public class ReviewsApiV1Controller {

  private ReviewService reviewService;

  @Autowired
  public ReviewsApiV1Controller(ReviewService reviewService) {
    this.reviewService = reviewService;
  }

  @DeleteMapping("/{id}")
  public void deleteById(@PathVariable Integer id) {
    reviewService.deleteById(id);
  }
}
