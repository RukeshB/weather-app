lat = 27.7172;
lon = 85.324;
PROXY = 'https://cors-anywhere.herokuapp.com/';
KEY = '745b58dd5128d154a9f92fb1a9c31630';
URL = PROXY + 'https://api.darksky.net/forecast/745b58dd5128d154a9f92fb1a9c31630/' + lat + ',' + lon;

// var KEY = '5f159a7c3e29ef06835a23529b46607b';
// var LOCATION = 'KATHMANDU';
// URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + LOCATION + '&appid=' + KEY;

var app1 = new Vue({
	el      : '#app',
	data    : {
		weathers : []
	},
	mounted() {
		axios.get(URL).then((response) => {
			icon = response.data.currently.icon;
			icon_array = icon.split('-'); //seperating string by -
			new_icon = icon_array.join('_').toUpperCase();

			//coverting fahrenheit to celsius
			fTemp = response.data.currently.temperature;
			cTemp = (fTemp - 32) * (5 / 9);

			//setting weather data in a array
			this.weathers = {
				timezone       : response.data.timezone,
				icon           : new_icon,
				temperatureInF : fTemp,
				temperatureInC : cTemp.toFixed(2),
				currentSummary : response.data.currently.summary,
				summary        : response.data.hourly.summary
			};

			//setting icon
			setIcons(new_icon, document.querySelector('.icon1'));

			console.log(this.weathers);
			console.log(response.data);
		});
	}
});

function setIcons(icon, iconid) {
	//console.log(icon);
	var skycons = new Skycons({ color: 'white' });
	skycons.play();
	//skyconIcon = 'Skycons.' + icon;
	//console.log(skyconIcon);
	return skycons.set(iconid, Skycons[icon]);
}
