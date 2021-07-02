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
      pizzaStyle.setDescription("A pizza with a thick crust that has raised edges, similar to a pie, and ingredients in reverse, with slices of mozzarella lining the dough followed by meat, vegetables, and then topped with a can of crushed tomatoes. Generally the toppings for Chicago pizza are ground beef, sausage, pepperoni, onion, mushrooms, and green peppers, placed underneath the tomato sauce.");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Neapolitan");
      pizzaStyle.setImgUrl(
          "https://images.unsplash.com/photo-1579824218206-e70b13561132?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHBpenphfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      pizzaStyle.setDescription("Neapolitan is the original pizza and there are three official variants: Pizza Marinara, Pizza Margherita and Pizza margherita extra. The typical Neapolitan pizza toppings are fresh mozzarella, tomatoes, basil leaves, oregano, and olive oil.");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Sicilian");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1611599538311-360e527c1d22?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxwaXp6YXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      pizzaStyle.setDescription("Sicilian pizza provides a thick cut of pizza with pillowy dough, a crunchy crust, and robust tomato sauce. This square-cut pizza is served with or without cheese, and often with the cheese underneath the sauce to prevent the pie from becoming soggy. Sicilian pizzas are often topped with bits of tomato, onion, anchovies, and herbs.");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("New York-Style");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emF8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      pizzaStyle.setDescription("New York-style pizza is one of America’s most famous regional pizza types with its characteristic large, foldable slices and crispy outer crust. Unlike its thin crust counterpart, the Neapolitan, New York-style pizzas can handle a wide range of additional toppings, from pepperoni and sausage to mushroom and anchovies.");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Greek");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1589840700256-f78d6ed1ae21?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBpenphfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      pizzaStyle.setDescription("Greek-style pizza, especially popular in the New England states, features a thick and chewy crust cooked in shallow, oiled pans, resulting in a nearly deep-fried bottom. It is often only topped with cheese, which is usually a mix of mozzarella and cheddar or provolone and may feature a variety of non-Greek or Greek toppings, such as feta cheese, black olives, and red onion.");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("California");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1576458088443-04a19bb13da6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHBpenphfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=800&q=60");
      pizzaStyle.setDescription("California pizza is known for its unusual ingredients. When it comes to California pizza, there's no such thing as traditional toppings. This lack of specificity allows you to get inventive. You can include anything from chicken and artichokes to goat cheese and egg.");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("Detroit");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGl6emF8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      pizzaStyle.setDescription("Detroit pizza is first topped with pepperoni, followed by brick cheese which is spread to the very edges of the pan, yielding a caramelized cheese perimeter. Sauce is then spooned over the pizza, an order similar to Chicago-style pizza. This pizza features a thick, extra crispy crust that is tender and airy on the inside. Other typical toppings include mushrooms and olives.");
      service.save(pizzaStyle);

      pizzaStyle = new PizzaStyle();
      pizzaStyle.setName("St. Louis");
      pizzaStyle.setImgUrl("https://images.unsplash.com/photo-1571507688058-9e99c451c516?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTcyfHxwaXp6YXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60");
      pizzaStyle.setDescription("St. Louis pizza features a thin crust with a cracker-like consistency that is made without yeast. It features Provel cheese and a sweeter tomato sauce with a hefty dosage of oregano. Because of its firm crust, St. Louis-style pizza can support several toppings of your choice.");
      service.save(pizzaStyle);
    }
  }
}
