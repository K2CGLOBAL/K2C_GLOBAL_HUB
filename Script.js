const products = [
  {name:"Solar Fan", price:69000, img:"https://via.placeholder.com/250x200?text=Solar+Fan"},
  {name:"Stainless Pot (Set of 6)", price:79000, img:"https://via.placeholder.com/250x200?text=Stainless+Pot"},
  {name:"14 PCs Aluminum Pot", price:59000, img:"https://via.placeholder.com/250x200?text=Aluminum+Pot"}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
  const container = document.getElementById('products');
  container.innerHTML = '';
  products.forEach((p, i)=>{
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₦${p.price.toLocaleString()}</p>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const cartDiv = document.getElementById('cart-items');
  if(cart.length === 0) { cartDiv.innerHTML = '<p>Your cart is empty</p>'; return; }
  let html = '';
  let total = 0;
  cart.forEach((item,i)=>{
    total += item.price;
    html += `<p>${item.name} - ₦${item.price.toLocaleString()} <button onclick="removeFromCart(${i})">Remove</button></p>`;
  });
  html += `<p><strong>Total: ₦${total.toLocaleString()}</strong></p>`;
  cartDiv.innerHTML = html;
}

function removeFromCart(index){
  cart.splice(index,1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

document.getElementById('checkout').addEventListener('click', function(){
  if(cart.length===0){ alert("Your cart is empty!"); return; }
  let totalAmount = cart.reduce((sum,item)=>sum+item.price,0);
  let handler = PaystackPop.setup({
    key: 'pk_test_1224eb0ed84251c2ca7babe4c33be28d5949783f',
    email: 'customer@example.com',
    amount: totalAmount*100,
    currency:"NGN",
    ref: ''+Math.floor((Math.random()*1000000000)+1),
    callback:function(response){
      alert('Payment successful! Reference: '+response.reference);
      cart=[];
      localStorage.removeItem('cart');
      displayCart();
    },
    onClose:function(){ alert('Transaction cancelled.'); }
  });
  handler.openIframe();
});

displayProducts();
displayCart();
