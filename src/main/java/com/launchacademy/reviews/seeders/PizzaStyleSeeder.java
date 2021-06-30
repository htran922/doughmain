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
          "https://images.unsplash.com/photo-1569698170031-21b776b6468e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTE2fHxwYW4lMjBwaXp6YXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Neapolitan");
      pizzaStyle.setImgUrl(
          "https://images.unsplash.com/photo-1579824218206-e70b13561132?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHBpenphfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Sicilian");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1611599538311-360e527c1d22?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxwaXp6YXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("New York-Style");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Greek");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1589840700256-f78d6ed1ae21?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBpenphfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("California");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1576458088443-04a19bb13da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBpenphfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Detroit");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1546333083-608223219279?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODZ8fHBhbiUyMHBpenphfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("St. Louis");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1571507688058-9e99c451c516?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxwaXp6YXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      service.save(pizzaStyle);
    }
  }
}
