import { browser, by, element, $$ } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.navbar-brand')).getText();
  }

  getError() {
    return element(by.css('.error')).getText();
  }

  async searchKey(city: string) {
    await $$('input').get(0).clear();
    await $$('input').get(0).sendKeys(city);
    await $$('button').get(0).click();
  }

  async countCities() {
    return $$('.city').count();
  }
}
