import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the right header', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('AgileSphere coding test - The Weather App');
  });

  it("should search for a valid city and display it", async () => {
    const city = "London";

    await page.navigateTo();
    await page.searchKey(city);

    const cities = await page.countCities();
    expect(cities).toBe(1);

  });

  it("should search for an invalid city and display error", async () => {
    const invalidCity = "Londo";
    const errorValue = "Error. Please try again.";

    await page.navigateTo();
    await page.searchKey(invalidCity);


    const errorMessage = await page.getError();
    expect(errorMessage).toEqual(errorValue);
  });
});
