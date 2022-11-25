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

// Class

class Contact {
    constructor(name, city, email) {
        this.name = name;
        this.city = city;
        this.email = email;

        this.element = document.createElement('div');
        document.querySelector('.container').appendChild(this.element);

        this.element.style.width = "200px";
        this.element.style.height = "150px";
        this.element.style.backgroundColor = "#27272f";
    }


}

onEvent('click', submit, function() {
    let inputVal = input.value;
    const arr = inputVal.split(', ');
    console.log(arr);
    if (arr.length === 3) {
        const contactBox = new Contact(arr);
    } else if (arr.length !== 2){
        console.log('Greater/less than 3 values')
    } else if (arr) {

    }
});