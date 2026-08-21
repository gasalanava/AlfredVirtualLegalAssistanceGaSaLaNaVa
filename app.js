
(()=>{
 const D=window.APP_DATA,N=D.nodes,RM=D.resultMap,DR=D.destinationRoutes,DEST=D.destinations,REQ=D.requirements,UX=D.ux,UXO=D.uxOptions;
 let current=D.meta.startNode,history=[],currentDest=null,currentMap=null,checklistAnswers={},lastText="",currentDR=null;
 const $=id=>document.getElementById(id), esc=s=>String(s||"").replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])), non=v=>v&&String(v).trim();
  if($("notice")) $("notice").textContent="";

 function phase(n){for(let i=1;i<=4;i++)$("ph"+i).classList.toggle("active",i===n)}
 function show(id){["legalCard","destRouteCard","destinationCard","checkCard","finalCard"].forEach(x=>$(x).classList.add("hidden"));$(id).classList.remove("hidden")}
 function block(t,v,full=false){return non(v)?`<div class="block ${full?'full':''}"><h3>${esc(t)}</h3><p>${esc(v)}</p></div>`:"";}
 function lastChoice(id){for(let i=history.length-1;i>=0;i--)if(history[i].id===id)return history[i].choice;return null}
 function renderHist(){
   $("history").innerHTML=history.length?history.map(h=>`<div class="hist"><b>${esc(h.title)}</b><span>${esc(h.choice)}</span></div>`).join(""):"<div class='hist'><span>Aún no has respondido preguntas.</span></div>";
   $("back").disabled=!history.length;
   if($("routeCount")) $("routeCount").textContent=history.length===1?"1 paso":`${history.length} pasos`;
 }
 function legalDetails(n){
   const s=n.kind==="special"?n:(n.options?.[0]||{});
   return `<div class="detailGrid">${block("Concepto jurídico",s.concept,true)}${block("Qué dispone la ruta",s.action,true)}${block("Policía Judicial",s.police,true)}${block("Quién decide",s.decides)}${block("Quién ejecuta",s.executes)}${block("Quién recibe / custodia / administra",s.receives,true)}${block("Norma principal",s.primaryLaw,true)}${block("Normas complementarias",s.complementaryLaw,true)}${block("Jurisprudencia / criterio",s.jurisprudence,true)}${block("Advertencia técnica",s.warning,true)}</div>`;
 }
 function helpHTML(u){
   if(!u) return "";
   return `<div class="helpLayout"><img src="assets/alfred-doubt.webp" class="helpMascot" alt="Alfred pensando"><div class="helpNote">
      ${non(u.how)?`<h3>Cómo decidir</h3><p>${esc(u.how)}</p>`:""}
      ${non(u.examples)?`<h3>Ejemplos</h3><p>${esc(u.examples)}</p>`:""}
      ${non(u.dontNeed)?`<h3>No necesitas saber esto todavía</h3><p>${esc(u.dontNeed)}</p>`:""}
      ${non(u.ifUncertain)?`<h3>Si todavía tienes dudas</h3><p>${esc(u.ifUncertain)}</p>`:""}
   </div></div>`;
 }
 function getOptions(nid, baseOptions){
   if(UXO[nid] && UXO[nid].length) return UXO[nid];
   return (baseOptions||[]).map((o,i)=>({label:o.label,next:o.next,subtext:"",action:"navigate",order:i+1}));
 }
 function coherenceFilter(nid, opts){
   $("coherence").classList.add("hidden");
   if(nid!=="P04A") return opts;
   const p03=lastChoice("P03"),p01=lastChoice("P01");
   if(p03 && p03.startsWith("No,")){
      $("coherence").textContent="Coherencia aplicada: antes indicaste que por ahora no existe una decisión patrimonial autónoma. Para cambiarlo, vuelve a P03.";
      $("coherence").classList.remove("hidden");
      return opts.filter(o=>o.next==="FIN-EMP-EF");
   }
   if(p03 && p03.startsWith("Sí,")){
      $("coherence").textContent="Coherencia aplicada: antes indicaste que además de evidencia existe una decisión patrimonial sobre el bien.";
      $("coherence").classList.remove("hidden");
      return opts.filter(o=>o.next==="P05");
   }
   if(p01==="No") return opts.filter(o=>o.next!=="FIN-EMP-EF");
   return opts;
 }
 function renderLegal(){
   phase(1);show("legalCard");currentDR=null;
   const n=N[current];if(!n)return enterDestination("DEST-CONSULTA",null);
   const u=UX[current]||{};
   $("nodeCode").textContent=n.id;
   $("nodeKind").textContent=n.kind==="special"?"RÉGIMEN ESPECIAL":"RUTA GENERAL";
   $("nodeTitle").textContent=u.title||n.title||n.id;
   $("nodeIntro").textContent=u.intro||"";
   $("nodeIntro").classList.toggle("hidden",!non(u.intro));
   $("nodeQuestion").textContent=u.question||n.question||"Seleccione la opción aplicable.";
   $("legalDetails").innerHTML=legalDetails(n);

   const helpBtn=$("helpBtn"),helpPanel=$("helpPanel");
   helpBtn.textContent=u.helpButton||"Alfred, explícame cómo decidir esta pregunta";
   helpPanel.innerHTML=helpHTML(u);helpPanel.classList.add("hidden");
   helpBtn.classList.toggle("hidden",!helpPanel.innerHTML);
   helpBtn.onclick=()=>helpPanel.classList.toggle("hidden");

   let opts=coherenceFilter(current,getOptions(current,n.options));
   const box=$("options");box.innerHTML="";
   opts.forEach(o=>{
      const b=document.createElement("button");b.className="option";
      b.innerHTML=`<strong>${esc(o.label||o.next)}</strong>${o.subtext?`<small>${esc(o.subtext)}</small>`:""}`;
      b.onclick=()=>{
        if(o.action==="help"){helpPanel.classList.remove("hidden");helpPanel.scrollIntoView({behavior:"smooth",block:"nearest"});return}
        chooseLegal(n,o);
      };
      box.appendChild(b);
   });
   renderHist();
 }
 function chooseLegal(n,o){
   history.push({id:n.id,title:(UX[n.id]?.title||n.title||n.id),choice:o.label||o.next,nodeId:n.id,phase:"legal"});
   const t=o.next||"";
   if(t.startsWith("FIN-")) return handleResult(t,n,o);
   if(t.startsWith("DEST-")) return enterDestination(t,{sourceNode:n,sourceOption:o});
   if(/^D\d+$/.test(t)) return renderDestRoute(t);
   current=t;renderLegal();
 }
 function handleResult(code,n,o){
   const m=RM[code];currentMap={code,...(m||{}),sourceNode:n,sourceOption:o};
   if(!m) return enterDestination("DEST-CONSULTA",currentMap);
   if(m.target.startsWith("DEST-")) return enterDestination(m.target,m);
   if(/^D\d+$/.test(m.target)) return renderDestRoute(m.target);
   current=m.target;renderLegal();
 }
 function renderDestRoute(id){
   currentDR=id;phase(2);show("destRouteCard");
   const r=DR[id];if(!r)return enterDestination("DEST-CONSULTA",currentMap);
   const u=UX[id]||{};
   $("drCode").textContent=id;$("drTitle").textContent=u.title||"Determinar dónde debe quedar ahora";
   $("drIntro").textContent=u.intro||"";$("drIntro").classList.toggle("hidden",!non(u.intro));
   $("drQuestion").textContent=u.question||r.question;
   const hp=$("drHelpPanel"),hb=$("drHelpBtn");hp.innerHTML=helpHTML(u);hp.classList.add("hidden");hb.textContent=u.helpButton||"Alfred, explícame cómo decidir esta pregunta";hb.classList.toggle("hidden",!hp.innerHTML);hb.onclick=()=>hp.classList.toggle("hidden");
   const opts=getOptions(id,r.options);const box=$("drOptions");box.innerHTML="";
   opts.forEach(o=>{const b=document.createElement("button");b.className="option";b.innerHTML=`<strong>${esc(o.label)}</strong>${o.subtext?`<small>${esc(o.subtext)}</small>`:""}`;b.onclick=()=>chooseDestRoute(r,o);box.appendChild(b)});
   renderHist();
 }
 function chooseDestRoute(r,o){
   history.push({id:r.id,title:(UX[r.id]?.title||"Determinación de destino"),choice:o.label,nodeId:r.id,phase:"dest"});
   if(o.action==="help") return;
   if(o.next.startsWith("DEST-")) return enterDestination(o.next,{...currentMap,routeOption:o});
   if(/^D\d+$/.test(o.next)) return renderDestRoute(o.next);
   current=o.next;renderLegal();
 }
 function enterDestination(id,map){
   currentDest=id;currentMap=map||currentMap;checklistAnswers={};phase(2);show("destinationCard");
   const d=DEST[id]||DEST["DEST-CONSULTA"];
   $("destTitle").textContent=d.title;
   $("destSummary").innerHTML=block("Quién recibe",d.receiver)+block("Custodia material",d.custody)+block("Administración jurídica",d.administration)+block("En qué calidad / título",d.legalQuality,true)+block("Qué debe hacer Policía Judicial",d.policeAction,true)+block("Soporte mínimo",d.minimumSupport,true)+block("Qué cambia después",d.changeEvent,true);
   $("destLegal").innerHTML=`<div class="detailGrid">${block("Cuándo se activa",d.activation,true)}${block("Norma principal",d.primaryLaw,true)}${block("Normas complementarias",d.complementaryLaw,true)}${block("Advertencia",d.warning,true)}</div>`;
   $("validateBtn").textContent=d.checklist&&REQ[d.checklist]?.length?"Validar requisitos de recepción":"Generar resultado";
   renderHist();
 }
 function renderChecklist(){
   const d=DEST[currentDest],rows=REQ[d.checklist]||[];if(!rows.length)return evaluateFinal();
   phase(3);show("checkCard");$("checkTitle").textContent=`${d.title} · ${d.checklist}`;const box=$("checkItems");box.innerHTML="";
   rows.forEach((r,i)=>{
     const conditional=(r.mandatory||"").toLowerCase().includes("cond") || !["si","sí"].includes((r.mandatory||"").toLowerCase());
     const div=document.createElement("div");div.className="checkItem";
     div.innerHTML=`<div class="checkHead"><b>${esc(r.requirement)}</b><span class="cond">${esc(r.mandatory||"")}${r.condition?` · ${esc(r.condition)}`:""}</span></div><p>${esc(r.question||"")}</p><div class="tri"><button data-v="yes">Cumple</button><button data-v="no">No cumple</button>${conditional?'<button data-v="na">No aplica</button>':""}</div><details><summary>Ver soporte y consecuencia</summary><div class="detailGrid">${block("Soporte",r.support)}${block("Quién verifica",r.verifier)}${block("Fuente",r.law,true)}${block("Si no cumple",r.ifNo,true)}</div></details>`;
     div.querySelectorAll(".tri button").forEach(b=>b.onclick=()=>{checklistAnswers[i]=b.dataset.v;div.querySelectorAll(".tri button").forEach(x=>x.className="");b.classList.add("sel-"+b.dataset.v)});
     box.appendChild(div);
   });
 }
 function evaluateFinal(){
   const d=DEST[currentDest]||DEST["DEST-CONSULTA"],rows=REQ[d.checklist]||[];let missing=[],unanswered=[];
   rows.forEach((r,i)=>{const a=checklistAnswers[i],mandatory=["sí","si"].includes((r.mandatory||"").toLowerCase());if(!a&&mandatory)unanswered.push(r);if(a==="no")missing.push(r)});
   phase(4);show("finalCard");
   let status,cls;if(currentDest==="DEST-CONSULTA"){status="CONSULTA REQUERIDA";cls="mid"}else if(unanswered.length){status="VALIDACIÓN INCOMPLETA";cls="mid"}else if(missing.length){status="NO APTO TODAVÍA";cls="bad"}else if(currentDest==="DEST-CUSTODIO-ACTUAL"){status="PERMANENCIA TEMPORAL DEFINIDA";cls="mid"}else if(currentDest==="DEST-SITIO-AISLADO"){status="CONTROL DE SEGURIDAD DEFINIDO";cls="mid"}else if(currentDest==="DEST-DESTR"){status="REQUISITOS PARA DISPOSICIÓN VALIDADOS";cls="good"}else if(currentDest==="DEST-CIERRE-DOC"){status="CIERRE DOCUMENTAL VALIDADO";cls="good"}else{status="APTO PARA ENTREGA / RECEPCIÓN";cls="good"}
   $("finalStatus").className="status "+cls;$("finalStatus").textContent=status;$("finalTitle").textContent=d.title;
   let html=`<div class="resultGrid">${block("¿Dónde queda ahora?",d.title,true)}${block("Quién recibe",d.receiver)}${block("Custodia material",d.custody)}${block("Administración jurídica",d.administration)}${block("Calidad / título",d.legalQuality,true)}${block("Qué debe hacer Policía Judicial",d.policeAction,true)}${block("Qué cambia después",d.changeEvent,true)}</div>`;
   if(unanswered.length)html+=`<h3>Falta responder</h3>`+unanswered.map(r=>`<div class="missing"><b>${esc(r.requirement)}</b>${esc(r.question)}</div>`).join("");
   if(missing.length)html+=`<h3>Requisitos que impiden completar la entrega</h3>`+missing.map(r=>`<div class="missing"><b>${esc(r.requirement)}</b>${esc(r.ifNo||"Subsanar o consultar antes de continuar.")}</div>`).join("");
   html+=`<details><summary>Ver fundamento jurídico</summary><div class="detailGrid">${block("Norma principal",d.primaryLaw,true)}${block("Normas complementarias",d.complementaryLaw,true)}${block("Advertencia",d.warning,true)}</div></details>`;$("finalBody").innerHTML=html;
   lastText=`${status}\n\nDESTINO\n${d.title}\n\nQUIÉN RECIBE\n${d.receiver}\n\nCUSTODIA MATERIAL\n${d.custody}\n\nADMINISTRACIÓN JURÍDICA\n${d.administration}\n\nCALIDAD / TÍTULO\n${d.legalQuality}\n\nQUÉ DEBE HACER POLICÍA JUDICIAL\n${d.policeAction}`+(missing.length?`\n\nREQUISITOS PENDIENTES\n${missing.map(r=>"- "+r.requirement+": "+r.ifNo).join("\n")}`:"");
 }
 function restart(){current=D.meta.startNode;history=[];currentDest=null;currentMap=null;checklistAnswers={};renderLegal()}
 $("restart").onclick=restart;$("again").onclick=restart;$("validateBtn").onclick=()=>{const d=DEST[currentDest];if(d.checklist&&REQ[d.checklist]?.length)renderChecklist();else evaluateFinal()};$("evaluateBtn").onclick=evaluateFinal;$("checkBack").onclick=()=>enterDestination(currentDest,currentMap);
 $("destBack").onclick=()=>{if(history.length){const h=history.pop();if(h.phase==="dest")renderDestRoute(h.id);else{current=h.nodeId;renderLegal()}}};
 $("back").onclick=()=>{if(!history.length)return;const h=history.pop();if(h.phase==="dest")renderDestRoute(h.id);else{current=h.nodeId;renderLegal()}};
 $("copy").onclick=async()=>{try{await navigator.clipboard.writeText(lastText);$("copy").textContent="Copiado";setTimeout(()=>$("copy").textContent="Copiar resultado",1000)}catch(e){window.prompt("Copia el resultado:",lastText)}};
 $("testsBtn").onclick=()=>$("modal").classList.remove("hidden");$("closeModal").onclick=()=>$("modal").classList.add("hidden");$("modal").onclick=e=>{if(e.target===$("modal"))$("modal").classList.add("hidden")};
 $("testList").innerHTML=D.tests.map(t=>`<div class="test"><span class="pass">${esc(t.status)}</span><h3>${esc(t.case)}. ${esc(t.scenario)}</h3><div class="testcode">${esc(t.legal)} → ${esc(t.destRoute)} → ${esc(t.expected)} → ${esc(t.checklist)}</div><p><b>Control crítico:</b> ${esc(t.critical)}</p><p><b>Si cumple:</b> ${esc(t.ifYes)}</p><p><b>Si no:</b> ${esc(t.ifNo)}</p></div>`).join("");
 if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){navigator.serviceWorker.register('./sw.js').catch(()=>{});}
 renderLegal();
})();
