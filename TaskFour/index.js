//Load Express
//============================================================

const express = require('express');

const app = express();

//syntax for body parse functionality/post method
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//Set PORT
//============================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT);


//IMPORT Products
//============================================================

const products = require('./products');


//Read All Products
//============================================================

app.get('/api/products',(req,res) => {

    res.json(products);

});

//Get one Product
//============================================================

app.get('/api/products/:id', (req, res) => {

    const found = products.inventory.filter(item => item.id === parseInt(req.params.id));

    if(found){
        res.json(products.inventory.filter(item => item.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: "This product was not found."});
    }  

});

//Create new product
//============================================================

 app.post('/api/addproduct/:id', (req,res) => {

    const newProduct = {
        id: +req.params.id,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productCollection: req.body.productCollection,
        productDescription: req.body.productDescription,
        productImg: req.body.productImg,
        productRating: req.body.productRating,
        veganFriendly: req.body.veganFriendly,
        inStock: req.body.inStock,
        availStock: req.body.availStock,
    };

    if(!newProduct.id || !newProduct.productName || !newProduct.productPrice || !newProduct.productCollection || !newProduct.productDescription || !newProduct.productImg || !newProduct.productRating || !newProduct.veganFriendly || !newProduct.inStock || !newProduct.availStock){
        return res.status(400).json({msg: "You have missed some information."});
    }

    products.inventory.push(newProduct);
    res.json(products);

 });

//Update product
//============================================================

app.put('/api/updateproduct/:id' , (req, res) => {

    const found = products.inventory.some(item => item.id === parseInt(req.params.id));

    if(found){

        const updProduct = req.body;

        products.inventory.forEach(item => {
            item.productName = updProduct.productName? updProduct.productName : item.productName;
            item.productPrice = updProduct.productPrice? updProduct.productPrice : item.productPrice;
            // item.productCollection = updProduct.productCollection? updProduct.productCollection : item.productCollection;
            // item.productDescription = updProduct.productDescription? updProduct.productDescription : item.productDescription;
            // item.productImg = updProduct.productImg? updProduct.productImg : item.productImg;
            item.productRating = updProduct.productRating? updProduct.productRating : item.productRating;
            // item.veganFriendly = updProduct.veganFriendly? updProduct.veganFriendly : item.veganFriendly;
            item.inStock = updProduct.inStock? updProduct.inStock : item.inStock;
            item.availStock = updProduct.availStock? updProduct.availStock : item.availStock;

            res.json({msg: 'Product has been updated: ', item});
        })


    } else{
        res.status(400).json({msg: "This product was not found"});
    }

});

//Delete product
//============================================================

app.delete('/api/deleteproducts/:id', (req,res) =>{

    const found = products.inventory.some(item => item.id === parseInt(req.params.id));

    if(found){
        res.json({
            msg: "Product deleted",
            deleted: products.inventory.filter(item => item.id === parseInt(req.params.id)),
            products: products.inventory.filter(item => item.id !== parseInt(req.params.id)),
        });
    }else{
        res.status(400).json({msg: "This product was not found"});
    }

});