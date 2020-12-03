const getMaps = (data) => {

    const parseData = JSON.parse(data)

    var map = L.map('map').setView([51.505, -0.09], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for (const key in parseData) {
        if (parseData[key].state != '') {
            L.marker([parseData[key].lat, parseData[key].long]).addTo(map)
                .bindPopup(`<a href="/country/${parseData[key].state}/${parseData[key].country}">${parseData[key].state}</a>`)
                .openPopup();
        } else {
            L.marker([parseData[key].lat, parseData[key].long]).addTo(map)
                .bindPopup(`<a href="/country/null/${parseData[key].country}">${parseData[key].country}</a>`)
                .openPopup();
        }
    }
}

const getMapsCountry = (data) => {

    const parseData = JSON.parse(data)
    console.log(parseData);
    var map = L.map('mapCountry').setView([parseData.lat, parseData.long], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([parseData.lat, parseData.long]).addTo(map)
        .bindPopup(parseData.country)
        .openPopup();

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: parseData.date,
            datasets: [
                {
                    label: 'Confirmed',
                    data: Object.values(parseData.weekConfirmed)

                },
                {
                    label: 'Recovered',
                    data: Object.values(parseData.weekRecovered)
                },
                {
                    label: 'Deaths',
                    data: Object.values(parseData.weekDeaths)
                }
            ]
        },

        // Configuration options go here
        options: {}
    });

}