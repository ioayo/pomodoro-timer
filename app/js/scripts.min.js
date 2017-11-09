var pomodoro = {
	minutes: 25,
	seconds: 00,
	isStarted: false,
	interval: null,
	minutesDOM: null,
	secondsDOM: null,
	intervalCallback: function() {
			console.log('setInterval is running');
			if(!this.isStarted) return false;
			if(this.seconds == 0 && this.minutes == 0) {
				this.finish();
			};
			if(this.isStarted) {
				this.seconds--;
				if (this.seconds < 0) {
					this.minutes --;
					this.seconds = 59;
				}
			};
			this.updateDOM();
	},
	start: function() {
		var self = this;
		this.isStarted = true;
		console.log(this.isStarted, 'start!');
		this.interval = setInterval(function(){ 
			self.intervalCallback.apply(self)
		}, 1000);
	},
	pause: function() {
		this.isStarted = false;
		clearInterval(this.interval);
		console.log('pause', this.isStarted);
	},
	reset: function(min, sec) {
		this.isStarted = false;
		this.minutes = min;
		this.seconds = sec;
		this.updateDOM();
		clearInterval(this.interval);
	},

	updateDOM: function() {
		this.minutesDOM.innerHTML = this.toDoubleDigits(this.minutes);
		this.secondsDOM.innerHTML = this.toDoubleDigits(this.seconds);
		console.log(this.minutes, this.seconds);
	},

	toDoubleDigits: function(number) {
		if (number < 10) {
			return "0" + parseInt(number);
		};
		return number;
	},

	finish: function() {
		this.isStarted = false;
		clearInterval(this.interval);
	},

	init: function() {

		//get minutes, seconds spans from DOM
		this.minutesDOM = document.querySelector('.timer-minutes');
		this.secondsDOM = document.querySelector('.timer-seconds');

		//define variables
		var 
		//get buttons from DOM
		//
		buttonStart = document.querySelector('.btn-start'),
		buttonPause = document.querySelector('.btn-pause'),
		buttonReset = document.querySelector('.btn-reset'),
		//save reference to pomodoro object to variable
		self = this,
		//short variables for quick reference
		seconds = this.seconds,
		minutes = this.minutes;
		
		//handle clicks on buttons
		buttonStart.addEventListener('click', function(){
			self.start();
		});

		buttonPause.addEventListener('click', function(){
			self.pause();
		});

		buttonReset.addEventListener('click', function(){
			self.reset(25,0);
		});
	},
};

window.onload = function(){
	pomodoro.init();
}

