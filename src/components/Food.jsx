import cartpic from '../assets/icon-add-to-cart.svg';
import './food.css';
import { useWindowSize } from '@uidotdev/usehooks';

function Food({ food, addToCart, removeFromCart, cart }) {
  const { width } = useWindowSize();
  const priceString = (food.price / 100).toFixed(2);
  const found = cart.find((p) => p.id === food.id);
  const itemQuantity = found ? found.quantity : 0;
  const style = found
    ? { boxShadow: '0px 0px 0px 2px hsl(14,86%,42%)' }
    : { boxShadow: '0px 0px 0px 0px black' };

  //FUNCTIONS
  function choosePic() {
    if (width > 768 && width < 1400) {
      return food.image.tablet;
    }

    if (width > 1400) {
      return food.image.desktop;
    }

    return food.image.mobile;
  }

  return (
    <div className="container">
      <div className="relative-container">
        <div className="img-container" style={style}>
          <img src={choosePic()} alt="food picture" />
        </div>
        {!found ? (
          <button className="main-btn" onClick={addToCart}>
            <div className="button-div">
              <img src={cartpic} alt="" className="cart-pic" />
              <p>Add to Cart</p>
            </div>
          </button>
        ) : (
          <div className="add-remove-btn">
            <div className="btns-div">
              <button
                className="btn-inside"
                onClick={() => {
                  removeFromCart();
                }}
              >
                <div className="minus-div">-</div>
              </button>
              <div className="count-inside">{itemQuantity}</div>
              <button
                className="btn-inside"
                onClick={() => {
                  addToCart();
                }}
              >
                <div className="plus-div">+</div>
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="info-container">
        <h3>{food.category}</h3>
        <p className="description">{food.name}</p>
        <p className="price">${priceString}</p>
      </div>
    </div>
  );
}

export default Food;
