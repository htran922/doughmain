package com.launchacademy.reviews.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="pizza_styles")
public class PizzaStyle {
  @Id
  @SequenceGenerator(name="pizza_styles_generator", sequenceName="pizza_styles_id_seq", allocationSize = 1)
  @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="pizza_styles_generator")
  @Column(nullable=false, unique=true)
  private Integer id;

  @NotBlank
  @Size(min = 3, message = "must be at least 3 characters")
  private String name;

  @Column(name="img_url")
  private String imgUrl;

  @OneToMany(mappedBy = "pizzaStyle")
  @JsonIgnoreProperties("pizzaStyle")
  private List<Review> reviews = new ArrayList<>();

}
