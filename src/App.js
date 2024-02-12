import React, { useState } from 'react';

//Hard coded data for the products
const products = [
  { id: 1, name: 'Chicken', description: '1 kg chest piece', price: 10 },
  { id: 2, name: 'Meat', description: '1 kg lean meat', price: 10 },
  { id: 3, name: 'Milk', description: '1 liter', price: 5 },
  { id: 4, name: 'Eggs', description: '30 eggs', price: 10 },
  { id: 5, name: 'Bread', description: '1 packet', price: 2 },
];

//Product reuseable functional component
const Product = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  //Adding the data to cart
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reset quantity to 1 after adding to cart
  };

  // reuseable component for hard coded data
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <input
        type="number"
        value={quantity}
        min={1}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};
// Functional Component for Shooping Cart page
const CartPage = ({ cart, removeFromCart, checkout }) => (
  <div>
    <h2>Shopping Cart</h2>
    <ul>
      {cart.map(item => (
        <li key={item.product.id}>
          {item.product.name} - Quantity: {item.quantity}
          <button onClick={() => removeFromCart(item.product)}>Remove</button>
        </li>
      ))}
    </ul>
    <button onClick={checkout}>Checkout</button>
  </div>
);
// Functional Component for Checkout Page
const AccountPage = ({ user, updateUser }) => {
  const [shippingAddress, setShippingAddress] = useState(user.shippingAddress || '');

  const handleUpdateShippingAddress = () => {
    updateUser({ ...user, shippingAddress });
  };

  // Render the UI for Checkout page
  return (
    <div>
      <h2>Account</h2>
      <input
        type="text"
        placeholder="Enter shipping address"
        value={shippingAddress}
        onChange={e => setShippingAddress(e.target.value)}
      />
      <button onClick={handleUpdateShippingAddress}>Update Shipping Address</button>
    </div>
  );
};


// Main Component for the home page
const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({}); // Assuming user is logged in

  // getting all the details for the cart
  const [product1, setproduct1] = useState("");
  const [product2, setproduct2] = useState("");
  const [product3, setproduct3] = useState("");
  const [product4, setproduct4] = useState("");
  const [product5, setproduct5] = useState("");

  // adding the individual quantlity to cart and update the cart
  const addToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(
        cart.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCart([...cart, { product, quantity }]);
    }
  };

  // remove an item from the cart function
  const removeFromCart = product => {
    setCart(cart.filter(item => item.product.id !== product.id));
  };

  // When checkout button is clicked 
  const checkout = () => {
    window.location.href = '/account';
  };
  // update user deatils
  const updateUser = updatedUser => {
    setUser(updatedUser);
  };
  // Displaying the UI on Page
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/account">Account</a>
          </li>
        </ul>
      </nav>
      {/* if home is called */}
      {window.location.pathname === '/' && (
        <div>
          <h2>Welcome to my Store</h2>
          <h3>Here are the today fresh products</h3>
          {products.map(product => (
            <Product key={product.id} product={product} onAddToCart={addToCart} onChange = {getData}/>
          ))}

          <button value='Submit' onClick={sendDataToShoppingCartPage(product1, product2, product3, product4, product5)}>Add to cart</button>
        </div>
      )}
      {/*  if shopping cart page is called */}
      {window.location.pathname === '/cart' && (
        <CartPage cart={cart} removeFromCart={removeFromCart} checkout={checkout} />
      )}
      {/* if checkout page is called */}
      {window.location.pathname === '/account' && (
        <AccountPage user={user} updateUser={updateUser} />
      )}
    </div>
  );
};

export default App;
