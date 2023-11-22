function getWeather() {
  if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showWeather, showError);
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }

        function showWeather(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Replace 'YOUR_WEATHER_API_KEY' with your actual API key
            const apiKey = 'c60434d29d89194c6d23c0cfe6324dc8';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const location = data.name;
                    const temperature = data.main.temp;
                    const condition = data.weather[0].description;

                    document.getElementById('location').textContent = `Location: ${location}`;
                    document.getElementById('temperature').textContent = `Temperature: ${temperature}°C`;
                    document.getElementById('condition').textContent = `Condition: ${condition}`;
                })
                .catch(error => console.error('Error fetching weather data:', error));
        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        }