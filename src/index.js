const url = "http://localhost:3000";

//* HTML Selectors
const menuItems = document.querySelector("#menu-items");
const menuDisplay = document.querySelector("#dish");
const cartForm = document.querySelector("#cart-form");
const dishDetails = document.querySelector("#dish");
const dishImage = document.querySelector("#dish-image");
const dishName = document.querySelector("#dish-name");
const dishDescription = document.querySelector("#dish-description");
const dishPrice = document.querySelector("#dish-price");
const dishText = document.querySelector("#dish-text");
const cartAmount = document.querySelector("#cart-amount");
const numberInCart = document.querySelector("#number-in-cart");
const totalPrice = document.querySelector("#total");
let dishList;
let currentDish;

//* Get Data
getJSON(url + "/menu").then((dishes) => {
  dishes.forEach(renderMenu);
  renderDishDetails(dishes[0]);
  dishList = dishes;
  //   updateCartTotal();
});

//* Render Functions
const renderMenu = (dish) => {
  const span = document.createElement("span");
  span.addEventListener("click", () => renderDishDetails(dish));
  span.id = dish.id;
  span.src = dish.image;
  span.description = dish.description;
  span.price = dish.price;
  span.number_in_bag = dish.number_in_bag;
  span.name = dish.name;
  span.textContent = dish.name;
  menuItems.append(span);
};

const renderDishDetails = (dish) => {
  currentDish = dish;
  dishName.textContent = dish.name;
  dishImage.src = dish.image;
  dishDescription.textContent = dish.description;
  dishPrice.textContent = `$${dish.price}`;
  numberInCart.textContent = dish.number_in_bag;
};

//! not working currently
//! need to update price total without changing i.number_in_bag
// const updateCartTotal = () => {
//   let total = 0;
//   dishList.forEach((i) => {
//     total += i.price * i.number_in_bag;
//   });
//   totalPrice.textContent = total.toFixed(2);
// };

cartForm.addEventListener("submit", (e) => {
  console.log("submitted");
  e.preventDefault();
  const inputValue = parseInt(cartAmount.value);
  const currentValue = currentDish.number_in_bag;
  currentDish.number_in_bag = currentValue + inputValue;
  numberInCart.textContent = currentDish.number_in_bag;
  //! updateCartTotal function not working as intended atm
  //   updateCartTotal();
  //! cartForm.reset not working as expected, currently
  cartForm.reset();
});

//* When the user clicks on the menu items on the left,
//* they should see all the details for that specific menu item.
