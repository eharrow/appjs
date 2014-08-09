var data = 0;

Pebble.addEventListener("ready", function() {
  console.log("My app has started - Doing stuff...");
  data = Number(localStorage.getItem("data"));
});
Pebble.addEventListener("appmessage",
  function(e) {
    console.log("Received message: " + e.payload);
  }
);
console.log('Simply.js demo!');

simply.on('singleClick', function(e) {
  console.log(util2.format('single clicked $button!', e));
  simply.subtitle('Pressed ' + e.button + '!');
	
	navigator.geolocation.getCurrentPosition(function(pos) {
  var coords = pos.coords;
  var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?' +
      'lat=' + coords.latitude + '&lon=' + coords.longitude + '&units=metric';
  ajax({ url: weatherUrl, type: 'json' }, function(data) {
    simply.text({ title: data.name, subtitle: data.main.temp });
	console.log(data.name + "" +data.main.temp);
  });
});
});

simply.on('longClick', function(e) {
  console.log(util2.format('long clicked $button!', e));
  simply.vibe();
  simply.scrollable(e.button !== 'select');
  data++;
  localStorage.setItem("data", ""+data);
  console.log("data="+data);
});

simply.on('accelTap', function(e) {
  console.log(util2.format('tapped accel axis $axis $direction!', e));
  simply.subtitle('Tapped ' + (e.direction > 0 ? '+' : '-') + e.axis + '!');
});

simply.setText({
  title: 'Simply Demo!',
  body: 'This is a demo. Press buttons or tap the watch!',
}, true);

//simply.title('Hello World!');

simply.vibe('short');

