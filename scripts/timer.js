import { timerHtml } from './timerHtml.js';

export class Timer {
	constructor(countdownValue = 20, addingTime = new Date().toLocaleString('ro-RO')) {
		this.countdownValue = countdownValue;
		this.addingTime = addingTime;
		this.isActive = false;
		this.timerElement = document.createElement('div');
		this.timerElement.className = 'timer';
		//innerhtml for the element
		this.timerElement.innerHTML = timerHtml(this.countdownValue, this.addingTime);
		//the countdown span
		this.countdownSpan = this.timerElement.querySelector('.timer-countdown');
		//timer play button and its event listener
		this.playPauseBtn = this.timerElement.querySelector('.timer-btns__playpause');
		this.playPauseBtn.addEventListener('click', () => this.playPauseHandler());
		//timer reset button and its event listener
		this.resetBtn = this.timerElement.querySelector('.timer-btns__reset');
		this.resetBtn.addEventListener('click', () => this.resetCountdownHandler());
		//timer stop button and its event listener
		this.removeBtn = this.timerElement.querySelector('.timer-btns__remove');
		this.removeBtn.addEventListener('click', () => this.removeTimeHandler());
		//setting a finish sound to play when the countdown reaches 0
		this.finishSound = new Audio('./assets/sounds/timer.mp3');
		//adding fade-in animation when adding a timer
		setTimeout(() => {
			this.timerElement.classList.add('show');
		}, 10);
	}
	//play-pause handler
	playPauseHandler() {
		if (this.isActive) {
			//pause
			this.isActive = false;
			//pausing the countdown
			clearInterval(this.countdown);
		} else {
			//play
			this.isActive = true;
			//decrementing total seconds once a second
			this.countdown = setInterval(() => {
				this.decreaseCountdown();
			}, 1000);
		}
		//changing the icon of play-pause button when the button is clicked
		this.playPauseBtn.classList.toggle('playing');
	}
	//reset countdown handler
	resetCountdownHandler() {
		this.countdownValue = this.timerElement.querySelector('.selected-time').textContent;
		this.countdownSpan.textContent = this.countdownValue;
	}
	//remove timer handler
	removeTimeHandler() {
		// adding fade-out animation when removing a timer
		this.timerElement.classList.add('delete');
		//waiting until the timer fades out and then removing the timer
		setTimeout(() => {
			this.timerElement.addEventListener('transitionend', () => {
				this.timerElement.remove();
			});
		}, 500);
	}
	//decrease countdown method
	decreaseCountdown() {
		//taking the hours, minutes and seconds from countdownValue
		const [hours, minutes, seconds] = this.countdownValue.split(':').map((el) => parseInt(el));
		//calculating total seconds
		let totalSeconds = hours * 3600 + minutes * 60 + seconds;
		//adding a breakpoint for the countdown
		if (totalSeconds <= 0) {
			//when the countdown reaches 0, we will play this sound and change the play-pause button icon
			this.finishSound.play();
			this.playPauseBtn.click(); //i used this way of changing the play-pause icon to stop the finish sounds playing to infinity
			return;
		}
		//decrementing total seconds, once per second (we have interval set)
		totalSeconds--;
		//updating the hours, minutes, seconds
		const currHours = Math.floor(totalSeconds / 3600);
		const currMinutes = Math.floor((totalSeconds % 3600) / 60);
		const currSeconds = totalSeconds % 60;
		//updating the visual
		this.countdownValue = `${currHours.toString().padStart(2, '0')}:${currMinutes.toString().padStart(2, '0')}:${currSeconds.toString().padStart(2, '0')}`;
		this.countdownSpan.textContent = this.countdownValue;
	}
}
