(function(){
  var b=document.querySelector('.menu-btn'),u=document.querySelector('.nav ul');
  if(b&&u){b.addEventListener('click',function(){var o=u.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    u.addEventListener('click',function(e){if(e.target.tagName==='A')u.classList.remove('open')})}
  var f=document.getElementById('quote-form');if(!f)return;
  var m=f.querySelector('.msg');
  f.addEventListener('submit',function(e){
    e.preventDefault();m.className='msg';m.textContent='Sending…';
    fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({phone:f.phone.value,company:f.company.value,page:location.pathname})})
      .then(function(r){if(!r.ok)throw 0;m.className='msg ok';m.textContent='Thanks! We’ll text or call you shortly.';f.reset()})
      .catch(function(){m.className='msg err';m.innerHTML='Something went wrong. Please call <a href="tel:+19546698444">(954) 669-8444</a>.'});
  });
})();
