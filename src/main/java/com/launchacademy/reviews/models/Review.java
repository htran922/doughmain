package com.launchacademy.reviews.models;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="reviews")
public class Review {
  @Id
  @SequenceGenerator(name="reviews_generator", sequenceName="reviews_id_seq", allocationSize = 1)
  @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="reviews_generator")
  @Column(nullable=false, unique=true)
  private Integer id;

  @NotBlank
  @Column(nullable = false)
  private String title;

  @NotBlank
  @Column(nullable = false)
  private String description;

  @Min(0)
  @Max(5)
  @Column(nullable = false)
  private Integer rating;

  @NotBlank
  @Column(nullable = false)
  private String imgUrl;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  public Review(String title, String description, Integer rating, String imgUrl) {
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.imgUrl = imgUrl;
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }
}
