const imageRoot = "./assets/images/";
const figmaAssets = window.BAEDAL_FIGMA_ASSET_MAP || {};
const assetsByAlias = window.BAEDAL_ASSET_BY_ALIAS || {};

function mappedAsset(figmaNodeId, fallback) {
  return figmaAssets[figmaNodeId] || assetsByAlias[figmaNodeId] || fallback;
}

const utmParams = new URLSearchParams(window.location.search);
const utmPayload = {
  utm_source: utmParams.get("utm_source") || "",
  utm_medium: utmParams.get("utm_medium") || "",
  utm_campaign: utmParams.get("utm_campaign") || "",
  utm_content: utmParams.get("utm_content") || "",
};
const utmDebugMode = utmParams.get("debug_mode") === "1" || utmParams.get("debug_mode") === "true";

function currentScreenName() {
  return document.querySelector(".app-screen.active")?.dataset.screen || "unknown";
}

function cleanText(value = "") {
  return value.replace(/\s+/g, " ").trim();
}

function buttonLabel(button) {
  return cleanText(button?.innerText || button?.textContent || button?.getAttribute("aria-label") || "");
}

function trackUtEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  const payload = {
    tester_id: utmPayload.utm_content || "unknown",
    screen_name: currentScreenName(),
    ...utmPayload,
    ...params,
  };
  Object.keys(payload).forEach((key) => {
    if (payload[key] === "" || payload[key] === undefined || payload[key] === null) delete payload[key];
  });
  window.gtag("event", eventName, utmDebugMode ? { ...payload, debug_mode: true } : payload);
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

const categoryPages = {
  korean: {
    title: "한식",
    tabs: ["백반", "국밥", "도시락"],
    stores: [
      { name: "정솥밥 수원 행궁동점", rating: "5.0(342)", time: "32분 소요", discount: "최대 3000원 할인", image: "stores/jeongsotbap-suwon-haenggung/thumb.png", badges: ["추천"] },
      { name: "평지담", rating: "5.0(342)", time: "35분 소요", discount: "최대 2000원 할인", image: "stores/pyeongjidam/thumb.png" },
      { name: "봄동비빔밥 상점", rating: "4.9(221)", time: "28분 소요", discount: "최대 1000원 할인", image: "menus/salad-bowl.png" },
    ],
  },
  chicken: {
    title: "치킨",
    tabs: ["후라이드", "양념", "순살"],
    stores: [
      { name: "BHC 광교중앙점", rating: "5.0(342)", time: "35분 소요", discount: "최대 2000원 할인", image: "menus/chicken-platter-large.png", badges: ["이벤트"] },
      { name: "치킨파티 수원점", rating: "4.9(188)", time: "31분 소요", discount: "최대 3000원 할인", image: "menus/roast-chicken-leg.png" },
      { name: "바삭한닭 행궁점", rating: "4.8(156)", time: "40분 소요", discount: "1000원 쿠폰", image: "menus/menu-side-01.png" },
    ],
  },
  pizza: {
    title: "피자",
    tabs: ["프리미엄", "1인피자", "파스타"],
    stores: [
      { name: "존앤진피자펍 행궁본점", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인", image: "stores/john-and-jin-pizza-pub-haenggung/thumb.png", ribbon: "배달특급 10% 즉시 할인 매장" },
      { name: "노모어피자 호매실점", rating: "4.9(210)", time: "38분 소요", discount: "최대 2000원 할인", image: "stores/no-more-pizza-homaesil/thumb.png" },
      { name: "피자헛 수원역점", rating: "4.8(177)", time: "42분 소요", discount: "2000원 할인", image: "menus/menu-side-02.png" },
    ],
  },
  chinese: {
    title: "중식",
    tabs: ["짜장면", "짬뽕", "탕수육"],
    stores: [
      { name: "차이797 스타필드 수원", rating: "5.0(342)", time: "36분 소요", discount: "최대 3000원 할인", image: "stores/chai797-starfield-suwon/thumb.png", labels: ["지역화폐"] },
      { name: "마라공방 광교점", rating: "4.9(203)", time: "33분 소요", discount: "1000원 쿠폰", image: "banners/party-food-banner.png" },
      { name: "홍콩반점 수원시청점", rating: "4.8(146)", time: "29분 소요", discount: "최대 2000원 할인", image: "banners/cream-pasta-banner.png" },
    ],
  },
  snack: {
    title: "분식",
    tabs: ["떡볶이", "김밥", "튀김"],
    stores: [
      { name: "엽기떡볶이 영통점", rating: "5.0(342)", time: "30분 소요", discount: "최대 2000원 할인", image: "banners/party-food-banner.png", badges: ["인기"] },
      { name: "꼬마김밥 연구소", rating: "4.9(188)", time: "24분 소요", discount: "1000원 쿠폰", image: "stores/ccomon-haenggung/thumb.png" },
      { name: "튀김상회 행궁점", rating: "4.8(121)", time: "27분 소요", discount: "최대 1000원 할인", image: "menus/menu-side-01.png" },
    ],
  },
  japanese: {
    title: "일식",
    tabs: ["초밥", "돈카츠", "라멘"],
    stores: [
      { name: "시라유키 행궁점", rating: "5.0(342)", time: "34분 소요", discount: "최대 3000원 할인", image: "stores/shirayuki-haenggung/thumb.png", badges: ["추천"] },
      { name: "멘야하나비 수원점", rating: "4.9(204)", time: "39분 소요", discount: "1000원 쿠폰", image: "menus/buckwheat-noodle-bowl.png" },
      { name: "카츠오모이 광교점", rating: "4.8(166)", time: "31분 소요", discount: "최대 2000원 할인", image: "stores/store-food-card-02/thumb.png" },
    ],
  },
  burger: {
    title: "햄버거",
    tabs: ["수제버거", "치킨버거", "세트"],
    stores: [
      { name: "테디플레이트", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인", image: "stores/teddy-plate-haenggung/thumb.png", badges: ["추천"] },
      { name: "버거앤프라이즈 수원점", rating: "4.9(198)", time: "29분 소요", discount: "1000원 쿠폰", image: "stores/store-food-card-01/thumb.png" },
      { name: "맘스터치 광교점", rating: "4.8(151)", time: "25분 소요", discount: "최대 2000원 할인", image: "menus/wrap.png" },
    ],
  },
  dessert: {
    title: "디저트",
    tabs: ["카페", "쿠키", "케이크"],
    stores: [
      { name: "투썸플레이스 영통점", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인", image: "banners/dessert-drinks-banner.png", badges: ["이벤트"] },
      { name: "니드스윗", rating: "4.9(220)", time: "26분 소요", discount: "1000원 쿠폰", image: "stores/cafe-maiden2/thumb.png" },
      { name: "디저트파티", rating: "4.9(188)", time: "28분 소요", discount: "최대 1000원 할인", image: "stores/dessert-party/thumb.png" },
    ],
  },
  "late-night": {
    title: "야식",
    tabs: ["족발보쌈", "닭발", "야식세트"],
    stores: [
      { name: "동탄 할머니 보쌈", rating: "5.0(342)", time: "36분 소요", discount: "재주문 10% 할인", image: "stores/pyeongjidam/thumb.png", badges: ["야식"] },
      { name: "아미고타코 야식점", rating: "4.9(178)", time: "32분 소요", discount: "1000원 쿠폰", image: "stores/amigo-taco/thumb.png" },
      { name: "심야분식 수원점", rating: "4.8(144)", time: "27분 소요", discount: "최대 2000원 할인", image: "menus/menu-side-02.png" },
    ],
  },
  salad: {
    title: "샐러드",
    tabs: ["샐러드", "샌드위치", "포케"],
    stores: saladResults,
  },
};

const storeFilterLabels = {
  default: [["지역화폐"], ["온누리"], ["G드림카드"]],
  local: [["지역화폐"], ["지역화폐"], ["지역화폐"]],
  onnuri: [["온누리"], ["온누리"], ["온누리"]],
  gdream: [["G드림카드"], ["G드림카드"], ["G드림카드"]],
};

const listViewState = {
  result: { page: null, label: "샐러드", slug: "salad", filter: "sort" },
  benefit: { page: null, label: "쿠폰함", slug: "coupon", filter: "sort" },
};

const benefitPages = {
  coupon: {
    title: "쿠폰함",
    tabs: ["쿠폰함", "3000원 할인", "중복쿠폰"],
    note: "다운로드하거나 바로 쓸 수 있는 쿠폰 가게예요.",
    stores: [
      { name: "샐러디 성대점", rating: "5.0(342)", time: "35분 소요", discount: "3000원 쿠폰", image: "banners/payment-benefit-banner.png", badges: ["중복쿠폰"] },
      { name: "존앤진피자펍 행궁본점", rating: "5.0(342)", time: "35분 소요", discount: "2000원 쿠폰", image: "stores/john-and-jin-pizza-pub-haenggung/thumb.png", badges: ["오늘만"] },
      { name: "투썸플레이스 영통점", rating: "5.0(342)", time: "35분 소요", discount: "1000원 쿠폰", image: "banners/dessert-drinks-banner.png" },
    ],
  },
  event: {
    title: "이벤트",
    tabs: ["이벤트", "오늘 특가", "선착순"],
    note: "지금 진행 중인 이벤트 혜택 매장이에요.",
    stores: [
      { name: "BHC 광교중앙점", rating: "5.0(342)", time: "35분 소요", discount: "오늘 저녁 2000원 할인", image: "menus/chicken-platter-large.png", badges: ["이벤트"] },
      { name: "샐러디 성대점", rating: "5.0(342)", time: "35분 소요", discount: "4000원 이벤트 할인", image: "banners/salady-promotion-banner.png", badges: ["이벤트"] },
      { name: "피자헛 수원역점", rating: "4.8(177)", time: "42분 소요", discount: "2000원 할인", image: "menus/menu-side-02.png" },
    ],
  },
  local: {
    title: "지역화폐",
    tabs: ["지역화폐", "10% 할인", "수원페이"],
    note: "지역화폐 결제와 추가 할인을 받을 수 있는 가게예요.",
    stores: [
      { name: "차이797 스타필드 수원", rating: "5.0(342)", time: "36분 소요", discount: "지역화폐 10% 할인", image: "stores/chai797-starfield-suwon/thumb.png", labels: ["지역화폐"] },
      { name: "정솥밥 수원 행궁동점", rating: "5.0(342)", time: "32분 소요", discount: "수원페이 가능", image: "stores/jeongsotbap-suwon-haenggung/thumb.png" },
      { name: "아미고타코", rating: "5.0(342)", time: "32분 소요", discount: "지역화폐 결제 가능", image: "stores/amigo-taco/thumb.png" },
    ],
  },
  onnuri: {
    title: "온누리 상품권 사용처",
    tabs: ["온누리", "상품권", "선착순"],
    note: "선착순 무료 지급 온누리 상품권을 사용할 수 있는 가게예요.",
    stores: [
      { name: "평지담", rating: "5.0(342)", time: "35분 소요", discount: "온누리 상품권 가능", image: "stores/pyeongjidam/thumb.png", badges: ["선착순"], labels: ["온누리"] },
      { name: "시라유키 행궁점", rating: "5.0(342)", time: "34분 소요", discount: "온누리 결제 가능", image: "stores/shirayuki-haenggung/thumb.png" },
      { name: "꼬모온 행궁점", rating: "4.9(188)", time: "24분 소요", discount: "상품권 혜택", image: "stores/ccomon-haenggung/thumb.png" },
    ],
  },
  gdream: {
    title: "G드림카드",
    tabs: ["G드림카드", "지원금", "추천가게"],
    note: "G드림카드로 결제 가능한 추천 가게예요.",
    stores: [
      { name: "샐러리아 호매실점", rating: "5.0(342)", time: "35분 소요", discount: "G드림카드 쿠폰", image: "banners/salady-menu-banner.png", labels: ["G드림카드"] },
      { name: "버거앤프라이즈 수원점", rating: "4.9(198)", time: "29분 소요", discount: "지원금 결제 가능", image: "stores/store-food-card-01/thumb.png" },
      { name: "디저트파티", rating: "4.9(188)", time: "28분 소요", discount: "1000원 쿠폰", image: "stores/dessert-party/thumb.png" },
    ],
  },
};

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
let currentStore = null;
let currentMenu = null;

function getStoreSlug(store) {
  const m = store.image && store.image.match(/^stores\/([^/]+)\//);
  return m ? m[1] : store.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9가-힣-]/g, "");
}

function findStoreBySlug(slug) {
  let all = [];
  Object.values(categoryPages).forEach((p) => { if (p.stores) all = all.concat(p.stores); });
  Object.values(benefitPages).forEach((p) => { if (p.stores) all = all.concat(p.stores); });
  all = all.concat(stores, saladResults, searchRecommendations, hotMenus);
  return all.find((s) => getStoreSlug(s) === slug) || null;
}

function defaultMenusForStore(store) {
  const img = store.image || "stores/store-food-card-01/thumb.png";
  return [
    { name: store.name + " 대표", price: "9,900원", image: img, badge: "인기 1위" },
    { name: store.name + " 세트", price: "12,500원", image: img, badge: "인기 2위" },
    { name: store.name + " 스페셜", price: "15,000원", image: img },
  ];
}

const storeMenus = {
  "jeongsotbap-suwon-haenggung": [
    { name: "정솥 정식", price: "9,500원", image: "stores/jeongsotbap-suwon-haenggung/thumb.png", badge: "인기 1위" },
    { name: "제육덮밥", price: "8,500원", image: "stores/pyeongjidam/thumb.png", badge: "인기 2위" },
    { name: "김치찌개", price: "7,500원", image: "stores/jeongsotbap-suwon-haenggung/thumb.png" },
  ],
  pyeongjidam: [
    { name: "평지담 정식", price: "10,000원", image: "stores/pyeongjidam/thumb.png", badge: "인기 1위" },
    { name: "불고기 백반", price: "8,500원", image: "stores/pyeongjidam/thumb.png", badge: "인기 2위" },
    { name: "된장찌개", price: "7,000원", image: "stores/pyeongjidam/thumb.png" },
  ],
  "no-more-pizza-homaesil": [
    { name: "페퍼로니 피자", price: "15,900원", image: "menus/pizza.jpg", badge: "인기 1위" },
    { name: "하프앤하프", price: "17,900원", image: "menus/pizza.jpg", badge: "인기 2위" },
    { name: "마르게리따", price: "14,900원", image: "menus/pizza.jpg" },
  ],
  "john-and-jin-pizza-pub-haenggung": [
    { name: "존앤진 스페셜", price: "18,900원", image: "menus/pizza.jpg", badge: "인기 1위" },
    { name: "고르곤졸라", price: "16,900원", image: "menus/pizza.jpg", badge: "인기 2위" },
    { name: "마르게리따", price: "14,900원", image: "menus/pizza.jpg" },
  ],
  "chai797-starfield-suwon": [
    { name: "짜장면", price: "7,500원", image: "menus/jjajangmyeon.jpg", badge: "인기 1위" },
    { name: "짬뽕", price: "8,500원", image: "menus/ramen.jpg", badge: "인기 2위" },
    { name: "탕수육", price: "14,000원", image: "menus/jjajangmyeon.jpg" },
  ],
  "ccomon-haenggung": [
    { name: "꼬마김밥", price: "3,500원", image: "menus/kimbap.jpg", badge: "인기 1위" },
    { name: "떡볶이", price: "4,500원", image: "menus/tteokbokki.jpg", badge: "인기 2위" },
    { name: "튀김 세트", price: "5,500원", image: "menus/kimbap.jpg" },
  ],
  "shirayuki-haenggung": [
    { name: "돈카츠", price: "10,500원", image: "menus/ramen.jpg", badge: "인기 1위" },
    { name: "초밥 세트", price: "13,500원", image: "menus/buckwheat-noodle-bowl.png", badge: "인기 2위" },
    { name: "라멘", price: "9,000원", image: "menus/ramen.jpg" },
  ],
  "teddy-plate-haenggung": [
    { name: "테디버거", price: "8,500원", image: "menus/burger.jpg", badge: "인기 1위" },
    { name: "치즈버거", price: "9,500원", image: "menus/burger.jpg", badge: "인기 2위" },
    { name: "베이컨버거", price: "10,500원", image: "menus/burger.jpg" },
  ],
  "cafe-maiden2": [
    { name: "아메리카노", price: "4,500원", image: "stores/cafe-maiden2/thumb.png", badge: "인기 1위" },
    { name: "크로플", price: "6,500원", image: "stores/cafe-maiden2/thumb.png", badge: "인기 2위" },
    { name: "카페라떼", price: "5,000원", image: "stores/cafe-maiden2/thumb.png" },
  ],
  "dessert-party": [
    { name: "티라미수", price: "7,500원", image: "stores/dessert-party/thumb.png", badge: "인기 1위" },
    { name: "레드벨벳 케이크", price: "8,500원", image: "menus/cake-sandwich.png", badge: "인기 2위" },
    { name: "마카롱 세트", price: "6,000원", image: "stores/dessert-party/thumb.png" },
  ],
  "amigo-taco": [
    { name: "해쉬브라운 부리또", price: "8,500원", image: "stores/amigo-taco/thumb.png", badge: "인기 1위" },
    { name: "나쵸 세트", price: "7,500원", image: "stores/amigo-taco/thumb.png", badge: "인기 2위" },
    { name: "타코", price: "6,500원", image: "stores/amigo-taco/thumb.png" },
  ],
  "store-food-card-01": [
    { name: "트라타 스페셜", price: "11,500원", image: "stores/store-food-card-01/thumb.png", badge: "인기 1위" },
    { name: "까르보네", price: "10,500원", image: "stores/store-food-card-01/thumb.png", badge: "인기 2위" },
    { name: "더블업 트라부 부리또", price: "12,500원", image: "stores/store-food-card-01/thumb.png" },
  ],
  "store-food-card-02": [
    { name: "카츠오모이 정식", price: "10,000원", image: "stores/store-food-card-02/thumb.png", badge: "인기 1위" },
    { name: "돈까스", price: "9,000원", image: "stores/store-food-card-02/thumb.png", badge: "인기 2위" },
    { name: "치킨까스", price: "9,500원", image: "stores/store-food-card-02/thumb.png" },
  ],
  salady: [
    { name: "탄단지 샐러디", price: "8,600원", image: "stores/salady/thumb-square.png", badge: "인기 1위" },
    { name: "로스트 치킨 샐러드", price: "9,500원", image: "stores/salady/thumb-square.png", badge: "인기 2위" },
    { name: "맥시칸 랩", price: "7,500원", image: "stores/salady/thumb-square.png" },
  ],
  "salad-store": [
    { name: "그린 샐러드", price: "7,500원", image: "stores/salad-store/thumb-square.png", badge: "인기 1위" },
    { name: "콥 샐러드", price: "9,500원", image: "stores/salad-store/thumb-square.png", badge: "인기 2위" },
    { name: "시저 샐러드", price: "8,500원", image: "stores/salad-store/thumb-square.png" },
  ],
  "cafe-maven-haenggung": [
    { name: "시그니처 커피", price: "5,500원", image: "stores/cafe-maven-haenggung/thumb.png", badge: "인기 1위" },
    { name: "바닐라라떼", price: "6,000원", image: "stores/cafe-maven-haenggung/thumb.png", badge: "인기 2위" },
    { name: "케이크", price: "7,000원", image: "stores/cafe-maven-haenggung/thumb.png" },
  ],
};

function renderMenuList(slug) {
  const list = document.querySelector("#storeMenuList");
  if (!list) return;
  const store = findStoreBySlug(slug);
  const menus = storeMenus[slug] || (store ? defaultMenusForStore(store) : null);
  if (!menus) { list.innerHTML = '<p class="empty-state">메뉴 준비 중입니다.</p>'; return; }
  list.innerHTML = menus.map((item, i) => `
    <button class="menu-card" type="button" data-target="menu" data-menu-index="${i}" data-store-slug="${slug}">
      <div>
        <span class="menu-rank">${item.badge || "메뉴"}</span>
        <h3>${item.name}</h3>
        <strong>${item.price}</strong>
        <p>${item.desc || ""}</p>
        <small><img src="./icons/14/chat-circle-dots.svg" alt="" /> 리뷰 89</small>
      </div>
      <img src="${imageRoot}${item.image}" alt="" />
    </button>
  `).join("");
}

function renderStoreDetail(store) {
  if (!store) return;
  const hero = document.querySelector("#storeHeroImg");
  const title = document.querySelector("#storeName");
  if (hero) hero.src = imageRoot + store.image;
  if (title) title.textContent = store.name;
  const slug = getStoreSlug(store);
  renderMenuList(slug);
}

function renderMenuDetail(menu) {
  if (!menu) return;
  const img = document.querySelector("#menuDetailImg");
  const badge = document.querySelector("#menuBadge");
  const nameEl = document.querySelector("#menuName");
  const priceEl = document.querySelector("#menuPrice");
  const ctaPrice = document.querySelector("#menuCtaPrice");
  if (img) img.src = imageRoot + menu.image;
  if (badge) badge.textContent = menu.badge || "메뉴";
  if (nameEl) nameEl.textContent = menu.name;
  if (priceEl) priceEl.textContent = menu.price;
  if (ctaPrice) ctaPrice.textContent = menu.price + " 담기";
}

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

function getFilterKey(label) {
  if (label.includes("지역화폐")) return "local";
  if (label.includes("온누리")) return "onnuri";
  if (label.includes("가격")) return "price";
  if (label.includes("빠른")) return "fast";
  if (label.includes("바로") || label.includes("할인")) return "discount";
  return "sort";
}

function setFilterStripState(screen, activeKey = "sort") {
  screen.querySelectorAll(".filter-strip button").forEach((button) => {
    const key = getFilterKey(button.textContent.trim());
    button.dataset.filter = key;
    button.classList.toggle("active", key === activeKey);
  });
}

function labelsForStore(store, index, contextSlug = "default") {
  const existing = store.labels || [];
  if (existing.length) return existing;
  const labelSet = storeFilterLabels[contextSlug] || storeFilterLabels.default;
  return labelSet[index % labelSet.length] || [];
}

function normalizeStore(store, index, contextSlug = "default") {
  return { ...store, labels: labelsForStore(store, index, contextSlug) };
}

function minuteValue(store) {
  const match = String(store.time || "").match(/(\d+)/);
  return match ? Number(match[1]) : 99;
}

function storeMatchesFilter(store, filterKey) {
  const labels = store.labels || [];
  const haystack = [store.name, store.discount, store.ribbon, ...(store.badges || []), ...labels].join(" ");
  if (filterKey === "local") return haystack.includes("지역화폐") || haystack.includes("수원페이");
  if (filterKey === "onnuri") return haystack.includes("온누리");
  if (filterKey === "discount") return haystack.includes("배달특급") || haystack.includes("할인") || haystack.includes("쿠폰");
  if (filterKey === "fast") return minuteValue(store) <= 35;
  return true;
}

function applyStoreFilter(stores, filterKey, contextSlug = "default") {
  const normalized = stores.map((store, index) => normalizeStore(store, index, contextSlug));
  if (filterKey === "sort") return normalized;
  if (filterKey === "price") return [...normalized].sort((a, b) => minuteValue(a) - minuteValue(b));
  return normalized.filter((store) => storeMatchesFilter(store, filterKey));
}

function renderStoreList(target, stores) {
  target.innerHTML = stores.length
    ? stores.map(largeStoreCard).join("")
    : `<div class="empty-filter-state"><strong>조건에 맞는 가게가 없어요</strong><span>다른 필터를 선택해보세요.</span></div>`;
}

function updateResultStores() {
  const { page, slug, filter } = listViewState.result;
  if (!page) return;
  const resultScreen = document.querySelector('[data-screen="search-result"]');
  setFilterStripState(resultScreen, filter);
  renderStoreList(resultScreen.querySelector(".large-store-list"), applyStoreFilter(page.stores, filter, slug));
}

function updateBenefitStores() {
  const { page, slug, filter } = listViewState.benefit;
  if (!page) return;
  const benefitScreen = document.querySelector('[data-screen="benefit-list"]');
  setFilterStripState(benefitScreen, filter);
  renderStoreList(benefitScreen.querySelector("#benefitStoreList"), applyStoreFilter(page.stores, filter, slug));
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

function applyCouponState(couponName = "온누리 상품권 3,000원 할인") {
  document.querySelectorAll(".coupon-download").forEach((button) => {
    const isSelected = button.dataset.couponName === couponName;
    button.classList.toggle("downloaded", isSelected);
    const icon = button.querySelector("img");
    if (icon) icon.src = isSelected ? "./icons/24/check/default-line.svg" : "./icons/26/download.svg";
    const label = button.querySelector("i");
    if (label) label.setAttribute("aria-label", isSelected ? "다운로드 완료" : "쿠폰 다운로드");
  });
  const checkoutCouponButton = document.querySelector("#checkoutCouponButton");
  if (checkoutCouponButton) checkoutCouponButton.innerHTML = `${couponName} 적용됨 <img src="./icons/20/chevron-down.svg" alt="" />`;
  const autoBenefitLine = document.querySelector("#autoBenefitLine");
  if (autoBenefitLine) {
    autoBenefitLine.classList.add("checked");
    const input = autoBenefitLine.querySelector("input");
    if (input) input.checked = true;
  }
}

function getCategoryPage(label = "샐러드", slug = "salad") {
  const matchedSlug = slug || categories.find(([categoryLabel]) => categoryLabel === label)?.[3] || "salad";
  return categoryPages[matchedSlug] || {
    title: label,
    tabs: [label, "인기", "추천"],
    stores: searchRecommendations,
  };
}

function setResultContext(label = "샐러드", slug = "salad") {
  const page = getCategoryPage(label, slug);
  const resultScreen = document.querySelector('[data-screen="search-result"]');
  const tabs = [page.title, ...page.tabs.filter((tab) => tab !== page.title)].slice(0, 3);
  listViewState.result = { page, label, slug, filter: "sort" };
  resultScreen.querySelector(".title-header h1").textContent = page.title;
  resultScreen.querySelector(".tab-list").innerHTML = tabs.map((tab, index) => `<button class="${index === 0 ? "active" : ""}" type="button">${tab}</button>`).join("");
  updateResultStores();
}

function setPortfolioContext(label = "쿠폰 할인") {
  document.querySelector(".portfolio-search-field span").textContent = label;
}

function setBenefitContext(label = "쿠폰함", slug = "coupon") {
  const page = benefitPages[slug] || benefitPages.coupon;
  const benefitScreen = document.querySelector('[data-screen="benefit-list"]');
  listViewState.benefit = { page, label, slug, filter: "sort" };
  benefitScreen.querySelector(".title-header h1").textContent = page.title;
  benefitScreen.querySelector(".tab-list").innerHTML = page.tabs.map((tab, index) => `<button class="${index === 0 ? "active" : ""}" type="button">${tab}</button>`).join("");
  const note = benefitScreen.querySelector(".benefit-page-note");
  note.querySelector("strong").textContent = `${page.title} 혜택 가게`;
  note.querySelector("span").textContent = page.note;
  benefitScreen.setAttribute("aria-label", `${label} 혜택 가게 리스트`);
  updateBenefitStores();
}

function routeToSearchResult(label, slug) {
  setResultContext(label, slug);
  showScreen("search-result");
}

function routeToBenefit(label, slug = "coupon") {
  setBenefitContext(label, slug);
  showScreen("benefit-list");
}

function renderCategories() {
  document.querySelector("#categoryGrid").innerHTML = categories
    .map(
      ([label, figmaNodeId, image, slug]) => `
        <button class="category-item" type="button" data-target="search-result" data-label="${label}" data-slug="${slug}">
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
        <button class="benefit-item" type="button" data-target="benefit-list" data-label="${label}" data-slug="${slug}">
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
  const slug = getStoreSlug(store);
  return `
    <button class="store-card" type="button" data-target="store" data-store-slug="${slug}">
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

function renderStoreLabels(store) {
  return (store.labels || [])
    .map((label) => {
      if (label.includes("온누리")) return `<span class="onnuri-coupon">온누리 쿠폰</span>`;
      if (label.includes("G드림")) return `<span class="gdream-label">${label}</span>`;
      return `<span class="benefit-label">${label}</span>`;
    })
    .join("");
}

function renderStoreBadges(store) {
  const badges = (store.badges || []).map((badge) => `<span>${badge}</span>`).join("");
  return badges ? `<div class="store-status-badges">${badges}</div>` : "";
}

function largeStoreCard(store) {
  const ribbonText = store.ribbon && store.ribbon.includes("배달특급") && store.ribbon.includes("할인") ? store.ribbon : "";
  const slug = getStoreSlug(store);
  return `
    <button class="large-store-card" type="button" data-target="store" data-store-slug="${slug}">
      <span class="large-store-media">
        <span class="${ribbonText ? "ribbon" : "ribbon hidden"}">${ribbonText}</span>
        <img src="${imageRoot}${store.image}" alt="" />
      </span>
      <div class="large-store-copy">
        ${renderStoreBadges(store)}
        <div class="large-store-title-row">
          <h3>${store.name}</h3>
          <span class="store-rating"><img src="./icons/14/star.svg" alt="" />${store.rating}</span>
          <span class="store-time"><img src="./icons/14/clock.svg" alt="" />${store.time}</span>
        </div>
        <div class="tags"><span class="pay">수원페이</span><span class="coupon">1000원 쿠폰</span>${renderStoreLabels(store)}<span class="discount"><img src="./icons/14/wavy-check.svg" alt="" />${store.discount}</span></div>
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
      (item) => {
        const slug = getStoreSlug(item);
        return `
          <button class="hot-card" type="button" data-target="store" data-store-slug="${slug}">
            <img src="${imageRoot}${item.image}" alt="" />
            <h3>${item.name} <span><img src="./icons/14/star.svg" alt="" /> ${item.rating}</span></h3>
            <p><img src="./icons/14/clock.svg" alt="" /> ${item.detail}</p>
            <div class="tags"><span class="pay">수원페이</span><span class="coupon">1000원 쿠폰</span></div>
          </button>
        `;
      }
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

    const couponButton = event.target.closest(".coupon-download");
    if (couponButton) {
      const couponName = couponButton.dataset.couponName || "온누리 상품권 3,000원 할인";
      applyCouponState(couponName);
      trackUtEvent("coupon_apply_click", {
        coupon_name: couponName,
        button_label: buttonLabel(couponButton),
        restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
      });
      showToast("쿠폰이 다운로드되고 적용됐어요");
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
      trackUtEvent("option_select", {
        option_name: buttonLabel(optionButton),
        menu_name: currentMenu?.name || document.querySelector("#menuName")?.textContent || "",
        restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
      });
      return;
    }

    const paymentButton = event.target.closest(".payment-grid button");
    if (paymentButton) {
      trackUtEvent("order_click", {
        button_label: buttonLabel(paymentButton),
        restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
        menu_name: currentMenu?.name || document.querySelector("#menuName")?.textContent || "",
      });
    }

    const tabButton = event.target.closest(".tab-list button, .delivery-tabs button, .store-menu-tabs button, .address-chips button, .favorite-filter-strip button, .order-filter-strip button, .portfolio-filter-strip button");
    if (tabButton) {
      const tabGroup = tabButton.parentElement;
      tabGroup?.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
      tabButton.classList.add("active");
    }

    const filterButton = event.target.closest(".filter-strip button");
    if (filterButton) {
      const activeScreen = filterButton.closest(".app-screen");
      const filterKey = filterButton.dataset.filter || getFilterKey(filterButton.textContent.trim());
      if (activeScreen?.dataset.screen === "search-result") {
        listViewState.result.filter = filterKey;
        updateResultStores();
      } else if (activeScreen?.dataset.screen === "benefit-list") {
        listViewState.benefit.filter = filterKey;
        updateBenefitStores();
      }
      return;
    }

    const targetButton = event.target.closest("[data-target]");
    if (targetButton) {
      if (["cart", "checkout", "preparing"].includes(targetButton.dataset.target)) {
        trackUtEvent("order_click", {
          button_label: buttonLabel(targetButton),
          restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
          menu_name: currentMenu?.name || document.querySelector("#menuName")?.textContent || "",
        });
      }

      if (targetButton.dataset.target === "search-result") {
        routeToSearchResult(targetButton.dataset.label || "샐러드", targetButton.dataset.slug);
      } else if (targetButton.dataset.target === "portfolio-search") {
        setPortfolioContext(targetButton.dataset.label || "쿠폰 할인");
        showScreen("portfolio-search");
      } else if (targetButton.dataset.target === "benefit-list") {
        routeToBenefit(targetButton.dataset.label || "쿠폰함", targetButton.dataset.slug);
      } else if (targetButton.dataset.target === "store") {
        const slug = targetButton.dataset.storeSlug;
        let store = null;
        if (slug) {
          store = findStoreBySlug(slug);
          if (store) { currentStore = store; renderStoreDetail(store); }
        }
        trackUtEvent("restaurant_click", {
          restaurant_name: store?.name || cleanText(targetButton.querySelector("h2, h3")?.textContent || buttonLabel(targetButton)),
          category_name: listViewState.result.label || listViewState.benefit.label || "",
        });
        showScreen("store");
      } else if (targetButton.dataset.target === "menu") {
        const slug = targetButton.dataset.storeSlug;
        const idx = targetButton.dataset.menuIndex;
        if (slug && idx !== undefined) {
          const menus = storeMenus[slug];
          if (menus && menus[idx]) { currentMenu = menus[idx]; renderMenuDetail(menus[idx]); }
        }
        trackUtEvent("menu_click", {
          menu_name: currentMenu?.name || cleanText(targetButton.querySelector("h3")?.textContent || buttonLabel(targetButton)),
          restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
        });
        showScreen("menu");
      } else {
        showScreen(targetButton.dataset.target);
      }
    }
  });

  document.querySelector(".location").addEventListener("click", () => showToast("동네 선택 화면으로 이동"));
  document.querySelector(".nav-icons button[aria-label='알림']").addEventListener("click", () => showToast("알림 목록 열기"));
  document.querySelector(".nav-icons button[aria-label='장바구니']").addEventListener("click", () => showScreen("cart"));
  document.querySelector(".hero-detail-button").addEventListener("click", () => {
    trackUtEvent("category_click", { category_name: "온누리", category_type: "hero_benefit" });
    routeToBenefit("온누리", "onnuri");
  });
  document.querySelector(".more-button").addEventListener("click", () => showToast("전체 카테고리 보기"));
  document.querySelector(".stamp-card button").addEventListener("click", () => showToast("스탬프 북 열기"));

  document.querySelector("#homeSearchInput").addEventListener("click", (event) => {
    trackUtEvent("search_click", { button_label: "홈 검색창", search_keyword: event.currentTarget.value.trim() });
  });
  document.querySelector("#homeSearchInput").addEventListener("focus", () => showScreen("search"));
  document.querySelector("#homeSearchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value.trim() || "샐러드";
      trackUtEvent("search_click", { button_label: "홈 검색 실행", search_keyword: value });
      if (value.includes("쿠폰")) routeToBenefit("쿠폰함", "coupon");
      else routeToSearchResult(value);
    }
  });
  document.querySelector("#searchInput").addEventListener("click", (event) => {
    trackUtEvent("search_click", { button_label: "검색 화면 검색창", search_keyword: event.currentTarget.value.trim() });
  });
  document.querySelector("#searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) {
      const value = event.currentTarget.value.trim();
      trackUtEvent("search_click", { button_label: "검색 실행", search_keyword: value });
      if (value.includes("쿠폰")) routeToBenefit("쿠폰함", "coupon");
      else routeToSearchResult(value);
    }
  });

  document.querySelector("#categoryGrid").addEventListener("click", (event) => {
    const item = event.target.closest(".category-item");
    if (!item) return;
    event.stopPropagation();
    document.querySelectorAll(".category-item").forEach((node) => node.classList.remove("selected"));
    item.classList.add("selected");
    trackUtEvent("category_click", { category_name: item.dataset.label, category_type: "food" });
    routeToSearchResult(item.dataset.label, item.dataset.slug);
  });

  document.querySelector("#benefitGrid").addEventListener("click", (event) => {
    const item = event.target.closest(".benefit-item");
    if (!item) return;
    event.stopPropagation();
    document.querySelectorAll(".benefit-item").forEach((node) => node.classList.remove("selected"));
    item.classList.add("selected");
    trackUtEvent("category_click", { category_name: item.dataset.label, category_type: "benefit" });
    routeToBenefit(item.dataset.label, item.dataset.slug);
  });

  document.querySelector("#eventTrack").addEventListener("click", (event) => {
    const card = event.target.closest(".event-card");
    if (card) {
      trackUtEvent("category_click", { category_name: card.dataset.label || buttonLabel(card), category_type: "promotion" });
      openModal("coupon-sheet");
    }
  });

  document.querySelector("#chipList").addEventListener("click", (event) => {
    const chip = event.target.closest("button");
    if (!chip) return;
    document.querySelectorAll(".chip-list button").forEach((node) => node.classList.remove("active"));
    chip.classList.add("active");
    trackUtEvent("category_click", { category_name: buttonLabel(chip), category_type: "home_chip" });
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
const defaultStore = saladResults[0] || { name: "샐러디 성대점", image: "stores/salad-store/thumb-square.png", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인" };
currentStore = defaultStore;
renderStoreDetail(defaultStore);
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
