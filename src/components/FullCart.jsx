import './emptyCart.css';
import './fullCart.css';
import carbonpic from '../assets/icon-carbon-neutral.svg';

function FullCart({ cart, products, removeFully, confirmOrder, cartRef }) {
  const number = cart.reduce((sum, item) => sum + item.quantity, 0);
  const fullPrice = totalPrice();

  function totalPrice() {
    let number = 0;
    cart.forEach((item) => {
      const price = products.find((p) => p.id === item.id).price;
      number += price * item.quantity;
    });

    return number;
  }

  //HTML
  const cartList = cart.map((item) => {
    const matchingItem = products.find((i) => i.id === item.id);
    return (
      <div key={item.id} className="basket-item-container">
        <div className="basket-item-info-container">
          <h3 className="basket-item-title">{matchingItem.name}</h3>
          <div className="basket-item-numbers">
            <p className="basket-item-amount">{item.quantity}x</p>
            <p className="basket-item-prices">
              <span className="single-price">
                @ ${(matchingItem.price / 100).toFixed(2)}
              </span>
              ${((matchingItem.price * item.quantity) / 100).toFixed(2)}
            </p>
          </div>
        </div>
        <button
          className="remove-item-container"
          onClick={() => {
            removeFully(item.id);
          }}
        >
          <div className="x-btn">X</div>
        </button>
      </div>
    );
  });

  return (
    <div className="full-cart-container" ref={cartRef}>
      <h3>Your Cart ({number})</h3>
      {cartList}
      <div className="total-info">
        <p className="order-div">Order Total</p>
        <p className="total-price">${(fullPrice / 100).toFixed(2)}</p>
      </div>
      <div className="carbon-container">
        <div className="carbon-pic">
          <img src={carbonpic} alt="" />
        </div>
        <p className="carbon-text">
          This is a <b>carbon-neutral</b> delivery
        </p>
      </div>
      <button className="confirm-order" onClick={confirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}

export default FullCart;
