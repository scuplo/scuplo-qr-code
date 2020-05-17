import { Component, OnInit, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { QrCodeService } from './qr-code.service';
import { Environment } from './environment.model';

@Component({
  selector: 'scuplo-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.sass']
})
export class QrCodeComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  public environment: Environment;

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
    if (this.environment && this.tenant && this.sessionId && this.token && this.hasCurrentSessionIdentificationChanged()) {

      this.setCurrentSessionIdentification();

      this.loading = true;
      this.amount = 0;

      this.qrCodeService.startHubConnection(this.environment, this.token, () => this.onDocumentCreated());

      this.qrCodeService.getSessionImageSrc(this.environment, this.tenant, this.sessionId, this.token)
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
    this.currentSessionIdentification = this.environment + this.tenant + this.sessionId + this.token;
  }

  private hasCurrentSessionIdentificationChanged() {
    const newSessionIdentification = this.environment + this.tenant + this.sessionId + this.token;
    return this.currentSessionIdentification !== newSessionIdentification;
  }
}
