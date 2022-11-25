'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

// Selectors
const input = select('.input');
const submit = select('.submit');

const error = select('.error');

const containContact = select('.wrapper');

const counter = select('.counter');

// Counter for number of contacts added
let countContact = 0;

// Class
class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    get city() {
        return this.#city;
    }

    get email() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.#email)) {
                return true;
            }
            // Error for invalid email
            console.log("Invalid email, use 'example@mail.com' to register");
            return false;
        }

    // Creates the contact
    listContacts() {
        let element = document.createElement('div');
        
        containContact.prepend(element);
        element.classList.add('contact');
        
        let nameP = document.createElement('p');
        nameP.innerText = `Name: ${this.#name}`;
        element.appendChild(nameP);

        let cityP = document.createElement('p');
        cityP.innerText = `City: ${this.#city}`;
        element.appendChild(cityP);
        
        // Will check if email is valid, if not then error created
        if(this.email) {
            let emailP = document.createElement('p');
            emailP.innerText = `Email: ${this.#email}`;
            element.appendChild(emailP);
        } else {
            let emailP = document.createElement('p');
            emailP.innerText = `Email: Invalid`;
            element.appendChild(emailP);

            error.style.visibility = 'initial';
            error.innerHTML = 'Please enter a valid email on contacts'
        }
        
        // Removal of contact on click
        element.addEventListener('click', function() {
            if(element.matches('div')) {    
                element.remove();

                error.style.visibility = 'initial';
                error.innerHTML = 'Contact removed';
                // Removes 1 point upon deletion
                countContact--;

                counter.innerText = `Number of contacts: ${countContact}`;

                if(countContact === 0) {
                    counter.innerText = '';
                }
            }
        })
    }
}

// Submit button for input
onEvent('click', submit, function() {
    let inputVal = input.value;
    const arr = inputVal.split(', ');

    let name = arr[0];
    let city = arr[1];
    let email = arr[2];

    // This will display the array just as a check
    console.log(arr);
    
    // Checks if 3 values have been input
    if (arr.length === 3) {
        const contactBox = new Contact(name, city, email);
        contactBox.listContacts();
        countContact++;

        counter.innerText = `Number of contacts: ${countContact}`;
    // If not then it will display an error and not continue the code
    } else if (arr.length !== 2){
        error.style.visibility = 'initial';
        error.innerHTML = 'Please input info in the format of: Name, City, example@mail.com';
        console.log('Greater/less than 3 values');
    }
});