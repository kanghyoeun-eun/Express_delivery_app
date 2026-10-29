/* MY uses prototype profile and reward data; it does not connect to an account server. */
(() => {
  const root = document.querySelector('[data-screen="my"]');
  const overlay = document.querySelector('[data-overlay="my-detail"]');
  const body = document.querySelector('#myDetailBody');
  let nickname = '간식조아';
  let payment = '신용/체크카드';
  let trigger;
  const asset = file => `./assets/images/my-20261029/${file}`;
  root.querySelectorAll('.status-icons img').forEach((image,index) => {
    image.src = `./assets/images/category-20261028/${['e07fb.svg','57096.svg','56d0a.svg'][index]}`;
  });
  const headerButtons = root.querySelectorAll('.header-actions button');
  headerButtons[0].querySelector('img').src = asset('3bbe9.svg');
  headerButtons[0].dataset.myAction = 'notifications';
  headerButtons[1].querySelector('img').src = asset('66b1a.svg');
  headerButtons.forEach(button => { button.title = button.getAttribute('aria-label'); });
  const nav = root.querySelector('.bottom-nav');
  const navFiles = [asset('6a8a1.svg'),'./assets/images/home-20261028/b5098.svg','./assets/images/home-20261028/dce1a.svg','./assets/images/home-20261028/f4d21.svg',asset('edf56.svg')];
  nav.querySelectorAll('button').forEach((button,index) => {
    const image = button.querySelector('img');
    image.src = navFiles[index];
    if (index === 4) image.dataset.active = navFiles[index];
    else image.dataset.line = navFiles[index];
    if (index === 1) { button.dataset.target = 'benefit-list'; button.dataset.slug = 'coupon'; button.dataset.label = '할인'; image.dataset.active = navFiles[index]; button.querySelector('span').textContent = '할인'; }
  });
  function showDetail(title,html,button) {
    trigger = button;
    document.querySelector('#myDetailTitle').textContent = title;
    body.innerHTML = html;
    openModal('my-detail');
    requestAnimationFrame(() => {
      if (overlay.classList.contains('show')) (body.querySelector('input') || overlay.querySelector('[data-close-modal]')).focus();
    });
  }
  function couponMarkup() {
    if (!downloadedOwnerCoupons.size) return '<p>다운로드한 사장님 쿠폰이 없어요.</p>';
    return [...downloadedOwnerCoupons].map(slug => {
      const store = findStoreBySlug(slug) || (currentStore && getStoreSlug(currentStore) === slug ? currentStore : null);
      const title = store?.name || '사장님 쿠폰';
      const amount = store?.ownerCoupon || (store ? wonValue(store.couponLabel,1000) : 0);
      return `<article class="my-personal-coupon"><b>${title}</b><strong>${amount ? `${amount}원 할인 쿠폰` : '다운로드 완료'}</strong></article>`;
    }).join('');
  }
  root.addEventListener('click',event => {
    const button = event.target.closest('[data-my-action]');
    if (!button) return;
    const action = button.dataset.myAction;
    const empty = {reviews:['리뷰 관리','등록된 리뷰가 없어요.'],story:['배달특급 스토리','등록된 스토리가 없어요.'],notifications:['알림','새로운 알림이 없어요.'],notices:['공지사항','등록된 공지사항이 없어요.'],support:['고객센터','등록된 문의 내역이 없어요.'],faq:['자주 묻는 질문','등록된 질문이 없어요.'],terms:['약관 및 정책','등록된 약관 및 정책이 없어요.'],version:['현재버전','프로토타입 v64']};
    if (action === 'profile') {
      showDetail('프로필', '<form id="myProfileForm"><label for="myNicknameInput">닉네임</label><input id="myNicknameInput" type="text" required maxlength="12" /><button class="my-detail-apply" type="submit">저장</button></form>',button);
      body.querySelector('input').value = nickname;
    } else if (action === 'membership') showDetail('멤버십 혜택','<p><b>LV1 행운 만땅 이웃</b></p><p>주문 3/6</p><p>3번 더 주문하면 3000원 쿠폰 지급!</p>',button);
    else if (action === 'couponbook') return;
    else if (action === 'coupons') showDetail('쿠폰함',couponMarkup(),button);
    else if (action === 'payments') {
      showDetail('결제수단',`<form id="myPaymentForm">${['신용/체크카드','지역화폐','온누리 상품권'].map((name,index) => `<label class="my-payment-choice"><input type="radio" name="myPayment" value="${name}" ${payment === name ? 'checked' : ''} />${name}</label>`).join('')}<button class="my-detail-apply" type="submit">선택</button></form>`,button);
    } else if (empty[action]) showDetail(empty[action][0],`<p>${empty[action][1]}</p>`,button);
    trackUtEvent('my_menu_click',{button_label:button.textContent.trim(),menu_name:action,screen_name:'my'});
  });
  body.addEventListener('submit',event => {
    event.preventDefault();
    if (event.target.id === 'myProfileForm') {
      const value = body.querySelector('#myNicknameInput').value.trim();
      if (!value) return;
      nickname = value;
      root.querySelector('#myNickname').textContent = nickname;
    } else if (event.target.id === 'myPaymentForm') {
      payment = new FormData(event.target).get('myPayment');
    }
    overlay.classList.remove('show');
    trigger?.focus();
  });
  document.querySelector('#storeAddressForm').addEventListener('submit',() => {
    const value = document.querySelector('#storeAddressInput').value.trim();
    if (value) root.querySelector('#myAddressText').textContent = value;
  });
  document.addEventListener('keydown',event => {
    if (!overlay.classList.contains('show')) return;
    if (event.key === 'Escape') { overlay.classList.remove('show'); trigger?.focus(); }
    if (event.key !== 'Tab') return;
    const focusable = [...overlay.querySelectorAll('button,input')].filter(element => !element.disabled);
    const first = focusable[0], last = focusable[focusable.length-1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  overlay.addEventListener('click',event => { if (event.target === overlay || event.target.closest('[data-close-modal]')) requestAnimationFrame(() => trigger?.focus()); });
  window.myPageView = {onShow() {
    root.querySelector('#myNickname').textContent = nickname;
    root.querySelector('#myAddressText').textContent = document.querySelector('#storeAddressInput').value;
    trackUtEvent('view_my',{screen_name:'my'});
  }};
})();
