class SearchResult {
  constructor(element) {
    this.element = element;
  }

  async renderResults(data) {
    try {
      this.element.innerHTML = '';
      for (let item of data) {
        const urlCompany = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${item.symbol}`;
        const response = await fetch(urlCompany);
        const dataCompany = await response.json();

        let changesPercent =
          parseFloat(dataCompany.profile.changesPercentage) * 10;

        this.ulResults = document.createElement('ul');
        this.ulResults.classList = 'list-group list-group-flush';
        this.liResults = document.createElement('li');
        this.liResults.classList =
          'list-group-item d-flex justify-content-between align-items-center mx-1 me-6';
        this.divResultsLink = document.createElement('div');

        this.imgResults = document.createElement('img');
        this.imgResults.src = dataCompany.profile.image;
        this.imgResults.classList = 'img-size';

        this.linkResults = document.createElement('a');
        this.linkResults.classList = 'ms-6 lead fs-6';
        this.linkResults.href = dataCompany.symbol;
        this.linkResults.innerText = dataCompany.profile.companyName;

        this.divSymbolPrice = document.createElement('div');
        this.divSymbolPrice.classList = 'd-flex flex-row';
        this.symbolList = document.createElement('span');
        this.symbolList.classList = 'd-flex justify-content-end lead fs-6 font-weight-bold';
        this.symbolList.innerText = `(${dataCompany.symbol})`;
        this.percentList = document.createElement('span');
        this.percentList.classList = 'd-flex justify-content-end fs-6 font-weight-bold';
        this.percentList.innerText = `(${changesPercent.toFixed(2)})`;

        if (changesPercent >= 0) {
            this.percentList.classList.add('text-success');
          } else if (changesPercent < 0) {
            this.percentList.classList.add('text-danger');
          }

        this.ulResults.append(this.liResults);

        this.liResults.append(this.divResultsLink);
        this.liResults.append(this.divSymbolPrice);

        this.divResultsLink.append(this.imgResults);
        this.divResultsLink.append(this.linkResults);

        this.divSymbolPrice.append(this.symbolList);
        this.divSymbolPrice.append(this.percentList);

        this.element.append(this.ulResults);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
