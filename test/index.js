const openPage = require('./_open-page');
const test = require('ava').serial;
const clipboardy = require('clipboardy');

test('Sanity check', async t => {
  let page = await openPage();
  t.is(await page.$eval('[data-test="heading"]', el => el.innerText), 'copy-to-clipboard Repo');
});

test('Basic Text Copy', async t => {
  let page = await openPage();
  await page.click('[data-test="init-basic-text"]');
  t.is(await clipboardy.read(), "Hello, I'm new content from your clipboard");
});

test('Multiline Text Copy', async t => {
  let page = await openPage();
  await page.click('[data-test="init-multiline-text"]');
  t.is(await clipboardy.read(), "This would be\nsome multiline text\nfor us to copy");
});

test('Text w/ Markup Copy', async t => {
  let page = await openPage();
  await page.click('[data-test="init-markup-text"]');
  t.is(await clipboardy.read(), "<script>\n  alert\('this is some script'\)\n</script>");
});
