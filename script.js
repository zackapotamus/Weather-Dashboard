$(document).ready(function () {

    function getForecast(city) {
        $.ajax({
            method: "GET",
            url: "api.openweathermap.org/data/2.5/forecast",
            appid: "d79b99e05cd4de87d3c249ae95d1b3ff",
            q: city
        }).then(function (result) {
            console.log(result);
        });

    }

    function getCurrentWeather(city) {
        $.ajax({
            method: "GET",
            url: "api.openweathermap.org/data/2.5/weather",
            appid: "d79b99e05cd4de87d3c249ae95d1b3ff",
            q: city
        }).then(function (result) {
            console.log(result);
        });
    }
});