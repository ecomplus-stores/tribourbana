const resolves=new Map,swMessageError=(e,s)=>({$msgId$:e.$msgId$,$error$:s}),httpRequestFromWebWorker=e=>new Promise((async s=>{const t=await e.clone().json(),o=await(e=>new Promise((async s=>{const t=[...await self.clients.matchAll()].sort(((e,s)=>e.url>s.url?-1:e.url<s.url?1:0))[0];if(t){const o=[s,setTimeout((()=>{resolves.delete(e.$msgId$),s(swMessageError(e,"Timeout"))}),12e4)];resolves.set(e.$msgId$,o),t.postMessage(e)}else s(swMessageError(e,"NoParty"))})))(t);s(response(JSON.stringify(o),"application/json"))})),response=(e,s)=>new Response(e,{headers:{"content-type":s||"text/html","Cache-Control":"no-store"}});self.oninstall=()=>self.skipWaiting(),self.onactivate=()=>self.clients.claim(),self.onmessage=e=>{const s=e.data,t=resolves.get(s.$msgId$);t&&(resolves.delete(s.$msgId$),clearTimeout(t[1]),t[0](s))},self.onfetch=e=>{const s=e.request,t=new URL(s.url).pathname;t.endsWith("sw.html")?e.respondWith(response('<!DOCTYPE html><html><head><meta charset="utf-8"><script src="./partytown-sandbox-sw.js?v=0.8.0"><\/script></head></html>')):t.endsWith("proxytown")&&e.respondWith(httpRequestFromWebWorker(s))};