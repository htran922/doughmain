package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptionHandlers.CustomError;
import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.PizzaStyleService;
import com.launchacademy.reviews.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewsApiV1Controller {
    private ReviewService reviewService;
    private PizzaStyleService pizzaStyleService;
    private CustomError customError;

    @Autowired
    public ReviewsApiV1Controller(ReviewService reviewService, PizzaStyleService pizzaStyleService, CustomError customError) {
        this.reviewService = reviewService;
        this.pizzaStyleService = pizzaStyleService;
        this.customError = customError;
    }

    @PostMapping
    public Object addPizzaStyle(@RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.getAllErrors().size() > 1) {
            return customError.handleBindingErrors(bindingResult);
        } else {
            Integer id = review.getPizzaStyleId();

            Map<String, Review> newReview = new HashMap<>();
            reviewService.save(review, id);
            newReview.put("review", review);
            return newReview;
        }
    }
}
