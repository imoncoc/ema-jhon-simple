import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () => {
        fetch('products.json')
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }, []);

    useEffect(()=> {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: Get Id
        for(const id in storedCart){
            // step 2:  get product from products state by using id
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct){
              // Step 3: get quantity of the product
              const quantity = storedCart[id];
              addedProduct.quantity = quantity;
              // step 4: add the addedProduct to the saved cart
              savedCart.push(addedProduct)
            } 
        }
        // Step 5: Set the cart
        setCart(savedCart)
    }, [products]);

    const handleAddToCart = (product) => {
        let newCart = [];
    //   const newCart = [...cart, product];
      //if product doesn't exist in the cart, then set quantity = 1
      // if exist update quantity by 1
      console.log(cart)
      const exists = cart.find(pd => pd.id === product.id)
      if(!exists){
        product.quantity = 1;
        newCart = [...cart, product];
      }
      else{
        exists.quantity += 1;
        const remaining = cart.filter(pd => pd.id !== product.id);
        newCart = [...remaining, exists];
      }
      setCart(newCart)
      addToDb(product.id)
    };

    const handleClearCart = () => {
      setCart([]);
      deleteShoppingCart();
    };

    return (
      <div className="shop-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link to="/orders" className="proceed-link">
              <button className="btn-proceed">
                <span>Review Order</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>
    );
};

export default Shop;