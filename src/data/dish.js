const dishes = [
  {
    name: "Pizza",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_25EaiPYPjBfOedTGeYMdKf1UcAEJ-rtRg&s",
    recipe: " To make a classic pizza, begin by preparing a soft dough using all-purpose flour, yeast, warm water, sugar, salt, and a little olive oil, then knead it until smooth and let it rest for one hour until it doubles in size. Once the dough rises, roll it out into a round base and prick it lightly with a fork. Spread a generous layer of pizza sauce—made from tomato puree, garlic, herbs, and olive oil—over the base. Add toppings like mozzarella cheese, capsicum, onions, olives, sweet corn, or your favorite vegetables or chicken. Sprinkle extra cheese and oregano on top, then bake the pizza in a preheated oven at 220°C for about 12–15 minutes until the crust becomes golden and the cheese melts beautifully. Slice and serve hot with chili flakes and oregano for the perfect homemade pizza flavor.",
    ingredients: ["Pizza Base", "Cheese", "Tomato Sauce", "Capsicum", "Onion", "Oregano", "Chilli Flakes"]

  },
  {
    name: "Dosa",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNfxVBTjyNjGmvy8wbxQuh9gkzYKHuv26R1Q&s",
    recipe: "Dosa is made by soaking rice and urad dal for 4–6 hours, then grinding them into a smooth batter and fermenting it overnight. Once the batter rises and becomes airy, add salt and mix well. Heat a non-stick tawa, sprinkle some water to cool it slightly, and spread a ladle of batter in a circular motion to make a thin dosa. Drizzle a little oil around the edges and cook until crisp. You can serve it plain or fill it with potato masala to make masala dosa. Serve hot with coconut chutney and sambhar for a perfect South Indian meal.",
    ingredients: ["Rice", "Urad Dal", "Salt", "Oil", "Water"]

  },
  {
    name: "Burger",
    image: "https://images3.alphacoders.com/131/1313839.jpg",
    recipe: "A classic burger starts with a juicy patty made from either minced chicken or beef mixed with salt, pepper, garlic, and a little seasoning. Shape the mixture into round patties and cook them on a hot pan until golden on both sides. Lightly toast the burger buns with butter, then spread mayonnaise or your favorite sauce on both sides. Place fresh lettuce, sliced tomatoes, onions, and cheese over the base bun, then place the cooked patty on top. Add another layer of sauces if you like, cover it with the top bun, and your delicious homemade burger is ready to serve hot with fries.",
    ingredients: ["Burger Bun", "Cheese Slice", "Veg Patty", "Tomato", "Onion", "Lettuce", "Mayonnaise", "Ketchup"]

  },
  {
    name: "Pasta",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnMZay7xsOSxiXSB-6GgPAssTvkadHFbpMMg&s",
    recipe:
      "To make a quick pasta, first boil one cup of pasta in salted water until it becomes soft, then drain the water and keep the pasta aside. Heat one tablespoon of oil or butter in a pan and add some chopped garlic and onion, cooking until they turn light golden. Add one chopped tomato and cook until it becomes soft. Then mix in a pinch of salt, a little red chili powder, and any seasoning you like. Add the boiled pasta into the pan and mix everything well so the pasta gets coated with the sauce. Cook for one or two minutes, turn off the heat, and serve hot. You can also add some grated cheese on top if you like. Enjoy your simple and tasty pasta!",
    ingredients: [
      "Pasta",
      "Tomato Sauce",
      "Olive Oil",
      "Salt",
      "Vegetables",
      "Cheese",
    ],
  },
  {
    name: "Lasagna",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_z0c6kVdiiykm9T6lgzYgVfBu5KR3jQchew&s",
    recipe: "Lasagna is prepared by layering cooked lasagna sheets with rich sauces and cheese. First, make the tomato sauce by sautéing garlic, onions, and vegetables or minced meat, then add tomato puree, herbs, salt, and pepper. Simultaneously, prepare a creamy béchamel sauce using butter, flour, and milk. Take a baking dish and start layering: spread tomato sauce first, add a lasagna sheet, spread béchamel sauce, and sprinkle mozzarella cheese. Repeat the layers until full. Bake it in the oven for 25–30 minutes until the cheese melts and turns golden. Let it rest for a few minutes before cutting and serving warm.",
    ingredients: ["Lasagna Sheets", "Cheese", "Tomato Sauce", "Paneer/Vegetables", "Oregano", "Garlic", "Olive Oil"]
  },

  {
    name: "Pav Bhaji",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCgVQ8AmFCyfXagbgEoF6FrRZlEQcFC1VUw&s",
    recipe: "Pav bhaji is made by boiling vegetables like potatoes, tomatoes, peas, and cauliflower until soft and then mashing them well. In a pan, heat butter and sauté chopped onions, capsicum, garlic, and ginger until fragrant. Add pav bhaji masala, red chili powder, salt, and mashed vegetables, then cook everything together until it becomes a smooth, thick bhaji. Keep adding butter for richer flavor and adjust water as needed. For the pav, toast them on a tawa with butter until golden and crisp. Serve the hot bhaji with butter-toasted pav, chopped onions, and lemon wedges.",
   ingredients: ["Pav", "Boiled Potatoes", "Tomato", "Onion", "Capsicum", "Peas", "Butter", "Pav Bhaji Masala", "Salt", "Lemon"]

  },
  {
    name: "Sandwich",
    image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxf2RlWG1sqjwDKiD0SXynUwWCguwUQqYlOw&s",
    recipe: "A simple sandwich begins with two slices of fresh bread spread with butter and a thin layer of green chutney or mayonnaise. Add slices of cucumber, tomato, onion, and boiled potato evenly between the bread slices. Sprinkle a little salt, pepper, and chaat masala for extra flavor. If you want a grilled sandwich, place the filled bread in a sandwich maker or tawa with a little butter until it becomes crispy and golden. Cut it diagonally and enjoy a fresh, flavorful sandwich that works perfectly for breakfast or snacks.",
    ingredients: ["Buns", "Veg Patty", "Lettuce", "Cheese", "Sauce"]
  },
  {
    name: "Pulao",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1vnmN4VqPphxv0x5NQUZ2u_7KjL8JMxRvxA&s",
    recipe: "To make a flavorful vegetable pulao, first wash and soak basmati rice for 15–20 minutes. Heat ghee or oil in a pan and add whole spices like bay leaf, cloves, cinnamon, cardamom, and cumin seeds until they release their aroma. Add sliced onions and sauté until light golden, then mix in green chilies and chopped vegetables. Cook the veggies for a few minutes and add turmeric, red chili powder, and a pinch of garam masala if you prefer extra flavor. Now add the soaked rice and gently sauté it with the vegetables for a minute so it absorbs all the spices. Pour in two cups of water, add salt, and bring it to a boil. Then cover the pan with a lid and cook on low heat for 12–15 minutes until the rice becomes soft and fluffy. Let it rest for 5 minutes, fluff with a fork, and enjoy your aromatic pulao with raita, pickle, or curry. ",
    ingredients: ["Basmati Rice"," Cooking Oil","Onion","Tomato","Potato","Green chilli"," Ginger","Capsicum","Carrot","Peas"],
  }

];

export default dishes;