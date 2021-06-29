package com.launchacademy.reviews.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.launchacademy.reviews.exceptionHandlers.CustomError;
import com.launchacademy.reviews.models.Review;
import com.launchacademy.reviews.services.ReviewService;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/v1/reviews")
public class ReviewsApiV1Controller {

  private ReviewService reviewService;
  private CustomError customError;

  @Autowired
  public ReviewsApiV1Controller(ReviewService reviewService, CustomError customError) {
    this.reviewService = reviewService;
    this.customError = customError;
  }

  @GetMapping("/{id}")
  public Map<String, Review> getById(@PathVariable Integer id) {
    Map<String, Review> map = new HashMap<>();
    Optional optional = reviewService.findById(id);
    if (optional.isPresent()) {
      map.put("review", (Review) optional.get());
    } else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return map;
  }

  @PostMapping
  public Object addReview(@RequestBody @Valid Review review, BindingResult bindingResult) {
    if (bindingResult.getAllErrors().size() > 1) {
      return customError.handleBindingErrors(bindingResult);
    } else {
      Integer id = review.getPizzaStyleId();
      Map<String, Review> newReview = new HashMap<>();
      review.setCreatedAt(LocalDateTime.now());
      reviewService.save(review, id);
      newReview.put("review", review);
      return newReview;
    }
  }

  @PostMapping("/file")
  public Object addReviewWithImage(@RequestPart("file") List<MultipartFile> files,
      @RequestPart("formPayLoad") String formPayLoad) {
    String imageUrl = null;
    if (files.size() > 0) {
      MultipartFile mpf = files.get(0);
      String originalFileName = mpf.getOriginalFilename();
      String ext = "." + originalFileName.split("\\.")[1];
      String imagePath = System.getProperty("user.dir") + "/src/main/frontend/public/images/";
      String fileName = UUID.randomUUID().toString();
      imageUrl = "/public/images/" + fileName + ext;
      File file = new File(imagePath + fileName + ext);
      try (OutputStream os = Files.newOutputStream(file.toPath())) {
        os.write(mpf.getBytes());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    ObjectMapper mapper = new ObjectMapper();
    Review review = null;
    try {
      review = mapper.readValue(formPayLoad, Review.class);
      review.setImgUrl(imageUrl);
      review.setCreatedAt(LocalDateTime.now());
    } catch (Exception e) {
      e.printStackTrace();
    }

    reviewService.save(review, review.getPizzaStyleId());
    Map<String, Review> map = new HashMap<>();
    map.put("review", review);
    return map;
  }

  @PutMapping("/{id}")
  public Object updateReview(@PathVariable Integer id, @RequestBody @Valid Review review,
      BindingResult bindingResult) {
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
      review.setCreatedAt(foundReview.getCreatedAt());
      Map<String, Review> updatedReview = new HashMap<>();
      reviewService.save(review, review.getPizzaStyleId());
      updatedReview.put("review", review);
      return updatedReview;
    }
  }

  @PutMapping("/{id}/file")
  public Object updateReviewWithImage(@PathVariable Integer id, @RequestPart("file") List<MultipartFile> files,
      @RequestPart("formPayLoad") String formPayLoad) {
    String imageUrl = null;
    if (files.size() > 0) {
      MultipartFile mpf = files.get(0);
      String originalFileName = mpf.getOriginalFilename();
      String ext = "." + originalFileName.split("\\.")[1];
      String imagePath = System.getProperty("user.dir") + "/src/main/frontend/public/images/";
      String fileName = UUID.randomUUID().toString();
      imageUrl = "/public/images/" + fileName + ext;
      File file = new File(imagePath + fileName + ext);
      try (OutputStream os = Files.newOutputStream(file.toPath())) {
        os.write(mpf.getBytes());
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    ObjectMapper mapper = new ObjectMapper();
    Review review = null;
    Review foundReview = null;

    if (reviewService.findById(id).isPresent()) {
      foundReview = (Review) reviewService.findById(id).get();
    } else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    try {
      review = mapper.readValue(formPayLoad, Review.class);
      review.setImgUrl(imageUrl);
      review.setId(foundReview.getId());
      review.setCreatedAt(foundReview.getCreatedAt());
    } catch (Exception e) {
      e.printStackTrace();
    }

    Map<String, Review> updatedReview = new HashMap<>();
    reviewService.save(review, review.getPizzaStyleId());
    updatedReview.put("review", review);
    return updatedReview;
  }

  @DeleteMapping("/{id}")
  public void deleteById(@PathVariable Integer id) {
    reviewService.deleteById(id);
  }
}
