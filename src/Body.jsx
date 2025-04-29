import { useEffect, useRef, useState } from 'react';
import Food from './components/Food.jsx';
import EmptyCart from './components/EmptyCart.jsx';
import FullCart from './components/FullCart.jsx';
import ConfirmOrderBox from './components/ConfirmOrderBox.jsx';

function Body() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(false);
  const cartRef = useRef();

  useEffect(() => {
    fetch('../data.json')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  console.log(cart);
  //FUNCTIONS
  function addToCart(id) {
    setCart((prevC) => {
      const found = cart.find((p) => p.id === id);
      if (!found) {
        return [...prevC, { id: id, quantity: 1 }];
      }

      return prevC.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    });
  }

  function removeFromCart(id) {
    setCart((prevC) =>
      prevC
        .map((item) => {
          const found = item.id === id;
          if (found) {
            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        })
        .filter((item) => item.quantity !== 0)
    );
  }

  function removeFully(id) {
    setCart((prevC) => prevC.filter((item) => item.id !== id));
  }

  function confirmOrder() {
    setOrder(true);
  }

  function startNewOrder() {
    setCart([]);
    setOrder(false);
  }

  function scrollCart() {
    cartRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  //RENDERED HTML
  const foodList = products.map((food, id) => (
    <Food
      key={id}
      food={food}
      cart={cart}
      addToCart={() => {
        addToCart(food.id);
      }}
      removeFromCart={() => {
        removeFromCart(food.id);
      }}
    />
  ));

  return (
    <main>
      {order && (
        <div className="ordered">
          <ConfirmOrderBox
            cart={cart}
            products={products}
            startNewOrder={startNewOrder}
          />
        </div>
      )}
      <div className="main">
        <div className="header-div">
          <h1>Desserts</h1>
          {cart.length > 0 && (
            <div>
              <button className="cart" onClick={scrollCart}>
                🛒
              </button>
            </div>
          )}
        </div>
        <section className="food-container">{foodList}</section>
      </div>
      <div className="cart-container">
        {cart.length > 0 ? (
          <FullCart
            cart={cart}
            products={products}
            removeFully={removeFully}
            confirmOrder={confirmOrder}
            cartRef={cartRef}
          />
        ) : (
          <EmptyCart />
        )}
      </div>
    </main>
  );
}

export default Body;

//TO DO
// + FIX IMAGES FOR DIFF RESOLUTION
// + MAKE CONFIRM ORDER BUTTON INTERACTIVE
// - FIX PLACEMENT FOR ORDER SUMMARY FOR EACH SCREEN SIZE
