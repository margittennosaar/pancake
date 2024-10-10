const form = document.querySelector('.form-container');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const typeSelect = document.querySelector('#type');
const totalPriceElement = document.querySelector('#totalPrice');
let total = 0;         
// declaring global variables accessing HTMl elements and price total

const pancakePriceCalc = () => {    
    // declaring price calculation as arrow function            
    total = parseInt(typeSelect.value) || 0;    
    // set price total to parsed value of selected pancake type 

    checkToppings();    
    // run function to check chosen pancake toppings, declared as separate function below

    totalPriceElement.textContent = `${total.toFixed(0)}€`; 
    // content of price element visible to customer set to price total (without decimal places) + € currency symbol

    const priceBanner = document.querySelector('.price-banner');    
    // declaring local variable to access price banner in HTML 
    priceBanner.animate(    
        // using the method .animate() on the price banner and then defining its the visual effect on the element (small increase in scale /size of price total when the price changes)
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
    // declaring arrow function to check which toppings' checkboxes are checked
    for (const item of checkboxes) {
        // for-in loop to check all checkbox items
        if (item.checked) {     // if item checked...
            const itemPrice = parseInt(item.value) || 0;    
            // declaring block variable for item's price, parsing item's value (integer) 
            total += itemPrice; 
            // adding item's price to price total (as number)
        }
    }
};

form.addEventListener('change', pancakePriceCalc);      
// listen to any changes in the pancake order form container; when any occur, run function to calculate price 

pancakePriceCalc();     
// run pancake price function (sets default pancake type value to price total before customer's changes)
