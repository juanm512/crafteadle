import Express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import nodeSchedule from "node-schedule";
import dotenv from 'dotenv';

dotenv.config()

const recipeOfTheDayData = fs.readFileSync('./recipeOfTheDay.json');
const randomInventoryData = fs.readFileSync('./randomInventory.json');
const recipeOfTheDayParsed = JSON.parse(recipeOfTheDayData.toString());
const randomInventoryParsed = JSON.parse(randomInventoryData.toString());

const recipesData = fs.readFileSync('./output.json');
const itemsData = fs.readFileSync('./items.json');
const recipes = JSON.parse(recipesData.toString());
const items = JSON.parse(itemsData.toString());

// let recipeOfTheDay = {};
// let randomInventory = [];

// nodeSchedule.scheduleJob('0 0 * * *', function(){
nodeSchedule.scheduleJob('0 0/12 * * *', function(){
// nodeSchedule.scheduleJob('0/1 * * * *', function(){
    let recipeOfTheDay = recipes[Math.floor(Math.random() * recipes.length)];
    console.log(recipeOfTheDay);
    
    let randomInventory = [];

    Object.entries(recipeOfTheDay.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });

    let randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    Object.entries(randomMaterials.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });

    randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    Object.entries(randomMaterials.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });
    
    randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    Object.entries(randomMaterials.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });
    
    randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    Object.entries(randomMaterials.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });

    randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    Object.entries(randomMaterials.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });
    
    randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    Object.entries(randomMaterials.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });
    
    randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    Object.entries(randomMaterials.key).forEach(ingredients => {
      ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    });
    

    console.log(randomInventory);
    
    // stringify JSON Object
    var recipeOfTheDayJsonContent = JSON.stringify(recipeOfTheDay);
    
    fs.writeFile("recipeOfTheDay.json", recipeOfTheDayJsonContent, 'utf8', function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      
      console.log("JSON file has been saved.");
    });

    var randomInventoryJsonContent = JSON.stringify(randomInventory);
    fs.writeFile("randomInventory.json", randomInventoryJsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });



} );

const app = Express();
app.use(cors([
  {
    origin: process.env.FRONTEND_LINK || "http://localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
    credentials: true
  }
]
));
app.use(morgan('dev'));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.get('/recipes', (req, res) => {
  console.log("==========================");
  try {
    res.json({
      ...recipeOfTheDayParsed, 
      // image: items.find(ingredients => ingredients.name === recipeOfTheDay.result.item).image 
    });
  } catch (error) {
    console.log(error);
  }
}
);
app.get('/randomInventory', (req, res) => {
  console.log("==========================\n", randomInventoryParsed);

  let inv = [];

  console.log(items.find(item => item.name === randomInventoryParsed[0]));

  randomInventoryParsed.forEach(item => {
    inv.push(items[items.findIndex(ingredients => ingredients.name === item)]);
  });

  // console.log("==========================\n", inv);

  res.json(inv);
}
);

app.get("/", (req, res) => {
  res.send(`
    <h1>CRAFTEADLE SERVER</h1>
    <a href="${process.env.FRONTEND_LINK}">Go there ${process.env.FRONTEND_LINK}</a>
    `);
});

app.listen( process.env.PORT || 5000, () => {
    console.log('Server started on port 5000');
});






