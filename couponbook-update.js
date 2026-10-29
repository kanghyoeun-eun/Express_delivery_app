(() => {
  const asset = name => `./assets/images/couponbook-20261029/${name}`;
  const image = (name, className = '', alt = '') => `<img class="${className}" src="${asset(name)}" alt="${alt}" />`;
  const screen = document.createElement('section');
  screen.className = 'app-screen couponbook-v2';
  screen.dataset.screen = 'coupon-book';
  screen.setAttribute('aria-label', '4월 프리퀀시 쿠폰북');
  const earned = [
    [80.89,87.289,'d3902.svg','상생 협약 체결'],
    [197.716,87.289,'f9da8.svg','상생 협약 체결'],
    [313.195,87.289,'dc7be.svg','저축왕']
  ];
  const locked = [
    [138.52,231.1,'07a18.svg','5'],[202.98,367.84,'21611.svg','7'],
    [315,367.84,'d078f.svg','8'],[90.95,367.84,'07a18.svg','6'],
    [261.53,504.92,'21611.svg','9'],[202.98,642.51,'21611.svg','12'],
    [315,642.51,'d078f.svg','13'],[90.95,642.51,'07a18.svg','11'],
    [261.53,779.59,'21611.svg','14']
  ];
  const rewards = [
    {step:4,amount:3000,x:261.53,y:231.1},
    {step:10,amount:5000,x:138.52,y:505.43},
    {step:15,amount:6000,x:138.52,y:779.59}
  ];
  const coupon = ({step,amount,x,y}) => `<span class="book-coupon" data-step="${step}" data-coupon-amount="${amount}" style="--x:${x / 393 * 100}%;--y:${y}px" aria-label="${step}번째 주문 ${amount}원 쿠폰, 미획득">${image('2c840.svg','book-earned-image')}<span class="book-ticket">${image('c5121.svg')}<small>coupon</small></span></span><span class="book-reward" style="left:calc(${x / 393 * 100}% + 3.84px);top:${y-53.72}px"><span>${amount}원 쿠폰</span>${image('7b71e.svg')}</span>`;
  screen.innerHTML = `<div class="book-top">
    <div class="status-bar book-status"><strong>9:41</strong><div class="status-icons">${['e07fb.svg','57096.svg','56d0a.svg'].map(name => `<img src="./assets/images/category-20261028/${name}" alt="" />`).join('')}</div></div>
    <header class="book-header"><button type="button" data-back aria-label="뒤로">${image('dc01e.svg')}</button><h1>쿠폰북</h1><div><button type="button" data-book-notifications aria-label="알림">${image('f3c15.svg')}</button><button type="button" data-target="cart" aria-label="장바구니">${image('9ba2f.svg')}</button></div></header>
    </div><div class="scroll-area book-scroll"><div class="book-hero">${image('00b21.svg','book-background')}<div class="book-intro"><h2>4월 프리퀀시</h2><p>4월 한 달간 최대 3만원 할인<br />쿠폰을 받을 수 있어요!</p>${image('32783.png','book-megaphone')}</div></div>
    <section class="book-board" aria-label="프리퀀시 배지 진행 현황">
      ${['15d48.svg','efe3f.svg','7e9a8.svg','5898e.svg','7e9a8.svg'].map((name,index) => `<span class="book-path book-path-${index}">${image(name)}</span>`).join('')}
      ${earned.map(([x,y,file,label],index) => `<span class="book-earned" data-step="${index+1}" style="--x:${x / 393 * 100}%;--y:${y}px" aria-label="${label} 배지 획득">${image(file,'book-earned-image')}<span class="book-badge-label">${label}</span></span>`).join('')}
      ${locked.map(([x,y,file,number]) => `<span class="book-locked" data-step="${number}" style="--x:${x / 393 * 100}%;--y:${y}px" aria-label="${number}번 배지 미획득">${image(file)}<b>${number}</b></span>`).join('')}
      ${rewards.map(coupon).join('')}
    </section></div>${image('9b0b0.png','book-home-indicator')}`;
  document.querySelector('[data-screen="my"]').after(screen);
  const scroll = screen.querySelector('.book-scroll');
  const syncHeader = () => {
    screen.classList.toggle('book-is-scrolling',scroll.scrollTop>0);
    screen.classList.toggle('book-hero-passed',scroll.scrollTop>=128);
    screen.style.setProperty('--book-scroll-y',`${-scroll.scrollTop}px`);
  };
  scroll.addEventListener('scroll',syncHeader,{passive:true});
  window.couponBookView = {onShow:syncHeader};
  screen.querySelector('[data-book-notifications]').addEventListener('click', () => showToast('새로운 알림이 없어요'));
  document.querySelector('[data-my-action="couponbook"]').addEventListener('click', () => {
    showScreen('coupon-book');
    trackUtEvent('view_coupon_book', {screen_name:'coupon-book'});
  });
})();
