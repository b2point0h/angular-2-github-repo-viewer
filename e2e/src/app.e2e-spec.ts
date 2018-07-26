import { AppPage } from './app.po';
import { element, by } from '../../node_modules/protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display application title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('  GitHub Repo Viewer');
  });

  it('should have a search button', () => {
    page.navigateTo();
    expect(page.getButtonText()).toEqual('Search');
  });

  it('should have the correct repo name', function() {
    browser.get('http://localhost:4200/repo/facebook/react');

    expect(page.getRepoName()).toEqual('react - JavaScript');
  });
});
