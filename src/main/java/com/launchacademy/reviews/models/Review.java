package com.launchacademy.reviews.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.File;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

  @Column(nullable = false)
  private String comment;

  @Min(1)
  @Max(5)
  @Column(nullable = false)
  private Integer rating;

  @Column(name = "img_url")
  private String imgUrl;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @Column(name = "pizza_style_id", insertable = false , updatable = false)
  private Integer pizzaStyleId;

  @ManyToOne
  @NotNull
  @JoinColumn(name="pizza_style_id")
  @JsonIgnoreProperties("reviews")
  private PizzaStyle pizzaStyle;

  @Column(name = "upvote_count")
  private Integer upvoteCount = 0;

  public Review(String title, String description, Integer rating, String imgUrl, Integer upvoteCount) {
    this.title = title;
    this.comment = description;
    this.rating = rating;
    this.imgUrl = imgUrl;
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
    this.upvoteCount = upvoteCount ;
  }
}
