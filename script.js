const pageMeta = Array.from({ length: 81 }, (_, index) => ({
  page: index + 1,
  src: `assets/pages/page-${String(index + 1).padStart(2, "0")}.jpg`
}));

const importantPages = new Set([2, 3, 18, 19, 20, 24, 25, 35, 36, 40, 42, 43, 48, 49, 53, 55, 59, 60, 61, 64, 65, 70, 72, 73, 75, 76]);
const appPages = new Set([35, 36, 37, 38, 39, 50, 51, 52, 59, 60, 68, 69, 75, 76, 78, 79, 80]);

const activities = {
  "คนเสี่ยงความดันสูง": {
    title: "จุดวัดความดันประจำเดือน",
    steps: "ตั้งจุดวัดที่ศาลา/วัด บันทึกผล แนะนำลดเค็ม นัดวัดซ้ำ และส่งรายชื่อค่าผิดปกติให้เจ้าหน้าที่"
  },
  "กินหวาน มัน เค็มสูง": {
    title: "ครัวคำใหญ่ลดหวานมันเค็ม",
    steps: "ชวนครัวเรือนเลือกเมนูสุขภาพ 1 มื้อต่อวัน สาธิตอ่านฉลาก และประกวดเมนูพื้นบ้านลดเครื่องปรุง"
  },
  "ขาดการออกกำลังกาย": {
    title: "เดินสะสมแต้มสุขภาพ",
    steps: "กำหนดเส้นทางเดินปลอดภัย ชวนเดินเป็นกลุ่ม สะสมวันทำได้ และติดตามรอบเอว/ความดันทุกเดือน"
  },
  "ติดตามกลุ่มสงสัยป่วยไม่ได้": {
    title: "ทีมเยี่ยมบ้านร่วม รพ.สต.",
    steps: "แบ่งรายชื่อเป็นคุ้ม นัดหมายครอบครัว ตรวจซ้ำตามเกณฑ์ และบันทึกเหตุผลกรณียังไม่พบตัว"
  }
};

const pagesGrid = document.querySelector("#pagesGrid");
const searchInput = document.querySelector("#searchInput");
const pageDialog = document.querySelector("#pageDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogCaption = document.querySelector("#dialogCaption");
const activitySelect = document.querySelector("#issueSelect");
const activityOutput = document.querySelector("#activityOutput");

function renderPages(group = "core") {
  const visiblePages = pageMeta.filter((item) => {
    if (group === "core") return importantPages.has(item.page);
    if (group === "app") return appPages.has(item.page);
    return true;
  });

  pagesGrid.innerHTML = visiblePages.map((item) => `
    <button class="page-thumb" type="button" data-page="${item.page}" data-src="${item.src}">
      <img loading="lazy" src="${item.src}" alt="หน้าคู่มือต้นฉบับ หน้า ${item.page}">
      <span>หน้า ${item.page}</span>
    </button>
  `).join("");
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  document.querySelectorAll(".searchable").forEach((card) => {
    const haystack = `${card.textContent} ${card.dataset.tags || ""}`.toLowerCase();
    card.classList.toggle("hidden", q.length > 0 && !haystack.includes(q));
  });
}

function updateActivity() {
  const selected = activitySelect.value;
  const plan = activities[selected];
  activityOutput.innerHTML = `<strong>${plan.title}</strong><span>${plan.steps}</span>`;
}

document.querySelectorAll("[data-scroll-target]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.scrollTarget)?.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-query]").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.query;
    runSearch(searchInput.value);
  });
});

document.querySelectorAll("[data-page-group]").forEach((button) => {
  button.addEventListener("click", () => renderPages(button.dataset.pageGroup));
});

searchInput.addEventListener("input", (event) => runSearch(event.target.value));

pagesGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".page-thumb");
  if (!button) return;
  dialogImage.src = button.dataset.src;
  dialogCaption.textContent = `หน้าคู่มือต้นฉบับ หน้า ${button.dataset.page}`;
  pageDialog.showModal();
});

document.querySelector(".dialog-close").addEventListener("click", () => pageDialog.close());

pageDialog.addEventListener("click", (event) => {
  if (event.target === pageDialog) pageDialog.close();
});

document.querySelectorAll("#checklist input").forEach((input) => {
  const key = `ncd-check-${input.value}`;
  input.checked = localStorage.getItem(key) === "1";
  input.addEventListener("change", () => localStorage.setItem(key, input.checked ? "1" : "0"));
});

activitySelect.addEventListener("change", updateActivity);

renderPages("core");
updateActivity();
