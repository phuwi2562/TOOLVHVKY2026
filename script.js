const pageMeta = Array.from({ length: 81 }, (_, index) => {
  const page = index + 1;
  const pageNumber = String(page).padStart(2, "0");

  return {
    page,
    src: `assets/pages/page-${pageNumber}.jpg`,
    fileName: `page-${pageNumber}.jpg`
  };
});

const importantPages = new Set([2, 3, 18, 19, 20, 24, 25, 35, 36, 40, 42, 43, 48, 49, 53, 55, 59, 60, 61, 64, 65, 70, 72, 73, 75, 76]);
const appPages = new Set([35, 36, 37, 38, 39, 50, 51, 52, 59, 60, 68, 69, 75, 76, 78, 79, 80]);

const activityPlans = [
  {
    title: "จุดวัดความดันประจำเดือน",
    steps: "ตั้งจุดวัดที่ศาลา/วัด บันทึกผล แนะนำลดเค็ม นัดวัดซ้ำ และส่งรายชื่อค่าผิดปกติให้เจ้าหน้าที่"
  },
  {
    title: "ครัวคำใหญ่ลดหวานมันเค็ม",
    steps: "ชวนครัวเรือนเลือกเมนูสุขภาพ 1 มื้อต่อวัน สาธิตอ่านฉลาก และประกวดเมนูพื้นบ้านลดเครื่องปรุง"
  },
  {
    title: "เดินสะสมแต้มสุขภาพ",
    steps: "กำหนดเส้นทางเดินปลอดภัย ชวนเดินเป็นกลุ่ม สะสมวันทำได้ และติดตามรอบเอว/ความดันทุกเดือน"
  },
  {
    title: "ทีมเยี่ยมบ้านร่วม รพ.สต.",
    steps: "แบ่งรายชื่อเป็นคุ้ม นัดหมายครอบครัว ตรวจซ้ำตามเกณฑ์ และบันทึกเหตุผลกรณียังไม่พบตัว"
  }
];

const pageTopics = [
  { from: 1, to: 3, keywords: "ปก บทนำ สารบัญ คู่มือ" },
  { from: 4, to: 15, keywords: "ขั้นตอน เป้าหมาย โควตา เขตสุขภาพ จังหวัด" },
  { from: 16, to: 39, keywords: "คัดกรอง ncds เบาหวาน ความดัน น้ำตาล รอบเอว bmi แอป อสม" },
  { from: 40, to: 52, keywords: "คำแนะนำ พฤติกรรม อาหาร หวาน มัน เค็ม ออกกำลังกาย บุหรี่ เหล้า" },
  { from: 53, to: 60, keywords: "อสค อาสาสมัครประจำครอบครัว ครอบครัว แอป อสม" },
  { from: 61, to: 69, keywords: "ติดตาม เยี่ยมบ้าน เจ้าหน้าที่ ส่งต่อ telehealth" },
  { from: 70, to: 76, keywords: "กิจกรรม ชุมชน รณรงค์ แก้ไขปัญหา ncds รายงานผล" },
  { from: 77, to: 81, keywords: "ภาคผนวก รายงาน ผล ศักยภาพ อสม" }
];

const pagesGrid = document.querySelector("#pagesGrid");
const searchInput = document.querySelector("#searchInput");
const pageSearchInput = document.querySelector("#pageSearchInput");
const pageSearchStatus = document.querySelector("#pageSearchStatus");
const pageDialog = document.querySelector("#pageDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogCaption = document.querySelector("#dialogCaption");
const activitySelect = document.querySelector("#issueSelect");
const activityOutput = document.querySelector("#activityOutput");

let activePageGroup = "core";
let pageSearchQuery = "";

function normalize(value) {
  return (value || "").trim().toLowerCase().replace(/\s+/g, " ");
}

function getPageKeywords(page) {
  return pageTopics.find((topic) => page >= topic.from && page <= topic.to)?.keywords || "";
}

function pageMatchesQuery(item, query) {
  const q = normalize(query);
  if (!q) return true;

  const text = [
    item.page,
    String(item.page).padStart(2, "0"),
    `หน้า ${item.page}`,
    `page ${item.page}`,
    item.fileName,
    getPageKeywords(item.page)
  ].join(" ").toLowerCase();

  return q.split(" ").every((term) => text.includes(term));
}

function renderPages(group = activePageGroup, query = pageSearchQuery) {
  if (!pagesGrid) return;

  activePageGroup = group;
  pageSearchQuery = query;

  const visiblePages = pageMeta.filter((item) => {
    if (group === "core" && !importantPages.has(item.page)) return false;
    if (group === "app" && !appPages.has(item.page)) return false;
    return pageMatchesQuery(item, query);
  });

  pagesGrid.innerHTML = visiblePages.map((item) => `
    <button class="page-thumb" type="button" data-page="${item.page}" data-src="${item.src}">
      <img loading="lazy" src="${item.src}" alt="หน้าคู่มือต้นฉบับ หน้า ${item.page}">
      <span>หน้า ${item.page}</span>
    </button>
  `).join("");

  if (pageSearchStatus) {
    pageSearchStatus.textContent = query
      ? `พบ ${visiblePages.length} หน้า`
      : `แสดง ${visiblePages.length} หน้า`;
  }
}

function runSearch(query) {
  const q = normalize(query);
  document.querySelectorAll(".searchable").forEach((card) => {
    const haystack = `${card.textContent} ${card.dataset.tags || ""}`.toLowerCase();
    card.classList.toggle("hidden", q.length > 0 && !haystack.includes(q));
  });
}

function updateActivity() {
  if (!activitySelect || !activityOutput) return;

  const plan = activityPlans[activitySelect.selectedIndex] || activityPlans[0];
  activityOutput.innerHTML = `<strong>${plan.title}</strong><span>${plan.steps}</span>`;
}

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.scrollTarget);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!searchInput) return;
    searchInput.value = button.dataset.query;
    runSearch(searchInput.value);
  });
});

document.querySelectorAll("[data-page-group]").forEach((button) => {
  button.addEventListener("click", () => renderPages(button.dataset.pageGroup, pageSearchQuery));
});

searchInput?.addEventListener("input", (event) => runSearch(event.target.value));

pageSearchInput?.addEventListener("input", (event) => {
  renderPages(activePageGroup, event.target.value);
});

pagesGrid?.addEventListener("click", (event) => {
  const button = event.target.closest(".page-thumb");
  if (!button || !pageDialog || !dialogImage || !dialogCaption) return;

  dialogImage.src = button.dataset.src;
  dialogCaption.textContent = `หน้าคู่มือต้นฉบับ หน้า ${button.dataset.page}`;

  if (typeof pageDialog.showModal === "function") {
    pageDialog.showModal();
  } else {
    pageDialog.setAttribute("open", "");
  }
});

document.querySelector(".dialog-close")?.addEventListener("click", () => {
  pageDialog?.close();
});

pageDialog?.addEventListener("click", (event) => {
  if (event.target === pageDialog) pageDialog.close();
});

document.querySelectorAll("#checklist input").forEach((input) => {
  const key = `ncd-check-${input.value}`;
  input.checked = localStorage.getItem(key) === "1";
  input.addEventListener("change", () => localStorage.setItem(key, input.checked ? "1" : "0"));
});

activitySelect?.addEventListener("change", updateActivity);

renderPages("core");
updateActivity();
