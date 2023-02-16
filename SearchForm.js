class SearchForm {
  constructor(element) {
    this.element = element;

    this.spinner = document.createElement('div');
    this.spinner.className = 'spinner-border d-flex justify-content-center';

    this.spinner.classList.add('visually-hidden');

    this.searchBox = document.createElement('div');
    this.searchBox.className = 'input-group mb-3';

    this.element.appendChild(this.searchBox);
    this.element.appendChild(this.spinner);

    this.createInput();
    this.createButton();
  }

  createInput() {
    this.inputBar = document.createElement('input');
    this.inputBar.className = 'form-control';
    this.inputBar.type = 'text';
    this.inputBar.placeholder = 'Search for company stock symbol';

    this.searchBox.appendChild(this.inputBar);
  }

  createButton() {
    this.buttonSearch = document.createElement('button');
    this.buttonSearch.id = 'button-search';
    this.buttonSearch.className = 'btn btn-primary';
    this.buttonSearch.type = 'button';
    this.buttonSearch.value = 'submit';
    this.buttonSearch.innerText = 'Search';

    this.searchBox.appendChild(this.buttonSearch);
  }

  async searchStocks() {
    const urlNasdaq = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${this.inputBar.value}&limit=10&exchange=NASDAQ`;
    try {
      const response = await fetch(urlNasdaq);
      this.dataStock = await response.json();
      this.spinner.classList.add('visually-hidden');
      this.onSearchDoneCallback(this.dataStock);
    } catch (error) {
      console.log(error);
    }
  }

  async onSearch(callback) {
    this.buttonSearch.addEventListener('click', () => {
      this.spinner.classList.remove('visually-hidden');
      this.searchStocks(this);
      
    });
    
    this.onSearchDoneCallback = callback;
  }
}
