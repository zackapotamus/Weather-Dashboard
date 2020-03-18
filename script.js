var cities = [];

$(document).ready(function () {
    var cityList = $("#city-list");
    loadCities(cityList);

    function displayWeatherInfo(result) {
        $("#temp").text(result.main.temp);
        $("#humidity").text(result.main.humidity);
        $("#wind-speed").text(result.wind.speed);
        // $("#uv-index").text();
    }

    function loadCities(cityList) {
        cities = JSON.parse(localStorage.getItem("cities")) || [];
        cityList.empty();
        for (i = 0; i < cities.length; i++) {
            cityList.append($("<li>").addClass("list-group-item").attr("data-index", i).addClass("city-list-item").text(cities[i]));
        }
    }

    function displayForecastInfo(result) {
        // console.log(result.list);
        var forecastRow = $("#forecast-row");
        for (var i=0; i < result.list.length; i+=8) {
            console.log(result.list[i]);
            // var card = $("<div>").addClass("col-3").append($("<div>").addClass("card bg-primary text-white").append($()))
        }
    }

    function addCity(city) {
        if (cities.indexOf(city) < 0) {
            cities.push(city);
            saveCities();
            $("<li>").addClass("list-group-item");
            $("#city-list").append($("<li>").addClass("list-group-item").text(city));
        }
    }

    function saveCities() {
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    function submitCity(event) {
        event.preventDefault();
        var value = $("#search-bar").val();
        if (!value) return;

        getWeatherInfo(value);
    }

    function getWeatherInfo(city) {
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                appid: "d79b99e05cd4de87d3c249ae95d1b3ff",
                q: city,
                units: "imperial"
            }
        }).then(function (result) {
            addCity(city);
            displayWeatherInfo(result);
            // console.log(result);
            $.ajax({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/forecast",
                data: {
                    appid: "d79b99e05cd4de87d3c249ae95d1b3ff",
                    q: city,
                    units: "imperial"
                }
            }).then(function (result) {
                displayForecastInfo(result);
                $.ajax({
                    method: "GET",
                    url: "http://api.openweathermap.org/data/2.5/uvi",
                    data: {
                        appid: "d79b99e05cd4de87d3c249ae95d1b3ff",
                        lat: result.city.coord.lat,
                        lon: result.city.coord.lon
                    }
                }).then(function (result) {
                    // console.log("fart");
                    // console.log(result);
                });

            });

        });
    }

    function weatherImgFromId(icon_id) {
        return `http://openweathermap.org/img/wn/${icon_id}@2x.png`;
    }

    
    $(".city-list-item").on("click", function(event) {
        // console.log(event.target.dataset.index);
        getWeatherInfo(cities[parseInt(event.target.dataset.index)]);
        $("#city-display").text(cities[parseInt($(this).attr("data-index"))]);
    });
    $("#search").on("submit", submitCity);
    $("#search-button").on("click", submitCity);
});