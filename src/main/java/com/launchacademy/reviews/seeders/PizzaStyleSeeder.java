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

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("New York-Style");
      pizzaStyle.setImgUrl("https://cdnimg.webstaurantstore.com/uploads/blog/2016/8/flat.jpg");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Greek");
      pizzaStyle.setImgUrl("https://cdnimg.webstaurantstore.com/uploads/blog/2016/8/onions.jpg");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("California");
      pizzaStyle.setImgUrl("https://cdnimg.webstaurantstore.com/uploads/buying_guide/2014/11/pizzatypes-gourmet.jpg");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Detroit");
      pizzaStyle.setImgUrl("https://cdnimg.webstaurantstore.com/uploads/blog/2019/3/blog-types-pizza_in-blog-7.jpg");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("St. Louis");
      pizzaStyle.setImgUrl("https://cdnimg.webstaurantstore.com/uploads/blog/2019/3/blog-types-pizza_in-blog-8.jpg");
      service.save(pizzaStyle);
    }
  }
}
