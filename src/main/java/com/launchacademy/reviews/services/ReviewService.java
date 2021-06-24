package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.ReviewRepository;
import java.util.Optional;
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

  public Review save(Review review, Integer pizzaStyleId) {
    PizzaStyle style = pizzaStyleService.findById(pizzaStyleId).get();
    review.setPizzaStyle(style);
    review.setCreatedAt(LocalDateTime.now());
    review.setUpdatedAt(LocalDateTime.now());
    return repository.save(review);
  }

  public Long count() {
    return repository.count();
  }

  public void deleteById(Integer id) {
    repository.deleteById(id);
  }

  public Optional findById(Integer id) {
    return repository.findById(id);
  }
}
