package com.launchacademy.reviews.services;

import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.repositories.ReviewRepository;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {
  ReviewRepository repository;

  public ReviewService(ReviewRepository repository) {
    this.repository = repository;
  }

  public Review save(Review review) {
    return repository.save(review);
  }

  public Long count() {
    return repository.count();
  }


  public void deleteById(Integer id) {
    repository.deleteById(id);
  }
}
