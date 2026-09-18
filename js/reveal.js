// V4.1 click reveal: the image changes on click/tap instead of requiring a long scroll.
const revealStage=document.getElementById('revealStage');
const revealBefore=document.querySelector('.reveal-before');
const revealAfter=document.querySelector('.reveal-after');
const revealTitle=document.getElementById('revealTitle');
const revealText=document.getElementById('revealText');
const revealCaption=document.getElementById('revealCaption');
const revealHint=document.getElementById('revealHint');
const revealMeter=document.getElementById('revealMeter');
const revealButtons=document.querySelectorAll('.reveal-switch button');
let packed=false;
function setReveal(state){
  packed=state==='after';
  revealBefore.classList.toggle('active',!packed);
  revealAfter.classList.toggle('active',packed);
  revealStage.classList.toggle('is-packed',packed);
  revealButtons.forEach(btn=>btn.classList.toggle('active',btn.dataset.state===state));
  revealTitle.innerHTML=packed?'Packed and<br><em>ready.</em>':'Before the<br><em>packing.</em>';
  revealText.textContent=packed?'The scene is transformed: items are wrapped, organised and ready for the next step.':'Click the image to see the finished packing state — organised, protected and ready for the next step.';
  revealCaption.textContent=packed?'Organised. Protected. Ready.':'Tap / click to transform the scene.';
  revealHint.textContent=packed?'CLICK TO RESET ↗':'CLICK TO PACK ↗';
  revealMeter.style.width=packed?'100%':'0%';
}
function toggleReveal(){setReveal(packed?'before':'after')}
if(revealStage){
  revealStage.addEventListener('click',e=>{if(e.target.closest('.reveal-switch'))return;toggleReveal()});
  revealStage.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleReveal()}});
  revealButtons.forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();setReveal(btn.dataset.state)}));
  setReveal('before');
}
