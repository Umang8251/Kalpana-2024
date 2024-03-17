const express = require('express')
const app = express()
const port = 3000;
const cors= require('cors')

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//mongodb config

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://emesroyal:satyatrina9@cluster9.jsycgds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster9";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create collection
    const products= client.db("productInventory").collection("products");

    app.post("/upload-product", async(req, res) =>{
        const data = req.body;
        const result=await products.insertOne(data);
        res.send(result);
    })
    // get all products from db
         app.get("/all-products", async (req, res) => {
             const prod = await products.find();
             const result = await prod.toArray();
             res.send(result)
         })
    // update a books method
    app.patch("/product/:id", async (req, res) => {
        const id = req.params.id;
        // console.log(id);
        const updateProductData = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedDoc = {
            $set: {
                ...updateProductData
            }
        }
        const result= await products.updateOne(filter, updatedDoc, options);
        res.send(result);
    })

    // delete a item from db
    app.delete("/product/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await products.deleteOne(filter);
        res.send(result);
    })

      // get all books & find by a category from db
      /*app.get("/all-products", async (req, res) => {
        let query = {};
        if (req.query?.category) {
            query = { category: req.query.category }
        }
        const result = await products.find(query).toArray();
        res.send(result)
    })*/
    //change to some key


             

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log('Example app listening on port ${port}')
})