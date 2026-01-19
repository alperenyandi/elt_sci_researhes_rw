// Whitelist: sadece bu numaralar indirme tetikler.
const ALLOWED_IDS = new Set([
  "2425911001",
  "2425911002",
  "2515911001",
  "2515911002",
  "2515911003",
  "2515911004",
  "2515911005",
  "2515911006",
  "2515911007",
  "2515911009",
  "2515911010"
]);

const form = document.getElementById("downloadForm");
const input = document.getElementById("studentId");
const statusEl = document.getElementById("status");

function setStatus(msg, type){
  statusEl.textContent = msg || "";
  statusEl.className = "status" + (type ? ` ${type}` : "");
}

function isValidId(value){
  return /^[0-9]{10}$/.test(value);
}

function triggerDownload(studentId){
  // PDF’ler /pdfs klasöründe ve adı öğrenci numarasıyla aynı olmalı:
  const fileUrl = `pdfs/${studentId}.pdf`;

  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = `${studentId}.pdf`; // indirme adını zorlar (tarayıcı izin verirse)
  document.body.appendChild(a);
  a.click();
  a.remove();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = (input.value || "").trim();

  if (!isValidId(id)) {
    setStatus("Geçersiz format. Lütfen 10 haneli öğrenci numaranızı yalnızca rakamlarla girin.", "bad");
    return;
  }

  if (!ALLOWED_IDS.has(id)) {
    setStatus("Bu numara için dosya bulunamadı. Lütfen numaranızı kontrol edin.", "bad");
    return;
  }

  setStatus("Dosyanız indiriliyor… İndirme başlamazsa tarayıcı engellerini kontrol edin.", "ok");
  triggerDownload(id);
});
