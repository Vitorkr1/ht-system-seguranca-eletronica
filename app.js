const whatsappBase = 'https://wa.me/5511947552426?text=';
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = whatsappBase + encodeURIComponent(link.dataset.whatsapp);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menu');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';navigation.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMenu();});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#quote-form').addEventListener('submit',event=>{
 event.preventDefault();
 const data=new FormData(event.currentTarget);
 const name=String(data.get('name')||'').trim();
 const input=document.querySelector('#name');
 if(!name){input.setCustomValidity('Informe seu nome para iniciar a conversa.');input.reportValidity();return;}
 input.setCustomValidity('');
 const message=`Olá! Meu nome é ${name}. Tenho interesse em ${data.get('service')} para ${String(data.get('property')).toLowerCase()}. Gostaria de falar com um consultor da HT System.`;
 const destination=whatsappBase+encodeURIComponent(message);
 const opened=window.open(destination,'_blank','noopener,noreferrer');
 const feedback=document.querySelector('#form-feedback');feedback.hidden=false;feedback.replaceChildren();
 const text=document.createTextNode('Continue sua solicitação no WhatsApp. ');const link=document.createElement('a');link.href=destination;link.target='_blank';link.rel='noopener noreferrer';link.textContent='Abrir conversa';link.style.textDecoration='underline';feedback.append(text,link);
});
document.querySelector('#name').addEventListener('input',event=>event.target.setCustomValidity(''));
const siteHeader=document.querySelector('.header');
let scrollUpdatePending=false;
window.addEventListener('scroll',()=>{if(scrollUpdatePending)return;scrollUpdatePending=true;requestAnimationFrame(()=>{siteHeader.classList.toggle('scrolled',window.scrollY>20);scrollUpdatePending=false;});},{passive:true});
const sectionLinks=Array.from(navigation.querySelectorAll('a'));
if('IntersectionObserver' in window){
 const activeSectionObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){sectionLinks.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}}},{rootMargin:'-15% 0px -60% 0px',threshold:0});
 document.querySelectorAll('main section[id]').forEach(section=>activeSectionObserver.observe(section));
}
// Hero carousel: explicit controls, touch swipe and respectful autoplay.
(()=>{
 const region=document.querySelector('.hero-carousel');if(!region)return;
 const track=region.querySelector('.carousel-track');
 const slides=Array.from(region.querySelectorAll('.carousel-slide'));
 const dots=Array.from(region.querySelectorAll('[data-slide]'));
 const pause=region.querySelector('.carousel-pause');
 const announcement=region.querySelector('.carousel-announcement');
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,timer=null,stopped=motion.matches,hovered=false,focused=false,visible=true,pointerStart=null;
 const interval=6500;
 function schedule(){clearTimeout(timer);timer=null;const paused=stopped||hovered||focused||!visible||document.hidden;region.classList.toggle('motion-paused',stopped||!visible||document.hidden);if(!paused)timer=setTimeout(()=>show(current+1,false),interval);}
 function show(index,manual=true){current=(index+slides.length)%slides.length;track.style.transform=`translateX(-${current*100}%)`;slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==current)));dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));if(manual)announcement.textContent=slides[current].getAttribute('aria-label');schedule();}
 function updatePause(){pause.textContent=stopped?'Reproduzir':'Pausar';pause.setAttribute('aria-label',stopped?'Reproduzir apresentação automática':'Pausar apresentação automática');schedule();}
 pause.addEventListener('click',()=>{stopped=!stopped;if(!stopped){focused=false;hovered=false;}updatePause();});
 region.querySelector('.carousel-previous').addEventListener('click',()=>show(current-1));
 region.querySelector('.carousel-next').addEventListener('click',()=>show(current+1));
 dots.forEach(dot=>dot.addEventListener('click',()=>show(Number(dot.dataset.slide))));
 region.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();show(current+(event.key==='ArrowRight'?1:-1));}});
 region.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;schedule();}});
 region.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'){hovered=false;schedule();}});
 region.addEventListener('focusin',()=>{focused=true;schedule();});
 region.addEventListener('focusout',event=>{if(!region.contains(event.relatedTarget)){focused=false;schedule();}});
 region.addEventListener('pointerdown',event=>{if(event.target.closest('button')||event.button>0)return;pointerStart={x:event.clientX,y:event.clientY};});
 region.addEventListener('pointerup',event=>{if(!pointerStart)return;const dx=event.clientX-pointerStart.x,dy=event.clientY-pointerStart.y;pointerStart=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3)show(current+(dx<0?1:-1));});
 region.addEventListener('pointercancel',()=>{pointerStart=null;});
 document.addEventListener('visibilitychange',schedule);
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(region);
 motion.addEventListener('change',()=>{if(motion.matches){stopped=true;updatePause();}});
 updatePause();
})();
