const roles = ["Software Engineer","Java Developer","Backend Developer","Python Developer","Data Science Student"];
const typed = document.getElementById("typedRole");
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole(){
  const word = roles[roleIndex];
  typed.textContent = word.slice(0, charIndex);
  if(!deleting && charIndex < word.length){charIndex++;setTimeout(typeRole,85);}
  else if(!deleting){deleting=true;setTimeout(typeRole,1250);}
  else if(charIndex > 0){charIndex--;setTimeout(typeRole,42);}
  else{deleting=false;roleIndex=(roleIndex+1)%roles.length;setTimeout(typeRole,250);}
}
typeRole();

const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
menuToggle.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const progress=document.getElementById("scrollProgress");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(max>0?(window.scrollY/max)*100:0)+"%";
  let current="home";
  document.querySelectorAll("main section[id]").forEach(section=>{if(window.scrollY>=section.offsetTop-150)current=section.id;});
  nav.querySelectorAll("a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});
document.getElementById("year").textContent=new Date().getFullYear();

// Lightweight animated particle background.
const canvas=document.getElementById("particles"),ctx=canvas.getContext("2d");
let particles=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);particles=Array.from({length:Math.min(65,Math.floor(innerWidth/18))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.4}));}
function animate(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(let i=0;i<particles.length;i++){
    const p=particles[i];p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(105,224,208,.55)";ctx.fill();
    for(let j=i+1;j<particles.length;j++){const q=particles[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<115){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(105,224,208,${.09*(1-d/115)})`;ctx.stroke();}}
  }
  requestAnimationFrame(animate);
}
addEventListener("resize",resize);resize();animate();
