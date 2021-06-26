package com.launchacademy.reviews.controllers;

import com.launchacademy.reviews.exceptionHandlers.CustomError;
import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.PizzaStyleService;
import com.launchacademy.reviews.services.ReviewService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

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

    @GetMapping("/{id}")
    public Map<String, Review> getById(@PathVariable Integer id) {
        Map<String, Review> map = new HashMap<>();
        Optional optional = reviewService.findById(id);
        if (optional.isPresent()) {
            map.put("review", (Review) optional.get());
        } else {
            System.out.println("Review with type with id " + id + " was not found");
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return map;
    }

    @PutMapping("/{id}")
    public Object updateReview(@PathVariable Integer id, @RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.getAllErrors().size() > 1) {
            return customError.handleBindingErrors(bindingResult);
        } else {
            Review foundReview = null;
            if (reviewService.findById(id).isPresent()) {
                foundReview = (Review) reviewService.findById(id).get();
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }

            review.setId(foundReview.getId());
            Map<String, Review> updatedReview = new HashMap<>();
            reviewService.save(review, review.getPizzaStyleId());
            updatedReview.put("review", review);
            return updatedReview;
        }
    }

    @PostMapping
    public Object addReview(@RequestBody @Valid Review review, BindingResult bindingResult) {
        if (bindingResult.getAllErrors().size() > 1) {
            return customError.handleBindingErrors(bindingResult);
        } else {
            System.out.println(review.getImgFile());
            Integer id = review.getPizzaStyleId();
            Map<String, Review> newReview = new HashMap<>();
            reviewService.save(review, id);
            newReview.put("review", review);
            return newReview;
        }
    }

    @PostMapping(value = "/file", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity uploadFileAndFormData(@RequestPart("file") List<MultipartFile> file,
        @RequestPart("formPayLoad") String formPayLoad ){
        System.out.println(file.get(0).getOriginalFilename());
        System.out.println(formPayLoad);
        1. USE JACKSON to convert JSON string to an object - Checkout Articles/Assignments
        2. Create a Review, get it's ID and make it the file name.jpg or whatever it is,
        3. Set the imgUrl to point at "/images/id.extension"
         Eg. review.id = 2 and photo is named pizza.jpg,
         the photo would be saved as frontend/assets/images/2.jpeg Unique as ID or better!

        return ResponseEntity.ok().build();
    }



    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
      reviewService.deleteById(id);
    }
}
