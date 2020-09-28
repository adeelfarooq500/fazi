
const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

const Product = require('../model/product');
//=============Post Add product==============
exports.postProduct = (req, res, next) => {
    const {category,description,title,image,price,discount,isDiscount,coupon}=req.body
    Product.create({
      id: uuid(),
      title: title,
      category: category,
      description:description,
      image:image,
      coupon:coupon,
      isDiscount:isDiscount,
      isActive: true,
      discount:discount,
      price:price,
      createdOn: Date(Date.now()),
      modifiedOn: Date(Date.now())
    }).then((product) => {

      res.status(201).json({ message: 'Product  Successful Added', product,hasError: false });
    }).catch(err => console.log(err));
  };
  //===========Get product By ID=============
exports.getProductById = (req, res, next) => {
    const id = req.query.id;

    Product.findOne({
      where: { id: id, isActive: true }

    })

      .then(product => {
        if (!product) {
          return res.status(201).json({
            message: 'Nothing Found Against Your Id', is,hasError: true
          })
        }
        res.status(201).json({
          message: 'successful', product,hasError: false
        })
      })
      .catch(err => console.log(err));
  };
  //===========Post Edit product===============
  exports.postEditProduct = (req, res, next) => {
    const {category,description,title,image,price,discount,isDiscount,coupon,id}=req.query;
    Product.findOne({ where: { id: id, isActive: true } })
      .then(product => {
        product.title = title;
        product.category = category;
        product.description=description
        product.image = image;
        product.price = price;
        product.discount=discount;
        product.isDiscount = isDiscount;
        product.coupon=coupon;
        product.modifiedOn = Date(Date.now());
        product.updateOn = Date(Date.now());
        return product.save();
      }).then(product => {
        res.status(201).json({ message: 'UPDATED Product!', product,hasError: false })
      }).catch(err => console.log(err));
  };
  //======Post Delete product=======
  exports.postDeleteProduct = (req, res, next) => {
    const productId = req.query.id;
    Product.findOne({ where: { id: productId, isActive: true } })
      .then(product => {
        product.isActive = false;
        return product.save();
      }).then(product => {
        res.status(201).json({ message: 'DELETE Product Successfuly!', product ,hasError: false})
      }).catch(err => console.log(err));
  };
  exports.getProducts = (req, res, next) => {


    Product.findAll({
      where: {  isActive: true }

    })

      .then(product => {
        if (!product) {
          return res.status(201).json({
            message: 'Nothing Found ', hasError: true
          })
        }
        res.status(201).json({
          message: 'successful', product,hasError: false
        })
      })
      .catch(err => console.log(err));
  };