const K='nexa_db',S='nexa_session',INV='nexa_inv';
const ADMIN={id:'admin',username:'Tycoon',email:'tycoon@nexamarket.local',name:'Tycoon',pass:'Tycoon_$#',role:'admin'};
const seed=()=>({users:[ADMIN],notes:[],chats:[],txs:[],positions:[],maintenance:false});
const DB={get(){let d;try{d=JSON.parse(localStorage.getItem(K))}catch(e){}d=d||seed();
 d.users=d.users.filter(u=>u.role!=='admin');d.users.unshift({...ADMIN});return d},   // always applies the current admin login
 save(d){localStorage.setItem(K,JSON.stringify(d))}};
const uid=()=>Math.random().toString(36).slice(2,10);
const fmt=n=>Number(n).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
const Auth={
 me(){const id=sessionStorage.getItem(S)||localStorage.getItem(S);return DB.get().users.find(u=>u.id===id)||null},
 investor(){return (sessionStorage.getItem(INV)||localStorage.getItem(INV))==='1'},   // true when signed in with the investor password
 signup(name,email,pass,phone,invPass){const d=DB.get();email=email.trim().toLowerCase();if(d.users.some(u=>u.email===email))throw'Email already registered';
  const u={id:uid(),name,email,phone:phone||'',pass,invPass:invPass||'',role:'user',real:0,demo:10000,mode:'demo',created:Date.now()};
  d.users.push(u);DB.save(d);localStorage.setItem(S,u.id);localStorage.removeItem(INV);return u},
 signin(id,pass,role,remember){const k=id.trim().toLowerCase();let inv=false;
  const u=DB.get().users.find(u=>{
   if(role==='admin')return u.role==='admin'&&u.username.toLowerCase()===k&&u.pass===pass;
   if(u.role!=='user'||u.email!==k)return false;
   if(u.pass===pass)return true;
   if(u.invPass&&u.invPass===pass){inv=true;return true}return false});
  if(!u)throw'Wrong credentials';const st=remember===false?sessionStorage:localStorage;st.setItem(S,u.id);
  localStorage.removeItem(INV);sessionStorage.removeItem(INV);if(inv)st.setItem(INV,'1');return u},
 out(){[localStorage,sessionStorage].forEach(s=>{s.removeItem(S);s.removeItem(INV)})}};
function theme(){const t=localStorage.getItem('nexa_theme')||'dark';document.documentElement.dataset.theme=t;return t}
function toggleTheme(){localStorage.setItem('nexa_theme',theme()==='dark'?'light':'dark');theme()}
theme();