(()=>{const header=document.querySelector('.header');const onScroll=()=>header?.classList.toggle('is-scrolled',scrollY>24);addEventListener('scroll',onScroll,{passive:true});onScroll();})();
