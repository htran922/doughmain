package com.launchacademy.reviews.repositories;

import com.launchacademy.reviews.models.Review;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends PagingAndSortingRepository<Review, Integer> {

  List<Review> findByPizzaStyleId(Integer id, Sort sort);
}
