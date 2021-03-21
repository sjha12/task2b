// step 1. create a request variable for connecting to restcountries api end-point
var rcURL = 'https://restcountries.eu/rest/v2/all';
var rcRequest = new XMLHttpRequest();
const wmAPIKEY = 'c2dfb963e9f259a664b7e33bfdc512a7';
var notFound = []
// step 2.create a new http connection
rcRequest.open('GET', rcURL, true);

// step 3. set expected response type and send request
rcRequest.responseType = 'json';
rcRequest.send();

// step 4. load response and print country name
rcRequest.onload = function () {
    const restCountries = this.response;
    listCountryTemp(restCountries);
}

function listCountryTemp(restCountries) {
    // for each country in restCountries, get temperature detail from weathermap api
    // based on its lattitude and longitude
    for (let i in restCountries) {
        let name = restCountries[i]['name'];
        let lat = +restCountries[i]['latlng'][0];
        let lon = +restCountries[i]['latlng'][1];
        if (!Number.isNaN(lat) && !Number.isNaN(lon)) {
            // build end-point url for each country/api-call
            //api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={API key}
            let wmURL = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
                lat +
                '&lon=' +
                lon +
                '&appid=' +
                wmAPIKEY;

            let wmRequest = new XMLHttpRequest();

            // step 2.create a new http connection for each API call
            wmRequest.open('GET', wmURL, true);

            // step 3. set expected response type and send request for each API call
            wmRequest.responseType = 'json';
            wmRequest.send();
         //   console.log(`request sent for ${wmURL}`);
            // step 4. load response and print country name along with its temperature
            wmRequest.onload = function () {
                let temp = this.response['main']['temp']
                console.log(name + ' Lat:' + lat + ' Lon:' + lon + ' Temp:' + temp);
            }
        }
        else {

            notFound.push(`Temperature not found for ${name} lat: ${lat} lon: ${lon}`);
        }
    }
    if (notFound.length > 0) {
        notFound.forEach(element => console.log(element))
    }
}

