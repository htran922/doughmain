package com.launchacademy.reviews.seeders;

import com.launchacademy.reviews.services.ReviewService;
import com.launchacademy.reviews.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReviewSeeder {
  private ReviewService service;

  @Autowired
  public ReviewSeeder(ReviewService service) {
    this.service = service;
  }

  public void run(){
    if(service.count() == 0) {
      service.save(new Review("Bomb", "I am very tough on pizza but this one gets the 5 star from me\nI am impressed.\nThis pizza is goooood.\nDough? Bomb.\nSauce? Delish.\nMozz? Winner.\nMargherita pizza all day.\nThat's all I'm eating for now on.\nSeriously, I am impressed with the dough and the sauce. Such a win this pizza.", 5, "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 7), 2);
      service.save(new Review("Love this pizza!!", "Authentic Italian style! Cook in the wood oven perfectly!!\nI love the crust, light and soft,  and the tomato sauce is very tasty!\nThis pizza deserves 5 stars because it is great!!\n\nHighly recommend it!", 5, "https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 5), 3);
      service.save(new Review("Best Pizza", "This pizza is always huge -- like 8 slices. But somehow you can't get enough of it. The first bite, in the center, is cheesy and flavorful and aromatic. The crust is so thin it can barely support its toppings and caves into itself beautifully. As you work your way into the outer edge, it gets wonderfully crunchy and tender with these delightful pockets of air. The tomato sauce is savory and fresh and never overwhelms. Before you know it, you've inhaled four slices -- and I can usually barely finish 2 from a normal pizza.", 5, "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 6), 4);
      service.save(new Review("Deepest Nightmare", "Chicago pizza is just too much. Like an inferior lasagna.",
          1, "https://cdnimg.webstaurantstore.com/uploads/buying_guide/2014/11/pizzatypes-deepdish.jpg", 1), 1);
      service.save(new Review("Incredible", "Best pizza style. This pizza is incredible. The balance of toppings always seems so intentional. The crust has a good crunch and its always perfectly cheesy!", 4, "https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 2), 8);
      service.save(new Review("New Fan", "I did not know that \"Greek\" was a type of pizza, but now that I do, I am in love. Great thin crust pizza, with lots of pepperonis atop.", 4, "https://images.unsplash.com/photo-1564128442383-9201fcc740eb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 4), 5);
      service.save(new Review("Great", "The crust is soft and tasty, the cheese is perfect, and most importantly, the sauce is great. This pizza is great and you should order it, enjoy it, then regret your unhealthy choice some other time.", 5, "https://images.unsplash.com/photo-1618213837799-25d5552820d3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzZ8fHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 9), 5);
      service.save(new Review("My Fav", "The chicken bacon ranch goes above and beyond. Especially in a really good restaurant, it's worth it for the home made ranch sauce alone.", 4, "https://images.unsplash.com/photo-1604917869287-3ae73c77e227?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA2fHxwaXp6YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 3), 6);
      service.save(new Review("Insane", " This pizza is insane: I never liked deep dish pizza but this pizza is like a drug to me. They crisp cheese on the outside of the crust somehow, totally genius.", 5, "https://images.unsplash.com/photo-1597715474989-9ae8683704b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY4fHxwaXp6YXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60", 1), 7);
      service.save(new Review("My Cheesy Dream!", "I can never have enough cheese on my pizza and deep dish alwaaaaays hits the spot.",
          5, "https://images.unsplash.com/photo-1582476927499-65372fb1a458?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80", 1), 1);
      service.save(new Review("Neat-O-Politan", "The freshest pizza ever! The Margherita version is a must-try!",
          5,
          "https://media.istockphoto.com/photos/cheesy-pepperoni-pizza-picture-id938742222?k=6&m=938742222&s=612x612&w=0&h=on_9ZYG1SG4Xgk7BLZSlaXJl8VYb6ZePDHTN6zukDHM=", 1), 2);
      service.save(
          new Review("Meh", "It's an ok pizza, depending on where you order it from.",
              3,
              "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/27/0/KC1812_Spaghetti-Squash-Crust-Pizza_s4x3.jpg.rend.hgtvcom.616.462.suffix/1538057934894.jpeg", 1), 3);
      service.save(
          new Review("The best 'real' pizza you may ever have", "I love some good Neapolitan pizza, especially if it has some garlic in it.",
              4,
              "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHwwfDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 4), 2);
      service.save(new Review("It's Ok", "I've gotten this with mushroom and broccoli with red sauce , it's alright, not sure I'm a fan of the style I got, but it wasn't bad. I'll stick to the classic red sauce and cheese from now on.", 3, "https://images.unsplash.com/photo-1584782930614-4c70e513116f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjMyfHxwaXp6YXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",3), 7);
      service.save(new Review("HUGE", "Excellent pizza!\nTasty toppings!\nHUGE SLICES!\nFold and eat away!!", 5, "https://images.unsplash.com/photo-1574637399205-de9f30dde4f6?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjUyfHxwaXp6YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 8),4);
      service.save(new Review("Unnecessary", "Asides from adding basil or garlic, I can't imagine a cheese slice getting much better. It's wonderful the way it is. You don't need to play around with extra toppings here.", 2, "https://images.unsplash.com/photo-1551105018-7c047ef2c508?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjU2fHxwaXp6YXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60", 4), 6);
      service.save(new Review("Crust With The Perfect Chew", "The white clam pizza with Fresno chiles and preserved lemon is outstanding, but my go-to is the sausage, fennel, and ricotta pizza. It never disappoints!", 5, "https://images.unsplash.com/photo-1547558840-8ad6c8e662a2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjYxfHxwaXp6YXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", 5), 8);
    }
  }
}
