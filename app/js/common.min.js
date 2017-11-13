var pomodoro = {
	minutes: 25,
	seconds: 00,
	isStarted: false,
	interval: null,
	loopTitle: null,
	minutesDOM: null,
	secondsDOM: null,
	pomodoroCount: 0,
	flagTitle: true,
	flagTimer: false,
	flagMarathon: false,
	loopDocTitle: function(string1, string2) {
		if (this.flagTitle) {
			document.title = string1;
			this.flagTitle = false;
		} else {
			document.title = string2;
			this.flagTitle = true;
		}
	},

	setActualTextButton: function(button) {
		if (this.isStarted) {
			button.innerHTML = 'Pause';
		} else {
			button.innerHTML = 'Start';
		}
	},

	intervalCallback: function(timerType, marathon) {
			if(!this.isStarted) return false;
			if(this.seconds == 0 && this.minutes == 0) {
				this.finish(timerType, marathon);
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

	start: function(timerType, marathon) {
		clearInterval(this.loopTitle);
		if (marathon) {
			this.docTitle = this.docTitle + ' Marathon';
		};
		document.title = this.docTitle;
		var self = this;
		this.isStarted = true;
		this.interval = setInterval(function(){ 
			self.intervalCallback.call(self, timerType, marathon)
		}, 1);
	},

	pause: function() {
		this.isStarted = false;
		clearInterval(this.interval);
	},

	reset: function(min, sec) {
		this.minutes = min;
		this.seconds = sec;
		this.updateDOM();
		this.isStarted = false;
		clearInterval(this.interval);
	},
	

	updateDOM: function() {
		this.minutesDOM.innerHTML = this.toDoubleDigits(this.minutes);
		this.secondsDOM.innerHTML = this.toDoubleDigits(this.seconds);
	},

	toDoubleDigits: function(number) {
		if (number < 10) {
			return "0" + parseInt(number);
		};
		return number;
	},

	finish: function(timerType, marathon) {
		var self = this;

		if (timerType == 'Work') {
			this.pomodoroCount++;
		};
		
		this.shortDing.play();
		this.isStarted = false;
		
		clearInterval(this.interval);
		if (marathon) {
			if (!this.flagTimer) {
				if (this.pomodoroCount % 4 === 0) {
					this.setTimer(15, 0, 'Long Break', true);
					this.flagTimer = !this.flagTimer;
				} else {
					this.setTimer(5, 0, 'Short Break', true);
					this.flagTimer = !this.flagTimer;
				}
			} else {
				this.setTimer(25, 0, 'Work', true);
				this.flagTimer = !this.flagTimer;
			}
		};
	},

	//event handlers for timer types 
	
	setTimer: function(min, sec, type, marathon) {
		this.docTitle = type;
		this.reset(min,sec);
		this.start(type, marathon);
	},

	init: function() {
		//get minutes, seconds spans from DOM
		this.minutesDOM = document.querySelector('.timer-minutes');
		this.secondsDOM = document.querySelector('.timer-seconds');
		this.shortDing = document.getElementById('shortDing');
		this.docTitle = document.title;
		this.marathonButton = document.querySelector('.btn-marathon');
		this.defaultTimerButton = document.getElementById('pomodoro'),
		this.shortBreakButton = document.getElementById('shortBreak'),
		this.longBreakButton = document.getElementById('longBreak');
		//define variables
		var 
		//get buttons from DOM
		buttonStart = document.querySelector('.btn-start'),
		buttonPause = document.querySelector('.btn-pause'),
		buttonReset = document.querySelector('.btn-reset'),
		//save timer type button list to a variable
		timerTypeContainer = document.querySelector('.timer-types');
		//save reference to pomodoro object to variable
		self = this,
		//short variables for quick reference
		seconds = this.seconds,
		minutes = this.minutes;

		//handle clicks on buttons
		buttonStart.addEventListener('click', function(){
			if (!self.flagMarathon) {
					if (!self.isStarted) {
					self.start();
				} else {
					self.pause();
				};
				self.setActualTextButton(buttonStart);
			} else {
				return false;
			}
		});

		buttonReset.addEventListener('click', function(){
			self.flagMarathon = false;
			self.reset(25,0);
			self.setActualTextButton(buttonStart);
		});

		this.defaultTimerButton.addEventListener('click', function() {
			self.flagMarathon = false;
			self.setTimer.call(self, 25, 0, 'Work', false);
			self.setActualTextButton(buttonStart);
		});

		this.shortBreakButton.addEventListener('click', function(){
			self.flagMarathon = false;
			self.setTimer.call(self, 5, 0, 'Short Break', false);
			self.setActualTextButton(buttonStart);
		});

		this.longBreakButton.addEventListener('click', function(){
			self.flagMarathon = false;
			self.setTimer.call(self, 10, 0, 'Long Break', false);
			self.setActualTextButton(buttonStart);
		});
		
		this.marathonButton.addEventListener('click', function(){
			if (self.flagMarathon) {
				return;
			};
			self.flagMarathon = true;
			self.setTimer.call(self, 25, 0, 'Work', true);
			self.setActualTextButton(buttonStart);
		});
		
		timerTypeContainer.addEventListener('click', function(e){
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].children[0].classList.remove('active');
			};
			e.target.classList.add('active');
		});

	},
};

window.onload = function(){
	pomodoro.init();
}

