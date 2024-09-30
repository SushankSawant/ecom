import "./App.css";
import React, { useEffect, useState } from "react";
// import productlist from "./ProductList";
import prodList from "./prodList";

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeC, setActiveC] = useState(false);
  const [imgCount, setImgCount] = useState(0);
  function addItem(item) {
    setCart([...cart, item]);
  }
  function clearCart(index) {
    const filtered = cart.filter((e, i) => {
      return index !== i;
    });
    setCart(filtered);
  }

  useEffect(() => {
    const totalAmt = cart.reduce((a, item) => a + item.price, 0);
    setTotal(totalAmt);
  }, [cart]);

  /*   useEffect(() => {
    const totalAmt = cart.reduce((a, item) => a + item.price, 0);
    setTotal(totalAmt);
  }, [cart]); */

  function handleSlideRight(e) {
    e.preventDefault();
    if (imgCount + 1 >= prodList.length) {
      setImgCount(0);
    } else if (imgCount + 1 <= prodList.length) {
      setImgCount((p) => p + 1);
    }

    console.log(imgCount + 1, prodList.length);
  }
  /* function handleSlideLeft(e) {
    e.preventDefault();
    if (imgCount < 0) {
      setImgCount(prodList.length - 1);
    } else if (imgCount + 1 >= 0) {
      setImgCount((p) => p - 1);
    }

    console.log(imgCount, prodList.length - 1);
  } */

  function handleSlideLeft(e) {
    e.preventDefault();
    if (imgCount === 0) {
      setImgCount(prodList.length - 1);
    } else {
      setImgCount((p) => p - 1);
    }

    console.log(imgCount, prodList.length - 1);
  }

  return (
    <div className="parent">
      <div
        className="cartBtn"
        onClick={() => {
          setActiveC(true);
        }}
      >
        🛒
        <span className="cartLen">{cart.length}</span>
      </div>
      <div className="cart" style={{ right: activeC ? "0" : "-1000px" }}>
        <h1>Cart ({cart.length} items)</h1>
        <h1
          className="closeCart"
          onClick={() => {
            setActiveC(false);
          }}
        >
          x
        </h1>
        <ul>
          {cart.map((e, i) => {
            return (
              <li key={e.name + i}>
                <img src={e.img} alt="" />
                <p>{e.name}</p>
                <p>₹ {e.price}</p>
                <p style={{color:"red", fontSize:"15px", background:"white", padding:"5px", borderRadius:"5px"}} onClick={() => clearCart(i)}>Remove</p>
              </li>
            );
          })}
        </ul>
        <div className="total">TOTAL CART AMOUNT : ₹{total}</div>
      </div>
      <nav>
        <h1>SUSH TRIPS</h1>
        <ul className="opts">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <main>
        <div className="l-page">
          <h1>BIG MILLION SALE</h1>
          <div className="img">
            <button className="slideBtnL" onClick={handleSlideLeft}>
              ◀
            </button>
            <img src={prodList[`${imgCount}`].img} alt="" />
            <button className="slideBtnR" onClick={handleSlideRight}>
              ▶
            </button>
          </div>
          <hr />
        </div>
        <h1 style={{ marginTop: "40px" }}>Product List</h1>
        <div className="prodList">
          {prodList.map((e, i) => {
            return (
              <li className="prod">
                <img src={e.img} alt="" />
                <div className="prod-det">
                  <p>{e.name}</p>
                  <p>₹ {e.price}</p>
                  <p className="rating">⭐ {e.rating} </p>
                </div>
                <button onClick={() => addItem(e)}>Add To Cart</button>
              </li>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
