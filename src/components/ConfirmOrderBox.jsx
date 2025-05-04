import confirm from '../assets/icon-order-confirmed.svg';
import pic from '../../public/image-baklava-thumbnail.jpg';

function ConfirmOrderBox({ cart, products, startNewOrder, confirmRef }) {
  const fullPrice = totalPrice();

  //FUNCTIONS
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
    const matching = products.find((p) => p.id === item.id);

    return (
      <div className="single-item-container" key={item.id}>
        <div className="left-side-container">
          <div className="left-pic">
            <img src={matching.image.thumbnail} alt="" />
          </div>
          <div className="left-side-info">
            <div className="item-title">{matching.name}</div>
            <div className="left-side-numbers">
              <div className="left-item-amount">{item.quantity}x</div>
              <div className="left-item-single-price">
                @ ${(matching.price / 100).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div className="single-item-full-price">
          ${((matching.price * item.quantity) / 100).toFixed(2)}
        </div>
      </div>
    );
  });

  console.log(cartList);
  return (
    <>
      <div ref={confirmRef} className="ordered-box">
        <div className="conf-box">
          <img src={confirm} alt="Confirmb logo" />
        </div>
        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
        <div className="final-order-container">
          {cartList}
          <div className="order-box-summary">
            <div className="summary-title">Order Total</div>
            <div className="summary-price">${(fullPrice / 100).toFixed(2)}</div>
          </div>
        </div>
        <button className="start-new-order-btn" onClick={startNewOrder}>
          Start New Order
        </button>
      </div>
    </>
  );
}

export default ConfirmOrderBox;
