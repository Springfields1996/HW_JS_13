export default {
  myQuery: '',
  page: 1,

  fetchImage() {
    const apiKey = '17939308-b71cec67193b72d383fa9c8cc';
    let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.myQuery}&page=${this.page}&per_page=12&key=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(url, data.hits);
        return data.hits;
      });
  },

  resetPage() {
    this.page = 1;
  },

  pageIncrement() {
    this.page += 1;
  },
};
