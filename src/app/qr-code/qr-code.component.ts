import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { QrCodeService } from './qr-code.service';

@Component({
  selector: 'scuplo-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.sass']
})
export class QrCodeComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public baseApiUrl: string;

  @Input()
  public tenant: string;

  @Input()
  public sessionId: string;

  @Input()
  public token: string;

  public loading: boolean;
  public imageData: string;
  public amount: number;

  private currentSessionIdentification: string;

  constructor(private qrCodeService: QrCodeService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.amount = 0;

    this.load();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.qrCodeService.stopHubConnection();
  }

  private load() {

    if (this.baseApiUrl && this.tenant && this.sessionId && this.token && this.hasCurrentSessionIdentificationChanged()) {

      this.setCurrentSessionIdentification();

      this.loading = true;
      this.amount = 0;

      this.qrCodeService.startHubConnection(this.baseApiUrl, this.token, () => this.onDocumentCreated());

      this.qrCodeService.getSessionImageSrc(this.baseApiUrl, this.tenant, this.sessionId, this.token)
        .then(imageData => {
          this.loading = false;
          this.imageData = imageData;
        });
    }
  }

  private onDocumentCreated() {
    this.amount += 1;
  }

  private setCurrentSessionIdentification() {
    this.currentSessionIdentification = this.baseApiUrl + this.tenant + this.sessionId + this.token;
  }

  private hasCurrentSessionIdentificationChanged() {
    const newSessionIdentification = this.baseApiUrl + this.tenant + this.sessionId + this.token;
    return this.currentSessionIdentification !== newSessionIdentification;
  }
}
