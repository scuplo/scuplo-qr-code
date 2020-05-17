import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.waitForAngularEnabled(false);
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTagName() {
    const el = element(by.tagName('scuplo-qr-code'));
    return el.getTagName() as Promise<string>;
  }
}
