const { chromium } = require("/Users/ganghyoeun/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 393, height: 852 }, deviceScaleFactor: 1 });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const screenBox = await page.locator(".screen").boundingBox();
  await page.screenshot({ path: "home-prototype-fresh.png", clip: screenBox });
  await page.click(".event-right");
  await page.click(".category-item");
  await page.fill(".search-box input", "샐러디");
  await page.press(".search-box input", "Enter");
  const interactionState = await page.evaluate(() => ({
    eventAfterClick: document.querySelector(".event-main strong")?.textContent.trim(),
    selectedCategory: document.querySelector(".category-item.selected")?.dataset.label,
    toast: document.querySelector(".prototype-toast")?.textContent,
  }));

  await page.evaluate(() => {
    document.querySelector(".scroll-area").scrollTop = document.querySelector(".stamp-section").offsetTop - 24;
  });
  await page.screenshot({ path: "home-prototype-fresh-stamp.png", clip: screenBox });

  const info = await page.evaluate((interactionState) => ({
    missingImages: [...document.images]
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.getAttribute("src")),
    screen: document.querySelector(".screen")?.getBoundingClientRect().toJSON(),
    eventText: document.querySelector(".event-main strong")?.textContent.trim(),
    benefits: [...document.querySelectorAll(".benefit-art img")].map((img) => img.getAttribute("src")),
    stamps: [...document.querySelectorAll(".stamp-row img")].map((img) => img.getAttribute("src")),
    firstStore: document.querySelector(".store-card h3")?.textContent.trim(),
    interactionState,
  }), interactionState);

  await browser.close();
  console.log(JSON.stringify(info, null, 2));
})();
