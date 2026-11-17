/*
  ISI DAFTAR SOAL DI BAWAH INI.
  Format:
  { question: "Pertanyaan?", options: ["A. ...", "B. ...", "C. ...", "D. ..."], answer: 0 }
  answer: 0 untuk pilihan pertama, 1 kedua, 2 ketiga, 3 keempat.
*/
const questions = [
  // Contoh format (ganti dengan soal resmi yang kamu siapkan):
  // { question: "Apa kepanjangan DISPARPORA?", options: ["Dinas Pariwisata, Kepemudaan dan Olahraga", "Dinas Pendidikan", "Dinas Kesehatan", "Dinas Sosial"], answer: 0 },
];

const TOTAL_TILES = 24;
let position = 1, current = 0, score = 0, chosen = null, answered = false;
const board = document.getElementById("board");
const questionText = document.getElementById("questionText");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");

function drawBoard(){
  board.innerHTML = "";
  // Susunan zig-zag sederhana seperti papan ular tangga.
  const order = [];
  for(let row=3; row>=0; row--){
    const nums = Array.from({length:6},(_,i)=>row*6+i+1);
    if((3-row)%2===1) nums.reverse();
    order.push(...nums);
  }
  order.forEach(n=>{
    const tile=document.createElement("div");
    tile.className="tile"+(n===position?" player":"")+(n===TOTAL_TILES?" finish":"");
    tile.innerHTML=n===position?'<span class="player-dot">●</span>':(n===TOTAL_TILES?"★":n);
    board.appendChild(tile);
  });
  document.getElementById("positionText").textContent=`Posisi: ${position} / ${TOTAL_TILES}`;
}
function renderQuestion(){
  answered=false;chosen=null;nextBtn.disabled=true;answers.innerHTML="";
  if(!questions.length){
    questionText.textContent="Soal kuis belum dimasukkan.";
    feedback.textContent="Tambahkan pertanyaan, pilihan A–D, dan kunci jawaban di file js/quiz.js.";
    document.getElementById("questionCount").textContent="MENUNGGU SOAL";
    return;
  }
  if(current>=questions.length){finishGame();return;}
  const q=questions[current];
  questionText.textContent=q.question;
  document.getElementById("questionCount").textContent=`SOAL ${current+1} / ${questions.length}`;
  document.getElementById("scoreText").textContent=`Skor: ${score}`;
  document.getElementById("progressFill").style.width=`${(current/questions.length)*100}%`;
  q.options.forEach((option,index)=>{
    const btn=document.createElement("button");btn.className="answer-btn";btn.textContent=option;
    btn.addEventListener("click",()=>selectAnswer(index,btn));answers.appendChild(btn);
  });
  feedback.textContent="Pilih satu jawaban yang menurutmu benar.";
}
function selectAnswer(index,button){
  if(answered)return;answered=true;chosen=index;
  const q=questions[current];const buttons=[...answers.children];
  buttons.forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");});
  if(index===q.answer){score+=10;position=Math.min(TOTAL_TILES,position+2);feedback.textContent="Benar! Kamu maju 2 kotak. Hebat!";}
  else{position=Math.max(1,position-2);button.classList.add("wrong");feedback.textContent="Belum tepat. Pion mundur 2 kotak seperti terkena ular. Coba lagi di soal berikutnya!";}
  document.getElementById("scoreText").textContent=`Skor: ${score}`;
  drawBoard();nextBtn.disabled=false;nextBtn.textContent=current===questions.length-1?"Selesaikan":"Soal berikutnya";
}
function finishGame(){
  questionText.textContent="Tantangan selesai!";
  answers.innerHTML=`<p class="feedback">Skor akhir: ${score}. Posisi akhir: ${position}/${TOTAL_TILES}.</p>`;
  feedback.textContent="Terima kasih sudah bermain Kuis DISPARPORA.";
  nextBtn.textContent="Kembali ke Level 1";nextBtn.disabled=false;
  nextBtn.onclick=()=>location.href="../pages/level1.html";
  document.getElementById("progressFill").style.width="100%";
}
nextBtn.addEventListener("click",()=>{
  if(!questions.length)return;
  current++;renderQuestion();
});
drawBoard();renderQuestion();
