const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors')
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.f8dsb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
    await client.connect();
    const database = client.db('carMechanic');
    const servicesCollections = database.collection('services');

     //GET API
    app.get('/services',async (req,res) =>{
        const cursor = servicesCollections.find({});
        const services = await cursor.toArray()
        res.send(services)
    });
    //GET SINGLE SERVICES
    app.get('/services/:id',async(req,res) =>{
        const id = req.params.id;
        console.log('getting specific id')
        const query = {_id:ObjectId(id)};
        const service = await servicesCollections.findOne(query);
        res.json(service)
    });
    //POST API
    app.post('/services',async(req,res) =>{
        const service = req.body;
       const result = await servicesCollections.insertOne(service);
        res.json(result)
    });

    //Delete Api
    app.delete('/services/:id',async(req,res) =>{
        const id = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await servicesCollections.deleteOne(query);
        res.json(result)
    });

   
    
}

finally{
   // await client.close();
}

}
run().catch(console.dir);




app.get('/',(req,res) =>{
    res.send("respond send")
});

app.listen(port,()=>{
    console.log('Running Genius server',port);
})
//Genius-Mechanic pass: OLlCQzsVDO4K9PcF