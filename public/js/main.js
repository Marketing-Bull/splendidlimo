(function(){
  document.documentElement.classList.add('js');
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});rv.forEach(function(el){io.observe(el)})}else{rv.forEach(function(el){el.classList.add('in')})}
  var b=document.querySelector('.menu-btn'),u=document.querySelector('.nav ul');
  function menu(o){if(!u)return;u.classList.toggle('open',o);b.setAttribute('aria-expanded',o);document.body.classList.toggle('menu-open',o)}
  if(b&&u){b.addEventListener('click',function(){menu(!u.classList.contains('open'))});
    u.addEventListener('click',function(e){if(e.target.closest('a'))menu(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
    document.addEventListener('click',function(e){if(u.classList.contains('open')&&!e.target.closest('.nav'))menu(false)})}
  /* swipe carousels: pager dots */
  document.querySelectorAll('.swipe').forEach(function(sw){
    var kids=[].slice.call(sw.children),d=document.createElement('div');d.className='dots';
    kids.forEach(function(k,i){var bt=document.createElement('button');bt.type='button';bt.setAttribute('aria-label','Go to item '+(i+1));
      bt.addEventListener('click',function(){sw.scrollTo({left:k.offsetLeft-(sw.clientWidth-k.offsetWidth)/2,behavior:'smooth'})});d.appendChild(bt)});
    sw.after(d);var t,dots=[].slice.call(d.children);
    function upd(){var c=sw.scrollLeft+sw.clientWidth/2,best=0,bd=1e9;kids.forEach(function(k,i){var dd=Math.abs(k.offsetLeft+k.offsetWidth/2-c);if(dd<bd){bd=dd;best=i}});dots.forEach(function(x,i){x.classList.toggle('on',i===best)})}
    sw.addEventListener('scroll',function(){cancelAnimationFrame(t);t=requestAnimationFrame(upd)},{passive:true});upd()});
  /* long reviews: read more */
  function clampReviews(){if(!window.matchMedia('(max-width:768px)').matches)return;
    document.querySelectorAll('.rev').forEach(function(r){var p=r.querySelector('p');if(!p||r.querySelector('.more'))return;
      if(p.scrollHeight>p.clientHeight+2){var m=document.createElement('button');m.type='button';m.className='more';m.textContent='Read more';
        m.addEventListener('click',function(e){e.stopPropagation();var o=r.classList.toggle('open');m.textContent=o?'Show less':'Read more'});r.appendChild(m)}})}
  window.addEventListener('load',clampReviews);
  /* sticky action bar */
  var bar=document.querySelector('.mbar');
  if(bar){var qf=document.getElementById('quote-form'),qv=false,sc=false;
    function show(){bar.classList.toggle('show',sc&&!qv)}
    window.addEventListener('scroll',function(){sc=window.scrollY>420;show()},{passive:true});
    if(qf&&'IntersectionObserver' in window){new IntersectionObserver(function(es){qv=es[0].isIntersecting;show()},{threshold:.35}).observe(qf)}}
  /* first-party attribution: where visitors came from and what they viewed (stored only in this browser, sent with a quote request) */
  var A={};try{A=JSON.parse(localStorage.getItem('sl_attr')||'{}')||{}}catch(e){A={}}
  function mkTouch(){var q=new URLSearchParams(location.search),u={};
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','gbraid','wbraid','fbclid','msclkid','ttclid'].forEach(function(k){if(q.get(k))u[k.replace('utm_','')]=q.get(k)});
    return{at:new Date().toISOString(),landing:location.pathname+location.search,referrer:document.referrer||'',utm:u}}
  try{var t=mkTouch(),ext=t.referrer&&t.referrer.indexOf(location.host)<0;
    if(!A.first)A.first=t;
    if(!A.last||Object.keys(t.utm).length||ext)A.last=t;
    A.pages=(A.pages||[]).concat(location.pathname).slice(-15);
    if(!sessionStorage.getItem('sl_v')){A.visits=(A.visits||0)+1;sessionStorage.setItem('sl_v','1')}
    localStorage.setItem('sl_attr',JSON.stringify(A))}catch(e){}
  var f=document.getElementById('quote-form');if(!f)return;
  var m=f.querySelector('.msg'),t0=Date.now();
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var digits=f.phone.value.replace(/\D/g,'');
    if(digits.length<10){m.className='msg err';m.textContent='Please enter a valid mobile number so we can reach you.';f.phone.focus();return}
    m.className='msg';m.textContent='Sending…';
    var btn=f.querySelector('button[type=submit]');if(btn)btn.disabled=true;
    var c=navigator.connection||{};
    var body={name:f.name.value,phone:f.phone.value,service:f.service.value,date:f.date.value,passengers:f.passengers.value,details:f.details.value,
      company:f.company.value,page:location.pathname,elapsed:Date.now()-t0,attr:A,
      ctx:{lang:navigator.language,tz:(Intl.DateTimeFormat().resolvedOptions()||{}).timeZone,screen:screen.width+'x'+screen.height,viewport:innerWidth+'x'+innerHeight,touch:'ontouchstart' in window,conn:c.effectiveType||''}};
    fetch('/api/quote/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
      .then(function(r){if(!r.ok)throw 0;m.className='msg ok';m.textContent='Thanks! We’ll text or call you shortly.';f.reset();t0=Date.now()})
      .catch(function(){m.className='msg err';m.innerHTML='Something went wrong. Please call <a href="tel:+19546698444">(954) 669-8444</a>.'})
      .then(function(){if(btn)btn.disabled=false});
  });
})();
