import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let scripts=0,links=0;
function walk(dir){for(const name of fs.readdirSync(dir)){if(['node_modules','.git','test-results'].includes(name))continue;const f=path.join(dir,name);if(fs.statSync(f).isDirectory())walk(f);else if(f.endsWith('.js')||f.endsWith('.gs')||f.endsWith('.cjs')){new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});scripts++;}else if(f.endsWith('.html')){const s=fs.readFileSync(f,'utf8');for(const m of s.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(!/\bsrc\s*=/.test(m[1])){new vm.Script(m[2],{filename:f});scripts++;}}for(const m of s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').matchAll(/(?:src|href)=["']([^"']+)["']/g)){if(/^(?:https?:|#|data:|mailto:|javascript:)/.test(m[1]))continue;let target=path.resolve(path.dirname(f),m[1].split(/[?#]/)[0]);if(!target.startsWith(root)||!fs.existsSync(target))throw Error('Ruta ausente: '+path.relative(root,f)+' → '+m[1]);links++;}}else if(f.endsWith('.json'))JSON.parse(fs.readFileSync(f,'utf8'));}}
walk(root);
const original=JSON.parse(fs.readFileSync(path.join(root,'data/recursos-originales.json')));
if(original.resources.length!==16||original.resources.filter(x=>x.type==='video').length!==9)throw Error('El catálogo original perdió recursos.');
console.log(JSON.stringify({ok:true,scripts,local_links:links,original_resources:16}));
