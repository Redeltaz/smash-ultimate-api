import puppeteer from "puppeteer";
import {
    Browser,
    Page
} from "puppeteer";
import charactersList from "./charactersList.json";

class Scrapper {
    private browser: Browser;
    private page: Page;

    private async initBrowser(): Promise<void> {
        this.browser = await puppeteer.launch({ headless: true });
    }

    private async closeBrowser(): Promise<void> {
        await this.browser.close();
    }

    public async fill(): Promise<void> {
        await this.initBrowser();
        this.page = await this.browser.newPage();

        for (const name of charactersList) {
            await this.getInfos(name);
        }
        
        await this.closeBrowser();
    }

    private async getInfos(characterName: string): Promise<void> {
        await this.page.goto(`https://ultimateframedata.com/${characterName}`);

        const name = await this.page.evaluate(() => {
            return document.getElementsByClassName("charactername");
        });
        const test = await this.page.$$(".charactername");
        for (let i = 0; i < test.length; i++) {
            const tweet = await (await test[i].getProperty("innerText")).jsonValue();
            console.log(tweet);
        }
    }
}

const scrapper = new Scrapper();
scrapper.fill();