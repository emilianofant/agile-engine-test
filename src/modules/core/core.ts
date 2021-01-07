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

  async getAuth() {
    const body = { apiKey: this.apikey };
    const res = await this.postData(`${this.baseUrl}/auth`, body);
    if (res.auth) {
      this.authBearer = res.token;
    }
    return res;
  }

  async getImages(page?: number) {
    const url = `${this.baseUrl}/images${page ? '?page=' + page : ''}`;

    return await fetch(url, {
      headers: { Authorization: `Bearer ${this.authBearer}` },
    }).then((res) => res.json());
  }

  async postData(url = '', data = {}): Promise<any> {
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
