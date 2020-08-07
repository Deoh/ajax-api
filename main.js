const baseURL = "https://ci-swapi.herokuapp.com/api/"

function getData(type, cb) {
    // create a new instance of the XMLHttpRequest object.
    // XMLHttpRequest object is an inbuilt object that JavaScript provides to allow us to consume APIs.
    var xhr = new XMLHttpRequest();

    // GET method is used when we're retrieving data from the server. In this case sending a request for the swapi api.
    xhr.open("GET", baseURL + type + "/");

    // sends request
    xhr.send();

    // listener waiting to see for xhr's state to change
    xhr.onreadystatechange = function () {
        // xhr readystate && http status code
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(`<td>${key}</td>`);
    });
    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type) {
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";

    getData(type, function (data) {
        data = data.results;
        var tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {   
            // el.innerHTML += '<p>' + item.name + '</p>';
            var dataRow = [];

            Object.keys(item).forEach(function (key) {
                var rowData = item[key].toString();
                var truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}
