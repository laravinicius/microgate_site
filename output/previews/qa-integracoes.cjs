async page => {
  const responses = [];
  const failed = [];
  page.on('response', response => {
    if (/google\.com\/maps\/embed|youtube-nocookie\.com\/embed/.test(response.url())) responses.push({url:response.url().split('?')[0], status:response.status()});
  });
  page.on('requestfailed', request => {
    if (/google\.com\/maps\/embed|youtube-nocookie\.com\/embed/.test(request.url())) failed.push({url:request.url().split('?')[0], reason:request.failure()?.errorText});
  });
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://localhost:8089/output/previews/proposta-2.html', {waitUntil:'domcontentloaded'});
  await page.locator('.map-panel').scrollIntoViewIfNeeded();
  await page.waitForTimeout(8000);
  const map = page.frames().find(frame => frame.url().includes('google.com/maps/embed'));
  const mapText = map ? await map.evaluate(() => document.body?.innerText?.slice(0, 400) || '').catch(() => '') : '';
  await page.screenshot({path:'output/playwright/mapa.png'});
  await page.locator('.tip-visual').first().click();
  await page.waitForTimeout(8000);
  const video = page.frames().find(frame => frame.url().includes('youtube-nocookie.com/embed'));
  const videoText = video ? await video.evaluate(() => document.body?.innerText?.slice(0, 400) || '').catch(() => '') : '';
  await page.screenshot({path:'output/playwright/video.png'});
  return {responses,failed,mapText,videoText};
}
