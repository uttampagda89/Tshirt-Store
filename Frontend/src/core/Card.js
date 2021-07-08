import React,{useState,useEffect} from "react";
import ImageHelper from "./helper.js/imageHelper";
import  {Redirect } from "react-router-dom";
import {addItemToCart,removeItemFromCart} from "./helper.js/cartHelper";
import {isAuthenticated} from "../auth/helper";


const Card = ({
    product,
    addtoCart=true,
    removefromCart = true,
    reload = undefined,
    setReload = (f) => f ,            // calling a method, pass this value f....and throw value f
})=>
{

  const [redirect,setRedirect] = useState(false);                // redirect is variable and setRedirect is methd

  const cartTitle = product ? product.name : 'Default name'
  const cartDescription = product ? product.description : 'Default Description'
  const cartPrice = product ? product.price : "Default Price"

  const addToCart = () => {
    if (isAuthenticated()) {
      addItemToCart(product, () => setRedirect(true));
      console.log("Added to cart");
    } else {
      console.log("Login Please!");
    }
  };

  const getAredirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = addToCart => {
      return (
          addtoCart && (                                              // if both is TRUE then it shows a button(Plain HTML is always TRUE)
              <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
          )
      );
  };


   const showRemoveFromCart = removefromCart => {
      return (
          removefromCart && (
              <button
                onClick={()=>{
                    removeItemFromCart(product.id)
                    console.log('Removed from cart')
                     setReload(!reload);                       // what value we give in the above, as per they flip the swhich  S15v3
                }}
                className="btn btn-block btn-outline-warning mt-2 mb-2"
              >
                Remove From Cart
              </button>
          )
      )
  }


  return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">

          <ImageHelper product={product}/>
          {getAredirect(redirect)}
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
          <div className="row">
            <div className="col-12">
                {showAddToCart(addToCart)}

            </div>
            <div className="col-12">
                {showRemoveFromCart(removefromCart)}
            </div>
          </div>
        </div>
      </div>
    );
};

export default Card;
