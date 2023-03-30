// 1
use SurfShop_DB

//db.FunBoard.drop()
db.createCollection("FunBoard")

//db.FishBoard.drop()
db.createCollection("FishBoard")

//db.LongBoard.drop()
db.createCollection("LongBoard")

//db.ShopManager.drop()
db.createCollection("ShopManager")

//All the surfboard in the shopboard 
//db.ShopBoard.drop()
db.createCollection("ShopBoard")

show collection

//ShopManager with insertOne
//db.ShopManager.insertOne( { name: 'Gadi Kupersmit', Date:(1994,6,20), gender: 'M', age: 27, Position: 'Manager' } );

// Store employees with insertMany
db.ShopManager.insertMany(
   [{ name: 'Gadi Kupersmit', Date:(1994,6,20), gender: 'M', age: 27, Position: 'Manager' },
   { name: 'Eli Pérez', Date:(1947,3,8), gender: 'M', age: 74, Position: 'shopkeeper'},
   {name: 'Rachel Sabago', Date:(1998,8,10), gender: 'F', age: 71, Position: 'shopkeeper'},]
   );

db.ShopBoard.insertMany([
{name: 'Al Merrick', Manufacturingdate:(2020,1,11), Feet: 8.0 ,Price:1500, Type: 'FunBoard'},
{name: 'Billabong', Manufacturingdate:(2018,1,18), Feet: 8.3 ,Price:5000, Type: 'FunBoard'},
{name: 'SMTH SHAPES', Manufacturingdate:(2021,1,5), Feet: 7.2 ,Price:2500, Type: 'FunBoard'},
{name: 'Billabong', Manufacturingdate:(2019,1,18), Feet: 9 ,Price:7000, Type: 'LongBoard'},
{name: 'SMTH SHAPES', Manufacturingdate:(2017,12,14), Feet: 8.7 ,Price:1500, Type: 'LongBoard'},
{name: 'Al Merrick', Manufacturingdate:(2019,6,24), Feet: 6.3 ,Price:1500, Type: 'FishBoard'},
{name: 'Al Merrick', Manufacturingdate:(2020,7,8), Feet: 5.7 ,Price:3000, Type: 'FishBoard'},
{name: 'Billabong', Manufacturingdate:(2019,5,12), Feet: 6.1 ,Price:1000, Type: 'FishBoard'},
{name: 'SMTH SHAPES', Manufacturingdate:(2018,1,5), Feet: 5.8 ,Price:2500, Type: 'FishBoard'}
])

db.FunBoard.insertMany([
{name: 'Al Merrick', Manufacturingdate:(2020,1,11), Feet: 8.0,Price:1500, Type: 'FunBoard'},
{name: 'Billabong', Manufacturingdate:(2018,1,18), Feet: 8.3,Price:5000, Type: 'FunBoard'},
{name: 'SMTH SHAPES', Manufacturingdate:(2021,1,5), Feet: 7.2,Price:2500, Type: 'FunBoard'}
])

db.LongBoard.insertMany([
{name: 'Billabong', Manufacturingdate:(2019,1,18), Feet: 9,Price:7000, Type: 'LongBoard'},
{name: 'SMTH SHAPES', Manufacturingdate:(2017,12,14), Feet: 8.7,Price:1500, Type: 'LongBoard'},
])

db.FishBoard.insertMany([
{name: 'Al Merrick', Manufacturingdate:(2019,6,24), Feet: 6.3,Price:1500, Type: 'FishBoard'},
{name: 'Al Merrick', Manufacturingdate:(2020,7,8), Feet: 5.7,Price:3000, Type: 'FishBoard'},
{name: 'Billabong', Manufacturingdate:(2019,5,12), Feet: 6.1,Price:1000, Type: 'FishBoard'},
{name: 'SMTH SHAPES', Manufacturingdate:(2018,1,5), Feet: 5.8,Price:2500, Type: 'FishBoard'}
])

//2
// Generating team with players ids
db.SurfBaord.insertOne({
  name: 'FunBoard',
  TypeSurf: {name: 'FunBoard'},
  players:  db.FunBoard.find({},{_id:1}).toArray()
})

// Create a function that returns a random SurfBaord ID for a given name
function getRandomSurfBoardId(BoardName){
  var randomNumber = Math.floor(Math.random() * db.SurfBaord.findOne({name: BoardName}).FunBoard.length);
  var randomBoard = db.SurfBaord.findOne({name: BoardName}).FunBoard[randomNumber];
  return randomBoard._id;

// 3
// Checks how many surfboards there are of the same type
db.FunBoard.count()

// Finding all SurfBaord that name starts with A
db.FishBoard.find({name: /^A/})

//
Count how many surfboards start with the letter A
db.FishBoard.find({name: /^A/}).count()

// Finding all SurfBaord name ends with g
db.LongBoard.find({name: /g$/})

//Shows from the location we set for him by SKIP
db.FishBoard.find().skip(1)

//Sort by ABC with put in parameter 1 and if we set to -1 it will turn the order of the ABC
db.LongBoard.find().sort({name:1})

//Finds all the surfboards in the surfboard store by name  "embedded"
db.ShopBoard.find({ "name": { $eq: "Al Merrick" } })

// 4
//Rename a collection
db.ShopBoard.renameCollection("SurfShop")

//Duplicate collections
db.FunBoard.find().forEach( function(docs){db.FunBoard2.insert(docs);} ) 

//Remove Collection
db.FunBoard2.remove({})

//Remove from the new collection created for the example//

//Remove some things from Collection
//Remove all surfboards larger than - 7.5
db.FunBoard2.remove({Feet:{"$gte":7.5}})

//Remove the contents of a collection
db.FunBoard2.remove({})

// Drop the collection
db.FunBoard2.drop()

// Resizes the surfboard but only within one particular collection
// for the general store will we have to do it while doing the same
// thing only the collection will have a different name
// And he only changes the first one he caught by that name
db.FishBoard.updateOne({name:"Al Merrick"},{$set:{Feet:4.2}})

//Note that there is a change in the name of the collection because in Exercise 4 I initially 
//made a name change of the collection from "ShopBoard" to "SurfShop"
db.SurfShop.updateOne({name:"Al Merrick"},{$set:{Feet:4.2}})

// 5
//The average heights of the surfboards according
//to a certain type determined for each company of surfboards
db.SurfShop.aggregate([{
    $match:  { "Type":"FishBoard" } }, {
    $group: { _id: '$name', 'Count': {$sum: 1},'Feet Average': {$avg: '$Feet'} }
}]);

// Planting the results inside a new collection called NewSurfShopAvgTest
db.SurfShop.aggregate([{
    $match:  { "Type":"FishBoard" } }, {
    $group: { _id: '$name', 'Count': {$sum: 1},'Feet Average': {$avg: '$Feet'}}},
	{$out:"NewSurfShopAvgTest"}]);

//The average Price of the surfboards according
//to a certain type determined for each company of surfboards
db.SurfShop.aggregate([{
    $match:  { "Type":"FishBoard" } }, {
    $group: { _id: '$name', 'Count': {$sum: 1},'Price Average': {$avg: '$Price'} }
}]);

//6

//Count how many surfboards there are according to the price
var mapFunc2 = function(){
		var value = {count: 1};
		var key = this.Price;
		emit(key,value);	
};

// Count several surfboards at the same price and no matter the type or size
// or company only a few surfboards are at the same price.
//And that is if there is anything that wants to know about surfboards according to the price
var reduceFunc2 = function(key,Price_values){
	reduceVal = {count: 0};
	for(var i = 0; i < Price_values.length; i++){
		reduceVal.count += Price_values[i].count;
	}
	return reduceVal;
}

//Calling functions within a collection and saving the data that came out in a new collection
db.SurfShop.mapReduce(
	mapFunc2,
	reduceFunc2,
	{
		out: {merge: "PriceSurf"},
	}
);