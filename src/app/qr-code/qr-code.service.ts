import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class QrCodeService {

  constructor(private http: HttpClient) {}

  getSessionImageSrc(apiUrl: string, tenant: string, sessionId: string, token: string): Promise<any> {
    const url = apiUrl + '/v1/' + tenant + '/active-sessions/' + sessionId + '/qrcode';

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
