/***********************\
 * Content Fire LIBRARY *
\***********************/

var prop = require("./public/Custom/js/properties");

/*********************\
 * LIBRARY            *
\*********************/

// Package Labraries
const fs = require('fs');
const winston = require('winston');

const express = require("express")
const app = express()

app.use(express.static(__dirname));
app.use(express.json());

app.set("view engine","ejs");

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/' + prop.Database_Name, {useNewUrlParser:true} );

const db = mongoose.connection

db.on( 'error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const ContentFireSchema = require('./models/cf-schema');

var studentsDB = require("./public/Custom/js/database");

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: 'combined.log',}),
        new winston.transports.Console()
    ],
  });

  console.log("Server Start/Restarted");
  logger.info("Server Start/Restarted");

/*********************\
 * ROUTING           *
\*********************/

app.get("/login", (req, res) => {

    console.log("get route='/login'");
    logger.info("get route='/login'");

    res.render("login");
});

app.get("/index",  async (req, res) => {

    console.log("get route='/index' ");
    logger.info("get route='/index' ");

    //Getting for the URL 
    var user = req.query.user;
    var pswd = req.query.pswd;

    //Getting a list users from the database
    var login = prop.Login;

    //Checking User Name and Password to see Authentication Type (ADMIN or USERS)
    var account_type='Nothing';

    for(var i = 0; i <login.length; i++){
      if(login[i].user == user && login[i].pswd == pswd ){
          logger.info("User: " + login[i].user);
          logger.info("Account Type: " + login[i].account_type);

          account_type = login[i].account_type;
      }
    }

    res.render("index", {account_type:account_type});
});

/*******************************************\
* Blue Control Buttons - Crud Operations    *
\*******************************************/
app.post('/new',  async function(req, res) {

  console.log("post route='/new' ");
  logger.info("post route='/new' ");

  var body = req.body;

  var header = prop.Data_Table_Header;

  var bodyTranfer = {};

  for (var m = 0; m < header.length; m++){

    if( header[m] != "_id"){
      bodyTranfer[ header[m] ] = body[ header[m] ];
    }

  }

  const collection = new ContentFireSchema(bodyTranfer);

  try {
    const newCollection = await collection.save();

    res.status(201).json(newCollection);


  } catch (err) {
    res.status(400).json({ message: err.message })
  }

});

app.post("/edit/:id", getCollections, async function(req, res){

  console.log("post route='/edit/" + req.params.id+"'");
  logger.info("post route='/edit/"+ req.params.id+"'");
  
  var header = prop.Data_Table_Header;

  for (var m = 0; m < header.length; m++){

    if( header[m] != "_id"){
      if (req.body[ header[m] ] != null) {
        res.collections[ header[m] ] = req.body[ header[m] ];
      }
    }
  }


  try {

    const updatedCollections = await res.collections.save()

    res.status(201).json(updatedCollections);

  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});


// Deleting One
app.post('/delete/:id', getCollections, async (req, res) => {

  console.log("post route='/delete/"+ req.params.id+"'");
  logger.info("post route='/delete/"+ req.params.id+"'");

  try {
    await res.collections.remove()
    res.json({ message: 'Deleted Collections' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

/*********************************************\
* ----------- Green Control Buttons---------- *
\**********************************************/

/*************************\
 * Delete MongoDB Button  *
\*************************/
/*
This API deletes all the collections in the MongoDB database
*/
app.post('/mongodelete', (req, res) => {

  console.log("post route='/mongodelete' ");
  logger.info("post route='/mongodelete' ");

  ContentFireSchema.deleteMany({ }).then(function(){
      console.log('Deleted ALL Collections'); // Success

      res.status(201).json({message:"Deleted ALL Collections"});

  }).catch(function(error){
      console.log(error); // Failure

      res.status(400).json({ message: err.message })
  });
  
});

/***********************************\
 * Save FROM Data Table TO MongoDB  *
\************************************/
/*
This take the Table Data information sends to MongoDB. 
This ONLY sends the information displayed on the screen 
NOT all data contained in the whole Data Table because
of Payload problems. We have limit amount of data being
send on the AJAX problem. 
*/
app.post('/mongosave', (req, res) => { 

  console.log("post route='/mongosave' ");
  logger.info("post route='/mongosave' ");

  var body = req.body;

  ContentFireSchema.insertMany(body).then(function(){
    console.log('Saved ALL Collections'); // Success

    res.status(201).json({message:"Saved ALL Collections"});

}).catch(function(error){
    console.log(error); // Failure

    res.status(400).json({ message: err.message })
});

});

/*********************************\
 * Save FROM MongoDB TO JSON file   *
\**********************************/
//The takes the Data Table information writes it to database.js file 
app.post('/jsonsave', async (req, res) => { 

  console.log("post route='/jsonsave' ");
  logger.info("post route='/jsonsave' ");

  try {
    const collections = await ContentFireSchema.find();


    var message = writeCollection (collections);

    if(message.indexOf('ERROR') > 0){
      res.status(500).json({ message: message })
    }else{
      res.status(201).json({message:"File written successfully"});
    }

  } catch (err) {
    res.status(500).json({ message: err.message })
  }

});


//Helper function for POST /jsonsave
function writeCollection (collections){ 

  console.log("writeCollection");
  logger.info("writeCollection");
  
        var file_path = './public/Custom/js/database.js';
        var file_context = '';

        file_context = file_context + 'var Repo = [{ \n';

        for(var m=0; m <collections.length; m++){

            for (const [key, value] of Object.entries(collections[m]._doc)) {
              console.log(`${key}: ${value}`);

              if('__v' != key){
                file_context = file_context +`\t ${key}: "${value}", \n`; 
              }

          }

          if(m < collections.length -1){
            file_context = file_context + '},{ \n'
          }
            
        }

        file_context = file_context + '}]; \n';

        file_context = file_context + '\n';

        file_context = file_context + "if( typeof module !== 'undefined' ){ \n"
        file_context = file_context +'\t module.exports.Repo = Repo;\n'
        file_context = file_context + '}\n'

        try {
          fs.writeFileSync(file_path, file_context);
          console.log("File written successfully\n");
          return "File written successfully\n";
        } catch (err) {
          return "-- ERROR: " + err.message; 
        }
};


async function getCollections(req, res, next) {
  let collections;
  try {
    collections = await ContentFireSchema.findById(req.params.id)
    if (collections == null) {
      return res.status(404).json({ message: 'Cannot find Collections' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.collections = collections;
  next()
}

app.listen(3000);