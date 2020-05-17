import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [QrCodeComponent, LoaderComponent],
  imports: [BrowserModule],
  entryComponents: [QrCodeComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const customElement: any = createCustomElement(QrCodeComponent, { injector });
    customElements.define('scuplo-qr-code', customElement);
  }

  ngDoBootstrap() {}
}
