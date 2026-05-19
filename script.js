const pageTopicRanges = [
  { from: 1, to: 1, title: "ปกคู่มือ", keywords: "ปก แนวทางดำเนินงาน พัฒนาศักยภาพ อสม NCDs 2569" },
  { from: 2, to: 2, title: "บทนำ", keywords: "บทนำ เป้าหมาย SDGs โรคไม่ติดต่อเรื้อรัง ภาพรวมคู่มือ" },
  { from: 3, to: 3, title: "สารบัญ", keywords: "สารบัญ เนื้อหา บทบาท หน้า" },
  { from: 4, to: 4, title: "ส่วนที่ 1 ขั้นตอนและค่าเป้าหมาย", keywords: "ส่วนที่ 1 ขั้นตอน ค่าเป้าหมาย" },
  { from: 5, to: 5, title: "ผังขั้นตอนดำเนินงาน", keywords: "ผัง ขั้นตอนดำเนินงาน สุขภาพภาคประชาชน สสบ สสอ รพสต หน่วยบริการ" },
  { from: 6, to: 15, title: "ค่าเป้าหมายรายเขตสุขภาพ", keywords: "ค่าเป้าหมาย โควตา เขตสุขภาพ จังหวัด เชิงรุก จำนวนคน" },
  { from: 16, to: 16, title: "ส่วนที่ 2 บทบาท อสม.", keywords: "ส่วนที่ 2 บทบาท อสม โรคไม่ติดต่อเรื้อรัง NCDs" },
  { from: 17, to: 17, title: "บทบาทที่ 1 คัดกรอง NCDs", keywords: "บทบาทที่ 1 คัดกรอง ประชาชนอายุ 35 ปี" },
  { from: 18, to: 20, title: "ที่มาและบทบาทการคัดกรอง", keywords: "ที่มา ความสำคัญ เตรียมความพร้อม บทบาทหน้าที่ สื่อสาร กลุ่มปกติ กลุ่มเสี่ยง กลุ่มสงสัยป่วย" },
  { from: 21, to: 26, title: "ตรวจร่างกายเบื้องต้น", keywords: "ตรวจร่างกาย น้ำหนัก ส่วนสูง BMI รอบเอว ความดันโลหิต น้ำตาลในเลือด ปลายนิ้ว เครื่องวัด" },
  { from: 27, to: 34, title: "ประเมินพฤติกรรมสุขภาพ", keywords: "พฤติกรรมสุขภาพ บริโภคผัก น้ำตาล ไขมัน โซเดียม ออกกำลังกาย นอนหลับ บุหรี่ เหล้า แอลกอฮอล์ เครียด ซึมเศร้า" },
  { from: 35, to: 39, title: "ใช้งานแอปคัดกรอง", keywords: "แอปพลิเคชัน แอป อสม Smart อสม คัดกรอง NCDs กรอกข้อมูล บันทึก ยืนยัน ผลคะแนนประเมิน" },
  { from: 40, to: 40, title: "บทบาทที่ 2 คำแนะนำปรับพฤติกรรม", keywords: "บทบาทที่ 2 คำแนะนำ ปรับเปลี่ยนพฤติกรรมสุขภาพ" },
  { from: 41, to: 49, title: "แนวทางให้คำแนะนำสุขภาพ", keywords: "คำแนะนำสุขภาพ อาหาร 2 1 1 หวาน มัน เค็ม น้ำตาล น้ำมัน เกลือ ออกกำลังกาย อารมณ์ เครียด บุหรี่ แอลกอฮอล์ นอนหลับ" },
  { from: 50, to: 52, title: "ใช้งานแอปให้คำแนะนำ", keywords: "แอป อสม ให้คำแนะนำ ปรับเปลี่ยนพฤติกรรม รายชื่อประชาชน ทำเครื่องหมาย บันทึก" },
  { from: 53, to: 53, title: "บทบาทที่ 3 สร้าง อสค.", keywords: "บทบาทที่ 3 อาสาสมัครประจำครอบครัว อสค" },
  { from: 54, to: 58, title: "บทบาท อสม. และ อสค.", keywords: "อสค ครอบครัว ดูแลผู้ป่วย NCDs CKD LTC ผู้สูงอายุ พึ่งพิง คู่มือ QR Code" },
  { from: 59, to: 60, title: "ใช้งานแอปสร้าง อสค.", keywords: "แอป อสม สร้าง อสค รายชื่อประชาชนเป้าหมาย กรอกรายละเอียด ยืนยัน" },
  { from: 61, to: 61, title: "บทบาทที่ 4 ติดตามเยี่ยมบ้าน", keywords: "บทบาทที่ 4 ติดตาม เยี่ยมบ้าน เจ้าหน้าที่" },
  { from: 62, to: 67, title: "กระบวนการติดตามเยี่ยมบ้าน", keywords: "เยี่ยมบ้าน เตรียมความพร้อม สัมพันธภาพ ประเมินสุขภาพ ตรวจร่างกาย ให้คำปรึกษา Tele-health Tele-Medicine" },
  { from: 68, to: 69, title: "ใช้งานแอปติดตามเยี่ยมบ้าน", keywords: "แอป อสม ติดตามเยี่ยมบ้าน รายชื่อประชาชนเป้าหมาย รายงานผล บันทึก" },
  { from: 70, to: 70, title: "บทบาทที่ 5 กิจกรรมชุมชน", keywords: "บทบาทที่ 5 กิจกรรม รณรงค์ แก้ไขปัญหา NCDs ชุมชน" },
  { from: 71, to: 74, title: "ตัวอย่างกิจกรรมชุมชน", keywords: "กิจกรรมชุมชน รณรงค์ ศสมช นวัตกรรมชุมชน ประเมินผล ลดหวานมันเค็ม ออกกำลังกาย" },
  { from: 75, to: 76, title: "ใช้งานแอปรายงานกิจกรรม", keywords: "แอป อสม ร่วมกิจกรรม รายงานผล บันทึกกิจกรรม กรอกรายละเอียด ยืนยัน" },
  { from: 77, to: 77, title: "ภาคผนวก", keywords: "ภาคผนวก" },
  { from: 78, to: 80, title: "รายงานผลการพัฒนาศักยภาพ อสม.", keywords: "รายงานผล พัฒนาศักยภาพ อสม Thaiphc login username password ผ่าน ไม่ผ่าน บันทึกข้อมูล" },
  { from: 81, to: 81, title: "ปกหลัง", keywords: "ปกหลัง ชาวบ้าน ดูแลสุขภาพ กรมสนับสนุนบริการสุขภาพ" }
];

const pageMeta = Array.from({ length: 81 }, (_, index) => {
  const page = index + 1;
  const pageNumber = String(page).padStart(2, "0");
  const topic = pageTopicRanges.find((item) => page >= item.from && page <= item.to);

  return {
    page,
    src: `assets/pages/page-${pageNumber}.jpg`,
    fileName: `page-${pageNumber}.jpg`,
    title: topic.title,
    keywords: topic.keywords
  };
});

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
const pageSearchInput = document.querySelector("#pageSearchInput");
const pageSearchStatus = document.querySelector("#pageSearchStatus");
const pageDialog = document.querySelector("#pageDialog");
const dialogImage = document.querySelector("#dialogImage");
const dialogCaption = document.querySelector("#dialogCaption");
const activitySelect = document.querySelector("#issueSelect");
const activityOutput = document.querySelector("#activityOutput");
let activePageGroup = "core";
let pageSearchQuery = "";

function normalizeSearch(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function pageMatchesQuery(item, query) {
  const q = normalizeSearch(query);
  if (!q) return true;

  const pageText = `${item.page} ${String(item.page).padStart(2, "0")} หน้า ${item.page} page ${item.page} ${item.fileName}`;
  const haystack = `${pageText} ${item.title} ${item.keywords}`.toLowerCase();

  return q.split(" ").every((term) => haystack.includes(term));
}

function renderPages(group = activePageGroup, query = pageSearchQuery) {
  activePageGroup = group;
  pageSearchQuery = query;

  const visiblePages = pageMeta.filter((item) => {
    if (group === "core") return importantPages.has(item.page);
    if (group === "app") return appPages.has(item.page);
    return true;