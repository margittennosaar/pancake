const form = document.querySelector('.form-container');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const typeSelect = document.querySelector('#type');
const deliveryOptions = document.querySelectorAll('input[name="delivery"]'); // Delivery radio buttons
const totalPriceElement = document.querySelector('#totalPrice');
const button = document.querySelector('button');

let total = 0;
let orders = [];
let selectedToppings = [];
let selectedExtras = [];
let selectedDelivery = '';

//calculates total price. Uses dataset method. In the html we have some data-* properties.
const pancakePriceCalc = () => {
    const selectedTypeOption = typeSelect.selectedOptions[0];
    const basePrice = parseInt(selectedTypeOption.dataset.price) || 0;
    selectedPancakeType = selectedTypeOption.dataset.name;

    total = basePrice;


    selectedToppings = [];
    selectedExtras = [];
    selectedDelivery = '';

    checkToppings();
    checkDeliveryOptions();

    totalPriceElement.textContent = `${total.toFixed(0)}€`;

    //animation
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

//returnes all checked potions and ads it's values to the total price
const checkToppings = () => {
    checkboxes.forEach(item => {
        if (item.checked) {
            const itemPrice = parseInt(item.value) || 0;
            total += itemPrice;

            if (item.dataset.category === 'toppings') {
                selectedToppings.push(item.dataset.name);
            } else if (item.dataset.category === 'extras') {
                selectedExtras.push(item.dataset.name);
            }
        }
    });
};

//adds 5 to tatal if delivery is checked
const checkDeliveryOptions = () => {
    selectedDelivery = [...deliveryOptions].find(option => option.checked)?.value || 'eat_in';
    if (selectedDelivery === 'delivery') {
        total += 5;
    }
};

//displays full order info
const displayOrder = () => {
    const customerName = document.querySelector('#customerName').value || 'Guest';
    const orderType = document.querySelector('#order_type');
    const orderToppings = document.querySelector('#order_toppings');
    const orderExtras = document.querySelector('#order_extras');
    const orderName = document.querySelector('#order_name');
    const orderDelivery = document.querySelector('#order_delivery');
    const orderPrice = document.querySelector('#order_price');
    const displayOrder = document.querySelector('.order-summary')

    orderType.textContent = selectedPancakeType;
    orderToppings.textContent = selectedToppings.length ? selectedToppings.join(', ') : 'No Toppings';
    orderExtras.textContent = selectedExtras.length ? selectedExtras.join(', ') : 'No Extras';
    orderName.textContent = customerName;
    orderDelivery.textContent = selectedDelivery.charAt(0).toUpperCase() + selectedDelivery.slice(1);
    orderPrice.textContent = `${total.toFixed(2)}€`;
    displayOrder.style.display = 'block'

    const order = {
        name: customerName,
        pancakeType: typeSelect.selectedOptions[0].text,
        toppings: selectedToppings,
        extras: selectedExtras,
        deliveryMethod: selectedDelivery,
        totalPrice: total.toFixed(2),
    };

    orders.push(order);
    console.log('Orders:', orders);
};

form.addEventListener('change', pancakePriceCalc);

button.addEventListener('click', displayOrder);

pancakePriceCalc();
