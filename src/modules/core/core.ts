import { IPicture, IPicturesPage } from './types';

/**
 * Core class is the main class that contains the definitions
 * and other stuff required for the app to run.
 */
class Core {
  apikey: string;
  baseUrl: string;
  authBearer: string | null;

  constructor() {
    // @todo: move to a .env
    this.apikey = '23567b218376f79d9415';
    this.baseUrl = 'http://interview.agileengine.com';
    this.authBearer = null;
  }

  healthCheck(): string {
    return 'check';
  }
  /**
   * Function to request an Auth token for the application.
   *
   * @returns Promise
   */
  async getAuth(): Promise<any> {
    const body = { apiKey: this.apikey };
    const res = await this._postData(`${this.baseUrl}/auth`, body);
    if (res.auth) {
      this.authBearer = res.token;
    }
    return res;
  }
  /**
   * Function to request Pictures Page from the API.
   *
   * @param  {number} page? Page number or first if null.
   * @returns Promise
   */
  async getImages(page?: number): Promise<IPicturesPage> {
    const url = `${this.baseUrl}/images${page ? '?page=' + page : ''}`;

    return this._getData(url);
  }
  /**
   * Function to request more data from a specific image.
   *
   * @param  {string} id  The image/picture's id.
   * @returns Promise
   */
  async getImageData(id: string): Promise<IPicture> {
    const url = `${this.baseUrl}/images/${id}`;

    return this._getData(url);
  }
  /**
   * Main wrapper for GET requests.
   *
   * @param  {string} url  The URL to request.
   * @returns Promise
   */
  async _getData(url: string): Promise<any> {
    return await fetch(url, {
      headers: { Authorization: `Bearer ${this.authBearer}` },
    }).then((res) => res.json());
  }
  /**
   * Main wrapper for POST requests.
   *
   * @param  {} url=''   The URL to peform the request.
   * @param  {} data={}  The object containing the body data.
   * @returns Promise
   */
  async _postData(url = '', data = {}): Promise<any> {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
}

export default Core;
