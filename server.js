const express = require("express");
// const mongoose = require("mongoose");
// const shortid = require("shortid");

const app = express();
app.use(express.urlencoded({extended: true}));

// mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

// const Product = mongoose.model("products", new mongoose.Schema({
//     _id: { type: String, default: shortid.generate },
//     title: String,
//     description: String,
//     image: String,
//     price: Number,
//     availableSizes: [String],
// }));

app.get("/api/product", async (req, res) => {
    console.log(res);
    // const products = await Product.find({});
    // res.send(products);
});

app.post("/api/product", async (req, res) => {
    console.log(res);
    // const newProduct = new Product(req.body);
    // const saveProduct = await newProduct.save();
    // res.send(saveProduct);
});

app.delete("/api/product/:id", async (req, res) => {
    console.log(res);
    // const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    // res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log("server at http://localhost:5000"));



























































