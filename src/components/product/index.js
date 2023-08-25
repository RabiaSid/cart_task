import React, { useState } from "react";

const Product = () => {
  const products = [
    {
      id: 1,
      image: "https://i.imgur.com/1GrakTl.jpg",
      name: "Product 1",
      price: 10,
    },
    {
      id: 2,
      image: "https://i.imgur.com/ba3tvGm.jpg",
      name: "Product 2",
      price: 20,
    },
    {
      id: 3,
      image: "https://i.imgur.com/pHQ3xT3.jpg",
      name: "Product 3",
      price: 15,
    },
  ];

  const shippingCost = 5; // One-time shipping cost

  const [cart, setCart] = useState([]);

  const handleAddToCart = (productId) => {
    setCart([...cart, productId]);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.indexOf(productId);
    if (productIndex !== -1) {
      const currentQuantity = getProductInCartQuantity(productId);
      if (currentQuantity > 1) {
        updatedCart.splice(productIndex, 1);
        setCart(updatedCart);
      } else {
        setCart(cart.filter((item) => item !== productId));
      }
    }
  };

  const getProductInCartQuantity = (productId) => {
    return cart.filter((item) => item === productId).length;
  };

  const getTotalAmount = () => {
    const cartTotal = cart.reduce((total, productId) => {
      const product = products.find((prod) => prod.id === productId);
      return total + product.price;
    }, 0);
    return cartTotal + shippingCost;
  };
  const JustTotalAmount = () => {
    const cartTotal = cart.reduce((total, productId) => {
      const product = products.find((prod) => prod.id === productId);
      return total + product.price;
    }, 0);
    return cartTotal;
  };
  const removeItem = (productId) => {
    const newList = [...cart];
    newList.splice(productId, 1);
    setCart(newList);
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="row cart shadow-lg my-5 ">
        {/* left side card */}
        <div className="col-12 col-md-8 d-flex justify-content-evenly  flex-column cart_list p-5 ">
          {/* title row */}
          <div className="row d-flex justify-content-between align-items-center p-2  border-bottom ">
            <div className="col-7">
              <h2 className="main_heading">Shopping Cart</h2>
            </div>
            <div className="col-3">
              <text className="text_list"> 3 items </text>
            </div>
          </div>
          {/* card product */}
          {products.map((product) => (
            <div className="row  p-2" key={product.id}>
              <div className="row align-items-center justify-content-between">
                <div className="col-2">
                  <img className="img-fluid" src={product.image} />
                </div>
                <div className="col-4 ">
                  <div className="row text-muted">
                    <text className="text_list">Shirt</text>
                  </div>
                  <div className="row">
                    <text className="text_list">Cotton T-shirt</text>
                  </div>
                </div>
                <div className="col-3">
                  <span>
                    <button onClick={() => handleAddToCart(product.id)}>
                      +
                    </button>
                  </span>
                  <span className="px-2">
                    {getProductInCartQuantity(product.id)}
                  </span>
                  <span>
                    <button onClick={() => handleRemoveFromCart(product.id)}>
                      -
                    </button>
                  </span>
                </div>
                <div className="col-2">
                  &euro; {getProductInCartQuantity(product.id) * product.price}
                </div>
                <div className="col-1">
                  <button className="" onClick={() => removeItem(product.id)}>
                    <span>&#10005;</span>
                  </button>
                </div>
              </div>

              <hr />
            </div>
          ))}
          <div className=" px-3">
            <text className="text-muted text_list">
              <span className="text-dark fs-3">&#8592; </span>
              <span>Back to shop</span>
            </text>
          </div>
        </div>
        {/* right side of card */}
        <div className="col-12 col-md-4 d-flex flex-column justify-content-evenly summary py-3 px-5 cart_total ">
          {/* top heading summary */}
          <div className="row d-flex justify-content-between align-items-center px-2  border-bottom ">
            <div className="col">
              <h2 className="heading py-2">Summary</h2>
            </div>
          </div>
          {/* total items and product total amount */}
          <div className="row d-flex justify-content-between align-items-center py-3 ">
            <div className="col-5 ">
              <text className="Total_text">ITEMS 3</text>
            </div>
            <div className="col-5 ">
              <div className="Total_text text-end">
                &euro; ${JustTotalAmount()}{" "}
              </div>
            </div>
          </div>
          {/* shipping and give code */}
          <form className="border-bottom pb-3 pb-4">
            <p className="Total_prgh">SHIPPING</p>
            <select className=" select_custom px-2">
              <option className="text-muted">
                Standard-Delivery- &euro;5.00
              </option>
            </select>
            <p className="Total_prgh pt-3">GIVE CODE</p>
            <input
              id="code"
              className="px-2 input_custom"
              placeholder="Enter your code"
            />
          </form>
          {/* total price with shipping price */}
          <div className="row d-flex justify-content-between align-items-center py-3 ">
            <div className="col-5 ">
              <text className="Total_text">TOTAL PRICE</text>
            </div>
            <div className="col-5 ">
              <div className="Total_text text-end">
                &euro; ${getTotalAmount()}
              </div>
            </div>
          </div>
          {/* Checkout */}
          <button className="btn w-100 border border-dark bg-dark text-light rounded-0 px-0">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
