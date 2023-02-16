function getDataMarquee() {
  const marqueeUrl =
  'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/index';

fetch(marqueeUrl)
  .then((response) => response.json())
  .then((data) => {
    for (let item of data) {
      const getSymbol = item.symbol;
      const getPrice = item.price;
    
      const marqueeData = document.getElementById('p-marquee');

      function animate(element) {
        let elementWidth = element.offsetWidth;
        let parentWidth = element.parentElement.offsetWidth;
        let flag = 0;

        setInterval(() => {
          element.style.marginLeft = --flag + 'px';

          if (elementWidth == -flag) {
            flag = parentWidth;
          }
        }, 80);
      }

      animate(marqueeData);

      marqueeData.innerHTML += ` (${getSymbol})` + `$${getPrice.toFixed(2)} `;
    }
  });


}


//elements in HTML
const inputSearch = document.querySelector('.form-control');
const button = document.getElementById('button-search');
const searchBox = document.getElementById('search-box');
const spinner = document.getElementById('spinner');
const resultsBox = document.getElementById('resultsBox');

async function getResults() {
  const urlNasdaq = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputSearch.value}&limit=10&exchange=NASDAQ`;
  try {
    const response = await fetch(urlNasdaq);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displayList() {
  try {
    const data = await getResults();
    resultsBox.innerHTML = '';
    for (let item of data) {
      const urlCompany = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${item.symbol}`;
      const response = await fetch(urlCompany);
      const dataCompany = await response.json();

      let changesPercent =
        parseFloat(dataCompany.profile.changesPercentage) * 10;

      const list = `<li class="list-group-item d-flex justify-content-between align-items-center mx-1 me-6">
      <div class='d-flex align-items-center justify-items-center gap-4'>
      <img src="${dataCompany.profile.image}" style="height: 35px">
      <a href="./company.html?symbol=${
        dataCompany.symbol
      }" target="_blank" class="ms-6 lead fs-6">${
        dataCompany.profile.companyName
      }</a>
      </div>
      <div class='d-flex flex-row'>     
      <p id='percentage' class='d-flex justify-content-end lead fs-6'>(${
        dataCompany.symbol
      })</p>
      <div id="percentage" class='d-flex justify-content-end lead fs-6'>(${changesPercent.toFixed(
        2
      )}%)</div>
      </div>
      </li>`;

      resultsBox.innerHTML += list;
    }
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener('click', displayList);
