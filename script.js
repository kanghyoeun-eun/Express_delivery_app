const imageRoot = "./assets/images/";
const figmaAssets = window.BAEDAL_FIGMA_ASSET_MAP || {};
const assetsByAlias = window.BAEDAL_ASSET_BY_ALIAS || {};

function mappedAsset(figmaNodeId, fallback) {
  return figmaAssets[figmaNodeId] || assetsByAlias[figmaNodeId] || fallback;
}

const categories = [
  ["한식", "1002:8774", "categories/korean.png", "korean"],
  ["치킨", "1002:8779", "categories/chicken.png", "chicken"],
  ["피자", "1151:2702", "categories/pizza.png", "pizza"],
  ["중식", "1151:2698", "categories/chinese.png", "chinese"],
  ["분식", "1151:2700", "categories/snack.png", "snack"],
  ["일식", "1002:8799", "categories/japanese.png", "japanese"],
  ["햄버거", "1151:2690", "categories/burger.png", "burger"],
  ["디저트", "1151:2692", "categories/dessert.png", "dessert"],
  ["야식", "1151:2694", "categories/late-night.png", "late-night"],
  ["샐러드", "1151:2696", "categories/salad.png", "salad"],
];

const benefits = [
  ["쿠폰함", "1151:2704", "benefits/images/benefits/coupon-box.png", "coupon"],
  ["이벤트", "1151:2706", "benefits/images/benefits/event-gift.png", "event"],
  ["지역화폐", "1151:2708", "benefits/images/benefits/local-currency.png", "local", "10% 할인"],
  ["온누리", "1151:2710", "benefits/images/benefits/onnuri.png", "onnuri", "선착순"],
  ["G드림카드", "1151:2712", "benefits/images/benefits/gdream-card.png", "gdream"],
];

const events = [
  {
    eyebrow: "오늘 저녁 마감!",
    title: "BHC 2000원 할인",
    image: "menus/menu-side-01.png",
    bag: "promotions/salady-bag-large.png",
    count: "2 / 12 전체",
    color: "#ff9f32",
    slug: "bhc",
  },
  {
    eyebrow: "이번 달 특별 이벤트",
    title: "샐러디 4000원 할인",
    image: "menus/roast-chicken-leg.png",
    bag: "promotions/salady-bag-large.png",
    count: "3 / 12 전체",
    color: "#009944",
    slug: "salady",
  },
  {
    eyebrow: "배달특급 회원 모두!",
    title: "피자헛 2000원 할인",
    image: "menus/menu-side-02.png",
    bag: "promotions/pizza-hut-bag-large.png",
    count: "4 / 12 전체",
    color: "#ff8f96",
    slug: "pizza",
  },
];

const hotMenus = [
  {
    name: "투썸플레이스 영통점",
    rating: "5.0(342)",
    detail: "35분 소요 · 최대 3000원 할인",
    image: "banners/dessert-drinks-banner.png",
  },
  {
    name: "스타벅스 수원시청점",
    rating: "5.0(342)",
    detail: "21분 소요 · 최대 2000원 할인",
    image: "banners/cream-pasta-banner.png",
  },
  {
    name: "디저트파티",
    rating: "4.9(188)",
    detail: "28분 소요 · 최대 1000원 할인",
    image: "stores/dessert-party/thumb.png",
  },
];

const chips = ["지역화폐 가능", "온누리 상품권 가능", "G드림카드", "이벤트 진행", "빠른 배달"];
const keywords = [
  { rank: 1, label: "두바이 쫀득 쿠키", tone: "hot", trend: "flat" },
  { rank: 2, label: "엽기 떡볶이", tone: "blue", trend: "flat" },
  { rank: 3, label: "버터쿠키", tone: "blue", trend: "flat" },
  { rank: 4, label: "맥도날드", trend: "up", delta: "1" },
  { rank: 5, label: "쌀국수", trend: "flat" },
  { rank: 6, label: "맘스터치", trend: "down", delta: "1" },
  { rank: 7, label: "한솥", trend: "new" },
  { rank: 8, label: "메밀국수", trend: "flat" },
  { rank: 9, label: "피자", trend: "up", delta: "1" },
  { rank: 10, label: "아폴로 피자", trend: "up", delta: "1" },
];
const recommendKeywords = ["저녁", "매운 음식", "쿠폰 할인", "엽기떡볶이", "건강식", "두바이 쫀득 쿠키", "베트남 음식"];

const stores = [
  {
    name: "트라타",
    rating: "5.0(342)",
    time: "45분 소요",
    discount: "최대 3000원 할인",
    recent: "최근주문 : 까르보네, 더블업 트라부 부리또",
    image: "stores/store-food-card-01/thumb.png",
  },
  {
    name: "샐러디",
    rating: "5.0(342)",
    time: "40분 소요",
    discount: "최대 3000원 할인",
    recent: "최근주문 : 탄단지 샐러디, 콜라 3335ml",
    image: "stores/salady/thumb-square.png",
  },
  {
    name: "아미고타코",
    rating: "5.0(342)",
    time: "32분 소요",
    discount: "최대 3000원 할인",
    recent: "최근주문 : 해쉬브라운 부리또",
    image: "stores/amigo-taco/thumb.png",
  },
];

const saladResults = [
  {
    name: "샐러디 성대점",
    rating: "5.0(342)",
    time: "35분 소요",
    discount: "최대 3000원 할인",
    image: "banners/payment-benefit-banner.png",
    ribbon: "배달특급 10% 즉시 할인 매장",
  },
  {
    name: "샐러리아 호매실점",
    rating: "5.0(342)",
    time: "35분 소요",
    discount: "최대 3000원 할인",
    image: "banners/salady-promotion-banner.png",
  },
  {
    name: "Poke all day 포케&샐러드 호매실점",
    rating: "5.0(342)",
    time: "35분 소요",
    discount: "최대 3000원 할인",
    image: "banners/salady-menu-banner.png",
    ribbon: "배달특급 10% 즉시 할인 매장",
  },
];

const searchRecommendations = [
  {
    name: "존앤진피자펍 행궁본점",
    rating: "5.0(342)",
    time: "35분 소요",
    discount: "최대 3000원 할인",
    image: "stores/john-and-jin-pizza-pub-haenggung/thumb.png",
    ribbon: "배달특급 10% 즉시 할인 매장",
  },
  {
    name: "룰루앙 파스타 더현대",
    rating: "5.0(342)",
    time: "35분 소요",
    discount: "최대 3000원 할인",
    image: "banners/party-food-banner.png",
  },
];

const menuItems = [
  {
    badge: "인기 1위",
    name: "탄단지 샐러디",
    desc: "한 주문 단 한 번만 가능합니다!",
    price: "8,600원",
    image: "stores/dessert-party/thumb.png",
  },
  {
    badge: "인기 2위",
    name: "로스트닭다리살 샐러드",
    desc: "연간 주문량 2위",
    price: "1,1400원",
    image: "menus/roast-chicken-leg.png",
  },
  {
    badge: "인기 3위",
    name: "맥시칸 랩",
    desc: "맛도 건강도 다 잡은 인기 메뉴",
    price: "1,7000원",
    image: "menus/wrap.png",
  },
  {
    badge: "사장님 추천",
    name: "우삼겹메밀면 누들볼",
    desc: "직접 공수한 재료로 만들었습니다.",
    price: "1,7000원",
    image: "menus/buckwheat-noodle-bowl.png",
  },
];

const famous = [
  {
    rank: "1위",
    name: "두바이 쫀득쿠키",
    desc: "오늘 120회 주문!",
    image: "stores/salad-store/thumb-square.png",
    bg: "#3f8366",
    badge: "icon_drafts/14/badge-icon-gold.svg",
  },
  {
    rank: "2위",
    name: "버터쿠키",
    desc: "오늘 80회 주문!",
    image: "menus/cake-sandwich.png",
    bg: "#ffed8d",
    badge: "icon_drafts/14/badge-icon-silver.svg",
  },
  {
    rank: "3위",
    name: "봄동 비빔밥",
    desc: "오늘 120회 주문!",
    image: "menus/salad-bowl.png",
    bg: "#59a451",
    badge: "icon_drafts/14/badge-icon-copper.svg",
  },
];

const toast = document.querySelector(".prototype-toast");
let toastTimer;
const historyStack = ["home"];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1400);
}

function showScreen(screenName, push = true) {
  const target = document.querySelector(`[data-screen="${screenName}"]`);
  if (!target) return;
  document.querySelectorAll(".app-screen").forEach((screen) => screen.classList.toggle("active", screen === target));
  document.querySelectorAll(".modal-layer").forEach((modal) => modal.classList.remove("show"));
  target.querySelector(".scroll-area")?.scrollTo({ top: 0, left: 0, behavior: "auto" });
  if (push && historyStack[historyStack.length - 1] !== screenName) historyStack.push(screenName);
  syncBottomNav(screenName);
}

function resetActiveScroll() {
  document.querySelector(".app-screen.active .scroll-area")?.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function goBack() {
  if (historyStack.length <= 1) {
    showScreen("home", false);
    return;
  }
  historyStack.pop();
  showScreen(historyStack[historyStack.length - 1], false);
}

function syncBottomNav(activeScreen) {
  document.querySelectorAll(".bottom-nav button").forEach((button) => {
    const isActive = button.dataset.target === activeScreen;
    button.classList.toggle("active", isActive);
    const icon = button.querySelector("img");
    if (icon?.dataset.active) icon.src = isActive ? icon.dataset.active : icon.dataset.line;
  });
}

function openModal(name) {
  document.querySelector(`[data-overlay="${name}"]`)?.classList.add("show");
}

function setResultContext(label = "샐러드") {
  document.querySelector('[data-screen="search-result"] .title-header h1').textContent = label;
  const firstTab = document.querySelector(".tab-list button:first-child");
  if (firstTab) firstTab.textContent = label;
}

function setPortfolioContext(label = "쿠폰 할인") {
  document.querySelector(".portfolio-search-field span").textContent = label;
}

function routeToSearchResult(label) {
  setResultContext(label);
  showScreen("search-result");
}

function routeToBenefit(label) {
  setPortfolioContext(label);
  showScreen("portfolio-search");
}

function renderCategories() {
  document.querySelector("#categoryGrid").innerHTML = categories
    .map(
      ([label, figmaNodeId, image, slug]) => `
        <button class="category-item" type="button" data-label="${label}" data-slug="${slug}">
          <span class="category-art category-${slug}"><img src="${mappedAsset(figmaNodeId, imageRoot + image)}" alt="" /></span>
          <span>${label}</span>
        </button>
      `
    )
    .join("");
}

function renderBenefits() {
  document.querySelector("#benefitGrid").innerHTML = benefits
    .map(
      ([label, figmaNodeId, image, slug, badge]) => `
        <button class="benefit-item" type="button" data-label="${label}" data-slug="${slug}">
          ${badge ? `<em>${badge}</em>` : ""}
          <span class="benefit-art benefit-${slug}"><img src="${mappedAsset(figmaNodeId, imageRoot + image)}" alt="" /></span>
          <span>${label}</span>
        </button>
      `
    )
    .join("");
}

function renderEvents() {
  const track = document.querySelector("#eventTrack");
  track.innerHTML = events
    .map(
      (event, index) => `
        <button class="event-card event-card-${event.slug}" type="button" data-index="${index}" data-label="${event.title}" style="background:${event.color}">
          <span>${event.eyebrow}</span>
          <strong>${event.title}</strong>
          <img class="event-bag event-bag-${event.slug}" src="${imageRoot}${event.bag}" alt="" />
          <img class="event-food event-food-${event.slug}" src="${imageRoot}${event.image}" alt="" />
          <em>${event.count}</em>
        </button>
      `
    )
    .join("");
  requestAnimationFrame(() => track.querySelector('[data-index="1"]')?.scrollIntoView({ behavior: "auto", inline: "center", block: "nearest" }));
}

function smallStoreCard(store) {
  return `
    <button class="store-card" type="button" data-target="store" data-label="${store.name}">
      <img src="${imageRoot}${store.image}" alt="" />
      <div>
        <h3>${store.name} <span><img src="./icons/14/star.svg" alt="" /> ${store.rating}</span></h3>
        <p><img src="./icons/14/clock.svg" alt="" /> ${store.time} · ${store.discount}</p>
        <small>${store.recent}</small>
        <div class="tags"><span class="pay">수원페이</span><span class="coupon">1000원 쿠폰</span></div>
      </div>
    </button>
  `;
}

function largeStoreCard(store) {
  return `
    <button class="large-store-card" type="button" data-target="store">
      <span class="large-store-media">
        <span class="${store.ribbon ? "ribbon" : "ribbon hidden"}">${store.ribbon || ""}</span>
        <img src="${imageRoot}${store.image}" alt="" />
      </span>
      <div class="large-store-copy">
        <div class="large-store-title-row">
          <h3>${store.name}</h3>
          <span class="store-rating"><img src="./icons/14/star.svg" alt="" />${store.rating}</span>
          <span class="store-time"><img src="./icons/14/clock.svg" alt="" />${store.time}</span>
        </div>
        <div class="tags"><span class="pay">수원페이</span><span class="coupon">1000원 쿠폰</span><span class="discount"><img src="./icons/14/wavy-check.svg" alt="" />${store.discount}</span></div>
      </div>
    </button>
  `;
}

function trendMarkup(item) {
  if (item.trend === "new") return `<span class="keyword-trend new">N</span>`;
  if (item.trend === "up") return `<span class="keyword-trend up">▲ ${item.delta || ""}</span>`;
  if (item.trend === "down") return `<span class="keyword-trend down">▼ ${item.delta || ""}</span>`;
  return `<span class="keyword-trend flat">-</span>`;
}

function renderHotMenus() {
  document.querySelector("#hotList").innerHTML = hotMenus
    .map(
      (item) => `
        <button class="hot-card" type="button" data-target="store" data-label="${item.name}">
          <img src="${imageRoot}${item.image}" alt="" />
          <h3>${item.name} <span><img src="./icons/14/star.svg" alt="" /> ${item.rating}</span></h3>
          <p><img src="./icons/14/clock.svg" alt="" /> ${item.detail}</p>
          <div class="tags"><span class="pay">수원페이</span><span class="coupon">1000원 쿠폰</span></div>
        </button>
      `
    )
    .join("");
}

function renderChips() {
  document.querySelector("#chipList").innerHTML = chips
    .map((chip, index) => `<button class="${index === 0 ? "active" : ""}" type="button">${chip}</button>`)
    .join("");
}

function renderStores() {
  document.querySelector("#storeList").innerHTML = stores.map(smallStoreCard).join("");
}

function renderFamous() {
  document.querySelector("#famousList").innerHTML = famous
    .map(
      (item) => `
        <button class="famous-card" type="button" data-target="search-result" data-label="${item.name}">
          <div class="rank-pill"><img src="./${item.badge}" alt="" />${item.rank}</div>
          <div class="famous-art" style="background:${item.bg}">
            <img src="${imageRoot}${item.image}" alt="" />
          </div>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </button>
      `
    )
    .join("");
}

function renderSearchScreens() {
  document.querySelector("#keywordGrid").innerHTML = keywords.map((item) => `<li><button type="button" data-target="search-result" data-label="${item.label}"><span><strong class="${item.tone || ""}">${item.rank}</strong><em>${item.label}</em></span>${trendMarkup(item)}</button></li>`).join("");
  document.querySelector("#recommendChips").innerHTML = recommendKeywords.map((word) => `<button type="button" data-target="${word.includes("쿠폰") ? "portfolio-search" : "search-result"}" data-label="${word}">${word}</button>`).join("");
  document.querySelector("#searchRecommendList").innerHTML = searchRecommendations.map(largeStoreCard).join("");
  document.querySelector("#resultStoreList").innerHTML = saladResults.map(largeStoreCard).join("");
  const favoriteList = document.querySelector("#favoriteList");
  if (favoriteList) favoriteList.innerHTML = saladResults.slice(0, 2).map(largeStoreCard).join("");
}

function renderStoreDetail() {
  document.querySelector("#storeMenuList").innerHTML = menuItems
    .map(
      (item) => `
        <button class="menu-card" type="button" data-target="menu">
          <div><span class="menu-rank">${item.badge}</span><h3>${item.name}</h3><strong>${item.price}</strong><p>${item.desc}</p><small><img src="./icons/14/chat-circle-dots.svg" alt="" /> 리뷰 89</small></div>
          <img src="${imageRoot}${item.image}" alt="" />
        </button>
      `
    )
    .join("");
}

function bindInteractions() {
  document.addEventListener("click", (event) => {
    const backButton = event.target.closest("[data-back]");
    if (backButton) {
      goBack();
      return;
    }

    const modalButton = event.target.closest("[data-modal]");
    if (modalButton) {
      openModal(modalButton.dataset.modal);
      return;
    }

    const closeButton = event.target.closest("[data-close-modal]");
    if (closeButton) {
      closeButton.closest(".modal-layer")?.classList.remove("show");
      return;
    }

    const ingredientButton = event.target.closest(".ingredient-list button");
    if (ingredientButton) {
      ingredientButton.classList.toggle("selected");
      return;
    }

    const optionButton = event.target.closest(".option-row");
    if (optionButton) {
      if (!optionButton.classList.contains("radio")) optionButton.classList.toggle("selected");
      return;
    }

    const targetButton = event.target.closest("[data-target]");
    if (targetButton) {
      if (targetButton.dataset.target === "search-result") {
        routeToSearchResult(targetButton.dataset.label || "샐러드");
      } else if (targetButton.dataset.target === "portfolio-search") {
        routeToBenefit(targetButton.dataset.label || "쿠폰 할인");
      } else {
        showScreen(targetButton.dataset.target);
      }
    }
  });

  document.querySelector(".location").addEventListener("click", () => showToast("동네 선택 화면으로 이동"));
  document.querySelector(".nav-icons button[aria-label='알림']").addEventListener("click", () => showToast("알림 목록 열기"));
  document.querySelector(".nav-icons button[aria-label='장바구니']").addEventListener("click", () => showScreen("cart"));
  document.querySelector(".hero-detail-button").addEventListener("click", () => openModal("coupon-sheet"));
  document.querySelector(".more-button").addEventListener("click", () => showToast("전체 카테고리 보기"));
  document.querySelector(".stamp-card button").addEventListener("click", () => showToast("스탬프 북 열기"));

  document.querySelector("#homeSearchInput").addEventListener("focus", () => showScreen("search"));
  document.querySelector("#homeSearchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") showScreen(event.currentTarget.value.includes("쿠폰") ? "portfolio-search" : "search-result");
  });
  document.querySelector("#searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) showScreen(event.currentTarget.value.includes("쿠폰") ? "portfolio-search" : "search-result");
  });

  document.querySelector("#categoryGrid").addEventListener("click", (event) => {
    const item = event.target.closest(".category-item");
    if (!item) return;
    document.querySelectorAll(".category-item").forEach((node) => node.classList.remove("selected"));
    item.classList.add("selected");
    routeToSearchResult(item.dataset.label);
  });

  document.querySelector("#benefitGrid").addEventListener("click", (event) => {
    const item = event.target.closest(".benefit-item");
    if (!item) return;
    document.querySelectorAll(".benefit-item").forEach((node) => node.classList.remove("selected"));
    item.classList.add("selected");
    if (item.dataset.slug === "coupon") openModal("coupon-sheet");
    else routeToBenefit(item.dataset.label);
  });

  document.querySelector("#eventTrack").addEventListener("click", (event) => {
    const card = event.target.closest(".event-card");
    if (card) openModal("coupon-sheet");
  });

  document.querySelector("#chipList").addEventListener("click", (event) => {
    const chip = event.target.closest("button");
    if (!chip) return;
    document.querySelectorAll(".chip-list button").forEach((node) => node.classList.remove("active"));
    chip.classList.add("active");
  });

  document.querySelectorAll(".modal-layer").forEach((layer) => {
    layer.addEventListener("click", (event) => {
      if (event.target === layer) layer.classList.remove("show");
    });
  });
}

renderCategories();
renderBenefits();
renderEvents();
renderHotMenus();
renderChips();
renderStores();
renderFamous();
renderSearchScreens();
renderStoreDetail();
bindInteractions();
showScreen("home", false);

window.addEventListener("load", () => {
  showScreen("home", false);
  requestAnimationFrame(resetActiveScroll);
});

window.addEventListener("pageshow", () => {
  requestAnimationFrame(resetActiveScroll);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
