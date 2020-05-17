import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { QrCodeService } from './qr-code.service';

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

  public imageData: string;

  public loading: boolean;
  public qrCodeUrl: string;

  constructor(private qrCodeService: QrCodeService) {
  }

  ngOnInit() {
    this.loading = true;
    // todo without access_token gives 500
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sessionData) {
      // todo
    }

    console.log('was changed');

    this.loading = true;

    this.qrCodeService.getImageSrc(this.apiUrl, this.tenant, this.sessionId, this.token)
      .then(imageData => {
        this.loading = false;
        this.imageData = imageData;
      });
  }
}
