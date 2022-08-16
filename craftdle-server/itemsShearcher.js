import fs from "fs";
import minecraftItems from 'minecraft-items';

const recipesData = fs.readFileSync('./output.json');

// parse json
var jsonObj = JSON.parse(recipesData.toString());
 
let basicMaterials = [];

// loop through the json object and get the basicMaterials
for (var i = 0; i < jsonObj.length; i++) {
    var recipe = jsonObj[i];
    
    Object.entries(recipe.key).forEach(ingredients => {
      ( basicMaterials.indexOf(ingredients[1].item) === -1 && ingredients[1].item ) && basicMaterials.push(ingredients[1].item);
    });

}

for (var i = 0; i < basicMaterials.length; i++) {

    const itemName =  basicMaterials[i];
    let icon = minecraftItems.find( itemName.split(":")[1].replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ") );
    let exist = icon.findIndex( item =>  item.name.toLowerCase() === itemName.split(":")[1].replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ").replace("_"," ") );

        if( exist !== -1 ) {
          console.log("con icono", itemName);
          basicMaterials[i] = {
            name: itemName,
            image: "data:image/png;base64, " + icon[exist].icon
          };
        } else {
          console.log("sin icono", itemName);
          basicMaterials[i] = {
            name: itemName,
            image: "don't have icon"
          };
        }
}

// stringify JSON Object
var jsonContent = JSON.stringify(basicMaterials);


fs.writeFile("items.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});






// let array = [];
// const jsonsInDir = fs.readdirSync('./recipes').filter(file => path.extname(file) === '.json');

// jsonsInDir.forEach(file => {
//     const fileData = fs.readFileSync(path.join('./recipes', file));
//     const json = JSON.parse(fileData.toString());
//     json.type === 'minecraft:crafting_shaped' && array.push(json);
// });

// console.log(array);

// // parse json
// // var jsonObj = JSON.parse(array);
// // console.log(jsonObj);
 
// // stringify JSON Object
// var jsonContent = JSON.stringify(array);
// console.log(jsonContent);

// fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
//     if (err) {
//         console.log("An error occured while writing JSON Object to File.");
//         return console.log(err);
//     }
 
//     console.log("JSON file has been saved.");
// });