const form = document.querySelector('.form-container');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const typeSelect = document.querySelector('#type');
const deliveryOptions = document.querySelectorAll('input[name="delivery"]'); // Delivery radio buttons
const totalPriceElement = document.querySelector('#totalPrice');
const button = document.querySelector('button');
// declaring global variables to access the HTML elements

let total = 0;
let orders = [];
let selectedToppings = [];
let selectedExtras = [];
let selectedDelivery = '';
// declaring empty, global variables (number, arrays, string) for pancake order input acquired in functions below

const pancakePriceCalc = () => {
    const selectedTypeOption = typeSelect.selectedOptions[0]; 
    // declaring variable for selected pancake option (index of option)
    const basePrice = parseInt(selectedTypeOption.dataset.price) || 0; 
    // declaring price of chosen pancake option as base price (parsed to number)
    selectedPancakeType = selectedTypeOption.dataset.name;  
    // setting name of chosen pancake option as selectedPancakeType-variable

    total = basePrice;  // setting base price as price total


    selectedToppings = [];
    selectedExtras = [];
    selectedDelivery = '';
    // sets arrays to be empty before running checkToppings/delivery function

    checkToppings();            
    checkDeliveryOptions();     
    // running functions to check chosen toppings and delivery option

    totalPriceElement.textContent = `${total.toFixed(0)}€`;

    const priceBanner = document.querySelector('.price-banner');
    priceBanner.animate(
        [
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
        ],
        {
            duration: 100,
            iterations: 1,
        }
    );
};

const checkToppings = () => {
    checkboxes.forEach(item => {
        if (item.checked) {
            const itemPrice = parseInt(item.value) || 0;
            total += itemPrice;

            if (item.dataset.category === 'toppings') {
                selectedToppings.push(item.dataset.name);   
                // if item's data-category is "toppings", add item's data-name to selectedToppings-array
            } else if (item.dataset.category === 'extras') {
                selectedExtras.push(item.dataset.name);     
                // if item's data-category is "extras", add item's data-name to selectedExtras-array
            }
        }
    });
};

const checkDeliveryOptions = () => {        
    // declaring function to check which delivery option is chosen
    selectedDelivery = [...deliveryOptions].find(option => option.checked)?.value || 'eat_in';
    // setting selectedDelivery-variable, finding which delivery option radio button is selected and recording its value, or eat-in as default answer
    if (selectedDelivery === 'delivery') {
        total += 5;
    }
    // if 'delivery' -option chosen, add 5 to price total (as number)
};

const displayOrder = () => {
    // declaring arrow function to display summary of customer's pancake order
    const customerName = document.querySelector('#customerName').value || 'Guest';
    const orderType = document.querySelector('#order_type');
    const orderToppings = document.querySelector('#order_toppings');
    const orderExtras = document.querySelector('#order_extras');
    const orderName = document.querySelector('#order_name');
    const orderDelivery = document.querySelector('#order_delivery');
    const orderPrice = document.querySelector('#order_price');
    const displayOrder = document.querySelector('.order-summary')
    // declaring local variables to access HTML elements

    //setting these variables to display fetched form input as text content in order summary:
    orderType.textContent = selectedPancakeType;
    orderToppings.textContent = selectedToppings.length ? selectedToppings.join(', ') : 'No Toppings';
    // if items have been added to the selectedToppings-array, display them in a string with commas separating items; if array is empty, display 'No Toppings'
    orderExtras.textContent = selectedExtras.length ? selectedExtras.join(', ') : 'No Extras';
    // if items have been added to the selectedExtras-array, display them in a string with commas separating items; if array is empty, display 'No Extras'
    orderName.textContent = customerName; 
    // display customer's name (text input, as string)
    orderDelivery.textContent = selectedDelivery.charAt(0).toUpperCase() + selectedDelivery.slice(1);
    // display chosen delivery type, as string starting with a capital letter
    orderPrice.textContent = `${total.toFixed(2)}€`;
    // display order price, to two decimals 
    displayOrder.style.display = 'block'
    // make order summary visible by changing display property from 'none' to 'block' 

    const order = {
        // declare order-object to store current order data from form input 
        name: customerName,
        pancakeType: typeSelect.selectedOptions[0].text,
        toppings: selectedToppings,
        extras: selectedExtras,
        deliveryMethod: selectedDelivery,
        totalPrice: total.toFixed(2), // price to two decimals
    };

    orders.push(order);
    // add current order to orders-array
    console.log('Orders:', orders); 
    // show orders-array in console to confirm that current order added
};

form.addEventListener('change', pancakePriceCalc);

button.addEventListener('click', displayOrder);
// listen to clicks on the button; when clicked, run function to display order

pancakePriceCalc();
