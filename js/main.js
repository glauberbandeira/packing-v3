const scrollLine=document.getElementById('scrollLine'), mobileQuote=document.querySelector('.mobile-quote');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion) document.documentElement.classList.add('motion-ready');

// Reveal elements as they enter the viewport — subtle and lightweight.
const motionTargets=[
  ...document.querySelectorAll('section:not(.hero) .label, section:not(.hero) h2, section:not(.hero) .copy, section:not(.hero) .btn, section:not(.hero) .text-link'),
];
motionTargets.forEach((el,i)=>{
  if(!el.closest('.form')){
    el.dataset.motion = el.matches('h2') ? 'up' : 'up';
    el.style.transitionDelay = `${Math.min((i%4)*.055,.165)}s`;
  }
});
document.querySelectorAll('.services,.process-list,.logos,.testimonials,.area-grid,.mini-proof,.points').forEach(el=>el.dataset.motion='stagger');

const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('in');io.unobserve(entry.target)}
}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('[data-motion]').forEach(el=>io.observe(el));

// One requestAnimationFrame loop keeps scroll effects smooth without a heavy animation library.
let ticking=false;
function updateScroll(){
  const y=scrollY;
  const max=document.documentElement.scrollHeight-innerHeight;
  scrollLine.style.transform=`scaleX(${max>0?y/max:0})`;
  mobileQuote.classList.toggle('show',y>520);
  if(!reduceMotion){
    const hero=document.querySelector('.hero-img');
    if(hero) hero.style.transform=`translate3d(0,${Math.min(y*.045,28)}px,0)`;
    document.querySelectorAll('.business-photo,.about-photo,.service-feature .photo').forEach((el)=>{
      const r=el.getBoundingClientRect();
      if(r.bottom>0&&r.top<innerHeight){
        const p=(innerHeight/2-(r.top+r.height/2))/innerHeight;
        el.style.backgroundPosition=`center calc(50% + ${p*18}px)`;
      }
    });
  }
  ticking=false;
}
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true}},{passive:true});
updateScroll();

// Close mobile navigation after selection.
document.querySelectorAll('.mobile a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.mobile').classList.remove('open')));

// Gentle anchor transition for in-page navigation.
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const target=document.querySelector(a.getAttribute('href'));
  if(!target)return;
  e.preventDefault();
  target.scrollIntoView({behavior:reduceMotion?'auto':'smooth',block:'start'});
}));

document.getElementById('quoteForm').addEventListener('submit',e=>{e.preventDefault();const name=e.currentTarget.elements.name.value.trim();alert(`Thanks${name?', '+name:''}. This demo form is ready to be connected to the client's email, CRM, WhatsApp or form service.`)});
