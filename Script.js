callback:function(response){
  let pickupCode = "K2C-" + Math.floor(100000 + Math.random() * 900000);

  let orderDetails = cart.map(item => item.name).join(", ");
  let totalAmount = cart.reduce((sum,item)=>sum+item.price,0);

  // Message for YOU
  let adminMessage = `New Order!\n\nItems: ${orderDetails}\nTotal: ₦${totalAmount}\nPickup Code: ${pickupCode}\nRef: ${response.reference}`;

  let yourNumber = "2348134153644";
  let adminURL = `https://wa.me/${yourNumber}?text=${encodeURIComponent(adminMessage)}`;

  // Message for CUSTOMER
  let customerMessage = `Thank you for shopping with K2C GLOBAL HUB 😊\n\nYour Order:\n${orderDetails}\n\nTotal: ₦${totalAmount}\n\nYour Pickup Code: ${pickupCode}\n\nPlease keep this code safe.`;

  // SHOW CLEAR MESSAGE ON SCREEN
  document.body.innerHTML = `
    <div style="text-align:center; padding:30px; font-family:Arial;">
      <h2>✅ Payment Successful!</h2>
      <p><strong>Your Pickup Code:</strong></p>
      <h1 style="color:#ff6f61;">${pickupCode}</h1>
      <p>Please screenshot or copy this code.</p>
      <p>We have also prepared your order details below:</p>
      <p>${orderDetails}</p>
      <p><strong>Total Paid: ₦${totalAmount}</strong></p>
      <br>
      <a href="${adminURL}" style="background:#25D366;color:white;padding:10px 20px;border-radius:5px;text-decoration:none;">
        Send Order to Seller (WhatsApp)
      </a>
    </div>
  `;

  cart = [];
  localStorage.removeItem('cart');
}
