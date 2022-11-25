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

const containContact = select('.wrapper');

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
        }
        
        // Removal of contact on click
        element.addEventListener('click', function() {
            if(element.matches('div')) {    
                element.remove();
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

    // If not then it will display an error and not continue the code
    } else if (arr.length !== 2){
        console.log('Greater/less than 3 values');
    }
});