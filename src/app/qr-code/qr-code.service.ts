import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';

@Injectable()
export class QrCodeService {

  private hubConnection: HubConnection;

  constructor(
    private http: HttpClient,
    private ngZone: NgZone) {}

  public getSessionImageSrc(baseApiUrl: string, tenant: string, sessionId: string, token: string): Promise<any> {

    const url = baseApiUrl + '/v1/' + tenant + '/sessions/' + sessionId + '/qrcode';

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

  public startHubConnection(baseApiUrl: string, token: string, onDocumentCreated: () => void) {

    this.stopHubConnection();

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(baseApiUrl + '/hub', { accessTokenFactory: () => token })
      .build();

    this.hubConnection.on('DocumentCreated', (message) => {
      this.ngZone.runGuarded(onDocumentCreated);
    });

    this.hubConnection
        .start()
        .then(() => console.log('Connection started!'))
        .catch(err => console.log('Error while establishing connection :('));
  }

  public stopHubConnection() {
    if (this.hubConnection) {
      this.hubConnection.off('DocumentCreated');
      this.hubConnection.stop();
    }
  }
}
