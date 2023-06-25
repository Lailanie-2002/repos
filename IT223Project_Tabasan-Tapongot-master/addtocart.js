// function addToCart(itemName, itemImage, itemPrice) {
//     var cartItem = document.createElement('div');
//     cartItem.className = 'cart-items';

//     var closeButton = document.createElement('span');
//     closeButton.className = 'fas fa-times';
//     closeButton.addEventListener('click', function() {
//       cartItem.remove();
//     });
//     cartItem.appendChild(closeButton);

//     var image = document.createElement('img');
//     image.src = itemImage;
//     cartItem.appendChild(image);

//     var content = document.createElement('div');
//     content.className = 'content';

//     var itemNameElement = document.createElement('h3');
//     itemNameElement.textContent = itemName;
//     content.appendChild(itemNameElement);

//     var itemPriceElement = document.createElement('div');
//     itemPriceElement.className = 'price';
//     itemPriceElement.textContent = itemPrice;
//     content.appendChild(itemPriceElement);

//     cartItem.appendChild(content);

    
//     var cartContainer = document.querySelector('.cart-items-container');
//     cartContainer.appendChild(cartItem);
//   }

//   document.addEventListener('DOMContentLoaded', function() {
//     const checkoutBtn = document.querySelector('.checkout_btn');
//     const addtocartBtn = document.querySelector('.addtocartbtn');
        
//     // change ang Add to Cart to Added to Cart
//     addtocartBtn.addEventListener('click', function() {
//         addtocartBtn.textContent = 'Added to Cart!';
//         setTimeout(function() {
//         addtocartBtn.textContent = 'Add to Cart';
//         }, 2000);
//     })

//     checkoutBtn.addEventListener('click', function() {
//       // change ang button pag ma click "Checked Out"
//       checkoutBtn.textContent = 'Checked Out';
//       setTimeout(function() {
//         checkoutBtn.textContent = 'Check Out';
//       }, 1000);
  
//       // get the cart container
//       const cartContainer = document.querySelector('.cart-items-container');
  
//       // get all the cart items
//       const cartItems = cartContainer.querySelectorAll('.cart-items');
  
      
//       const animationDuration = 500; // milliseconds
//       const delayBetweenItems = 100; // milliseconds
  
//       // animation function
//       function removeCartItem(item, index) {
//         setTimeout(function() {
//           item.style.transition = `opacity ${animationDuration}ms ease`;
//           item.style.opacity = 0; // fade effect
//           item.addEventListener('transitionend', function() {
//             item.remove(); // mawala ang mga items
//           });
//         }, index * delayBetweenItems);
//       }
  
//       // animation
//       cartItems.forEach(function(item, index) {
//         removeCartItem(item, index);
//       });
//     });
//   });
  
  
//   


function addToCart(itemName, itemImage, itemPrice) {
  var cartContainer = document.querySelector('.cart-items-container');
  var cartItems = cartContainer.querySelectorAll('.cart-items');

  // Check if the item is already in the cart
  for (var i = 0; i < cartItems.length; i++) {
    var existingItemNameElement = cartItems[i].querySelector('.item-name');
    if (existingItemNameElement.textContent === itemName) {
      // Item already exists in the cart, update its quantity and total price
      var quantityElement = cartItems[i].querySelector('.item-quantity');
      var quantity = parseInt(quantityElement.textContent.split(':')[1].trim());
      quantityElement.textContent = 'Quantity: ' + (quantity + 1);

      var totalPriceElement = cartItems[i].querySelector('.total-price');
      var itemPriceValue = parseFloat(itemPrice);
      var totalPrice = parseFloat(totalPriceElement.textContent.replace('₱', '').replace(',', ''));

      totalPriceElement.textContent = '₱' + ((totalPrice / quantity) * (quantity + 1)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

      updateCartTotal();
      return; // Exit the function since the item is already in the cart
    }
  }

  // Item is not in the cart, create a new cart item
  var cartItem = document.createElement('div');
  cartItem.className = 'cart-items';

  var closeButton = document.createElement('span');
  closeButton.className = 'fas fa-times';
  closeButton.addEventListener('click', function() {
    cartItem.remove();
    updateCartTotal();
  });
  cartItem.appendChild(closeButton);

  var image = document.createElement('img');
  image.src = itemImage;
  cartItem.appendChild(image);

  var content = document.createElement('div');
  content.className = 'content';

  var itemNameElement = document.createElement('h3');
  itemNameElement.className = 'item-name';
  itemNameElement.textContent = itemName;
  content.appendChild(itemNameElement);

  var itemPriceElement = document.createElement('div');
  itemPriceElement.className = 'price';
  itemPriceElement.textContent = itemPrice;
  content.appendChild(itemPriceElement);

  var itemQuantityElement = document.createElement('div');
  itemQuantityElement.className = 'item-quantity';
  itemQuantityElement.textContent = 'Quantity: 1';
  content.appendChild(itemQuantityElement);

  cartItem.appendChild(content);

  cartContainer.appendChild(cartItem);

  updateCartTotal();
}

function updateCartTotal() {
  var cartItems = document.querySelectorAll('.cart-items');
  var total = 0;

  cartItems.forEach(function(item) {
    var itemPriceElement = item.querySelector('.price');
    var itemQuantityElement = item.querySelector('.item-quantity');
    var itemPrice = parseFloat(itemPriceElement.textContent.replace('₱', ''));
    var quantity = parseInt(itemQuantityElement.textContent.split(':')[1].trim());

    total += itemPrice * quantity;
  });

  var cartTotalElement = document.querySelector('.cart-total');
  if (!isNaN(total)) {
    cartTotalElement.textContent = 'Total: ₱' + total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    cartTotalElement.textContent = 'Total: ₱0.00';
  }
}
