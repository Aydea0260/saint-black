// SAINT BLACK — Kinetics T01 product page interactions
(function(){
  "use strict";

  // Mobile nav
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');
  navToggle.addEventListener('click', function(){ siteNav.classList.toggle('open'); });
  siteNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ siteNav.classList.remove('open'); });
  });

  // Gallery
  var mainImage = document.getElementById('mainImage');
  var thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(function(t){
    t.addEventListener('click', function(){
      thumbs.forEach(function(x){ x.classList.remove('active'); });
      t.classList.add('active');
      mainImage.src = t.getAttribute('data-src');
      mainImage.alt = t.getAttribute('aria-label') + ' — SAINT BLACK Built Not Bought hoodie';
    });
  });

  // Accordions
  document.querySelectorAll('.acc-head').forEach(function(head){
    head.addEventListener('click', function(){
      var body = head.nextElementSibling;
      var open = head.classList.toggle('open');
      body.style.maxHeight = open ? body.scrollHeight + 'px' : '0';
    });
  });

  // Size selection
  var selectedSize = null;
  var sizeHint = document.getElementById('sizeHint');
  document.querySelectorAll('#sizeRow .size').forEach(function(btn){
    btn.addEventListener('click', function(){
      document.querySelectorAll('#sizeRow .size').forEach(function(x){ x.classList.remove('sel'); });
      btn.classList.add('sel');
      selectedSize = btn.textContent.trim();
      sizeHint.textContent = 'Size ' + selectedSize + ' selected';
    });
  });

  // Quantity
  var qty = 1;
  var qtyVal = document.getElementById('qtyVal');
  document.getElementById('qtyMinus').addEventListener('click', function(){
    if (qty > 1) { qty--; qtyVal.textContent = qty; }
  });
  document.getElementById('qtyPlus').addEventListener('click', function(){
    if (qty < 9) { qty++; qtyVal.textContent = qty; }
  });

  // Size guide modal
  var sizeModal = document.getElementById('sizeModal');
  document.getElementById('sizeGuideOpen').addEventListener('click', function(){ sizeModal.hidden = false; });
  document.getElementById('sizeGuideClose').addEventListener('click', function(){ sizeModal.hidden = true; });
  sizeModal.addEventListener('click', function(e){ if (e.target === sizeModal) sizeModal.hidden = true; });

  // Bag drawer
  var bag = [];
  var drawer = document.getElementById('bagDrawer');
  var veil = document.getElementById('drawerVeil');
  var drawerBody = document.getElementById('drawerBody');
  var bagCount = document.getElementById('bagCount');

  function openDrawer(){ drawer.hidden = false; veil.hidden = false; document.body.style.overflow = 'hidden'; }
  function closeDrawer(){ drawer.hidden = true; veil.hidden = true; document.body.style.overflow = ''; }
  document.getElementById('bagBtn').addEventListener('click', openDrawer);
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  veil.addEventListener('click', closeDrawer);
  document.getElementById('drawerJoin').addEventListener('click', closeDrawer);

  function renderBag(){
    var total = bag.reduce(function(n,i){ return n + i.qty; }, 0);
    bagCount.textContent = total;
    if (!bag.length) {
      drawerBody.innerHTML = '<p class="bag-empty">Your bag is empty.<br>Drop 001 pieces will live here.</p>';
      return;
    }
    drawerBody.innerHTML = bag.map(function(i){
      return '<div class="bag-item"><img src="assets/front.jpg" alt="Built Not Bought hoodie">' +
        '<div><h4>Built Not Bought Hoodie</h4><p>Black · Size ' + i.size + ' · Qty ' + i.qty + '</p></div></div>';
    }).join('');
  }

  document.getElementById('addBtn').addEventListener('click', function(){
    if (!selectedSize) {
      sizeHint.textContent = 'Please select a size first';
      sizeHint.style.color = '#ff9d9d';
      document.getElementById('sizeRow').scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    sizeHint.style.color = '';
    var found = bag.find(function(i){ return i.size === selectedSize; });
    if (found) found.qty = Math.min(9, found.qty + qty);
    else bag.push({size: selectedSize, qty: qty});
    renderBag();
    openDrawer();
  });
  renderBag();

  // Join form (front-end only until email tool is connected)
  document.getElementById('joinForm').addEventListener('submit', function(e){
    e.preventDefault();
    var email = document.getElementById('joinEmail').value.trim();
    if (!email) return;
    document.getElementById('joinOk').hidden = false;
    document.getElementById('joinForm').hidden = true;
  });

  // Esc closes overlays
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { sizeModal.hidden = true; closeDrawer(); }
  });
})();
