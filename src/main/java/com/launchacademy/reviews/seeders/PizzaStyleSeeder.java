package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.models.PizzaStyle;
import com.launchacademy.reviews.services.PizzaStyleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PizzaStyleSeeder {
  private PizzaStyleService service;

  @Autowired
  public PizzaStyleSeeder(PizzaStyleService service) {
    this.service = service;
  }

  public void run(){
    if(service.count() == 0) {
      PizzaStyle pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Chicago");
      pizzaStyle.setImgUrl(
          "https://cdnimg.webstaurantstore.com/uploads/buying_guide/2014/11/pizzatypes-deepdish.jpg");
      service.save(pizzaStyle);
      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Neapolitan");
      pizzaStyle.setImgUrl(
          "https://cdnimg.webstaurantstore.com/uploads/buying_guide/2014/11/pizzatypes-margherita-.jpg");
      service.save(pizzaStyle);
      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Sicilian");
      pizzaStyle.setImgUrl("https://cdnimg.webstaurantstore.com/uploads/blog/2016/8/rectangle.jpg");
      service.save(pizzaStyle);
    }
  }
}
