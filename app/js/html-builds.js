// import dataToDisplay from './data';
// import { curry, splitData, compose, mapper } from './lib';

// html element creation
const createHtml = (el) => { return document.createElement(el);};

// adding attribute to created html element
const createAttr = (el, atr, name) => { return el.setAttribute(atr, name);};

// appending html element to requirred location 
const appendElement = (el, placeholder) => {
	placeholder.appendChild(el);
	return placeholder;
};

// replace existing class with new class
const replaceClass = (el, existingClass, newClass) => {
	el.className.toString().replace(existingClass, newClass);
}

// create Trailing Zeroes
const createTrailingZeroes = (number) => {
	return number < 10 ? `0${number}` : number;
};

// create Date Format
const createDateFormat = (timestamp) => {
	const currentTime = new Date(timestamp);
	return {
		hours: createTrailingZeroes(currentTime.getHours()),
		minutes: createTrailingZeroes(currentTime.getMinutes()),
		date: `${currentTime.getFullYear()}/${createTrailingZeroes(currentTime.getMonth() + 1)}/${createTrailingZeroes(currentTime.getDate())}`,
		ampm: currentTime.getHours() >= 12 ? 'pm' : 'am'
	};
};



export { createHtml, createAttr, appendElement, createTrailingZeroes, createDateFormat, replaceClass };