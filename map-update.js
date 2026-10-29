/* The map uses the design's image in pixel coordinates, not live GPS or place data. */
(() => {
  const root = document.querySelector('[data-screen="pickup-map"]');
  const panel = root.querySelector('#mapStorePanel');
  const handle = root.querySelector('#mapPanelHandle');
  const scroll = root.querySelector('#mapPanelScroll');
  const controls = root.querySelector('.map-location-controls');
  const input = root.querySelector('#mapSearchInput');
  const asset = file => `./assets/images/map-20261029/${file}`;
  const categoryImages = ['98f13.png','977e2.png','63722.png','ec115.png','8676b.png','83ac6.png','41cbf.png','82fef.png','d6e17.png','ba2d9.png'];
  const nearby = [
    { slug:'map-trata-main', name:'트라타 본점', image:'map-20261029/9c8c2.png', rating:'5.0(242)', pickupTime:'10분', time:'10분 소요', category:'korean', ownerCoupon:2000, pickupDiscount:3000, discount:'3000원 할인', labels:['수원페이','온누리 쿠폰'], paymentMethods:['local','onnuri'], couponLabel:'2000원 쿠폰', pickupAvailable:true, deliveryAvailable:false },
    { slug:'map-jeongsotbap', name:'정솥밥', image:'map-20261029/2b7cc.png', rating:'5.0(550)', pickupTime:'20분', time:'20분 소요', category:'korean', ownerCoupon:2000, pickupDiscount:3000, discount:'3000원 할인', labels:['수원페이','온누리 쿠폰'], paymentMethods:['local','onnuri'], couponLabel:'2000원 쿠폰', pickupAvailable:true, deliveryAvailable:false },
    { slug:'map-shirayuki-haenggung', name:'시라유키 행궁', image:'map-20261029/75950.png', rating:'5.0(342)', pickupTime:'20분', time:'20분 소요', category:'japanese', ownerCoupon:2000, pickupDiscount:3000, discount:'최대 3000원 할인', labels:['수원페이','온누리 쿠폰'], paymentMethods:['local','onnuri'], couponLabel:'2000원 쿠폰', pickupAvailable:true, deliveryAvailable:false },
  ];
  let map;
  let mapInitialized = false;
  let snap = 'mid';
  let chosenCategory = null;
  let resetOnShow = false;
  let drag;
  let suppressClick = false;
  const imageSize = { width:1058.335, height:851.161 };
  const referencePoint = [591.161,683.717];

  function stops() {
    const height = root.clientHeight || 852;
    return { expanded:150, mid:Math.max(220,height * 370 / 852), collapsed:Math.max(250,height - 110) };
  }
  function positionPanel(top) {
    panel.style.top = `${top}px`;
    controls.style.top = `${Math.max(156,top - 98)}px`;
    controls.hidden = top < 260;
    updateMapBounds();
  }
  function setSnap(next) {
    snap = next;
    root.dataset.sheetSnap = next;
    positionPanel(stops()[next]);
    handle.setAttribute('aria-expanded', String(next === 'expanded'));
    handle.setAttribute('aria-label', next === 'expanded' ? '가게 목록 접기' : '가게 목록 펼치기');
  }
  function recenter() {
    if (!map) return;
    map.invalidateSize({pan:false});
    const width = root.clientWidth;
    const height = root.clientHeight;
    const visibleHeight = parseFloat(panel.style.top) || stops().mid;
    const zoom = Math.max(0,Math.ceil(Math.log2(visibleHeight / imageSize.height) * 10) / 10);
    const scale = 2 ** zoom;
    const markerY = Math.min(260,visibleHeight - 60);
    map.setView([referencePoint[0] + (markerY - height / 2) / scale, referencePoint[1] + (width / 2 - width * 211.417 / 393) / scale], zoom, {animate:false});
    mapInitialized = true;
    updateMapBounds();
  }
  function updateMapBounds() {
    if (!map || !mapInitialized) return;
    const top = parseFloat(panel.style.top) || stops().mid;
    const minimum = Math.max(0,Math.ceil(Math.log2(top / imageSize.height) * 10) / 10);
    map.setMinZoom(minimum);
    map.setMaxBounds([[-(root.clientHeight - top) / (2 ** map.getZoom()),0],[imageSize.height,imageSize.width]]);
  }
  function initializeMap() {
    if (map) return;
    map = L.map(root.querySelector('#pickupMapCanvas'), {crs:L.CRS.Simple, zoomControl:false, attributionControl:false, zoomAnimation:false, markerZoomAnimation:false, minZoom:0, maxZoom:2.5, zoomSnap:.1, zoomDelta:.5, maxBoundsViscosity:1});
    const background = L.imageOverlay(asset('58cb5.png'), [[0,0],[imageSize.height,imageSize.width]], {alt:'테스트 지역 지도'}).addTo(map);
    background.on('load', () => { root.dataset.mapReady = 'true'; });
    background.on('error', () => { root.dataset.mapReady = 'error'; showToast('지도 이미지를 불러오지 못했어요'); });
    const marker = L.marker(referencePoint, {icon:L.divIcon({className:'map-reference-marker', html:`<img src="${asset('ad92a.svg')}" alt="" />`, iconSize:[61.166,61.166], iconAnchor:[30.583,30.583]}), title:'테스트 기준 위치', alt:'테스트 기준 위치', keyboard:true}).addTo(map);
    marker.on('click', () => setSnap(snap === 'expanded' ? 'mid' : 'expanded'));
    map.on('zoomend',updateMapBounds);
    recenter();
  }
  function smallCard(store) {
    const rating = String(store.rating).match(/^([\d.]+)(.*)$/);
    const coupon = store.ownerCoupon || (store.couponLabel === false ? 0 : wonValue(store.couponLabel,1000));
    return `<button class="map-small-card" type="button" data-target="store" data-store-slug="${getStoreSlug(store)}" data-pickup-store="true"><span class="map-small-media"><img src="${imageRoot}${store.image}" alt="${store.name}" /><span>${coupon ? `사장님 쿠폰 ${coupon}원` : '픽업 가능'}</span></span><strong>${store.name}</strong><p>${store.pickupTime ? `픽업 약 ${store.pickupTime}` : '픽업 가능'} · ${store.discount || '혜택 확인'}</p><span class="tags">${renderStoreLabels(store)}</span><span class="category-rating"><img src="./icons/14/star.svg" alt="별점" /><b>${rating ? rating[1] : store.rating}</b><small>${rating ? rating[2] : ''}</small></span></button>`;
  }
  function render() {
    if (!root.classList.contains('active') || !listViewState.result.page) return;
    const state = listViewState.result;
    const filters = root.querySelector('#mapFilterStrip');
    filters.innerHTML = `<button type="button" data-store-mode-open aria-haspopup="dialog">${storeModeLabel(state.storeMode)}<img src="./assets/images/category-20261028/7cb3d.svg" alt="" /></button>${renderFilterButtons(['기본순','지역화폐','온누리상품권','쿠폰','최소주문금액'])}`;
    setFilterStripState(root,state.filter,state.activeFilters,state.sortKey,state.minOrderLimit);
    filters.querySelector('[data-filter="local"]').innerHTML = `${state.activeFilters?.includes('local') ? '수원페이' : '지역화폐'}<img src="./assets/images/category-20261028/473de.svg" alt="" />`;
    root.querySelector('#mapFoodCategories').innerHTML = categories.map(([name,,,key],i) => `<button type="button" data-map-category="${key}" aria-pressed="${chosenCategory === key}"><span><img src="./assets/images/home-20261028/${categoryImages[i]}" alt="" /></span>${name}</button>`).join('');
    const query = (state.searchQuery || '').toLocaleLowerCase();
    const results = resultStoresForView();
    const selected = chosenCategory ? nearby.filter(store => store.category === chosenCategory) : nearby;
    const base = selected.length ? selected : results.slice(0,3);
    const popular = applyStoreFilters(base,state.activeFilters,state.slug,state.sortKey,state.minOrderLimit).filter(store => (!query || store.name.toLocaleLowerCase().includes(query)) && (state.storeMode !== 'delivery' || store.deliveryAvailable !== false));
    root.querySelector('#mapPopularStores').innerHTML = popular.length ? popular.map(smallCard).join('') : '<p class="map-empty-state">조건에 맞는 가게가 없어요</p>';
    root.querySelector('#mapResultStores').innerHTML = results.length ? results.map(state.storeMode === 'pickup' ? pickupStoreCard : categoryStoreCard).join('') : '<p class="map-empty-state">조건에 맞는 가게가 없어요</p>';
    if (document.activeElement !== input) input.value = state.searchQuery || '';
  }
  function onShow() {
    render();
    initializeMap();
    map.invalidateSize({pan:false});
    if (resetOnShow) { recenter(); setSnap('mid'); resetOnShow = false; }
    else setSnap(snap);
    trackUtEvent('view_pickup_map',{screen_name:'pickup-map',category_name:listViewState.result.label});
  }

  root.querySelector('#mapSearchForm').addEventListener('submit', event => {
    event.preventDefault();
    const query = input.value.trim();
    const category = categories.find(([name]) => name === query);
    if (category) { chosenCategory = category[3]; setResultContext(category[0],category[3],listViewState.result.storeMode); }
    else { listViewState.result.searchQuery = query; updateResultStores(); }
    setSnap('mid');
    input.blur();
    trackUtEvent('search',{search_term:query,screen_name:'pickup-map'});
  });
  input.addEventListener('search', () => {
    if (!input.value) { listViewState.result.searchQuery = ''; updateResultStores(); }
  });
  root.querySelector('#mapFoodCategories').addEventListener('click', event => {
    const button = event.target.closest('[data-map-category]');
    if (!button) return;
    chosenCategory = button.dataset.mapCategory;
    setResultContext(button.textContent,chosenCategory,listViewState.result.storeMode);
    trackUtEvent('food_category_click',{category_name:button.textContent,screen_name:'pickup-map'});
  });
  root.querySelector('#mapHomeButton').addEventListener('click', () => showScreen('home'));
  root.querySelector('#mapRecenterButton').addEventListener('click', recenter);
  root.querySelector('#mapListButton').addEventListener('click', () => {
    trackUtEvent('map_list_click',{category_name:listViewState.result.label,target_screen:'search-result'});
    if (historyStack[historyStack.length - 2] === 'search-result') goBack();
    else showScreen('search-result');
  });
  root.querySelector('#mapPopularTitle').addEventListener('click', () => { setSnap('expanded'); root.querySelector('#mapResultStores').scrollIntoView({block:'start',behavior:'smooth'}); });
  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    drag = {y:event.clientY,top:parseFloat(panel.style.top) || stops().mid};
    suppressClick = false;
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', event => {
    if (!drag) return;
    const delta = event.clientY - drag.y;
    if (Math.abs(delta) > 5) suppressClick = true;
    positionPanel(Math.max(stops().expanded,Math.min(stops().collapsed,drag.top + delta)));
  });
  function finishDrag() {
    if (!drag) return;
    const top = parseFloat(panel.style.top);
    setSnap(Object.entries(stops()).sort((a,b) => Math.abs(a[1] - top) - Math.abs(b[1] - top))[0][0]);
    drag = null;
  }
  handle.addEventListener('pointerup',finishDrag);
  handle.addEventListener('pointercancel',finishDrag);
  handle.addEventListener('click', () => { if (suppressClick) { suppressClick = false; return; } setSnap(snap === 'expanded' ? 'mid' : 'expanded'); });
  handle.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') { event.preventDefault(); setSnap(event.key === 'ArrowUp' ? 'expanded' : 'collapsed'); }
  });
  new ResizeObserver(() => {
    if (!root.classList.contains('active')) return;
    setSnap(snap);
    if (map) map.invalidateSize({pan:false});
  }).observe(root);
  window.pickupMapView = {
    open() { chosenCategory = null; resetOnShow = true; showScreen('pickup-map'); },
    onShow, render,
    findStore(slug) { return nearby.find(store => store.slug === slug); },
    searchStores(query) { return nearby.filter(store => store.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())); },
    getMap() { return map; },
  };
})();
