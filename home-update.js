/* Home revision: Figma 1587:13559, October 2026. */
(() => {
  const home = document.querySelector('[data-screen="home"]');
  const asset = (file) => `./assets/images/home-20261028/${file}`;
  const arrow = '<img src="./icons/20/chevron-right.svg" alt="" />';
  home.classList.add('home-v2');
  home.querySelector('.location span').textContent = '집';
  home.querySelector('.hero-detail-button').innerHTML = `최대 3만원 발급받기 ${arrow}`;
  home.querySelector('.hero-ticket').src = asset('83cbe.png');
  home.querySelector('.hero-glow').innerHTML = `<img src="${asset('d4db4.svg')}" alt="" />`;

  const categoryFiles = ['98f13.png','977e2.png','63722.png','ec115.png','8676b.png','83ac6.png','41cbf.png','82fef.png','d6e17.png','ba2d9.png'];
  home.querySelectorAll('.category-art img').forEach((img, index) => { img.src = asset(categoryFiles[index]); });
  const benefitGrid = home.querySelector('#benefitGrid');
  const benefitFiles = { local: 'b9fe0.png', onnuri: 'af9df.png', gdream: '6c521.png', coupon: '8c1ed.png', event: 'fae33.png' };
  ['local','onnuri','gdream','coupon','event'].forEach((slug) => {
    const button = benefitGrid.querySelector(`[data-slug="${slug}"]`);
    button.querySelector('img').src = asset(benefitFiles[slug]);
    if (slug === 'onnuri') button.querySelector('em').textContent = '선착순 무료';
    benefitGrid.append(button);
  });
  const chargeLinks = document.createElement('div');
  chargeLinks.className = 'home-charge-links';
  chargeLinks.innerHTML = `<button type="button" data-target="benefit-list" data-slug="local" data-label="지역화폐"><img src="${asset('e1c46.svg')}" alt="" /><span>지역화폐 충전하고 <strong>10% 싸게 먹기!</strong></span>${arrow}</button><button type="button" data-target="benefit-list" data-slug="onnuri" data-label="온누리"><img src="${asset('8bf71.svg')}" alt="" /><span>온누리 쿠폰 발급받고 <strong>무료로 먹기!</strong></span>${arrow}</button>`;
  home.querySelector('.benefit-wrap').append(chargeLinks);

  const promotion = home.querySelector('.event-card');
  promotion.style.background = '#008633';
  promotion.querySelector('.event-bag').remove();
  const food = promotion.querySelector('.event-food');
  food.src = asset('cacd6.png');
  food.className = 'home-promotion-art';

  const tags = '<span class="home-tag blue">수원페이</span><span class="home-tag orange">온누리 상품권</span>';
  const sourceStores = [...categoryPages.salad.stores, ...categoryPages.dessert.stores, ...stores];
  const homeStores = new Map();
  const storeFor = (name) => sourceStores.find((store) => store.name === name) || sourceStores[0];
  const card = (name, file, coupon, time, discount, rating, free = false) => {
    const key = `${name}-${file}`;
    homeStores.set(key, { ...storeFor(name), name, image: `home-20261028/${file}`, rating, time: `${time}분 소요`, discount: `최대 ${discount}원 할인` });
    return `<button class="home-offer-card" type="button" data-target="store" data-home-store="${key}"><span class="home-offer-media"><img src="${asset(file)}" alt="${name}" /><span>사장님 쿠폰 ${coupon}원</span></span><h3>${name}</h3>${free ? '<p>말차 라떼</p><p class="home-free-price"><b>100%</b> <strong>0원</strong> <del>12,000원</del></p>' : `<p>${time}분 소요 · 최대 ${discount}원 할인</p>`}<div class="home-offer-tags">${tags}</div>${free ? '' : `<p class="home-rating"><img src="${asset('6fad9.svg')}" alt="별점" />${rating}</p>`}</button>`;
  };
  const hot = home.querySelector('.hot-section');
  hot.innerHTML = `<div class="home-offer-track"><div class="home-chef-intro"><div class="home-chef-heading"><span>사장님 쿠폰 랭킹</span><div><h2>사장님이 쏜다!</h2><p>오직 배달특급에서만!</p></div></div><div class="home-chef-art"><img src="${asset('6d8eb.png')}" alt="" /></div></div>${card('샐러디 성대점','83cc0.png',3000,35,7000,'5.0(432)')}${card('투썸플레이스','abcac.png',2000,25,3000,'5.0(200)')}${card('동탄 할머니 보쌈','abcac.png',2000,35,3000,'5.0(342)')}</div>`;
  hot.querySelectorAll('.home-offer-card').forEach((button, index) => {
    if (index > 0) button.querySelector('.home-tag.orange').textContent = '온누리 쿠폰';
    const rating = button.querySelector('.home-rating');
    const parts = rating.textContent.match(/([\d.]+)(\(\d+\))/);
    if (parts) rating.innerHTML = `<img src="${asset('6fad9.svg')}" alt="별점" /><strong>${parts[1]}</strong><span>${parts[2]}</span>`;
  });

  const stamp = home.querySelector('.stamp-section');
  stamp.querySelector('h2').innerHTML = `4월 프리퀀시 현황 ${arrow}`;
  stamp.querySelector('.stamp-row').innerHTML = `<img class="home-badge-line" src="${asset('3ce57.svg')}" alt="" />` + ['8d30f.svg','77314.svg','8d690.svg'].map((file,index) => `<span class="home-earned-badge home-earned-badge-${index}"><img src="${asset(file)}" alt="수집한 배지" /></span>`).join('') + `<span class="home-locked-badge"><img class="home-locked-shield" src="${asset('7584a.svg')}" alt="다음 쿠폰 배지" /><span class="home-locked-ticket"><img src="${asset('dde22.svg')}" alt="" /><small>coupon</small></span></span>`;
  stamp.querySelector('button').addEventListener('click', () => showScreen('my'));
  hot.after(stamp);
  const famousSection = home.querySelector('.famous-section');
  famousSection.innerHTML = `<header class="home-time-title"><span><img src="${asset('beed3.svg')}" alt="" />00:15:28</span><button type="button" data-target="benefit-list" data-label="온누리" data-slug="onnuri">온누리쿠폰 받고 무료로 먹자! ${arrow}</button></header><div class="home-offer-track">${card('온누리 참여 가게','87e04.png',2000,35,3000,'5.0(342)',true)}${card('동탄 할머니 보쌈','abcac.png',2000,35,3000,'5.0(342)')}</div>`;
  const chipLabels = ['지역화폐 가능','온누리 상품권 가능','G드림카드','할인 쿠폰','주문 많은 순'];
  home.querySelectorAll('#chipList button').forEach((button,index) => { if (chipLabels[index]) button.textContent = chipLabels[index]; });
  const popularFiles = ['9c8c2.png','9c9ba.png','dac11.png'];
  home.querySelectorAll('#storeList > .store-card').forEach((button,index) => {
    if (!popularFiles[index]) return;
    const key = `popular-${index}`;
    const store = { ...stores[index], image: `home-20261028/${popularFiles[index]}` };
    homeStores.set(key, store);
    button.querySelector('img').src = asset(popularFiles[index]);
    button.dataset.homeStore = key;
    delete button.dataset.storeSlug;
  });
  const discountTab = home.querySelector('.bottom-nav [data-target="search"]');
  discountTab.dataset.target = 'benefit-list';
  discountTab.dataset.slug = 'coupon';
  discountTab.dataset.label = '할인';
  discountTab.querySelector('span').textContent = '할인';
  const discountIcon = discountTab.querySelector('img');
  discountIcon.src = asset('b5098.svg');
  discountIcon.dataset.line = asset('b5098.svg');
  discountIcon.dataset.active = asset('b5098.svg');
  home.addEventListener('click', (event) => {
    const card = event.target.closest('[data-home-store]');
    if (!card) return;
    currentStore = homeStores.get(card.dataset.homeStore);
    renderStoreDetail(currentStore);
  }, true);
})();
