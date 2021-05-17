const puppeteer = require('puppeteer');
const fs = require('fs');

const imageReportDir = `${process.cwd()}/report-e2e-images`;
fs.rmdirSync(imageReportDir, { recursive: true });
if (!fs.existsSync(imageReportDir)) {
    fs.mkdirSync(imageReportDir);
}

let browser;
let page;
beforeAll(async () => {
    // launch browser 
    browser = await puppeteer.launch(
        {
            headless: true, // headless mode set to false so browser opens up with visual feedback
            slowMo: 250, // how slow actions should be
        }
    )
    // creates a new page in the opened browser   
    page = await browser.newPage()
});

test('Can load page correctly', async () => {
    await page.goto('http://localhost:3000/');
    page.emulate({
        viewport: {
            width: 1024,
            height: 768,
        },
        userAgent: ''
    });
    await page.waitForSelector('#reset');
    await page.waitForSelector('#playground svg');
    await page.screenshot({ path: `${imageReportDir}/page-loaded.png` });
}, 15000);
test('Can reset the game', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#reset');
    await page.click('#green');
    await page.waitForTimeout(2000);
    await page.waitForFunction(`
        document.getElementById('active-circle').getAttribute('style') === 'transform: translateX(623px) translateY(159px);'
    `);
    await page.click('#reset');
    await page.waitForTimeout(2000);
    await page.waitForFunction(`
        document.getElementById('active-circle').getAttribute('style') === 'transform: translateX(177px) translateY(400px);'
    `);
    await page.screenshot({ path: `${imageReportDir}/click_blue-green-reset.png` });
}, 15000);
test('✅ Blue → Green ', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#green');
    await page.click('#green');
    await page.waitForTimeout(2000);
    await page.click('#blue');
    await page.waitForTimeout(2000);
    await page.click('#yellow');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${imageReportDir}/click_blue-green-blue-yellow.png` });
    await page.waitForFunction(`
        document.getElementById('active-circle').getAttribute('style') === 'transform: translateX(623px) translateY(604px);'
    `);

}, 15000);
test('✅ Blue → Green → Blue → Yellow', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#green');
    await page.click('#green');
    await page.waitForTimeout(2000);
    await page.click('#blue');
    await page.waitForTimeout(2000);
    await page.click('#yellow');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${imageReportDir}/click_blue-green-blue-yellow.png` });
    await page.waitForFunction(`
        document.getElementById('active-circle').getAttribute('style') === 'transform: translateX(623px) translateY(604px);'
    `);

}, 15000);
test('⛔ Blue → Green → Yellow', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#green');
    await page.click('#green');
    await page.waitForTimeout(2000);
    await page.click('#yellow');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${imageReportDir}/click_not_blue-green-yellow.png` });
    await page.waitForSelector('#yellow.node.disabled');
    await page.waitForFunction(`
        document.getElementById('active-circle').getAttribute('style') === 'transform: translateX(623px) translateY(159px);'
    `);

}, 15000);
test('⛔ Blue → Yellow → Blue → Yellow', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#blue');
    await page.click('#yellow');
    await page.waitForTimeout(2000);
    await page.click('#blue');
    await page.waitForTimeout(2000);
    await page.click('#yellow');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${imageReportDir}/click_not_blue-yellow-blue-yellow.png` });
    await page.waitForFunction(`
        document.getElementById('active-circle').getAttribute('style') === 'transform: translateX(177px) translateY(400px);'
    `);
}, 15000);
test('⛔ Blue → Yellow → Green', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('#blue');
    await page.click('#yellow');
    await page.waitForTimeout(2000);
    await page.click('#green');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${imageReportDir}/click_not_blue-yellow-green.png` });
    await page.waitForFunction(`
        document.getElementById('active-circle').getAttribute('style') === 'transform: translateX(623px) translateY(604px);'
    `);
}, 15000);

afterAll(() => {
    browser.close();
})
