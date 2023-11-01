!(function() {
  var e = window.location.search
    .slice(1)
    .split('&')
    .reduce((e, t) => ({ ...e, [t.split('=')[0]]: t.split('=')[1] }), {});
  const t = e.smsclickid;
  var e = e.smscode,
    o = () => {
      var e = new Date().getTime() + 2592e6,
        t = new Date();
      return t.setTime(e), t.toUTCString();
    };
  if (
    t &&
    ((document.cookie = `sms_click_id=${t};expires=${o()};path=/;`),
    (document.cookie = `sms_click_time=${new Date().toUTCString()};expires=${o()};path=/;`),
    console.info(`ShopMy: Registered click ${t}.`),
    2 <= Array.from(document.querySelectorAll('[class*="shopify"]')).length)
  ) {
    const i = window.location.href.replace(/^(http|https):\/\//, '').split(/[/?#]/)[0];
    fetch(`https://${i}/cart.js`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(e => e.json())
      .then(e => {
        e = { ...(e.attributes || {}), sms_click_id: t, sms_click_time: new Date().toUTCString() };
        fetch(`https://${i}/cart/update.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ attributes: e })
        })
          .then(() => console.info(`ShopMy: Sent tracking code ${t} to cart object.`))
          .catch(() => console.info(`ShopMy: Failed to send tracking code ${t} to cart object.`));
      });
  }
  e &&
    (2 <= Array.from(document.querySelectorAll('[class*="shopify"]')).length
      ? ((c = window.location.href.replace(/^(http|https):\/\//, '').split(/[/?#]/)[0]),
        fetch(`https://${c}/discount/` + e),
        console.info(`ShopMy: Automatically applied discount code ${e}.`))
      : ((document.cookie = `sms_code=${e};expires=${o()};path=/;`), console.info(`ShopMy: Stored cookie for coupon ${e}.`)));
  var c = () => {
    const { sms_click_id: t, sms_code: o } = document.cookie
      .split(';')
      .reduce((e, t) => ({ ...e, [(t.split('=')[0] || '').trim()]: (t.split('=')[1] || '').trim() }), {});
    t &&
      Array.from(document.querySelectorAll('a[href*=".myshopify"][href*="checkout"]')).forEach(e => {
        e.href.includes('smsclickid') ||
          (console.info('ShopMy Shelf: Migrating Cookie to Checkout URL'),
          (e.href = `${e.href}${e.href.includes('?') ? '&' : '?'}smsclickid=` + t + (o ? '&smscode=' + o : '')));
      });
  };
  setTimeout(c, 250), setInterval(c, 1750);
})();
