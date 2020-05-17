import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { Environment } from './environment.model';

@Injectable()
export class QrCodeService {

  private hubConnection: HubConnection;

  constructor(
    private http: HttpClient,
    private ngZone: NgZone) {}

  public getSessionImageSrc(environment: Environment, tenant: string, sessionId: string, token: string): Promise<any> {

    const apiUrl = this.getApiUrl(environment);
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

  public startHubConnection(environment: Environment, token: string, onDocumentCreated: () => void) {

    this.stopHubConnection();

    const apiUrl = this.getApiUrl(environment);

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(apiUrl + '/hub', { accessTokenFactory: () => token })
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

  private getApiUrl(environment: Environment) {
    return environment === Environment.Testing
      ? 'https://api-test.scuplo.io'
      : 'https://api.scuplo.io';
  }
}
