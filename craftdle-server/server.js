import Express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import nodeSchedule from "node-schedule";
import dotenv from 'dotenv';

dotenv.config()

const recipesData = fs.readFileSync('./output.json');
const itemsData = fs.readFileSync('./items.json');
const recipes = JSON.parse(recipesData.toString());
const items = JSON.parse(itemsData.toString());

let recipeOfTheDay ;
let randomInventory = [];

// nodeSchedule.scheduleJob('0 0 * * *', function(){
nodeSchedule.scheduleJob('0/5 * * * *', function(){
    recipeOfTheDay = recipes[Math.floor(Math.random() * recipes.length)];
    console.log(recipeOfTheDay);
    
    randomInventory = [];

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

    // randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    // Object.entries(randomMaterials.key).forEach(ingredients => {
    //   ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    // });
    
    // randomMaterials = recipes[Math.floor(Math.random() * recipes.length)];
    // Object.entries(randomMaterials.key).forEach(ingredients => {
    //   ( randomInventory.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && randomInventory.push(ingredients[1].item);
    // });
    

    console.log(randomInventory);

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
      ...recipeOfTheDay, 
      // image: items.find(ingredients => ingredients.name === recipeOfTheDay.result.item).image 
    });
  } catch (error) {
    console.log(error);
  }
}
);
app.get('/randomInventory', (req, res) => {
  console.log("==========================\n", randomInventory);

  let inv = [];

  console.log(items.find(item => item.name === randomInventory[0]));

  randomInventory.forEach(item => {
    inv.push(items[items.findIndex(ingredients => ingredients.name === item)]);
  });

  // console.log("==========================\n", inv);

  res.json(inv);
}
);

app.get("/", (req, res) => {
  res.send(`
    <h1>CRAFTEADLE SERVER</h1>
    `);
    // <a href="${process.env.FRONTEND_LINK}">Go there ${process.env.FRONTEND_LINK}</a>
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});






