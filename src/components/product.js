import React, { useState } from 'react';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 15 },
    { id: 4, name: 'Product 4', price: 25 },
  ];

  const shippingCost = 5; // One-time shipping cost

  const [cart, setCart] = useState([]);

  const handleAddToCart = (productId) => {
    setCart([...cart, productId]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item !== productId));
  };

  const getProductInCartQuantity = (productId) => {
    return cart.filter(item => item === productId).length;
  };

  const getTotalAmount = () => {
    const cartTotal = cart.reduce((total, productId) => {
      const product = products.find(prod => prod.id === productId);
      return total + product.price;
    }, 0);
    return cartTotal + shippingCost;
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.map(product => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>Price: ${product.price}</p>
          <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          {cart.includes(product.id) && (
            <>
              <button onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</button>
              <p>In Cart: {getProductInCartQuantity(product.id)}</p>
              <p>Total: ${getProductInCartQuantity(product.id) * product.price}</p>
            </>
          )}
          <hr />
        </div>
      ))}
      <h2>Cart</h2>
      {cart.map(productId => (
        <div key={productId}>
          <p>{products.find(prod => prod.id === productId).name}</p>
          <p>Price: ${products.find(prod => prod.id === productId).price}</p>
          <p>Quantity: {getProductInCartQuantity(productId)}</p>
          <button onClick={() => handleRemoveFromCart(productId)}>Remove</button>
          <hr />
        </div>
      ))}
      <h3>Total Amount: ${getTotalAmount()}</h3>
    </div>
  );
};

export default ProductList;
