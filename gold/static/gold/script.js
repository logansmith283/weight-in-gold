// api key and dates
const apiKey = 'api_key=gUjVf3ZPc_qm92iGYK19';
var now = new Date();
var then = new Date();
then.setDate(now.getDate() -5);
const startDate = 'start_date=' + then.getFullYear() + '-' + (then.getMonth() + 1) + '-' + then.getDate()
const endDate = 'end_date=' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate()
var goldPrice;
var timeNow = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

// API request to get price of gold
fetch(`https://www.quandl.com/api/v3/datasets/LBMA/GOLD?column_index=1&${startDate}&${endDate}&${apiKey}`)
    .then(response => response.json())
    .then(json => {
        let label = document.getElementById('Gold Value');
        if (json.hasOwnProperty('error')) {
            console.log(`Error: ${json.error}`);
            label.textContent = `Error: ${json.error}`;
        }
        else {
            let date = json.dataset.newest_available_date;
            let data = json.dataset.data;
            let price = data[0][1];
            goldPrice = price;

            label.textContent = `The Price Of Gold As Of ${date} Is $${price.toLocaleString()} per Troy Oz.`;
        }
    });

// function to add divs to the dom
function addDiv(color, message) {
    var results = document.getElementById('results');
    var div = document.createElement('div');
    div.setAttribute('class', `${color} stuff-box`);
    results.prepend(div);
    var para = document.createElement('p');
    para.textContent = message;
    div.addEventListener('click', function (event) {
        this.remove();
    });
    div.appendChild(para);
}

// Make the button clickable
const button = document.getElementById('compute');
button.addEventListener('click', compute);

// Compute function
function compute() {
    let value = document.getElementById('weight').value;
    if (value === '' || isNaN(value)) {
        addDiv('red', `${timeNow} Please Enter A Number And Try Again.`);
    }
    else {
        value = parseFloat(value);
        let unitFrom = document.getElementById('units').value;
        let units = document.getElementById('units').selectedIndex;
        units = document.getElementById('units').options[units].textContent;
        // API request to convert units to troy ounces
        fetch(`http://localhost:8000/unitconv/convert?from=${unitFrom}&to=t_oz&value=${value}`)
                .then(response => response.json())
                .then(json => {
                    if (json.hasOwnProperty('error')) {
                        addDiv('red', `${timeNow} Error: ${json.error}`);
                    }
                    else {
                        totalVal = (goldPrice * json.value).toFixed(2);
                        totalVal = parseFloat(totalVal).toLocaleString();
                        message = `At ${timeNow} The price of ${value} ${units} Of Gold Is Worth $${totalVal}`;
                        addDiv('green', message);
                    }
                });
    }
}
