import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { HttpClientModule } from '@angular/common/http';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { LoaderComponent } from './loader/loader.component';
import { QrCodeService } from './qr-code/qr-code.service';

@NgModule({
  declarations: [QrCodeComponent, LoaderComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [QrCodeService],
  entryComponents: [QrCodeComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElement: any = createCustomElement(QrCodeComponent, { injector });
    customElements.define('scuplo-qr-code', customElement);
  }

  ngDoBootstrap() {}
}
