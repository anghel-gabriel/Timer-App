export function timerHtml(time, addingTime) {
	return `
      <div class="timer__details">
        <p class="timer-label">INITIAL TIME <span class="selected-time">${time}</span></p>
        <p class="timer-countdown">${time}</p>
        <p class="timer-date">ADDED ${addingTime}</p>
      </div>
      <div class="timer-btns">
        <button class="timer-btns__reset"></button>
        <button class="timer-btns__playpause"></button>
        <button class="timer-btns__remove"></button>
      </div>
        `;
}
