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
const utmDebugMode = utmParams.get("debug_mode") === "1" || utmParams.get("debug_mode") === "true" || utmParams.get("utm_source") === "ut2";
const gaMeasurementId = "G-ZZR2K930ZE";

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
  const testerId = utmPayload.utm_content || utmPayload.utm_campaign || utmPayload.utm_source || "unknown";
  const payload = {
    tester_id: testerId,
    screen_name: currentScreenName(),
    mission_round: utmPayload.utm_source,
    ...utmPayload,
    ...params,
  };
  Object.keys(payload).forEach((key) => {
    if (payload[key] === "" || payload[key] === undefined || payload[key] === null) delete payload[key];
  });
  const finalPayload = {
    ...payload,
    send_to: gaMeasurementId,
    ...(utmDebugMode ? { debug_mode: true } : {}),
  };
  console.log(`[GA4] ${eventName}`, finalPayload);
  window.gtag("event", eventName, finalPayload);
}

function currentBenefitType() {
  return listViewState.benefit.page?.title || listViewState.benefit.label || "";
}

function currentResultCount(screenName = currentScreenName()) {
  const selector = screenName === "benefit-list" ? "#benefitStoreList .large-store-card" : "#resultStoreList .large-store-card";
  return document.querySelectorAll(selector).length;
}

function activeBenefitFilters() {
  return listViewState.benefit.activeFilters || [listViewState.benefit.filter || "sort"];
}

function benefitEventPayload(extra = {}) {
  return {
    benefit_type: currentBenefitType(),
    benefit_source: listViewState.benefit.label || "",
    selected_filter: activeBenefitFilters().join("|"),
    result_count: currentResultCount("benefit-list"),
    ...extra,
  };
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
  ["온누리", "1151:2710", "benefits/images/benefits/onnuri.png", "onnuri", "10% 할인"],
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
const commonFilterLabels = ["기본순", "지역화폐", "온누리상품권", "가격 설정", "별점"];
const sortOptions = [
  { key: "default", label: "기본순" },
  { key: "order", label: "주문 많은 순" },
  { key: "rating", label: "별점 높은 순" },
  { key: "near", label: "가까운 순" },
  { key: "like", label: "찜 많은 순" },
];

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

const categoryStoreNames = {
  korean: ["정솥밥", "평지담", "봄동비빔밥", "한솥도시락", "담솥", "소반식당"],
  chicken: ["BHC", "치킨파티", "바삭한닭", "굽네치킨", "교촌치킨", "처갓집"],
  pizza: ["존앤진피자펍", "노모어피자", "피자헛", "반올림피자", "피자스쿨", "잭슨피자"],
  chinese: ["차이797", "마라공방", "홍콩반점", "라화쿵부", "짬뽕지존", "중화가정"],
  snack: ["엽기떡볶이", "꼬마김밥 연구소", "튀김상회", "죠스떡볶이", "김밥천국", "스쿨푸드"],
  japanese: ["시라유키", "멘야하나비", "카츠오모이", "스시로", "온기정", "미소야"],
  burger: ["테디플레이트", "버거앤프라이즈", "맘스터치", "프랭크버거", "버거스올마이티", "다운타우너"],
  dessert: ["투썸플레이스", "니드스윗", "디저트파티", "카페마이든", "요거트월드", "설빙"],
  "late-night": ["심야보쌈", "아미고타코", "심야분식", "야식연구소", "닭발공작소", "밤도시락"],
  salad: ["샐러디", "샐러리아", "Poke all day", "그린볼", "슬로우캘리", "포케올데이"],
};

const categoryStoreImages = [
  "banners/payment-benefit-banner.png",
  "banners/salady-menu-banner.png",
  "banners/salady-promotion-banner.png",
  "stores/store-food-card-01/thumb.png",
  "stores/store-food-card-02/thumb.png",
  "menus/salad-bowl.png",
  "menus/chicken-platter-large.png",
  "banners/party-food-banner.png",
  "banners/dessert-drinks-banner.png",
  "stores/john-and-jin-pizza-pub-haenggung/thumb.png",
];

function createDummyStore(categorySlug, categoryTitle, index) {
  const names = categoryStoreNames[categorySlug] || categoryStoreNames.salad;
  const baseName = names[index % names.length];
  const districts = ["성대점", "행궁점", "광교점", "영통점", "수원역점", "호매실점", "망포점", "인계점"];
  const ratingValue = Math.min(5, 4.6 + ((index * 7) % 5) / 10).toFixed(1);
  const reviewCount = 86 + ((index * 37) % 420);
  const minutes = 22 + ((index * 5) % 28);
  const couponValues = ["1000원 쿠폰", "2000원 쿠폰", "3000원 쿠폰", "최대 3000원 할인"];
  const labelCombos = [["수원페이"], ["온누리 쿠폰"], ["수원페이", "온누리 쿠폰"], ["G드림카드"], ["수원페이", "G드림카드"]];
  const labels = labelCombos[index % labelCombos.length];
  return {
    slug: `${categorySlug}-${index}-${baseName}`.replace(/\s+/g, "-"),
    name: `${baseName} ${districts[index % districts.length]}`,
    rating: `${ratingValue}(${reviewCount})`,
    time: `${minutes}분 소요`,
    discount: couponValues[index % couponValues.length],
    orderCount: 140 + ((index * 53) % 860),
    likeCount: 24 + ((index * 29) % 240),
    recent: `최근주문 : ${categoryTitle} 인기 메뉴`,
    image: categoryStoreImages[index % categoryStoreImages.length],
    ribbon: index % 3 === 0 ? "배달특급 10% 즉시 할인 매장" : "",
    labels,
    couponLabel: couponValues[index % couponValues.length].includes("쿠폰") ? couponValues[index % couponValues.length] : "1000원 쿠폰",
  };
}

function buildCategoryStores(categorySlug, categoryTitle, featured = []) {
  const generated = Array.from({ length: 6 }, (_, index) => createDummyStore(categorySlug, categoryTitle, index + featured.length));
  const byName = new Map([...featured, ...generated].map((store) => [store.name, store]));
  return Array.from(byName.values());
}

const chickenResults = [
  { slug: "chicken-suwon-01", name: "BHC 성대푸르지오점", rating: "4.7(3,307)", time: "30분 소요", distance: "0.4km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/01-bhc.png", recent: "최근주문 : 후라이드치킨", orderCount: 153, likeCount: 43, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이"], couponLabel: "1000원 쿠폰", badges: ["리뷰이벤트"] },
  { slug: "chicken-suwon-02", name: "갓튀긴후라이드 장안점", rating: "4.8(10,553)", time: "34분 소요", distance: "0.5km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/02-gcova.png", recent: "최근주문 : 양념치킨", orderCount: 226, likeCount: 74, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "2000원 쿠폰", badges: ["리뷰이벤트"] },
  { slug: "chicken-suwon-03", name: "그 옛날통닭 구운점", rating: "4.6(348)", time: "38분 소요", distance: "0.6km", minOrder: "12,000원", deliveryFee: "배달비 0원", discount: "G드림카드 쿠폰", image: "stores/chicken-suwon/03-old-ssangpal.png", recent: "최근주문 : 간장치킨", orderCount: 299, likeCount: 105, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["G드림카드"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-04", name: "쌍팔통닭 수원화서점", rating: "5.0(26)", time: "32분 소요", distance: "0.7km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 2000원 할인", image: "stores/chicken-suwon/04-kfc-mexicana.png", recent: "최근주문 : 숯불양념치킨", orderCount: 372, likeCount: 136, labels: ["수원페이", "온누리 쿠폰"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-05", name: "BHC 구운일월점", rating: "4.9(1,797)", time: "30분 소요", distance: "1.5km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 4000원 할인", image: "stores/chicken-suwon/05-mexicana-basak.png", recent: "최근주문 : 닭강정", orderCount: 445, likeCount: 167, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이", "G드림카드"], couponLabel: "4000원 쿠폰", badges: ["리뷰이벤트"] },
  { slug: "chicken-suwon-06", name: "지코바 숯불양념치킨 구운점", rating: "4.7(5,111)", time: "29분 소요", distance: "1.7km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "온누리 쿠폰 사용 가능", image: "stores/chicken-suwon/06-good-60.png", recent: "최근주문 : 순살치킨", orderCount: 518, likeCount: 198, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["온누리 쿠폰", "G드림카드"], couponLabel: "3000원 쿠폰", badges: ["최소주문금액 낮음"] },
  { slug: "chicken-suwon-07", name: "KFC 수원성균관대점", rating: "4.8(694)", time: "29분 소요", distance: "1.8km", minOrder: "14,000원", deliveryFee: "배달비 0원", discount: "혜택 없음", image: "stores/chicken-suwon/07-dakgangjeong.png", recent: "최근주문 : 반반치킨", orderCount: 591, likeCount: 229, labels: [], couponLabel: false },
  { slug: "chicken-suwon-08", name: "멕시카나 성대율전점", rating: "4.6(207)", time: "37분 소요", distance: "1.9km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/08-gcova-popeyes.png", recent: "최근주문 : 마늘치킨", orderCount: 664, likeCount: 260, labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-09", name: "멕시카나치킨 화서점", rating: "5.0(1,000)", time: "37분 소요", distance: "2.0km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/09-holddak-baeksa.png", recent: "최근주문 : 치즈시즈닝치킨", orderCount: 737, likeCount: 291, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-10", name: "바삭통통닭강정", rating: "4.9(2,623)", time: "33분 소요", distance: "2.2km", minOrder: "16,900원", deliveryFee: "배달비 0원", discount: "배달비 혜택 없음", image: "stores/chicken-suwon/10-mexicana-puradak.png", recent: "최근주문 : 깐풍치킨", orderCount: 810, likeCount: 322, labels: [], couponLabel: false, badges: ["리뷰이벤트"] },
  { slug: "chicken-suwon-11", name: "잘만든치킨 굿킨 화서점", rating: "4.7(657)", time: "31분 소요", distance: "2.3km", minOrder: "15,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/11-bbq-old.png", recent: "최근주문 : 후라이드치킨", orderCount: 883, likeCount: 353, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-12", name: "60계치킨 수원화서점", rating: "4.8(2,429)", time: "48분 소요", distance: "2.5km", minOrder: "20,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/12-ttorae-hajin.png", recent: "최근주문 : 양념치킨", orderCount: 956, likeCount: 384, labels: ["온누리 쿠폰"], couponLabel: "2000원 쿠폰" },
  { slug: "chicken-suwon-13", name: "닭강정혁명 성균관대점", rating: "4.6(6,202)", time: "29분 소요", distance: "2.8km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "G드림카드 쿠폰", image: "stores/chicken-suwon/13-puradak.png", recent: "최근주문 : 간장치킨", orderCount: 1029, likeCount: 415, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["G드림카드"], couponLabel: "3000원 쿠폰", badges: ["최소주문금액 낮음"] },
  { slug: "chicken-suwon-14", name: "지코바 숯불양념치킨 율전점", rating: "5.0(1,204)", time: "47분 소요", distance: "0.4km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "최대 2000원 할인", image: "stores/chicken-suwon/01-bhc.png", recent: "최근주문 : 숯불양념치킨", orderCount: 1102, likeCount: 26, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이", "온누리 쿠폰"], couponLabel: "1000원 쿠폰", badges: ["리뷰이벤트"] },
  { slug: "chicken-suwon-15", name: "파파이스 수원정자점", rating: "4.9(1,521)", time: "25분 소요", distance: "0.5km", minOrder: "16,000원", deliveryFee: "배달비 0원", discount: "최대 4000원 할인", image: "stores/chicken-suwon/02-gcova.png", recent: "최근주문 : 닭강정", orderCount: 1175, likeCount: 57, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["수원페이", "G드림카드"], couponLabel: "4000원 쿠폰" },
  { slug: "chicken-suwon-16", name: "누구나홀딱반한닭 수원화서점", rating: "4.7(579)", time: "34분 소요", distance: "0.6km", minOrder: "22,000원", deliveryFee: "배달비 0원", discount: "온누리 쿠폰 사용 가능", image: "stores/chicken-suwon/03-old-ssangpal.png", recent: "최근주문 : 순살치킨", orderCount: 1248, likeCount: 88, labels: ["온누리 쿠폰", "G드림카드"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-17", name: "백사104 깐풍닭튀김", rating: "4.8(2,258)", time: "27분 소요", distance: "0.7km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "혜택 없음", image: "stores/chicken-suwon/04-kfc-mexicana.png", recent: "최근주문 : 반반치킨", orderCount: 1321, likeCount: 119, labels: [], couponLabel: false, badges: ["최소주문금액 낮음"] },
  { slug: "chicken-suwon-18", name: "푸라닭 수원정자3동점", rating: "4.6(1,932)", time: "41분 소요", distance: "1.5km", minOrder: "16,900원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/05-mexicana-basak.png", recent: "최근주문 : 마늘치킨", orderCount: 1394, likeCount: 150, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-19", name: "BBQ 수원꽃뫼마을점", rating: "5.0(233)", time: "31분 소요", distance: "1.7km", minOrder: "23,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/06-good-60.png", recent: "최근주문 : 치즈시즈닝치킨", orderCount: 1467, likeCount: 181, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "3000원 쿠폰", badges: ["리뷰이벤트"] },
  { slug: "chicken-suwon-20", name: "하진옛날통닭 천천점", rating: "4.9(518)", time: "28분 소요", distance: "1.8km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "배달비 혜택 없음", image: "stores/chicken-suwon/07-dakgangjeong.png", recent: "최근주문 : 깐풍치킨", orderCount: 140, likeCount: 212, labels: [], couponLabel: false },
  { slug: "chicken-suwon-21", name: "또래오래 구운동점", rating: "4.7(3,307)", time: "30분 소요", distance: "1.9km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/08-gcova-popeyes.png", recent: "최근주문 : 후라이드치킨", orderCount: 213, likeCount: 243, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-22", name: "푸라닭 수원서둔점", rating: "4.8(10,553)", time: "34분 소요", distance: "2.0km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/09-holddak-baeksa.png", recent: "최근주문 : 양념치킨", orderCount: 286, likeCount: 274, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "2000원 쿠폰" },
  { slug: "chicken-suwon-23", name: "푸라닭 수원성균관대점", rating: "4.6(348)", time: "38분 소요", distance: "2.2km", minOrder: "12,000원", deliveryFee: "배달비 0원", discount: "G드림카드 쿠폰", image: "stores/chicken-suwon/10-mexicana-puradak.png", recent: "최근주문 : 간장치킨", orderCount: 359, likeCount: 305, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["G드림카드"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-24", name: "교촌치킨 화서문점", rating: "5.0(26)", time: "32분 소요", distance: "2.3km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 2000원 할인", image: "stores/chicken-suwon/11-bbq-old.png", recent: "최근주문 : 숯불양념치킨", orderCount: 432, likeCount: 336, labels: ["수원페이", "온누리 쿠폰"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-25", name: "처갓집양념치킨 화서점", rating: "4.9(1,797)", time: "30분 소요", distance: "2.5km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 4000원 할인", image: "stores/chicken-suwon/12-ttorae-hajin.png", recent: "최근주문 : 닭강정", orderCount: 505, likeCount: 367, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이", "G드림카드"], couponLabel: "4000원 쿠폰" },
  { slug: "chicken-suwon-26", name: "노랑통닭 정자시장점", rating: "4.7(5,111)", time: "29분 소요", distance: "2.8km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "온누리 쿠폰 사용 가능", image: "stores/chicken-suwon/13-puradak.png", recent: "최근주문 : 순살치킨", orderCount: 578, likeCount: 398, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰", "G드림카드"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-27", name: "자담치킨 수원화서점", rating: "4.8(694)", time: "29분 소요", distance: "0.4km", minOrder: "14,000원", deliveryFee: "배달비 0원", discount: "혜택 없음", image: "stores/chicken-suwon/01-bhc.png", recent: "최근주문 : 반반치킨", orderCount: 651, likeCount: 429, labels: [], couponLabel: false, badges: ["최소주문금액 낮음"] },
  { slug: "chicken-suwon-28", name: "굽네치킨 정자동점", rating: "4.6(207)", time: "37분 소요", distance: "0.5km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/02-gcova.png", recent: "최근주문 : 마늘치킨", orderCount: 724, likeCount: 40, labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-29", name: "네네치킨 화서역점", rating: "5.0(1,000)", time: "37분 소요", distance: "0.6km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/03-old-ssangpal.png", recent: "최근주문 : 치즈시즈닝치킨", orderCount: 797, likeCount: 71, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-30", name: "호식이두마리치킨 정자점", rating: "4.9(2,623)", time: "33분 소요", distance: "0.7km", minOrder: "16,900원", deliveryFee: "배달비 0원", discount: "배달비 혜택 없음", image: "stores/chicken-suwon/04-kfc-mexicana.png", recent: "최근주문 : 깐풍치킨", orderCount: 870, likeCount: 102, labels: [], couponLabel: false },
  { slug: "chicken-suwon-31", name: "페리카나 화서오거리점", rating: "4.7(657)", time: "31분 소요", distance: "1.5km", minOrder: "15,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/05-mexicana-basak.png", recent: "최근주문 : 후라이드치킨", orderCount: 943, likeCount: 133, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-32", name: "치킨플러스 팔달정자점", rating: "4.8(2,429)", time: "48분 소요", distance: "1.7km", minOrder: "20,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/06-good-60.png", recent: "최근주문 : 양념치킨", orderCount: 1016, likeCount: 164, labels: ["온누리 쿠폰"], couponLabel: "2000원 쿠폰" },
  { slug: "chicken-suwon-33", name: "바른치킨 수원천천점", rating: "4.6(6,202)", time: "29분 소요", distance: "1.8km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "G드림카드 쿠폰", image: "stores/chicken-suwon/07-dakgangjeong.png", recent: "최근주문 : 간장치킨", orderCount: 1089, likeCount: 195, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["G드림카드"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-34", name: "깐부치킨 성균관대역점", rating: "5.0(1,204)", time: "47분 소요", distance: "1.9km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "최대 2000원 할인", image: "stores/chicken-suwon/08-gcova-popeyes.png", recent: "최근주문 : 숯불양념치킨", orderCount: 1162, likeCount: 226, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이", "온누리 쿠폰"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-35", name: "치킨마루 화서블루밍점", rating: "4.9(1,521)", time: "25분 소요", distance: "2.0km", minOrder: "16,000원", deliveryFee: "배달비 0원", discount: "최대 4000원 할인", image: "stores/chicken-suwon/09-holddak-baeksa.png", recent: "최근주문 : 닭강정", orderCount: 1235, likeCount: 257, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이", "G드림카드"], couponLabel: "4000원 쿠폰" },
  { slug: "chicken-suwon-36", name: "보드람치킨 구운동점", rating: "4.7(579)", time: "34분 소요", distance: "2.2km", minOrder: "22,000원", deliveryFee: "배달비 0원", discount: "온누리 쿠폰 사용 가능", image: "stores/chicken-suwon/10-mexicana-puradak.png", recent: "최근주문 : 순살치킨", orderCount: 1308, likeCount: 288, labels: ["온누리 쿠폰", "G드림카드"], couponLabel: "3000원 쿠폰", badges: ["최소주문금액 낮음"] },
  { slug: "chicken-suwon-37", name: "가마로강정 화서시장점", rating: "4.8(2,258)", time: "27분 소요", distance: "2.3km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "혜택 없음", image: "stores/chicken-suwon/11-bbq-old.png", recent: "최근주문 : 반반치킨", orderCount: 1381, likeCount: 319, labels: [], couponLabel: false },
  { slug: "chicken-suwon-38", name: "훌랄라참숯치킨 천천점", rating: "4.6(1,932)", time: "41분 소요", distance: "2.5km", minOrder: "16,900원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/12-ttorae-hajin.png", recent: "최근주문 : 마늘치킨", orderCount: 1454, likeCount: 350, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-39", name: "티바두마리치킨 화서점", rating: "5.0(233)", time: "31분 소요", distance: "2.8km", minOrder: "23,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/13-puradak.png", recent: "최근주문 : 치즈시즈닝치킨", orderCount: 127, likeCount: 381, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-40", name: "후라이드참잘하는집 정자동점", rating: "4.9(518)", time: "28분 소요", distance: "0.4km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "배달비 혜택 없음", image: "stores/chicken-suwon/01-bhc.png", recent: "최근주문 : 깐풍치킨", orderCount: 200, likeCount: 412, labels: [], couponLabel: false },
  { slug: "chicken-suwon-41", name: "돈치킨 서호공원점", rating: "4.7(3,307)", time: "30분 소요", distance: "0.5km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/02-gcova.png", recent: "최근주문 : 후라이드치킨", orderCount: 273, likeCount: 23, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-42", name: "땅땅치킨 화서역점", rating: "4.8(10,553)", time: "34분 소요", distance: "0.6km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/03-old-ssangpal.png", recent: "최근주문 : 양념치킨", orderCount: 346, likeCount: 54, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "2000원 쿠폰" },
  { slug: "chicken-suwon-43", name: "아웃닭 성균관대점", rating: "4.6(348)", time: "38분 소요", distance: "0.7km", minOrder: "12,000원", deliveryFee: "배달비 0원", discount: "G드림카드 쿠폰", image: "stores/chicken-suwon/04-kfc-mexicana.png", recent: "최근주문 : 간장치킨", orderCount: 419, likeCount: 85, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["G드림카드"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-44", name: "오늘통닭 수원정자점", rating: "5.0(26)", time: "32분 소요", distance: "1.5km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 2000원 할인", image: "stores/chicken-suwon/05-mexicana-basak.png", recent: "최근주문 : 숯불양념치킨", orderCount: 492, likeCount: 116, labels: ["수원페이", "온누리 쿠폰"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-45", name: "치킨더홈 팔달화서점", rating: "4.9(1,797)", time: "30분 소요", distance: "1.7km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 4000원 할인", image: "stores/chicken-suwon/06-good-60.png", recent: "최근주문 : 닭강정", orderCount: 565, likeCount: 147, ribbon: "배달특급 1000원 즉시 할인 매장", labels: ["수원페이", "G드림카드"], couponLabel: "4000원 쿠폰" },
  { slug: "chicken-suwon-46", name: "순살만공격 수원화서점", rating: "4.7(5,111)", time: "29분 소요", distance: "1.8km", minOrder: "5,000원", deliveryFee: "배달비 0원", discount: "온누리 쿠폰 사용 가능", image: "stores/chicken-suwon/07-dakgangjeong.png", recent: "최근주문 : 순살치킨", orderCount: 638, likeCount: 178, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰", "G드림카드"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-47", name: "인생닭강정 정자천점", rating: "4.8(694)", time: "29분 소요", distance: "1.9km", minOrder: "14,000원", deliveryFee: "배달비 0원", discount: "혜택 없음", image: "stores/chicken-suwon/08-gcova-popeyes.png", recent: "최근주문 : 반반치킨", orderCount: 711, likeCount: 209, labels: [], couponLabel: false },
  { slug: "chicken-suwon-48", name: "오태식해바라기치킨 구운점", rating: "4.6(207)", time: "37분 소요", distance: "2.0km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 1000원 할인", image: "stores/chicken-suwon/09-holddak-baeksa.png", recent: "최근주문 : 마늘치킨", orderCount: 784, likeCount: 240, labels: ["수원페이"], couponLabel: "1000원 쿠폰" },
  { slug: "chicken-suwon-49", name: "아라치 수원정자점", rating: "5.0(1,000)", time: "37분 소요", distance: "2.2km", minOrder: "18,000원", deliveryFee: "배달비 0원", discount: "최대 3000원 할인", image: "stores/chicken-suwon/10-mexicana-puradak.png", recent: "최근주문 : 치즈시즈닝치킨", orderCount: 857, likeCount: 271, ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰"], couponLabel: "3000원 쿠폰" },
  { slug: "chicken-suwon-50", name: "계동치킨 화서역점", rating: "4.9(2,623)", time: "33분 소요", distance: "2.3km", minOrder: "16,900원", deliveryFee: "배달비 0원", discount: "배달비 혜택 없음", image: "stores/chicken-suwon/11-bbq-old.png", recent: "최근주문 : 깐풍치킨", orderCount: 930, likeCount: 302, labels: [], couponLabel: false },
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
    stores: chickenResults,
    fixedStores: true,
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

Object.entries(categoryPages).forEach(([slug, page]) => {
  page.filters = page.filters || commonFilterLabels;
  if (page.fixedStores) return;
  page.stores = buildCategoryStores(slug, page.title, page.stores || []);
});

const allGeneratedCategoryStores = Object.values(categoryPages).flatMap((page) => page.stores || []);

const storeFilterLabels = {
  default: [["지역화폐"], ["온누리"], ["G드림카드"]],
  local: [["지역화폐"], ["지역화폐"], ["지역화폐"]],
  onnuri: [["온누리"], ["온누리"], ["온누리"]],
  gdream: [["G드림카드"], ["G드림카드"], ["G드림카드"]],
};

const listViewState = {
  result: { page: null, label: "샐러드", slug: "salad", filter: "sort", activeFilters: [], sortKey: "default" },
  portfolio: { page: null, label: "쿠폰 할인", slug: "coupon-search", filter: "sort", activeFilters: [], sortKey: "default" },
  benefit: { page: null, label: "쿠폰함", slug: "coupon", filter: "sort", activeFilters: [], sortKey: "default" },
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
    filters: ["기본순", "쿠폰 할인", "온누리상품권", "가격 설정", "별점"],
    note: "지역화폐 결제와 추가 할인을 받을 수 있는 가게예요.",
    filteredNote: "선택한 혜택 조건에 맞는 가게를 먼저 보여드렸어요.",
    stores: [
      { name: "샐러디 성대점", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인", image: "banners/payment-benefit-banner.png", ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰"] },
      { name: "Poke all day 포케&샐러드 호매실점", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인", image: "banners/salady-menu-banner.png", ribbon: "배달특급 10% 즉시 할인 매장", labels: ["수원페이"] },
      { name: "샐러리아 호매실점", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인", image: "banners/salady-promotion-banner.png", labels: ["수원페이"] },
    ],
    filteredStores: [
      { name: "샐러디 성대점", rating: "5.0(342)", time: "35분 소요", discount: "최대 3000원 할인", image: "banners/payment-benefit-banner.png", ribbon: "배달특급 10% 즉시 할인 매장", labels: ["온누리 쿠폰"] },
    ],
    recommendations: [
      { name: "트라타", rating: "5.0(342)", time: "45분 소요", discount: "최대 3000원 할인", image: "stores/store-food-card-01/thumb.png", recent: "과카몰레, 더블업 트라타 부리또", labels: ["수원페이"] },
      { name: "샐러디", rating: "5.0(342)", time: "40분 소요", discount: "최대 3000원 할인", image: "menus/salad-bowl.png", recent: "탄단지 샐러디, 콜라 3335ml", labels: ["수원페이"] },
      { name: "아미고타코", rating: "5.0(342)", time: "32분 소요", discount: "최대 3000원 할인", image: "stores/amigo-taco/thumb.png", recent: "해쉬브라운 부리또", labels: ["수원페이"] },
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
  if (store.slug) return store.slug;
  const m = store.image && store.image.match(/^stores\/([^/]+)\//);
  return m ? m[1] : store.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9가-힣-]/g, "");
}

function findStoreBySlug(slug) {
  let all = [];
  Object.values(categoryPages).forEach((p) => { if (p.stores) all = all.concat(p.stores); });
  Object.values(benefitPages).forEach((p) => { if (p.stores) all = all.concat(p.stores); });
  all = all.concat(stores, saladResults, searchRecommendations, hotMenus);
  all = all.concat(allGeneratedCategoryStores);
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

  if (push) {
    switch (screenName) {
      case "home":
        trackUtEvent("view_home", { target_screen: "home" });
        break;
      case "benefit-list":
        trackUtEvent("view_benefit_list", benefitEventPayload({ target_screen: "benefit-list" }));
        break;
      case "store":
        trackUtEvent("view_store_detail", {
          restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
        });
        break;
      case "cart":
        trackUtEvent("view_cart", {
          restaurant_name: currentStore?.name || "",
          menu_name: currentMenu?.name || "",
          target_screen: "cart",
        });
        break;
      case "checkout":
        trackUtEvent("begin_checkout", {
          restaurant_name: currentStore?.name || "",
          menu_name: currentMenu?.name || "",
          target_screen: "checkout",
        });
        break;
      case "preparing":
        trackUtEvent("order_status_view", {
          restaurant_name: currentStore?.name || "",
          menu_name: currentMenu?.name || "",
          target_screen: "preparing",
          order_status: "preparing",
        });
        break;
    }
  }
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
  if (label.includes("쿠폰")) return "coupon";
  if (label.includes("가격")) return "price";
  if (label.includes("별점")) return "rating";
  if (label.includes("빠른")) return "fast";
  if (label.includes("기본") || label.includes("주문 많은") || label.includes("가까운") || label.includes("찜 많은") || label.includes("추천")) return "sort";
  return "sort";
}

function sortLabelFor(key = "default") {
  return sortOptions.find((option) => option.key === key)?.label || "기본순";
}

function sortButtonMarkup(label = "기본순") {
  return `${label} <img src="./icons/20/chevron-down.svg" alt="" />`;
}

function setFilterStripState(screen, activeKey = "sort", activeKeys = null, sortKey = "default") {
  const activeSet = new Set(activeKeys || []);
  screen.querySelectorAll(".filter-strip button").forEach((button, index) => {
    const key = index === 0 ? "sort" : getFilterKey(button.textContent.trim());
    button.dataset.filter = key;
    if (key === "sort") {
      button.innerHTML = sortButtonMarkup(sortLabelFor(sortKey));
      button.classList.remove("active");
    } else {
      button.classList.toggle("active", activeSet.has(key));
    }
  });
}

function labelsForStore(store, index, contextSlug = "default") {
  const existing = store.labels || [];
  if (existing.length) return existing;
  const labelSet = storeFilterLabels[contextSlug] || storeFilterLabels.default;
  return labelSet[index % labelSet.length] || [];
}

function normalizeStore(store, index, contextSlug = "default") {
  return {
    ...store,
    labels: labelsForStore(store, index, contextSlug),
    orderCount: store.orderCount ?? 120 + ((index * 47) % 760),
    likeCount: store.likeCount ?? 18 + ((index * 31) % 220),
  };
}

function minuteValue(store) {
  const match = String(store.time || "").match(/(\d+)/);
  return match ? Number(match[1]) : 99;
}

function ratingValue(store) {
  const match = String(store.rating || "").match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
}

function reviewCountValue(store) {
  const match = String(store.rating || "").match(/\((\d+)\)/);
  return match ? Number(match[1]) : 0;
}

function applySort(stores, sortKey = "default") {
  if (sortKey === "order") return [...stores].sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
  if (sortKey === "rating") return [...stores].sort((a, b) => ratingValue(b) - ratingValue(a) || reviewCountValue(b) - reviewCountValue(a));
  if (sortKey === "near") return [...stores].sort((a, b) => minuteValue(a) - minuteValue(b));
  if (sortKey === "like") return [...stores].sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
  return stores;
}

function storeMatchesFilter(store, filterKey) {
  const labels = store.labels || [];
  const haystack = [store.name, store.discount, store.ribbon, ...(store.badges || []), ...labels].join(" ");
  if (filterKey === "local") return haystack.includes("지역화폐") || haystack.includes("수원페이");
  if (filterKey === "onnuri") return haystack.includes("온누리");
  if (filterKey === "coupon") return store.couponLabel !== false || haystack.includes("쿠폰");
  if (filterKey === "fast") return minuteValue(store) <= 35;
  return true;
}

function applyStoreFilter(stores, filterKey, contextSlug = "default") {
  const normalized = stores.map((store, index) => normalizeStore(store, index, contextSlug));
  if (filterKey === "sort") return normalized;
  if (filterKey === "price") return [...normalized].sort((a, b) => minuteValue(a) - minuteValue(b));
  if (filterKey === "rating") return [...normalized].sort((a, b) => ratingValue(b) - ratingValue(a));
  return normalized.filter((store) => storeMatchesFilter(store, filterKey));
}

function applyStoreFilters(stores, filterKeys = [], contextSlug = "default", sortKey = "default") {
  let results = stores.map((store, index) => normalizeStore(store, index, contextSlug));
  const active = filterKeys.filter((key) => key && key !== "sort");
  active.forEach((key) => {
    if (key === "price") {
      results = results.filter((store) => minuteValue(store) <= 40);
    } else if (key === "rating") {
      results = results.filter((store) => ratingValue(store) >= 4.8);
    } else {
      results = results.filter((store) => storeMatchesFilter(store, key));
    }
  });
  return applySort(results, sortKey);
}

function renderStoreList(target, stores) {
  target.innerHTML = stores.length
    ? stores.map(largeStoreCard).join("")
    : `<div class="empty-filter-state"><strong>조건에 맞는 가게가 없어요</strong><span>다른 필터를 선택해보세요.</span></div>`;

  if (!stores.length && target.closest('[data-screen="benefit-list"]')) {
    trackUtEvent("no_result_view", benefitEventPayload({
      empty_reason: "no_store_match",
      selected_condition: listViewState.benefit.filter || "",
    }));
  }
}

function updateResultStores() {
  const { page, slug, filter, activeFilters = [], sortKey = "default" } = listViewState.result;
  if (!page) return;
  const resultScreen = document.querySelector('[data-screen="search-result"]');
  setFilterStripState(resultScreen, filter, activeFilters, sortKey);
  renderStoreList(resultScreen.querySelector(".large-store-list"), applyStoreFilters(page.stores, activeFilters, slug, sortKey));
}

function updatePortfolioStores() {
  const { page, slug, filter, activeFilters = [], sortKey = "default" } = listViewState.portfolio;
  if (!page) return;
  const portfolioScreen = document.querySelector('[data-screen="portfolio-search"]');
  setFilterStripState(portfolioScreen, filter, activeFilters, sortKey);
  renderStoreList(portfolioScreen.querySelector("#portfolioStoreList"), applyStoreFilters(page.stores, activeFilters, slug, sortKey));
}

function updateBenefitStores() {
  const { page, slug, filter, sortKey = "default" } = listViewState.benefit;
  if (!page) return;
  const benefitScreen = document.querySelector('[data-screen="benefit-list"]');
  const recommendationSection = benefitScreen.querySelector("#benefitRecommendationSection");
  const recommendationList = benefitScreen.querySelector("#benefitRecommendationList");
  const note = benefitScreen.querySelector(".benefit-page-note");
  const filters = activeBenefitFilters();
  const shouldShowRecommendation = slug === "local" && filters.includes("coupon") && filters.includes("onnuri");
  setFilterStripState(benefitScreen, filter, filters, sortKey);
  if (shouldShowRecommendation && page.filteredStores?.length) {
    const selectedFilters = filters.map((key) => ({ sort: "기본순", coupon: "쿠폰 할인", onnuri: "온누리상품권", price: "가격 설정", rating: "별점", fast: "빠른 배달", local: "지역화폐" }[key] || key));
    renderStoreList(benefitScreen.querySelector("#benefitStoreList"), page.filteredStores.map((store, index) => normalizeStore(store, index, slug)));
    if (note) {
      note.classList.add("narrow-result-note");
      note.querySelector("strong").textContent = "조건에 맞는 가게가 1곳 있어요";
      note.querySelector("span").innerHTML = `${page.filteredNote}<br><em>${selectedFilters.join(" · ")}</em>`;
    }
    if (recommendationSection && recommendationList) {
      recommendationSection.hidden = false;
      recommendationList.innerHTML = (page.recommendations || []).map((store, index) => smallStoreCard(normalizeStore(store, index, slug))).join("");
    }
    trackUtEvent("benefit_filtered_recommendation_view", {
      screen_name: "benefit-filtered-recommendation",
      filter_name: filter,
      benefit_type: page.title,
    });
    trackUtEvent("no_result_view", benefitEventPayload({
      screen_name: "benefit-filtered-recommendation",
      empty_reason: "narrow_condition",
      selected_condition: selectedFilters.join(" · "),
      result_count: page.filteredStores.length,
    }));
    return;
  }
  if (note) {
    note.classList.remove("narrow-result-note");
    note.querySelector("strong").textContent = `${page.title} 혜택 가게`;
    note.querySelector("span").textContent = page.note;
  }
  const filteredStores = applyStoreFilters(page.stores, filters, slug, sortKey);
  const hasNarrowLocalResult = slug === "local" && filteredStores.length <= 1 && filters.some((key) => key !== "sort");
  if (recommendationSection && recommendationList) {
    recommendationSection.hidden = !hasNarrowLocalResult;
    recommendationList.innerHTML = hasNarrowLocalResult
      ? (page.recommendations || []).map((store, index) => smallStoreCard(normalizeStore(store, index, slug))).join("")
      : "";
  }
  if (hasNarrowLocalResult && note) {
    const selectedFilters = filters.map((key) => ({ sort: "기본순", coupon: "쿠폰 할인", onnuri: "온누리상품권", price: "가격 설정", rating: "별점", fast: "빠른 배달", local: "지역화폐" }[key] || key));
    note.classList.add("narrow-result-note");
    note.querySelector("strong").textContent = `조건에 맞는 가게가 ${filteredStores.length}곳 있어요`;
    note.querySelector("span").innerHTML = `${page.filteredNote || page.note}<br><em>${selectedFilters.join(" · ")}</em>`;
  }
  renderStoreList(benefitScreen.querySelector("#benefitStoreList"), filteredStores);
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
  if (name === "coupon-sheet") {
    trackUtEvent("coupon_check_click", { modal_name: "coupon-sheet" });
  }
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
    filters: commonFilterLabels,
    stores: allGeneratedCategoryStores.slice(0, 24),
  };
}

function setResultContext(label = "샐러드", slug = "salad") {
  const page = getCategoryPage(label, slug);
  const resultScreen = document.querySelector('[data-screen="search-result"]');
  listViewState.result = { page, label, slug, filter: "sort", activeFilters: [], sortKey: "default" };
  resultScreen.querySelector(".title-header h1").textContent = page.title;
  const filters = page.filters || commonFilterLabels;
  resultScreen.querySelector(".filter-strip").innerHTML = renderFilterButtons(filters);
  resultScreen.setAttribute("aria-label", `${page.title} 메뉴 리스트`);
  updateResultStores();
}

function setPortfolioContext(label = "쿠폰 할인") {
  const storesForSearch = allGeneratedCategoryStores.filter((store) => {
    const haystack = [store.name, store.discount, store.ribbon, ...(store.labels || [])].join(" ");
    return label.includes("쿠폰") ? haystack.includes("쿠폰") || haystack.includes("할인") : haystack.includes(label) || store.name.includes(label);
  });
  const page = { title: label, stores: storesForSearch.length ? storesForSearch : allGeneratedCategoryStores.slice(0, 24), filters: commonFilterLabels };
  listViewState.portfolio = { page, label, slug: "search", filter: "sort", activeFilters: [], sortKey: "default" };
  document.querySelector(".portfolio-search-field span").textContent = label;
  updatePortfolioStores();
}

function setBenefitContext(label = "쿠폰함", slug = "coupon") {
  const page = benefitPages[slug] || benefitPages.coupon;
  const benefitScreen = document.querySelector('[data-screen="benefit-list"]');
  listViewState.benefit = { page, label, slug, filter: "sort", activeFilters: [], sortKey: "default" };
  benefitScreen.querySelector(".title-header h1").textContent = page.title;
  benefitScreen.querySelector(".tab-list").innerHTML = page.tabs.map((tab, index) => `<button class="${index === 0 ? "active" : ""}" type="button">${tab}</button>`).join("");
  const filters = page.filters || commonFilterLabels;
  benefitScreen.querySelector(".filter-strip").innerHTML = renderFilterButtons(filters);
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

function renderFilterButtons(filters = commonFilterLabels) {
  return filters.map((filterLabel, index) => `<button type="button">${filterLabel}${index === 0 || filterLabel === "별점" ? ' <img src="./icons/20/chevron-down.svg" alt="" />' : ""}</button>`).join("");
}

function toggleListFilter(state, filterKey) {
  const currentFilters = new Set(state.activeFilters || []);
  if (filterKey === "sort") {
    state.activeFilters = [];
  } else {
    if (currentFilters.has(filterKey)) currentFilters.delete(filterKey);
    else currentFilters.add(filterKey);
    state.activeFilters = Array.from(currentFilters);
  }
  state.filter = filterKey;
}

function sortContextForScreen(screen) {
  if (screen?.dataset.screen === "portfolio-search") return { key: "portfolio", state: listViewState.portfolio, update: updatePortfolioStores };
  if (screen?.dataset.screen === "benefit-list") return { key: "benefit", state: listViewState.benefit, update: updateBenefitStores };
  return { key: "result", state: listViewState.result, update: updateResultStores };
}

function openSortSheet(screen) {
  const context = sortContextForScreen(screen);
  const sheet = document.querySelector('[data-overlay="sort-select"]');
  if (!sheet) return;
  sheet.dataset.sortContext = context.key;
  sheet.querySelectorAll("[data-sort-option]").forEach((button) => {
    button.classList.toggle("selected", button.dataset.sortOption === (context.state.sortKey || "default"));
  });
  openModal("sort-select");
}

function applySortSelection(sortKey) {
  const overlay = document.querySelector('[data-overlay="sort-select"]');
  const contextKey = overlay?.dataset.sortContext || "result";
  const context = {
    result: { state: listViewState.result, update: updateResultStores },
    portfolio: { state: listViewState.portfolio, update: updatePortfolioStores },
    benefit: { state: listViewState.benefit, update: updateBenefitStores },
  }[contextKey];
  if (!context) return;
  context.state.sortKey = sortKey;
  context.state.filter = "sort";
  context.update();
  trackUtEvent("sort_click", {
    sort_name: sortLabelFor(sortKey),
    button_label: sortLabelFor(sortKey),
  });
  overlay?.classList.remove("show");
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

function hasVisibleBenefit(store) {
  return (store.labels || []).length > 0 || store.couponLabel !== false || (store.ribbon || "").includes("배달특급");
}

function renderBenefitTags(store) {
  const labels = store.labels || [];
  if (!hasVisibleBenefit(store) && String(store.discount || "").includes("혜택 없음")) return "";
  const hasPaymentLabel = labels.some((label) =>
    label.includes("수원페이") || label.includes("지역화폐") || label.includes("온누리") || label.includes("G드림")
  );
  const paymentTag = hasPaymentLabel || store.couponLabel === false ? "" : `<span class="pay">수원페이</span>`;
  const couponTag = store.couponLabel === false ? "" : `<span class="coupon">${store.couponLabel || "1000원 쿠폰"}</span>`;
  return `${paymentTag}${renderStoreLabels(store)}${couponTag}`;
}

function renderDiscountTag(store) {
  if (!hasVisibleBenefit(store) || String(store.discount || "").includes("혜택 없음")) return "";
  return `<span class="discount"><img src="./icons/14/wavy-check.svg" alt="" />${store.discount}</span>`;
}

function largeStoreCard(store) {
  const ribbonText = store.ribbon && store.ribbon.includes("배달특급") && store.ribbon.includes("할인") ? store.ribbon : "";
  const slug = getStoreSlug(store);
  const storeMeta = [store.distance, store.deliveryFee, store.minOrder ? `최소주문 ${store.minOrder}` : ""].filter(Boolean).join(" · ");
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
        ${storeMeta ? `<p class="large-store-meta">${storeMeta}</p>` : ""}
        <div class="tags">${renderBenefitTags(store)}${renderDiscountTag(store)}</div>
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
  document.querySelector("#searchRecommendList").innerHTML = allGeneratedCategoryStores.slice(0, 8).map(largeStoreCard).join("");
  setResultContext("샐러드", "salad");
  setPortfolioContext("쿠폰 할인");
  const favoriteList = document.querySelector("#favoriteList");
  if (favoriteList) favoriteList.innerHTML = saladResults.slice(0, 2).map(largeStoreCard).join("");
}

function bindInteractions() {
  document.addEventListener("click", (event) => {
    const backButton = event.target.closest("[data-back]");
    if (backButton) {
      trackUtEvent("back_click", {
        button_label: buttonLabel(backButton) || "뒤로",
        target_screen: historyStack[historyStack.length - 2] || "home",
      });
      goBack();
      return;
    }

    const modalButton = event.target.closest("[data-modal]");
    if (modalButton) {
      if (modalButton.dataset.modal === "coupon-sheet") {
        trackUtEvent("coupon_box_open", {
          coupon_action: "open",
          button_label: buttonLabel(modalButton),
          restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
        });
      }
      openModal(modalButton.dataset.modal);
      return;
    }

    const couponButton = event.target.closest(".coupon-download");
    if (couponButton) {
      const couponName = couponButton.dataset.couponName || "온누리 상품권 3,000원 할인";
      applyCouponState(couponName);
      const couponPayload = {
        coupon_name: couponName,
        button_label: buttonLabel(couponButton),
        restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
      };
      trackUtEvent("coupon_download_click", { ...couponPayload, coupon_action: "download" });
      trackUtEvent("coupon_apply_click", { ...couponPayload, coupon_action: "apply" });
      trackUtEvent("click_coupon", couponPayload);
      showToast("쿠폰이 다운로드되고 적용됐어요");
      return;
    }

    const sortOption = event.target.closest("[data-sort-option]");
    if (sortOption) {
      applySortSelection(sortOption.dataset.sortOption || "default");
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

    const tabButton = event.target.closest(".tab-list button, .delivery-tabs button, .store-menu-tabs button, .address-chips button, .favorite-filter-strip button, .order-filter-strip button");
    if (tabButton) {
      const tabGroup = tabButton.parentElement;
      tabGroup?.querySelectorAll("button").forEach((button) => button.classList.remove("active"));
      tabButton.classList.add("active");
      const tabPayload = {
        button_label: buttonLabel(tabButton),
        tab_name: buttonLabel(tabButton),
      };
      trackUtEvent("tab_click", tabPayload);
      if (tabButton.closest('[data-screen="benefit-list"]')) {
        trackUtEvent("benefit_tab_click", benefitEventPayload(tabPayload));
      }
    }

    const filterButton = event.target.closest(".filter-strip button");
    if (filterButton) {
      const activeScreen = filterButton.closest(".app-screen");
      const filterKey = filterButton.dataset.filter || getFilterKey(filterButton.textContent.trim());
      const filterName = cleanText(filterButton.textContent);
      if (filterKey === "sort") {
        openSortSheet(activeScreen);
        return;
      }
      trackUtEvent("filter_click", {
        filter_name: filterName,
        button_label: filterName,
        category_name: activeScreen?.dataset.screen === "benefit-list" ? listViewState.benefit.label : activeScreen?.dataset.screen === "portfolio-search" ? listViewState.portfolio.label : listViewState.result.label,
      });
      if (activeScreen?.dataset.screen === "search-result") {
        toggleListFilter(listViewState.result, filterKey);
        updateResultStores();
      } else if (activeScreen?.dataset.screen === "portfolio-search") {
        toggleListFilter(listViewState.portfolio, filterKey);
        updatePortfolioStores();
      } else if (activeScreen?.dataset.screen === "benefit-list") {
        toggleListFilter(listViewState.benefit, filterKey);
        updateBenefitStores();
        const benefitFilterPayload = benefitEventPayload({
          filter_name: filterName,
          selected_filter: activeBenefitFilters().join("|"),
          filter_type: filterKey,
          selected_condition: activeBenefitFilters().join("|"),
        });
        trackUtEvent("benefit_filter_click", benefitFilterPayload);
        trackUtEvent("click_benefit_filter", benefitFilterPayload);
      }
      return;
    }

    const targetButton = event.target.closest("[data-target]");
    if (targetButton) {
      if (["cart", "checkout", "preparing"].includes(targetButton.dataset.target)) {
        const ctaPayload = {
          button_label: buttonLabel(targetButton),
          target_screen: targetButton.dataset.target,
          restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
          menu_name: currentMenu?.name || document.querySelector("#menuName")?.textContent || "",
        };
        trackUtEvent("cta_click", ctaPayload);
        if (["checkout", "preparing"].includes(targetButton.dataset.target)) {
          trackUtEvent("order_click", ctaPayload);
        }
        if (targetButton.dataset.target === "checkout") {
          trackUtEvent("begin_checkout", ctaPayload);
        }
        if (targetButton.dataset.target === "preparing") {
          trackUtEvent("order_status_view", { ...ctaPayload, order_status: "preparing" });
        }
      }

      if (targetButton.dataset.target === "cart") {
        trackUtEvent("add_to_cart", {
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
        const storePayload = {
          restaurant_name: store?.name || cleanText(targetButton.querySelector("h2, h3")?.textContent || buttonLabel(targetButton)),
          category_name: listViewState.result.label || listViewState.benefit.label || "",
          target_screen: "store",
        };
        const fromBenefitList = !!targetButton.closest('[data-screen="benefit-list"]');
        const fromRecommendation = !!targetButton.closest("#benefitRecommendationList");
        if (fromBenefitList) {
          trackUtEvent("benefit_store_click", benefitEventPayload({
            restaurant_name: storePayload.restaurant_name,
            target_screen: "store",
            store_badge_type: cleanText(targetButton.querySelector(".store-status-badges, .benefit-tags")?.textContent || ""),
          }));
        }
        if (fromRecommendation) {
          trackUtEvent("no_result_recover_click", benefitEventPayload({
            restaurant_name: storePayload.restaurant_name,
            recover_action: "alternative_store_click",
            selected_condition: listViewState.benefit.filter || "",
            target_screen: "store",
          }));
        }
        trackUtEvent("restaurant_click", storePayload);
        trackUtEvent("click_store_card", storePayload);
        showScreen("store");
      } else if (targetButton.dataset.target === "menu") {
        const slug = targetButton.dataset.storeSlug;
        const idx = targetButton.dataset.menuIndex;
        if (slug && idx !== undefined) {
          const menus = storeMenus[slug];
          if (menus && menus[idx]) { currentMenu = menus[idx]; renderMenuDetail(menus[idx]); }
        }
        const menuPayload = {
          menu_name: currentMenu?.name || cleanText(targetButton.querySelector("h3")?.textContent || buttonLabel(targetButton)),
          restaurant_name: currentStore?.name || document.querySelector("#storeName")?.textContent || "",
        };
        trackUtEvent("menu_click", menuPayload);
        trackUtEvent("select_menu", menuPayload);
        showScreen("menu");
      } else {
        showScreen(targetButton.dataset.target);
      }
    }
  });

  document.querySelector(".location").addEventListener("click", () => showToast("동네 선택 화면으로 이동"));
  document.querySelector(".nav-icons button[aria-label='알림']").addEventListener("click", () => showToast("알림 목록 열기"));
  document.querySelector(".nav-icons button[aria-label='장바구니']").addEventListener("click", () => showScreen("cart"));
  document.querySelector(".hero-detail-button").addEventListener("click", (event) => {
    trackUtEvent("cta_click", {
      button_label: buttonLabel(event.currentTarget),
      category_name: "온누리",
      target_screen: "benefit-list",
    });
    trackUtEvent("benefit_entry_click", {
      benefit_type: "온누리",
      benefit_source: "home_hero",
      button_label: buttonLabel(event.currentTarget),
      target_screen: "benefit-list",
    });
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
      setPortfolioContext(value);
      showScreen("portfolio-search");
    }
  });
  document.querySelector("#searchInput").addEventListener("click", (event) => {
    trackUtEvent("search_click", { button_label: "검색 화면 검색창", search_keyword: event.currentTarget.value.trim() });
  });
  document.querySelector("#searchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.currentTarget.value.trim()) {
      const value = event.currentTarget.value.trim();
      trackUtEvent("search_click", { button_label: "검색 실행", search_keyword: value });
      setPortfolioContext(value);
      showScreen("portfolio-search");
    }
  });

  document.querySelector("#categoryGrid").addEventListener("click", (event) => {
    const item = event.target.closest(".category-item");
    if (!item) return;
    event.preventDefault();
    event.stopPropagation();
    document.querySelectorAll(".category-item").forEach((node) => node.classList.remove("selected"));
    item.classList.add("selected");
    trackUtEvent("food_category_click", {
      category_name: item.dataset.label,
      target_screen: "search-result",
    });
    trackUtEvent("category_click", { category_name: item.dataset.label, category_type: "food" });
    requestAnimationFrame(() => routeToSearchResult(item.dataset.label, item.dataset.slug));
  });

  document.querySelector("#benefitGrid").addEventListener("click", (event) => {
    const item = event.target.closest(".benefit-item");
    if (!item) return;
    event.stopPropagation();
    document.querySelectorAll(".benefit-item").forEach((node) => node.classList.remove("selected"));
    item.classList.add("selected");
    const benefitCategoryPayload = {
      screen_name: "home",
      button_label: item.dataset.label,
      category_name: item.dataset.label,
      category_type: "benefit",
    };
    trackUtEvent("benefit_entry_click", {
      benefit_type: item.dataset.label,
      benefit_source: "home_benefit_grid",
      button_label: item.dataset.label,
      target_screen: "benefit-list",
    });
    trackUtEvent("category_click", benefitCategoryPayload);
    trackUtEvent("click_benefit_category", benefitCategoryPayload);
    routeToBenefit(item.dataset.label, item.dataset.slug);
  });

  document.querySelector("#eventTrack").addEventListener("click", (event) => {
    const card = event.target.closest(".event-card");
    if (card) {
      const promotionLabel = card.dataset.label || buttonLabel(card);
      trackUtEvent("promotion_click", {
        button_label: promotionLabel,
        benefit_source: "home_promotion",
        coupon_action: "open",
        target_screen: "coupon-sheet",
      });
      trackUtEvent("coupon_box_open", { coupon_action: "open", button_label: promotionLabel });
      trackUtEvent("category_click", { category_name: promotionLabel, category_type: "promotion" });
      openModal("coupon-sheet");
    }
  });

  document.querySelector("#chipList").addEventListener("click", (event) => {
    const chip = event.target.closest("button");
    if (!chip) return;
    document.querySelectorAll(".chip-list button").forEach((node) => node.classList.remove("active"));
    chip.classList.add("active");
    trackUtEvent("benefit_entry_click", {
      benefit_type: buttonLabel(chip),
      benefit_source: "home_chip",
      button_label: buttonLabel(chip),
      target_screen: "home",
    });
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
trackUtEvent("view_home");

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
