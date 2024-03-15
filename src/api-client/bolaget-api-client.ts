import { BolagetAPIResponse } from './types';

export class BolagetAPIClient {
  private apiKey = process.env.BOLAGET_API_KEY;

  private queryBuilder(page: number, storeId: string): string {
    //page=1
    //&size=30
    //&sortBy=Score
    //&sortDirection=Ascending
    //&newArrivalType=Nytt%20senaste%20veckan
    //&newArrivalType=Nytt%20senaste%20m%C3%A5naden
    //&categoryLevel1=%C3%96l
    //&storeId=0601
    //&isInStoreAssortmentSearch=true

    return `?page=${page}&size=30&sortBy=Score&sortDirection=Ascending&newArrivalType=Nytt%20senaste%20veckan&newArrivalType=Nytt%20senaste%20m%C3%A5naden&categoryLevel1=%C3%96l&storeId=${storeId}&isInStoreAssortmentSearch=true`;
  }

  public async getProducts(
    storeId: string,
    page: number,
  ): Promise<BolagetAPIResponse> {
    const query = this.queryBuilder(page, storeId);
    const headers = {
      'Ocp-Apim-Subscription-Key': this.apiKey, // Super secret key they don't want us to know. Systembolaget hates this simple trick
      Origin: 'https://www.systembolaget.se',
      Referer: 'https://www.systembolaget.se',
    };

    const result = await fetch(`${process.env.BOLAGET_API_BASE_URL}${query}`, {
      method: 'GET',
      headers: headers,
    });

    if (result.ok) {
      const data: BolagetAPIResponse = await result.json();
      return data;
    } else {
      throw new Error(result.statusText);
    }
  }
}
