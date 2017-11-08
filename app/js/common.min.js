var pomodoro = {
	minutes: 0,
	seconds: 58,
	isStarted: true,
	interval: null,
	init: function(){
		var self = this,
		seconds = self.seconds,
		minutes = self.minutes;
		this.interval = setInterval(function(){
			if(self.isStarted) {
				console.log(minutes, seconds);
				seconds++;
				if (seconds > 59) {
					minutes ++;
					seconds = 0;
				}
			} 
		}, 1000)
	},
	stop: function(){
		this.isStarted = !this.isStarted;
		console.log(this.isStarted);
	}
};

window.onload = function(){
	pomodoro.init();
	var button = document.querySelector('button');
	button.addEventListener('click', function(){
		pomodoro.stop();
	});
}

