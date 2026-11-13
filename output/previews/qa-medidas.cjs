async page => {
  const diagnostics = [];
  for (const id of [1,2,3]) {
    await page.setViewportSize({width:320,height:844});
    await page.goto(`http://localhost:8089/output/previews/proposta-${id}.html`, {waitUntil:'domcontentloaded'});
    await page.waitForSelector('#footer-placeholder > div');
    diagnostics.push(await page.evaluate(() => {
      const image=document.querySelector('.site-navigation img');
      const rect=image.getBoundingClientRect(), css=getComputedStyle(image), parent=image.parentElement.getBoundingClientRect();
      const overflow=[...document.querySelectorAll('body *')].map(el=>({tag:el.tagName, cls:String(el.className), text:el.textContent?.trim().slice(0,45), right:Math.round(el.getBoundingClientRect().right)})).filter(el=>el.right>innerWidth+1).slice(0,12);
      return {title:document.title, image:{x:rect.x,y:rect.y,width:rect.width,height:rect.height,display:css.display,visibility:css.visibility,opacity:css.opacity,natural:image.naturalWidth,parentWidth:parent.width},overflow};
    }));
  }
  return diagnostics;
}
