document.addEventListener("DOMContentLoaded",()=>{const faDigits={"0":"۰","1":"۱","2":"۲","3":"۳","4":"۴","5":"۵","6":"۶","7":"۷","8":"۸","9":"۹"};const toFa=value=>String(value).replace(/[0-9]/g,d=>faDigits[d]);const walk=node=>{if(node.nodeType===Node.TEXT_NODE){node.nodeValue=toFa(node.nodeValue);return}if(node.nodeType!==Node.ELEMENT_NODE||["SCRIPT","STYLE"].includes(node.tagName))return;node.childNodes.forEach(walk)};walk(document.body);if(document.title)document.title=toFa(document.title);document.querySelectorAll("input,textarea,button,[aria-label]").forEach(el=>["placeholder","value","aria-label"].forEach(a=>{if(el.hasAttribute(a))el.setAttribute(a,toFa(el.getAttribute(a)))}));const input=document.querySelector("#searchInput"),form=document.querySelector("#projectSearch"),items=[...document.querySelectorAll(".project-item")],empty=document.querySelector("#emptySearch");const normalize=s=>String(s).replace(/[۰-۹]/g,d=>String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).toLowerCase().trim();const filter=()=>{if(!input||!items.length)return;const q=normalize(input.value);let count=0;items.forEach(item=>{const hit=!q||normalize((item.dataset.search||"")+" "+item.textContent).includes(q);item.style.display=hit?"":"none";if(hit)count++});if(empty)empty.style.display=count?"none":"block"};input?.addEventListener("input",filter);form?.addEventListener("submit",e=>{e.preventDefault();filter();document.querySelector("#projects,#all")?.scrollIntoView({behavior:"smooth",block:"start"})});const internal=location.pathname.includes("/pages/");if(internal){document.body.classList.add("project-internal");const path=location.pathname.split("/").pop()||"projects.html";const itemsMenu=[["../index.html","خانه","01"],["projects.html","پروژه‌ها","02"],["contact.html","ثبت پروژه","03"]];const menu=document.createElement("aside");menu.className="side-menu";menu.innerHTML='<div class="side-brand"><a href="../index.html" aria-label="خانه پروژه‌ها"><img src="../assets/images/logo.png" alt="پروژه‌ها"></a><div><strong>پروژه‌ها</strong><small>PROJECT WORKSPACE</small></div></div><div class="side-caption">فضای پروژه‌ها</div><nav>'+itemsMenu.map(x=>'<a class="'+(path===x[0].split("/").pop()?"active":"")+'" href="'+x[0]+'"><span>'+x[2]+"</span>"+x[1]+"</a>").join("")+'</nav><div class="side-bottom"><b>Project Workspace</b>اطلاعات، مدل و وضعیت هر پروژه در فضای اختصاصی آن.</div>';document.body.prepend(menu);const mobile=document.createElement("nav");mobile.className="mobile-menu";mobile.innerHTML='<a href="../index.html"><span>⌂</span>خانه</a><a href="projects.html"><span>◫</span>پروژه‌ها</a><div class="mobile-logo"><a href="../index.html" aria-label="خانه پروژه‌ها"><img src="../assets/images/logo.png" alt="پروژه‌ها"></a></div><a href="contact.html"><span>＋</span>ثبت پروژه</a>';document.body.appendChild(mobile)}const style=document.createElement("style");style.textContent=`
/* final visual direction */
body{--ink:#19364d;--ink2:#2c5268;--gold:#b58a3b;--gold2:#d7b66c;--paper:#f6f3ec;--mist:#edf3f3}
.home-page{background:#eef3f3!important;color:var(--ink);background-image:radial-gradient(circle at 12% 18%,rgba(181,138,59,.12),transparent 22%),radial-gradient(circle at 86% 14%,rgba(37,132,151,.13),transparent 24%),linear-gradient(120deg,#f8f7f2 0%,#eef4f3 48%,#f4f1e9 100%)!important}
.home-page:before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.28;background-image:linear-gradient(90deg,transparent 49.8%,rgba(25,54,77,.08) 50%,transparent 50.2%),linear-gradient(0deg,transparent 49.8%,rgba(25,54,77,.06) 50%,transparent 50.2%);background-size:120px 120px;mask-image:linear-gradient(to bottom,#000,transparent 75%);z-index:0}
.home-page #app{position:relative;z-index:1}
.home-page .home-visual-head{height:500px!important;background:radial-gradient(ellipse at 50% 0,rgba(215,182,108,.24),transparent 45%)!important}
.search-gateway{min-height:700px!important;background:linear-gradient(180deg,rgba(255,255,255,.76),rgba(246,249,247,.48))!important;border-bottom:1px solid rgba(25,54,77,.09)!important}
.gateway-brand{padding:9px 14px;border:1px solid rgba(181,138,59,.24);border-radius:18px;background:rgba(255,255,255,.66);box-shadow:0 15px 40px rgba(25,54,77,.07)}
.gateway-brand img{filter:drop-shadow(0 5px 10px rgba(25,54,77,.1))}
.gateway-copy h1{color:var(--ink)}
.gateway-copy h1 strong{color:#267d8e!important}
.main-search{border-color:rgba(25,54,77,.13)!important;box-shadow:0 22px 60px rgba(25,54,77,.09)!important}
.main-search button{background:var(--ink)!important}
.project-card{background:rgba(255,255,255,.82)!important;border-color:rgba(25,54,77,.11)!important;box-shadow:0 16px 45px rgba(25,54,77,.07)!important}
.project-card.featured{background:linear-gradient(145deg,#fffdf8,#eef5f3)!important;color:var(--ink)!important;border:1px solid rgba(181,138,59,.4)!important}
.project-card p,.featured p{color:#667c89!important}
.project-card .project-cover,.project-card.featured .project-cover{background:linear-gradient(135deg,#e9f0ef,#f5efe2)!important;border-color:rgba(181,138,59,.24)!important}
.project-card .project-cover span{color:rgba(25,54,77,.14)!important}
.project-card .project-cover i{background:var(--gold)!important}
.project-card.featured .project-meta span,.project-card.featured .status{color:#287d8b!important;background:#e4f2f1!important}
.project-card>a,.project-card.featured>a{color:#267d8e!important}
.portal-model,.statement{background:linear-gradient(135deg,#23485b,#315f6b)!important}
.side-menu{width:208px!important;background:linear-gradient(180deg,#f7f4eb 0%,#edf3f2 58%,#e8efee 100%)!important;background-image:linear-gradient(180deg,rgba(255,255,255,.52),rgba(232,239,238,.72)),url("../images/pattern04.png")!important;background-size:auto,280px!important;border-left:0!important;border-right:1px solid rgba(181,138,59,.34)!important;box-shadow:8px 0 30px rgba(25,54,77,.08)!important;color:var(--ink)!important}
.side-menu .side-brand{padding:24px 18px 20px!important;border-bottom:1px solid rgba(181,138,59,.25)!important}
.side-menu .side-brand>a{display:grid;place-items:center;width:54px;height:54px;border-radius:16px;background:rgba(255,255,255,.7);border:1px solid rgba(181,138,59,.24);box-shadow:0 8px 22px rgba(25,54,77,.08);transition:transform .25s ease,box-shadow .25s ease}
.side-menu .side-brand>a:hover{transform:translateY(-3px) rotate(-2deg);box-shadow:0 12px 28px rgba(25,54,77,.13)}
.side-menu .side-brand img{width:44px!important;height:44px!important}
.side-menu .side-brand strong{color:var(--ink)!important}
.side-menu .side-brand small{color:#9b7532!important}
.side-menu .side-caption{color:#9b7532!important;padding:20px 18px 8px!important}
.side-menu nav{padding:5px 10px 18px!important;gap:6px!important}
.side-menu nav a{color:#466072!important;border-right:0!important;border-left:3px solid transparent;border-radius:12px!important;padding:13px 12px!important;box-shadow:none!important;position:relative;overflow:hidden}
.side-menu nav a span{background:rgba(255,255,255,.7);border-color:rgba(181,138,59,.28)!important;color:#9b7532!important}
.side-menu nav a:hover{background:rgba(255,255,255,.72)!important;color:var(--ink)!important;border-left-color:var(--gold)!important;transform:translateX(-4px)!important;box-shadow:0 8px 22px rgba(25,54,77,.08)!important}
.side-menu nav a.active{background:linear-gradient(90deg,rgba(181,138,59,.16),rgba(255,255,255,.62))!important;color:var(--ink)!important;border-left-color:var(--gold)!important;transform:translateX(-4px)!important;box-shadow:0 8px 22px rgba(25,54,77,.07)!important}
.side-menu .side-bottom{border-top-color:rgba(181,138,59,.2)!important;color:#71838d!important;padding:18px 18px 22px!important}
.side-menu .side-bottom b{color:#9b7532!important}
.side-menu:after{background:linear-gradient(transparent,#b58a3b,transparent)!important;left:auto!important;right:7px!important;opacity:.35!important}
.project-internal .site-header,.project-internal .page-shell{margin-right:208px!important}
.project-internal footer{margin-right:208px!important}
.mobile-menu{background:rgba(247,244,235,.94)!important;border-color:rgba(181,138,59,.3)!important;box-shadow:0 8px 30px rgba(25,54,77,.13)!important;backdrop-filter:blur(16px)}
.mobile-menu>a{color:#486372!important}
.mobile-logo{background:linear-gradient(145deg,#f7f4eb,#e7efed)!important;border-color:rgba(181,138,59,.42)!important}
.mobile-logo img{filter:drop-shadow(0 4px 8px rgba(25,54,77,.1))}
@media(max-width:900px){.side-menu{width:min(88vw,310px)!important}.project-internal .site-header,.project-internal .page-shell,.project-internal footer{margin-right:0!important}}
`;document.head.appendChild(style);document.querySelectorAll("a[href^='#']").forEach(a=>a.addEventListener("click",()=>document.body.classList.remove("menu-open")));});