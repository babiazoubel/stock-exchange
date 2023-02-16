const getSymbol = new URLSearchParams(window.location.search);
const symbol = getSymbol.get('symbol');
const urlCompany = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;

const urlStockPrice = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/histor
ical-price-full/${symbol}?serietype=line`;

let myChart = null;

//elements in HTML
const companyName = document.getElementById('company-name');
const logo = document.getElementById('logo');
const description = document.getElementById('description');
const link = document.getElementById('link');
const sentencePrice = document.getElementById('stock-sentence');
const percentage = document.getElementById('stock-p');
const spinner = document.getElementById('spinner');

//company details
spinner.classList.remove('visually-hidden');
fetch(urlCompany)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    spinner.classList.add('visually-hidden');
    //image
    logo.src = data.profile.image;
    //name
    companyName.innerText = data.profile.companyName;
    //description
    description.innerHTML = data.profile.description;
    //link
    link.innerText = data.profile.website;
    link.href = data.profile.website;
    //stock price
    let profilePrice = Number(data.profile.price);
    //stock percentage
    let profileChangesPercent = parseFloat(data.profile.changesPercentage) * 10;
    
    if (profileChangesPercent >= 0) {
      percentage.classList.add('text-success');
    } else if (profileChangesPercent < 0) {
      percentage.classList.add('text-danger');
    }
    sentencePrice.innerText = `Stock price: $${profilePrice.toFixed(2)}`;
    percentage.innerText = ` (${profileChangesPercent.toFixed(2)}%)`;
  });

//chart
fetch(urlStockPrice)
  .then((response) => response.json())
  .then((data) => {
    const historical = data.historical;
    const getDateChart = historical.map((el) => el.date);
    const dates = getDateChart.slice(0, 20);
    const getPriceChart = historical.map((el) => el.close);
    const prices = getPriceChart.slice(0, 20);

    const ctx = document.getElementById('myChart');

    if (myChart != null) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            label: 'Stock Price History',
            data: prices,
            showline: true,
            fill: true,
            borderColor: 'rgb(153, 131, 193)',
          },
        ],
      },
    });
  });
