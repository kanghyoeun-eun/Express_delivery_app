(() => {
  const screen = document.createElement('section');
  const bookAssets = './assets/images/couponbook-20261029/';
  const assets = './assets/images/currency-guide-20261029/';
  screen.className = 'app-screen currency-guide';
  screen.dataset.screen = 'currency-guide';
  screen.setAttribute('aria-label', '지역화폐 충전 혜택 안내');
  screen.innerHTML = `<div class="status-bar guide-status"><strong>9:41</strong><div class="status-icons">${['e07fb.svg','57096.svg','56d0a.svg'].map(file => `<img src="./assets/images/category-20261028/${file}" alt="" />`).join('')}</div></div>
    <header class="guide-header"><button type="button" data-back aria-label="뒤로"><img src="${bookAssets}dc01e.svg" alt="" /></button></header>
    <div class="scroll-area guide-scroll"><div class="guide-content"><article class="currency-guide-card">
      <img class="guide-coupon" src="${assets}c2301.png" alt="" />
      <div class="guide-copy"><div class="guide-description"><h1>지역화폐는 지원금을 받았을<br />때만 쓰는 게 아니에요.</h1><p>지역화폐는 충전해서도 쓸 수 있어요.<br />10% 인센티브를 제공하는 지역이라면,<br />5만 원 충전 시 5천 원을 더 받아<br />총 5만 5천 원을 사용할 수 있답니다.</p></div><p class="guide-note">*인센티브율은 지역에 따라 달라요.</p></div>
      <button class="guide-charge" type="button">충전 바로가기<img src="${assets}a81c2.svg" alt="" /></button>
    </article></div></div><img class="guide-home-indicator" src="${bookAssets}9b0b0.png" alt="" />`;
  document.querySelector('[data-screen="coupon-book"]').after(screen);
  const badge = document.querySelector('.book-earned[aria-label="저축왕 배지 획득"]');
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'book-guide-entry';
  button.setAttribute('aria-label', '저축왕 배지: 지역화폐 충전 혜택 보기');
  badge.replaceWith(button);
  button.append(badge);
  button.addEventListener('click', () => {
    showScreen('currency-guide');
    trackUtEvent('view_currency_guide', {screen_name:'currency-guide',button_label:'저축왕'});
  });
  screen.querySelector('.guide-charge').addEventListener('click', () => {
    trackUtEvent('currency_charge_click', {screen_name:'currency-guide',button_label:'충전 바로가기'});
    showToast('충전 서비스 연결 주소가 아직 등록되지 않았어요.');
  });
})();
