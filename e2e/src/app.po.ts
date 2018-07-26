import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('strong')).getText();
  }

  getButtonText() {
    return element(by.className('btn-success')).getText();
  }

  getRepoName() {
    return element(by.className('col-md-7')).getText();
  }
}
