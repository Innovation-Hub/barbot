![Logo Hub Innovation Epitech](http://oi60.tinypic.com/23r2wdu.jpg)

BarBot
======

Innovation Hub's Barman Bot.

The goal of this project is to create a bot who controls a bar.

You can order drinks from the web API from known or custom recipes.

Project created by the Hub Innovation team from [Epitech](http://www.epitech.eu)

![BarBot](http://i.imgur.com/Hy9zxVt.jpg)

Youtube ==> [First Drink!](http://www.youtube.com/watch?v=8okK15RWCJY)

Features
--------
* Rest API
* Perfect dosage of each ingredient 
* creation of new recipe very easily (json file)

Usage
-------

on the Galileo
`node web.js`

on any http enabled device:

[GET] `/api/recipes` -> returns the list of all recipes

[POST] `/api/recipeName` -> prepare a drink :)

Create recipe
-------

To create new recipe, you just need to add a new file in the recipes folder based on the sample:

```
{
  "name": "Irish Coffee", // name of the recipe
  "api": "irishcoffee", // name of the endpoint for the web API
  "ingredients": [
      {"index": 7, "time": 5000}, // index if the pin number of the Galileo
      {"index": 8, "time": 2000} // time is the number of millisecond for each ingredient
    ]
}
```

Hardware
--------
* Intel [Galileo](http://www.intel.com/content/www/us/en/intelligent-systems/galileo/galileo-overview.html)
* 2x [Peristaltic Pump](https://www.adafruit.com/blog/2012/12/19/new-product-peristaltic-liquid-pump-with-silicone-tubing/)
* 1x [2 channels relay board](http://www.elecfreaks.com/store/2-channel-5v12v24v-relay-module-p-270.html)

Estimated: under 120$

Depends
-------
* NodeJS 0.8 (Express, Async)
* Galileo from Intel
* "Milk" and "Strawberry syrup" or Vodk...

