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
