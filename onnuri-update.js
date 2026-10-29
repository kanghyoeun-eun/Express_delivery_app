(() => {
  const asset = file => `./assets/images/onnuri-20261029/${file}${file==='banner.png'?'?v=4x':''}`;
  const icon = (file,alt='') => `<img src="${asset(file)}" alt="${alt}" />`;
  const storeMap = new Map();
  const menuMap = new Map();
  const freeData = [
    ['평지담','말차 라떼','87e04.png',12000],
    ['CHAI797','[SET] 새우 딤섬','bd39e.png',20000],
    ['니드스윗','[SET]인기 디저트','537c1.png',15000]
  ];
  const popularData = [
    ['트라타','9c8c2.png',45,'까르보네, 더블업 트라타 부리또'],
    ['샐러디','9c9ba.png',40,'탄단지 샐러디, 콜라 3335ml'],
    ['아미고타코','dac11.png',32,'해쉬브라운 부리또']
  ];
  function register(name,file,index,menus,time=35,recent='') {
    const slug = `onnuri-store-${index}`;
    const source = stores.find(store => store.name === name);
    const store = {...source,slug,name,image:`onnuri-20261029/${file}`,rating:'5.0(342)',time:`${time}분 소요`,discount:'최대 3000원 할인',couponLabel:'1000원 쿠폰',ownerCoupon:index<3?2000:1000,labels:['수원페이','온누리'],minOrder:source?.minOrder || '10,000원',recent};
    storeMap.set(slug,store);
    const sourceMenus = menus || (source ? menusForStoreSlug(getStoreSlug(source)) : null) || [];
    menuMap.set(slug,sourceMenus.map(menu => ({...menu,image:store.image})));
    return store;
  }
  const freeStores = freeData.map(([name,menu,file,price],index) => register(name,file,index,[{name:menu,price:`${price.toLocaleString('ko-KR')}원`,badge:'인기 1위'}]));
  const popularStores = popularData.map(([name,file,time,recent],index) => register(name,file,index+3,null,time,recent));
  const screen = document.createElement('section');
  screen.className = 'app-screen onnuri-v2';
  screen.dataset.screen = 'onnuri';
  screen.setAttribute('aria-label','온누리 상품권');
  const common = './assets/images/couponbook-20261029/';
  const tags = (free=false) => `<span class="onnuri-tags"><span>수원페이</span><span class="${free?'orange':'yellow'}">${free?'온누리 상품권':'1000원 쿠폰'}</span></span>`;
  const select = (name,label,options,dark=false) => `<label class="onnuri-select ${dark?'dark':''}"><select data-onnuri-select="${name}" aria-label="${label}">${options.map(([value,text])=>`<option value="${value}">${text}</option>`).join('')}</select></label>`;
  screen.innerHTML = `<div class="status-bar onnuri-status"><strong>9:41</strong><div class="status-icons">${['e07fb.svg','57096.svg','56d0a.svg'].map(file=>`<img src="./assets/images/category-20261028/${file}" alt="" />`).join('')}</div></div>
    <header class="onnuri-header"><button type="button" data-back aria-label="뒤로"><img src="${common}dc01e.svg" alt="" /></button><h1>온누리 상품권</h1><div><button type="button" data-onnuri-notifications aria-label="알림"><img src="${common}f3c15.svg" alt="" /></button><button type="button" data-target="cart" aria-label="장바구니"><img src="${common}9ba2f.svg" alt="" /></button></div></header>
    <div class="onnuri-banner"><img src="${asset('banner.png')}" alt="10.31까지 최대 2만원 무료 지급! 온누리 상품권" /><a href="https://apps.apple.com/kr/app/id6738372450" target="_blank" rel="noopener noreferrer" aria-label="발급 바로가기: 디지털온누리 앱 설치"></a></div>
    <div class="scroll-area onnuri-scroll"><section class="onnuri-free"><header><span class="onnuri-timer">${icon('beed3.svg')}00:15:28</span><h2>온누리 상품권 발급받고 무료로 먹자!${icon('a1a1c.svg')}</h2></header>
    <div class="onnuri-menu-track">${freeStores.map((store,index)=>`<button type="button" class="onnuri-free-card" data-target="store" data-store-slug="${store.slug}"><span class="onnuri-free-photo"><img src="${asset(freeData[index][2])}" alt="${freeData[index][1]}" /><span>사장님 쿠폰 2000원</span></span><span class="onnuri-free-copy"><small>${store.name}</small><strong>${freeData[index][1]}</strong><span class="onnuri-free-price"><b>100%</b><strong>0원</strong><del>${freeData[index][3].toLocaleString('ko-KR')}원</del></span>${tags(true)}</span></button>`).join('')}</div></section>
    <section class="onnuri-popular"><h2>인기 동네 맛집${icon('b8f53.svg')}</h2><div class="onnuri-filter-strip">
    ${select('mode','가게 유형',[['delivery','배달 가능 가게만'],['pickup','픽업 가능 가게만'],['all','모든 가게']],true)}
    ${select('sort','정렬',[['default','기본순'],['fast','배달 빠른 순'],['rating','별점 높은 순']])}
    ${select('local','지역화폐',[['all','지역화폐'],['local','지역화폐 가능']])}
    <button type="button" data-onnuri-toggle="onnuri" aria-pressed="false">온누리상품권</button><button type="button" data-onnuri-toggle="coupon" aria-pressed="false">할인 쿠폰</button>
    ${select('minimum','최소주문금액',[['all','최소주문금액'],['10000','10,000원 이하'],['15000','15,000원 이하'],['20000','20,000원 이하']])}
    </div><div class="onnuri-store-list"></div></section></div><img class="onnuri-home-indicator" src="${common}9b0b0.png" alt="" />`;
  document.querySelector('[data-screen="benefit-list"]').after(screen);
  const state = {mode:'delivery',sort:'default',local:'all',minimum:'all',onnuri:false,coupon:false};
  function render() {
    let result = popularStores.filter(store => (state.mode!=='delivery'||store.deliveryAvailable!==false) && (state.mode!=='pickup'||store.pickupAvailable!==false) && (state.local!=='local'||store.labels.includes('수원페이')) && (!state.onnuri||store.labels.includes('온누리')) && (!state.coupon||store.ownerCoupon>0) && (state.minimum==='all'||wonValue(store.minOrder,0)<=Number(state.minimum)));
    if(state.sort==='fast') result.sort((a,b)=>parseInt(a.time)-parseInt(b.time));
    if(state.sort==='rating') result.sort((a,b)=>parseFloat(b.rating)-parseFloat(a.rating));
    screen.querySelector('.onnuri-store-list').innerHTML = result.map(store=>`<button class="onnuri-store-card" type="button" data-target="store" data-store-slug="${store.slug}" ${state.mode==='pickup'?'data-pickup-store="true"':''}><img class="onnuri-store-photo" src="${imageRoot}${store.image}" alt="${store.name}" /><span class="onnuri-store-copy"><span class="onnuri-store-title"><strong>${store.name}</strong><span>${icon('6fad9.svg','별점')}<b>5.0</b><small>(342)</small></span></span><span class="onnuri-store-meta"><span>${icon('0ac36.svg')}${store.time}</span><span>${icon('06d4b.svg')}최대 3000원 할인</span></span><span class="onnuri-recent">최근주문 : ${store.recent}</span>${tags()}</span></button>`).join('') || '<p class="onnuri-empty">조건에 맞는 가게가 없어요.</p>';
  }
  screen.addEventListener('change',event=>{
    const key=event.target.dataset.onnuriSelect;
    if(!key)return;
    state[key]=event.target.value;
    const widths={mode:135,sort:80,local:92,minimum:125};
    event.target.parentElement.style.width=`${event.target.selectedIndex===0 ? widths[key] : Math.max(widths[key],event.target.selectedOptions[0].textContent.length*14+35)}px`;
    render();
    trackUtEvent(key==='sort'?'sort_click':'filter_click',{screen_name:'onnuri',[key==='sort'?'sort_name':'filter_name']:event.target.selectedOptions[0].textContent});
  });
  screen.addEventListener('click',event=>{
    const toggle=event.target.closest('[data-onnuri-toggle]');
    if(toggle){const key=toggle.dataset.onnuriToggle;state[key]=!state[key];toggle.setAttribute('aria-pressed',String(state[key]));render();trackUtEvent('filter_click',{screen_name:'onnuri',filter_name:toggle.textContent});}
    if(event.target.closest('[data-onnuri-notifications]'))showToast('새로운 알림이 없어요');
  });
  screen.querySelector('.onnuri-banner a').addEventListener('click',()=>trackUtEvent('onnuri_app_install_click',{screen_name:'onnuri'}));
  document.addEventListener('click',event=>{
    const entry=event.target.closest('[data-target="benefit-list"][data-slug="onnuri"]');
    if(!entry)return;
    event.preventDefault();event.stopImmediatePropagation();
    showScreen('onnuri');trackUtEvent('view_onnuri',{screen_name:'onnuri'});
  },true);
  window.onnuriView={findStore:slug=>storeMap.get(slug),menusForStore:slug=>menuMap.get(slug)};
  render();
})();
