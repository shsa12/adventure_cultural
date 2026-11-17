// GANTI URL di bawah dengan tautan Instagram resmi DISPARPORA Kabupaten Sambas.
const INSTAGRAM_URL = "https://www.instagram.com/";
const instagramLink = document.getElementById("instagramLink");
const confirmFollow = document.getElementById("confirmFollow");
if(instagramLink) instagramLink.href = INSTAGRAM_URL;
confirmFollow?.addEventListener("click",()=>{
  document.getElementById("gateCard").hidden = true;
  document.getElementById("searchArea").hidden = false;
});
