import axios from 'axios';

export default class BingImageSearchApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  static getUrl(term, options) {
    const { count, offset, mkt, safeSearch } = options;
    let url = `https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=${term}&count=${count}${offset}`;

    if (mkt) {
      url += `&mkt=${mkt}`;
    }

    if (safeSearch) {
      url += `&safeSearch=${safeSearch}`;
    }

    return url;
  }

  search(term, options = { count: 10, offset: 0 }) {
    return axios.get(this.constructor.getUrl(term, options), {
      headers: { 'Ocp-Apim-Subscription-Key': this.apiKey },
    });
  }
}
