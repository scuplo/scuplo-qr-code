import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from './environment.model';

@Injectable()
export class QrCodeService {

  constructor(private http: HttpClient) {}

  getSessionImageSrc(environment: Environment, tenant: string, sessionId: string, token: string): Promise<any> {

    const apiUrl = environment === Environment.Production
      ? 'https://api.scuplo.io/v1/'
      : 'https://api-test.scuplo.io/v1/';

    const url = apiUrl + tenant + '/active-sessions/' + sessionId + '/qrcode';

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token
    });

    return this.http.get(url, { headers, responseType: 'blob' })
      .toPromise()
      .then((blob: Blob) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      });
  }
}
