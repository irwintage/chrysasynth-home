(()=>{
const synth=window.speechSynthesis, reader=document.querySelector('.reader'), body=document.querySelector('.reading-body');
if(!reader||!body||!synth||!window.SpeechSynthesisUtterance)return;
reader.hidden=false;
const blocks=[...body.querySelectorAll('h2,h3,p,li,.callout')].filter(e=>!e.closest('.cta')&&e.textContent.trim());
const play=reader.querySelector('.reader-play'),stop=reader.querySelector('.reader-stop'),rate=reader.querySelector('select'),follow=reader.querySelector('input'),status=reader.querySelector('.reader-status'),progress=reader.querySelector('progress');
let index=0, state='idle', token=0, current=null, active=null, mark=null;
const total=blocks.reduce((n,e)=>n+e.textContent.length,0);
function ui(){play.setAttribute('aria-label',state==='playing'?'Pause narration':'Play narration');play.innerHTML=state==='playing'?'<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';}
function clearWord(){if(mark){const parent=mark.parentNode;mark.replaceWith(...mark.childNodes);parent.normalize();mark=null;}}
function clear(){clearWord();if(active)active.classList.remove('reader-active');active=null;}
function highlight(offset,len){clearWord();if(!active)return;const walker=document.createTreeWalker(active,NodeFilter.SHOW_TEXT);let node,pos=0;while(node=walker.nextNode()){let end=pos+node.length;if(offset<end){let local=Math.max(0,offset-pos),word=node.textContent.slice(local).match(/^\S+/);let count=Math.min(node.length-local,len||word?.[0].length||1);if(count>0){const range=document.createRange();range.setStart(node,local);range.setEnd(node,local+count);mark=document.createElement('span');mark.className='reader-word';range.surroundContents(mark);}break;}pos=end;}}
const initialStatus=status.textContent;
function reset(message=initialStatus){token++;synth.cancel();clear();index=0;state='idle';current=null;progress.value=0;status.textContent=message;ui();}
function speak(){clear();if(index>=blocks.length){reset('Finished listening');progress.value=1;return;}const id=++token;active=blocks[index];active.classList.add('reader-active');if(follow.checked)active.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});const text=active.textContent;let before=blocks.slice(0,index).reduce((n,e)=>n+e.textContent.length,0);progress.value=before/total;const u=new SpeechSynthesisUtterance(text);current=u;u.lang='en-US';u.rate=Number(rate.value);const voices=synth.getVoices().filter(v=>/^en[-_]/i.test(v.lang));const voice=voices.find(v=>/natural|neural/i.test(v.name))||voices.find(v=>v.lang==='en-US')||voices[0];if(voice){u.voice=voice;u.lang=voice.lang;}u.onboundary=e=>{if(id!==token||state!=='playing')return;if(e.name==='word'){highlight(e.charIndex,e.charLength);progress.value=(before+e.charIndex)/total;}};u.onend=()=>{if(id!==token)return;index++;speak();};u.onerror=e=>{if(id===token)reset('Narration unavailable — try another browser');};state='playing';status.textContent='Reading · '+(index+1)+' / '+blocks.length;ui();synth.speak(u);}
play.onclick=()=>{if(state==='playing'){synth.pause();state='paused';status.textContent='Paused';ui();}else if(state==='paused'){synth.resume();state='playing';status.textContent='Reading · '+(index+1)+' / '+blocks.length;ui();}else{index=0;speak();}};
stop.onclick=()=>reset();rate.onchange=()=>{if(state!=='idle'){token++;synth.cancel();speak();}};window.addEventListener('pagehide',()=>{token++;synth.cancel();});ui();
})();
