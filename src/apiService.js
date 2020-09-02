export default {
  myQuery: '',
  page: 1,
  height: -window.innerHeight,

  fetchImage() {
    const apiKey = '17939308-b71cec67193b72d383fa9c8cc';
    let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.myQuery}&page=${this.page}&per_page=12&key=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.hits;
      });
  },

  scrollWindow() {
    if (this.height < 0) {
      this.height += window.innerHeight;
    } else {
      this.height = window.innerHeight - 90;
    }
  },

  autoscrollPage() {
    window.scrollBy({
      top: this.height,
      behavior: 'smooth',
    });
  },

  resetPage() {
    this.page = 1;
  },

  pageIncrement() {
    this.page += 1;
  },
};
