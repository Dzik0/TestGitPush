import emptyCart from '../assets/illustration-empty-cart.svg';
import './emptyCart.css';

function EmptyCart() {
  return (
    <div className="empty-cart-container">
      <h3>Your Cart (0)</h3>
      <div className="flex-cont">
        <div className="pic-container">
          <img src={emptyCart} alt="empty cart icon" />
        </div>
      </div>
      <p className="empty-cart-msg">Your added items will appear here</p>
    </div>
  );
}

export default EmptyCart;
