var pomodoro = {
	minutes: 0,
	seconds: 58,
	init: function(){
		var self = this,
		seconds = self.seconds,
		minutes = self.minutes;
		setInterval(function(){
			console.log(minutes, seconds);
			seconds++;
			if (seconds > 59) {
				minutes ++;
				seconds = 0;
			}	
		}, 1000)
	}
};

window.onload = pomodoro.init();