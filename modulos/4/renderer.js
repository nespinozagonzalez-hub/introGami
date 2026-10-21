/* Raster animation layer. Poses come from the approved atlas and new guardian atlases. */
(function(root){
'use strict';
const base=new URL('.',document.currentScript.src),images=new Map();
function load(name){if(!images.has(name))images.set(name,new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>{images.delete(name);reject(Error('No se pudo cargar '+name));};im.src=new URL('assets/'+name,base).href;}));return images.get(name);}
const hero=[{r:[14,169,188,273],x:118,y:437},{r:[266,137,221,305],x:382,y:437},{r:[505,194,381,249],x:646,y:437,poly:[[505,194],[886,194],[886,292],[815,315],[815,443],[505,443]]},{r:[821,222,235,222],x:970,y:437,poly:[[886,222],[1056,222],[1056,444],[821,444],[821,315],[886,292]]},{r:[1076,181,258,264],x:1215,y:437},{r:[1335,20,199,426],x:1432,y:437}];
const valle=[{r:[12,535,250,415],x:139,y:940},{r:[248,469,300,479],x:376,y:940,poly:[[248,469],[548,469],[548,747],[476,784],[476,835],[548,870],[548,948],[248,948]]},{r:[478,568,400,381],x:730,y:940,poly:[[548,568],[878,568],[878,949],[602,949],[602,835],[478,825],[478,784],[548,747]]},{r:[873,521,214,426],x:979,y:940},{r:[1090,576,249,373],x:1191,y:940},{r:[1242,726,294,231],x:1401,y:940}];
const grid=[{r:[0,0,512,512],x:270,y:480},{r:[512,0,448,512],x:760,y:480},{r:[936,0,600,512],x:1280,y:480,poly:[[936,0],[1536,0],[1536,512],[1024,512],[1024,330],[936,310]]},{r:[0,512,512,512],x:270,y:960},{r:[512,512,512,512],x:770,y:960},{r:[1024,512,512,512],x:1290,y:960}];
function sprite(ctx,im,frame,x,y,s,alpha=1){const r=frame.r;ctx.save();ctx.globalAlpha=alpha;if(frame.poly){ctx.beginPath();frame.poly.forEach((p,i)=>{const px=x+(p[0]-frame.x)*s,py=y+(p[1]-frame.y)*s;i?ctx.lineTo(px,py):ctx.moveTo(px,py);});ctx.closePath();ctx.clip();}ctx.drawImage(im,...r,Math.round(x+(r[0]-frame.x)*s),Math.round(y+(r[1]-frame.y)*s),Math.round(r[2]*s),Math.round(r[3]*s));ctx.restore();}
class Renderer{
 constructor(canvas,portrait){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.portrait=portrait;this.active=false;this.token=0;this.settings={speed:1,reduced:matchMedia('(prefers-reduced-motion:reduce)').matches};this.st={heroPose:0,enemyPose:0,heroOffset:0,enemyOffset:0,shield:false,heroFade:1,effects:[],pops:[],flash:0,shake:0};this.hm=0;this.em=0;this.last=0;this.frame=0;this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(canvas);this.resize();}
 configure(settings){this.settings={...this.settings,...settings};}
 resize(){const w=Math.round(this.canvas.clientWidth),h=Math.round(this.canvas.clientHeight);if(w&&h){this.canvas.width=w;this.canvas.height=h;this.ctx.imageSmoothingEnabled=false;this.draw(performance.now());}}
 async prepare(g){this.g=g;const [a,e,bg]=await Promise.all([load('valle-sprites.webp'),load(g.theme+'-sprites.webp'),load(g.theme+'-bg.webp')]);this.atlas=a;this.enemyAtlas=e;this.bg=bg;this.enemyFrames=g.id==='g1'?valle:grid;this.stop();this.st={heroPose:0,enemyPose:0,heroOffset:0,enemyOffset:0,shield:false,heroFade:1,effects:[],pops:[],flash:0,shake:0};this.hm=0;this.em=0;this.resize();this.drawPortrait(this.portrait);}
 start(){this.active=true;cancelAnimationFrame(this.frame);const loop=now=>{if(!this.active)return;if(now-this.last>27){this.last=now;this.draw(now);}this.frame=requestAnimationFrame(loop);};this.frame=requestAnimationFrame(loop);}
 stop(){this.token++;this.active=false;cancelAnimationFrame(this.frame);}
 setBattle(b){this.st.shield=Boolean(b.guardStance);if(b.finished){this.st.heroPose=b.outcome==='win'?5:4;this.st.enemyPose=b.outcome==='win'?5:0;this.st.heroFade=b.outcome==='lose'?.65:1;}this.draw(performance.now());}
 drawPortrait(canvas){if(!canvas||!this.enemyAtlas)return;const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);c.fillStyle='#203a48';c.fillRect(0,0,canvas.width,canvas.height);c.imageSmoothingEnabled=false;const r=this.g.id==='g1'?[40,535,200,230]:this.g.id==='g2'?[110,60,270,245]:this.g.id==='g3'?[125,0,270,245]:[120,30,290,260];c.drawImage(this.enemyAtlas,...r,0,0,canvas.width,canvas.height);}
 positions(){const w=this.canvas.width,h=this.canvas.height;return {hero:{x:w*.245,y:h*.88,s:Math.max(.33,Math.min(.72,w*.00074))},enemy:{x:w*.755,y:h*.85,s:Math.max(.30,Math.min(.64,w*.00063))}};}
 effect(kind,target){this.st.effects.push({kind,target,start:performance.now(),life:kind==='beam'?650:460});}
 pop(value,target,color){this.st.pops.push({value,target,color,start:performance.now()});}
 async play(result,b){
  const own=++this.token,st=this.st,reduced=this.settings.reduced,factor=reduced?.14:Number(this.settings.speed)||1;
  const wait=ms=>new Promise(r=>setTimeout(r,Math.max(15,ms*factor))),alive=()=>own===this.token;
  const hit=()=>{st.flash=performance.now();st.shake=reduced?0:5;};
  st.heroPose=0;st.enemyPose=0;st.heroFade=1;
  if(result.mode==='initiative'){await wait(120);return;}
  if(['attack','skill'].includes(result.mode)){
   st.heroPose=1;await wait(260);if(!alive())return;st.heroPose=2;st.heroOffset=reduced?0:result.mode==='skill'?.10:.27;this.effect(result.mode==='skill'?'beam':'slash','enemy');await wait(150);if(!alive())return;
   if(result.correct){st.enemyPose=4;st.enemyOffset=reduced?0:.022;hit();this.effect('impact','enemy');this.pop('−'+result.damage,'enemy','#fff0bf');}else{st.enemyPose=3;this.effect('block','enemy');this.pop('BLOQUEO','enemy','#b5ead9');}
   await wait(470);
  }else if(result.mode==='defend'){
   st.heroPose=result.correct?3:0;st.shield=result.correct;if(result.correct)this.effect('block','hero');await wait(550);
  }else if(result.mode==='heal'){
   st.heroPose=result.correct?5:4;if(result.correct){this.effect('heal','hero');this.pop('+'+result.heal,'hero','#a4f2d1');}await wait(640);
  }else{
   st.enemyPose=1;st.heroPose=result.mode==='react-defend'&&result.correct?3:0;await wait(300);if(!alive())return;st.enemyPose=2;st.enemyOffset=reduced?0:-.28;this.effect('enemy-slash','hero');await wait(160);if(!alive())return;
   const block=result.mode==='react-defend'&&result.correct;st.heroPose=block?3:4;st.heroOffset=block||reduced?0:-.035;hit();this.effect(block?'block':'impact','hero');this.pop(block?'BLOQUEO · −'+result.damage:'−'+result.damage,'hero',block?'#b5fff0':'#ffc0ae');if(result.heal)this.pop('+'+result.heal,'hero','#9df0cc');if(result.riposte){st.enemyPose=4;this.pop('−'+result.riposte,'enemy','#fff0bf');}await wait(600);
  }
  if(!alive())return;st.heroOffset=0;st.enemyOffset=0;st.heroPose=0;st.enemyPose=0;st.shield=b.guardStance;if(b.finished){st.heroPose=b.outcome==='win'?5:4;st.enemyPose=b.outcome==='win'?5:0;st.heroFade=b.outcome==='lose'?.65:1;if(b.outcome==='win')this.effect('heal','hero');}await wait(220);
 }
 draw(now){const c=this.ctx,w=this.canvas.width,h=this.canvas.height;if(!w||!h)return;c.clearRect(0,0,w,h);c.imageSmoothingEnabled=false;c.save();const st=this.st,p=this.positions();this.hm+=(st.heroOffset-this.hm)*.55;this.em+=(st.enemyOffset-this.em)*.55;if(st.shake){c.translate(Math.round(Math.sin(now*.12)*st.shake),0);st.shake=Math.max(0,st.shake-.6);}
  if(this.bg){let sw=this.bg.naturalWidth,sh=this.bg.naturalHeight,sx=0,sy=0;const ratio=w/h;if(ratio>sw/sh){sh=sw/ratio;sy=(this.bg.naturalHeight-sh)*.6;}else{sw=sh*ratio;sx=(this.bg.naturalWidth-sw)/2;}c.drawImage(this.bg,sx,sy,sw,sh,0,0,w,h);}else{c.fillStyle='#102c3d';c.fillRect(0,0,w,h);}
  if(this.atlas&&this.enemyAtlas){c.fillStyle='#071d2180';for(const [who,motion] of [['hero',this.hm],['enemy',this.em]]){const v=p[who];c.beginPath();c.ellipse(v.x+motion*w,v.y+3,who==='hero'?32:40,7,0,0,Math.PI*2);c.fill();}
   const alpha=pose=>pose===4&&now-st.flash<380&&Math.floor((now-st.flash)/75)%2?.5:1;
   sprite(c,this.enemyAtlas,this.enemyFrames[st.enemyPose],p.enemy.x+this.em*w,p.enemy.y,p.enemy.s,alpha(st.enemyPose));
   sprite(c,this.atlas,hero[st.heroPose],p.hero.x+this.hm*w,p.hero.y+(st.heroPose===0&&!this.settings.reduced?Math.sin(now/480):0),p.hero.s,alpha(st.heroPose)*st.heroFade);
  }
  if(st.shield){const x=p.hero.x+18,y=p.hero.y-52,z=w<500?.7:1;c.save();c.globalAlpha=.65;c.strokeStyle='#8cf0da';c.lineWidth=3;c.beginPath();[[0,-46],[30,-28],[26,17],[0,40],[-26,17],[-30,-28]].forEach(([a,b],i)=>i?c.lineTo(x+a*z,y+b*z):c.moveTo(x+a*z,y+b*z));c.closePath();c.stroke();c.restore();}
  st.effects=st.effects.filter(e=>now-e.start<e.life);st.effects.forEach(e=>{const t=(now-e.start)/e.life,pt=p[e.target],x=pt.x,y=pt.y-(e.target==='hero'?55:95),unit=Math.min(1,w/800);c.save();c.globalAlpha=1-t;
   if(e.kind==='beam'){const ax=p.hero.x+w*.13,ay=p.hero.y-62,ex=ax+(p.enemy.x-ax)*Math.min(1,t*3),ey=ay+(p.enemy.y-90-ay)*Math.min(1,t*3);c.strokeStyle='#83f3dd';c.lineWidth=12*unit;c.beginPath();c.moveTo(ex-38*unit,ey+4);c.lineTo(ex,ey);c.stroke();c.strokeStyle='#fff3c1';c.lineWidth=4*unit;c.stroke();}
   else if(e.kind==='slash'||e.kind==='enemy-slash'){const d=e.kind==='slash'?1:-1;c.strokeStyle='#ffefbc';c.lineWidth=5*unit;c.beginPath();c.moveTo(x-d*30*unit,y-44*unit);c.lineTo(x+d*29*unit,y+38*unit);c.stroke();}
   else if(e.kind==='block'){c.strokeStyle='#b9fff0';c.lineWidth=3*unit;c.strokeRect(x-12,y-25*unit,42*unit,50*unit);}
   else{c.fillStyle=e.kind==='heal'?'#b4ffe2':e.target==='hero'?'#ffb59f':'#ffe9af';for(let i=0;i<10;i++){const a=i*2.4,d=8+t*45;c.fillRect(Math.round(x+Math.cos(a)*d),Math.round(y+Math.sin(a)*d),i%2?3:5,i%2?3:5);}}
   c.restore();});
  st.pops=st.pops.filter(e=>now-e.start<1100);st.pops.forEach(e=>{const t=(now-e.start)/1100,v=p[e.target],x=v.x,y=v.y-(e.target==='hero'?105:155)-t*30;c.save();c.globalAlpha=Math.min(1,(1-t)*2);c.font='700 '+(w<500?15:22)+'px "Courier New",monospace';c.textAlign='center';c.lineWidth=4;c.strokeStyle='#101928';c.strokeText(e.value,x,y);c.fillStyle=e.color;c.fillText(e.value,x,y);c.restore();});c.restore();
 }
 static async portal(canvas,g){const im=await load(g.theme+'-sprites.webp');if(!canvas.isConnected)return;const c=canvas.getContext('2d');canvas.width=500;canvas.height=240;c.imageSmoothingEnabled=false;const f=g.id==='g1'?valle[0]:grid[0];sprite(c,im,f,250,235,g.id==='g1'?.54:.49);}
}
root.OrbeRenderer=Renderer;
})(window);
