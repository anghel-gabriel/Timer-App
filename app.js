'use strict';

import { Timer } from '../scripts/timer.js';

//defining form container
const form = document.querySelector('form');
//defining add button
const addBtn = document.querySelector('.add__btn');
//defining timers container
const timersContainer = document.querySelector('.timers-container');
//current day and month container
const currDayMonthContainer = document.querySelector('.date__day-month');
//current year container
const currYearContainer = document.querySelector('.date__year');
//getting the current date and formatting
const currentDate = new Date();
const dayMonthFormatted = currentDate.toLocaleString('en-US', { day: 'numeric', month: 'short' }).toUpperCase();
const yearFormatted = currentDate.toLocaleString('en-US', { year: 'numeric' });
//taking day and month and rearrangeing them
const [day, month] = dayMonthFormatted.split(' ');
const formattedDayMonth = `${day}${month}`;
//displaying them into their containers
currDayMonthContainer.textContent = formattedDayMonth;
currYearContainer.textContent = yearFormatted;
//hours, minutes and seconds input elements

//timer form event listener
form.addEventListener('submit', function (e) {
	//removing the default behaviour of form (refreshing the page)
	e.preventDefault();
	//taking the hours input and storing into hours const
	const hoursInput = document.getElementById('hours');
	const hours = hoursInput.value.slice(-2).padStart(2, '0');
	//taking the minutes input and storing into minutes const
	const minutesInput = document.getElementById('minutes');
	const minutes = minutesInput.value.slice(-2).padStart(2, '0');
	//taking the seconds input and storing into seconds const
	const secondsInput = document.getElementById('seconds');
	const seconds = secondsInput.value.slice(-2).padStart(2, '0');
	//countdown value
	const countdownValue = `${hours}:${minutes}:${seconds}`;
	//setting the adding time
	const addingTime = new Date().toLocaleString('ro-RO');
	//creating a new Timer instance
	const newTimer = new Timer(countdownValue, addingTime);
	timersContainer.prepend(newTimer.timerElement);
	//resetting the default values for timer form inputs
	hoursInput.value = minutesInput.value = secondsInput.value = '00';
});

//adding a default timer
addBtn.click();
