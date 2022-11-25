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
        return this.#email;
    }

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
        
        let emailP = document.createElement('p');
        emailP.innerText = `Email: ${this.#email}`;
        element.appendChild(emailP);

        element.addEventListener('click', function() {
            if(element.matches('div')) {
                element.remove();
            }
        })
    }


}

onEvent('click', submit, function() {
    let inputVal = input.value;
    const arr = inputVal.split(', ');
    console.log(arr);
    if (arr.length === 3) {
        const contactBox = new Contact(arr);
        contactBox.listContacts();
    } else if (arr.length !== 2){
        console.log('Greater/less than 3 values');
    }
});