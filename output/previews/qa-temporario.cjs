async (page) => {
  const results = [];
  const failures = [];
  const externalFailures = new Set();
  page.on('pageerror', error => failures.push('Erro de JavaScript: ' + error.message));
  page.on('requestfailed', request => {
    if (!request.url().startsWith('http://localhost:8089/')) {
      externalFailures.add(new URL(request.url()).hostname + ': ' + (request.failure()?.errorText || 'falha'));
    }
  });

  for (const width of [320, 390, 768, 1200, 1440]) {
    for (let id = 1; id <= 5; id++) {
      const label = `proposta ${id}, ${width}px`;
      try {
        await page.setViewportSize({width, height: width === 390 ? 844 : 900});
        await page.goto(`http://localhost:8089/output/previews/proposta-${id}.html`, {waitUntil:'domcontentloaded', timeout:30000});
        await page.waitForSelector('#footer-placeholder > div', {timeout:15000});
        await page.waitForSelector('#mobile-menu-button[aria-expanded]', {state:'attached', timeout:15000});
        const metrics = await page.evaluate(() => ({
          viewport: document.documentElement.clientWidth,
          content: document.documentElement.scrollWidth,
          title: document.querySelectorAll('main h1').length,
          services: document.querySelectorAll('.service-item').length,
          videos: document.querySelectorAll('.tip-card').length,
          map: !!document.querySelector('.map-panel iframe[title]'),
          logo: !!document.querySelector('.site-navigation img')?.naturalWidth,
          heroImage: document.querySelector('.hero-photo img') ? !!document.querySelector('.hero-photo img').naturalWidth : true,
        }));
        if (metrics.content > metrics.viewport) failures.push(`${label}: rolagem horizontal ${metrics.content}/${metrics.viewport}`);
        if (metrics.title !== 1 || metrics.services !== 3 || metrics.videos !== 3 || !metrics.map || !metrics.logo || !metrics.heroImage) failures.push(`${label}: conteúdo incompleto ${JSON.stringify(metrics)}`);
        if (width === 390) await page.screenshot({path:`output/playwright/mobile-${id}.png`});
        if (width < 1200) {
          const button = page.locator('#mobile-menu-button');
          await button.click();
          if (await button.getAttribute('aria-expanded') !== 'true' || !await page.locator('#mobile-menu').evaluate(el => el.classList.contains('translate-x-0'))) failures.push(`${label}: menu não abriu`);
          await page.keyboard.press('Escape');
          if (await button.getAttribute('aria-expanded') !== 'false') failures.push(`${label}: menu não fechou pelo teclado`);
        }
        const anchor = page.locator('.hero-actions a').nth(1);
        await anchor.click();
        const url = new URL(page.url());
        if (!url.pathname.endsWith(`proposta-${id}.html`) || url.hash !== '#servicos') failures.push(`${label}: âncora de serviços saiu da prévia`);
        results.push(`${label}: OK`);
      } catch (error) { failures.push(`${label}: ${error.message.split('\n')[0]}`); }
    }
  }

  await page.goto('http://localhost:8089/output/previews/proposta-2.html', {waitUntil:'domcontentloaded'});
  await page.locator('.tip-visual').first().click();
  const videoSrc = await page.locator('.tip-visual iframe').getAttribute('src');
  if (!videoSrc || !videoSrc.includes('youtube-nocookie.com/embed/WVz_rg9gNo8')) failures.push('O vídeo selecionado não criou o player esperado');
  await page.locator('.map-panel').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);
  const mapFrame = page.frames().find(frame => frame.url().includes('google.com/maps/embed'));
  const mapResult = mapFrame ? mapFrame.url() : 'sem navegação observada';

  await page.goto('http://localhost:8089/output/previews/', {waitUntil:'domcontentloaded'});
  await page.locator('.gallery-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  const gallery = await page.locator('.gallery-card img').evaluateAll(images => images.map(img => ({src:img.getAttribute('src'), loaded:img.complete && img.naturalWidth > 0})));
  if (gallery.length !== 5 || gallery.some(image => !image.loaded)) failures.push('Uma ou mais miniaturas não carregaram: ' + JSON.stringify(gallery));
  return {results, failures, externalFailures:[...externalFailures], map:mapResult};
}
