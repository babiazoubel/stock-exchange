class Marquee {
  constructor(element) {
    this.element = element;
  }

  getDataMarquee() {
    const marqueeUrl =
      'https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/quotes/nyse';

    fetch(marqueeUrl)
      .then((response) => response.json())
      .then((data) => {
        for (let item of data) {
          const getSymbol = item.symbol;
          const getPrice = item.price;

          this.divMarquee = document.createElement('div');
          this.divMarquee.classList = 'marquee';

          this.spanMarqueeS = document.createElement('span');
          this.spanMarqueeS.classList = 'marquee-span';
          this.spanMarqueeS.innerText = `(${getSymbol}) `;

          this.spanMarqueeP = document.createElement('span');
          this.spanMarqueeP.classList = 'marquee-span';
          this.spanMarqueeP.classList = 'text-success';
          this.spanMarqueeP.innerText = `$${getPrice}`

          this.divMarquee.append(this.spanMarqueeS);
          this.divMarquee.append(this.spanMarqueeP);
          
          
          this.element.append(this.divMarquee);
        }
      });
  }
}
