package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {
  private ReviewRepository repository;
  private PizzaStyleService pizzaStyleService;

  public ReviewService(ReviewRepository repository, PizzaStyleService pizzaStyleService) {
    this.repository = repository;
    this.pizzaStyleService = pizzaStyleService;
  }

  public Review save(Review review, Integer id) {
    PizzaStyle style = pizzaStyleService.findById(id).get();
    review.setPizzaStyle(style);
    review.setCreatedAt(LocalDateTime.now());
    review.setUpdatedAt(LocalDateTime.now());
    return repository.save(review);
  }

  public Long count() {
    return repository.count();
  }
}
