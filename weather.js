lat = 27.7172;
lon = 85.324;
PROXY = 'https://cors-anywhere.herokuapp.com/';
URL = PROXY + 'https://api.darksky.net/forecast/745b58dd5128d154a9f92fb1a9c31630/' + lat + ',' + lon;
var app1 = new Vue({
	el      : '#app',
	data    : {
		weathers : []
	},
	mounted() {
		axios.get(URL).then((response) => {
			icon = response.data.currently.icon;
			icon_array = icon.split('-');
			new_icon = icon_array.join('_').toUpperCase();
			this.weathers = {
				timezone    : response.data.timezone,
				icon        : new_icon,
				temperature : response.data.currently.temperature,
				summary     : response.data.currently.summary
			};
			setIcons(new_icon, document.querySelector('.icon1'));
			console.log(this.weathers);
			console.log(response.data);
		});
	}
});

function setIcons(icon, iconid) {
	SKYCONS = new Skycons({ color: 'black' });
	SKYCONS.play();
	return SKYCONS.set('icon1', SKYCONS[icon]);
}
