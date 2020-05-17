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

  public loading: boolean;
  public imageData: string;
  public amount: number;

  constructor(private qrCodeService: QrCodeService) {
  }

  ngOnInit() {
    this.loading = true;
    this.amount = 0;

    if (this.apiUrl && this.tenant && this.sessionId && this.token) {
      this.load();
    }

    // todo without access_token gives 500
  }

  ngOnChanges(changes: SimpleChanges) {
    this.load();
  }

  private load() {
    this.loading = true;
    this.amount = 0;

    this.qrCodeService.getSessionImageSrc(this.apiUrl, this.tenant, this.sessionId, this.token)
      .then(imageData => {
        this.loading = false;
        this.imageData = imageData;
      });
  }
}
