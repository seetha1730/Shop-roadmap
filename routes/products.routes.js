const express = require('express');
const router = express.Router();
const Products = require('../models/Products.model'); 



router.get('/products', (req, res, next) => {
  
  Products.find()
  .then(productList => {
      console.log( productList)
      res.render('products/products', { productList:productList })
  })
  .catch(err => console.log(err))
  
});

router.get('/products/create', (req, res, next) => {
  
  Products.find()
  .then(products => {
      console.log(products)
      res.render('products/create-product', { products:products })
  })
  .catch(err => console.log(err))
});

router.post('/products/create', (req, res, next) => {
  
  const { name, quantity, price } = req.body;

  Products.create({ name, quantity, price })
    .then((products) => {
      res.redirect('/products');
    })
    .catch(error => {
      res.render('products/create-product', { error });
    });
});

router.get('/products/:id/edit', (req, res, next) => {
  
  const {id}=req.params;
  
  Products.findById(id).then((products)=>{
    console.log(id)
    res.render("products/update-product",{products}) 
  })
  .catch(err => {
    next(err)
})

});

router.post('/products/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const {id}=req.params;
  const { name, quantity, price } = req.body

  Products.findByIdAndUpdate(id,{ name, quantity, price }).then((products)=>{
    console.log(products)
    res.redirect("/products") 
  })
  .catch(err => {
   res.render("products/update-product",{err})
})
});

router.post('/products/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const{id}= req.params
  Products.findByIdAndRemove(id).then((product)=>{
    console.log(product)
    res.redirect("/products") 
  })
  .catch(err => {
    next(err)
})

});

module.exports = router;
