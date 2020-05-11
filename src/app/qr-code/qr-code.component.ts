import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'scuplo-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.sass']
})
export class QrCodeComponent implements OnInit, OnChanges {

  @Input()
  public tenant: string;

  @Input()
  public sessionId: string;

  @Input()
  public token: string;

  @Input()
  public apiUrl: string;

  public qrCodeUrl: string;

  constructor() {
  }

  ngOnInit() {
    // todo without access_token gives 500
    this.qrCodeUrl = this.apiUrl + '/v1/' + this.tenant + '/active-sessions/' + this.sessionId + '/qrcode?access_token=' + this.token;
    console.log(this.qrCodeUrl);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sessionData) {
      // todo
    }

    console.log('was changed');

    this.qrCodeUrl = this.apiUrl + '/v1/' + this.tenant + '/active-sessions/' + this.sessionId + '/qrcode?token=' + this.token;
    console.log(this.qrCodeUrl);
  }
}
