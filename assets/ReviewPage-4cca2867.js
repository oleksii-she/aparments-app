import{G as ge,H as T,r as z,d as u,I as M,J as He,K as Ge,L as We,n as Re,w as me,N as Ne,F as te,O as j,_ as he,o as v,c as w,y as se,Q as Fe,a as o,R as qe,p as $e,k as Ee,D as je,l as Ve,u as Je,m as Be,b as Ke,e as Le,t as x,f as U,z as N,U as Qe,g as L,h as D,q as H,s as V,i as Ze,v as et,S as tt,M as De,A as Pe,T as nt}from"./index-5ed2b513.js";/**
 * Vue 3 Carousel 0.3.1
 * (c) 2023
 * @license MIT
 */const h={itemsToShow:1,itemsToScroll:1,modelValue:0,transition:300,autoplay:0,snapAlign:"center",wrapAround:!1,throttle:16,pauseAutoplayOnHover:!1,mouseDrag:!0,touchDrag:!0,dir:"ltr",breakpoints:void 0,i18n:{ariaNextSlide:"Navigate to next slide",ariaPreviousSlide:"Navigate to previous slide",ariaNavigateToSlide:"Navigate to slide {slideNumber}",ariaGallery:"Gallery",itemXofY:"Item {currentSlide} of {slidesCount}",iconArrowUp:"Arrow pointing upwards",iconArrowDown:"Arrow pointing downwards",iconArrowRight:"Arrow pointing to the right",iconArrowLeft:"Arrow pointing to the left"}},Oe={itemsToShow:{default:h.itemsToShow,type:Number},itemsToScroll:{default:h.itemsToScroll,type:Number},wrapAround:{default:h.wrapAround,type:Boolean},throttle:{default:h.throttle,type:Number},snapAlign:{default:h.snapAlign,validator(e){return["start","end","center","center-even","center-odd"].includes(e)}},transition:{default:h.transition,type:Number},breakpoints:{default:h.breakpoints,type:Object},autoplay:{default:h.autoplay,type:Number},pauseAutoplayOnHover:{default:h.pauseAutoplayOnHover,type:Boolean},modelValue:{default:void 0,type:Number},mouseDrag:{default:h.mouseDrag,type:Boolean},touchDrag:{default:h.touchDrag,type:Boolean},dir:{default:h.dir,validator(e){return["rtl","ltr"].includes(e)}},i18n:{default:h.i18n,type:Object},settings:{default(){return{}},type:Object}};function ot({config:e,slidesCount:n}){const{snapAlign:t,wrapAround:r,itemsToShow:i=1}=e;if(r)return Math.max(n-1,0);let l;switch(t){case"start":l=n-i;break;case"end":l=n-1;break;case"center":case"center-odd":l=n-Math.ceil((i-.5)/2);break;case"center-even":l=n-Math.ceil(i/2);break;default:l=0;break}return Math.max(l,0)}function st({config:e,slidesCount:n}){const{wrapAround:t,snapAlign:r,itemsToShow:i=1}=e;let l=0;if(t||i>n)return l;switch(r){case"start":l=0;break;case"end":l=i-1;break;case"center":case"center-odd":l=Math.floor((i-1)/2);break;case"center-even":l=Math.floor((i-2)/2);break;default:l=0;break}return l}function ve({val:e,max:n,min:t}){return n<t?e:Math.min(Math.max(e,t),n)}function at({config:e,currentSlide:n,slidesCount:t}){const{snapAlign:r,wrapAround:i,itemsToShow:l=1}=e;let f=n;switch(r){case"center":case"center-odd":f-=(l-1)/2;break;case"center-even":f-=(l-2)/2;break;case"end":f-=l-1;break}return i?f:ve({val:f,max:t-l,min:0})}function Ue(e){return e?e.reduce((n,t)=>{var r;return t.type===te?[...n,...Ue(t.children)]:((r=t.type)===null||r===void 0?void 0:r.name)==="CarouselSlide"?[...n,t]:n},[]):[]}function _e({val:e,max:n,min:t=0}){return e>n?_e({val:e-(n+1),max:n,min:t}):e<t?_e({val:e+(n+1),max:n,min:t}):e}function it(e,n){let t;return n?function(...r){const i=this;t||(e.apply(i,r),t=!0,setTimeout(()=>t=!1,n))}:e}function lt(e,n){let t;return function(...r){t&&clearTimeout(t),t=setTimeout(()=>{e(...r),t=null},n)}}function rt(e="",n={}){return Object.entries(n).reduce((t,[r,i])=>t.replace(`{${r}}`,String(i)),e)}var ct=ge({name:"ARIA",setup(){const e=T("config",z(Object.assign({},h))),n=T("currentSlide",u(0)),t=T("slidesCount",u(0));return()=>M("div",{class:["carousel__liveregion","carousel__sr-only"],"aria-live":"polite","aria-atomic":"true"},rt(e.i18n.itemXofY,{currentSlide:n.value+1,slidesCount:t.value}))}}),ut=ge({name:"Carousel",props:Oe,setup(e,{slots:n,emit:t,expose:r}){var i;const l=u(null),f=u([]),c=u(0),_=u(0),a=z(Object.assign({},h));let p=Object.assign({},h),S;const d=u((i=e.modelValue)!==null&&i!==void 0?i:0),I=u(0),G=u(0),R=u(0),$=u(0);let B,q;j("config",a),j("slidesCount",_),j("currentSlide",d),j("maxSlide",R),j("minSlide",$),j("slideWidth",c);function J(){S=Object.assign({},e.breakpoints),p=Object.assign(Object.assign(Object.assign({},p),e),{i18n:Object.assign(Object.assign({},p.i18n),e.i18n),breakpoints:void 0}),ne(p)}function W(){if(!S||!Object.keys(S).length)return;const s=Object.keys(S).map(g=>Number(g)).sort((g,E)=>+E-+g);let b=Object.assign({},p);s.some(g=>{const E=window.matchMedia(`(min-width: ${g}px)`).matches;return E&&(b=Object.assign(Object.assign({},b),S[g])),E}),ne(b)}function ne(s){Object.entries(s).forEach(([b,g])=>a[b]=g)}const K=lt(()=>{W(),P()},16);function P(){if(!l.value)return;const s=l.value.getBoundingClientRect();c.value=s.width/a.itemsToShow}function Q(){_.value<=0||(G.value=Math.ceil((_.value-1)/2),R.value=ot({config:a,slidesCount:_.value}),$.value=st({config:a,slidesCount:_.value}),a.wrapAround||(d.value=ve({val:d.value,max:R.value,min:$.value})))}He(()=>{Ge(()=>P()),setTimeout(()=>P(),1e3),W(),xe(),window.addEventListener("resize",K,{passive:!0}),t("init")}),We(()=>{q&&clearTimeout(q),B&&clearInterval(B),window.removeEventListener("resize",K,{passive:!0})});let k=!1;const F={x:0,y:0},A={x:0,y:0},m=z({x:0,y:0}),C=u(!1),Z=u(!1),y=()=>{C.value=!0},ye=()=>{C.value=!1};function we(s){["INPUT","TEXTAREA","SELECT"].includes(s.target.tagName)||(k=s.type==="touchstart",k||s.preventDefault(),!(!k&&s.button!==0||X.value)&&(F.x=k?s.touches[0].clientX:s.clientX,F.y=k?s.touches[0].clientY:s.clientY,document.addEventListener(k?"touchmove":"mousemove",be,!0),document.addEventListener(k?"touchend":"mouseup",Se,!0)))}const be=it(s=>{Z.value=!0,A.x=k?s.touches[0].clientX:s.clientX,A.y=k?s.touches[0].clientY:s.clientY;const b=A.x-F.x,g=A.y-F.y;m.y=g,m.x=b},a.throttle);function Se(){const s=a.dir==="rtl"?-1:1,b=Math.sign(m.x)*.4,g=Math.round(m.x/c.value+b)*s;if(g&&!k){const E=re=>{re.stopPropagation(),window.removeEventListener("click",E,!0)};window.addEventListener("click",E,!0)}Y(d.value-g),m.x=0,m.y=0,Z.value=!1,document.removeEventListener(k?"touchmove":"mousemove",be,!0),document.removeEventListener(k?"touchend":"mouseup",Se,!0)}function xe(){!a.autoplay||a.autoplay<=0||(B=setInterval(()=>{a.pauseAutoplayOnHover&&C.value||oe()},a.autoplay))}function ke(){B&&(clearInterval(B),B=null),xe()}const X=u(!1);function Y(s){const b=a.wrapAround?s:ve({val:s,max:R.value,min:$.value});d.value===b||X.value||(t("slide-start",{slidingToIndex:s,currentSlideIndex:d.value,prevSlideIndex:I.value,slidesCount:_.value}),X.value=!0,I.value=d.value,d.value=b,q=setTimeout(()=>{if(a.wrapAround){const g=_e({val:b,max:R.value,min:0});g!==d.value&&(d.value=g,t("loop",{currentSlideIndex:d.value,slidingToIndex:s}))}t("update:modelValue",d.value),t("slide-end",{currentSlideIndex:d.value,prevSlideIndex:I.value,slidesCount:_.value}),X.value=!1,ke()},a.transition))}function oe(){Y(d.value+a.itemsToScroll)}function ae(){Y(d.value-a.itemsToScroll)}const Ae={slideTo:Y,next:oe,prev:ae};j("nav",Ae),j("isSliding",X);const Ce=Re(()=>at({config:a,currentSlide:d.value,slidesCount:_.value}));j("slidesToScroll",Ce);const Ye=Re(()=>{const s=a.dir==="rtl"?-1:1,b=Ce.value*c.value*s;return{transform:`translateX(${m.x-b}px)`,transition:`${X.value?a.transition:0}ms`,margin:a.wrapAround?`0 -${_.value*c.value}px`:"",width:"100%"}});function Te(){J(),W(),Q(),P(),ke()}Object.keys(Oe).forEach(s=>{["modelValue"].includes(s)||me(()=>e[s],Te)}),me(()=>e.modelValue,s=>{s!==d.value&&Y(Number(s))}),me(_,Q),t("before-init"),J();const Me={config:a,slidesCount:_,slideWidth:c,next:oe,prev:ae,slideTo:Y,currentSlide:d,maxSlide:R,minSlide:$,middleSlide:G};r({updateBreakpointsConfigs:W,updateSlidesData:Q,updateSlideWidth:P,initDefaultConfigs:J,restartCarousel:Te,slideTo:Y,next:oe,prev:ae,nav:Ae,data:Me});const ie=n.default||n.slides,le=n.addons,Ie=z(Me);return()=>{const s=Ue(ie==null?void 0:ie(Ie)),b=(le==null?void 0:le(Ie))||[];s.forEach((ce,ue)=>ce.props.index=ue);let g=s;if(a.wrapAround){const ce=s.map((de,ee)=>Ne(de,{index:-s.length+ee,isClone:!0,key:`clone-before-${ee}`})),ue=s.map((de,ee)=>Ne(de,{index:s.length+ee,isClone:!0,key:`clone-after-${ee}`}));g=[...ce,...s,...ue]}f.value=s,_.value=Math.max(s.length,1);const E=M("ol",{class:"carousel__track",style:Ye.value,onMousedownCapture:a.mouseDrag?we:null,onTouchstartPassiveCapture:a.touchDrag?we:null},g),re=M("div",{class:"carousel__viewport"},E);return M("section",{ref:l,class:{carousel:!0,"is-sliding":X.value,"is-dragging":Z.value,"is-hover":C.value,"carousel--rtl":a.dir==="rtl"},dir:a.dir,"aria-label":a.i18n.ariaGallery,tabindex:"0",onMouseenter:y,onMouseleave:ye},[re,b,M(ct)])}}}),pe;(function(e){e.arrowUp="arrowUp",e.arrowDown="arrowDown",e.arrowRight="arrowRight",e.arrowLeft="arrowLeft"})(pe||(pe={}));const dt={arrowUp:"M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z",arrowDown:"M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",arrowRight:"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z",arrowLeft:"M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"};function mt(e){return e in pe}const fe=e=>{const n=T("config",z(Object.assign({},h))),t=String(e.name),r=`icon${t.charAt(0).toUpperCase()+t.slice(1)}`;if(!t||typeof t!="string"||!mt(t))return;const i=dt[t],l=M("path",{d:i}),f=n.i18n[r]||e.title||t,c=M("title",f);return M("svg",{class:"carousel__icon",viewBox:"0 0 24 24",role:"img","aria-label":f},[c,l])};fe.props={name:String,title:String};const vt=(e,{slots:n,attrs:t})=>{const{next:r,prev:i}=n||{},l=T("config",z(Object.assign({},h))),f=T("maxSlide",u(1)),c=T("minSlide",u(1)),_=T("currentSlide",u(1)),a=T("nav",{}),{dir:p,wrapAround:S,i18n:d}=l,I=p==="rtl",G=M("button",{type:"button",class:["carousel__prev",!S&&_.value<=c.value&&"carousel__prev--disabled",t==null?void 0:t.class],"aria-label":d.ariaPreviousSlide,onClick:a.prev},(i==null?void 0:i())||M(fe,{name:I?"arrowRight":"arrowLeft"})),R=M("button",{type:"button",class:["carousel__next",!S&&_.value>=f.value&&"carousel__next--disabled",t==null?void 0:t.class],"aria-label":d.ariaNextSlide,onClick:a.next},(r==null?void 0:r())||M(fe,{name:I?"arrowLeft":"arrowRight"}));return[G,R]};var _t=ge({name:"CarouselSlide",props:{index:{type:Number,default:1},isClone:{type:Boolean,default:!1}},setup(e,{slots:n}){const t=T("config",z(Object.assign({},h))),r=T("currentSlide",u(0)),i=T("slidesToScroll",u(0)),l=T("isSliding",u(!1)),f=()=>e.index===r.value,c=()=>e.index===r.value-1,_=()=>e.index===r.value+1,a=()=>{const p=Math.floor(i.value),S=Math.ceil(i.value+t.itemsToShow-1);return e.index>=p&&e.index<=S};return()=>{var p;return M("li",{style:{width:`${100/t.itemsToShow}%`},class:{carousel__slide:!0,"carousel__slide--clone":e.isClone,"carousel__slide--visible":a(),"carousel__slide--active":f(),"carousel__slide--prev":c(),"carousel__slide--next":_(),"carousel__slide--sliding":l.value},"aria-hidden":!a()},(p=n.default)===null||p===void 0?void 0:p.call(n))}}});const ze=e=>($e("data-v-2b3868e5"),e=e(),Ee(),e),Xe=je+"#icon-star",pt={class:"star-rating"},ft=["onClick","onMouseover"],gt=ze(()=>o("use",{"xlink:href":Xe},null,-1)),ht=[gt],yt={class:"star-rating__colored"},wt=ze(()=>o("use",{"xlink:href":Xe},null,-1)),bt=[wt],St={__name:"AddRating",props:{isVote:Boolean,id:String,starLimit:{type:Number,default:5}},emits:["update:isVote"],setup(e,{emit:n}){const t=e,r=u(0),i=u(0),l=async c=>{r.value=c;const _=await qe(t.id,c);n("update:isVote",!0),console.log(_)},f=c=>{console.log(c),i.value=c};return(c,_)=>(v(),w("div",pt,[(v(!0),w(te,null,se(e.starLimit,a=>(v(),w("svg",{class:Fe(["icon",{"active-rating":a<=i.value}]),key:a,onClick:p=>l(a),onMouseover:p=>f(a)},ht,42,ft))),128)),o("div",yt,[(v(!0),w(te,null,se(r.value,a=>(v(),w("svg",{class:"icon active-rating",key:a},bt))),128))])]))}},xt=he(St,[["__scopeId","data-v-2b3868e5"]]);const O=e=>($e("data-v-8bddf8f8"),e=e(),Ee(),e),kt=je+"#icon-user",At={class:"review-wrapper"},Ct={class:"review-box"},Tt={class:"heading"},Mt={class:"heading__title"},It=["src","alt"],Rt={class:"price"},Nt={class:"price__list"},Lt={class:"price__item"},Dt={class:"price__text"},Ot=O(()=>o("span",null,"Address",-1)),$t={class:"price__item"},Et={class:"price__text"},jt=O(()=>o("span",null,"Price per night",-1)),Vt={class:"price__item"},Bt={class:"price__text"},Pt=O(()=>o("span",null,"Price from 3 nights",-1)),Ut={class:"price__description"},zt={class:"button-box"},Xt={class:"info-wrapper"},Yt={class:"info-user"},Ht=O(()=>o("h2",{class:"info-user__title"},"Information about the owner:",-1)),Gt={class:"user-text"},Wt={class:"user-text"},Ft={class:"user-text"},qt={class:"country-list"},Jt={class:"country-list__item"},Kt={class:"country-list__title"},Qt={class:"country-list__item"},Zt={class:"country-list__span"},en=O(()=>o("h2",{style:{marginBottom:"20px",marginTop:"20px"}},"Reviews",-1)),tn={class:"reviews"},nn=O(()=>o("h2",{class:"reviews__title"},"BAD RATING",-1)),on={key:0},sn=O(()=>o("h3",null,"Leave a rating",-1)),an={key:0},ln={key:0,class:"comments-wrapper"},rn={key:0,class:"comments-box"},cn={class:"avatar-box"},un=O(()=>o("div",{class:"avatar-circle"},[o("svg",{class:"avatar-circle__svg"},[o("use",{"xlink:href":kt})])],-1)),dn={class:"comment"},mn={key:0,class:"comment__text"},vn={key:1,class:"comment__text"},_n=["onClick"],pn=["onSubmit"],fn=O(()=>o("h2",null,"Write a review",-1)),gn={class:"remove"},hn=O(()=>o("h2",null,"Are you sure you want to delete?",-1)),yn={class:"remove-btn-wrapper"},wn={__name:"apartmentsMainInfo",props:{apartment:{type:Object,required:!0},someLocalProperty:{type:Number,default:2}},setup(e){const n=e,t=Pe({position:"top"}),{addCommentPost:r,comments:i,fetchCommentDelleteId:l,fetchApartmentsDelleteId:f}=Ve(),{id:c,isAuth:_,email:a}=Je(),p=z({comment:""}),S=u(!1),d=u(!1),I=u(!1),G=u(!1),R=u(!1),$=u(!1);Be(()=>{c!==n.apartment.owner&&n.apartment.ratings.find(m=>m.user===c)&&($.value=!0)});const B=Ke(),q=async()=>{try{if(p.comment.trim()==="")return console.log("додайте коментар");if(p.comment.length<5)return t.error("The comment should be longer");new FormData().append("comment",p.comment),await r(n.apartment._id,p),p.comment="",K()}catch(A){console.log(A.message)}},J=async A=>{try{const m=i.findIndex(C=>C._id===A);m!==-1&&i.splice(m,1),await l(A)}catch(m){console.log(m.message)}},W=()=>{S.value=!S.value},ne=()=>{d.value=!d.value},K=()=>{d.value=!d.value},P=()=>{I.value=!I.value},Q=async A=>{try{R.value=!0,await f(A),R.value=!1,B.push({name:"home"})}catch(m){console.log(m.message)}},k=[...n.apartment.images,n.apartment.coverImage],F=Math.round(n.apartment.rating);return(A,m)=>{const C=Le("UButton"),Z=Le("ULoader");return v(),w("div",At,[o("div",Ct,[o("div",Tt,[o("h2",Mt,x(e.apartment.name),1),U(Qe,{rating:N(F)},null,8,["rating"])]),U(N(ut),{"items-to-show":1,class:"carousel"},{addons:L(()=>[U(N(vt))]),default:L(()=>[(v(),w(te,null,se(k,y=>U(N(_t),{key:y},{default:L(()=>[o("img",{src:y,alt:e.apartment.name,class:"img"},null,8,It)]),_:2},1024)),64))]),_:1}),o("div",Rt,[o("ul",Nt,[o("li",Lt,[o("p",Dt,[Ot,D(" "+x(e.apartment.address),1)])]),o("li",$t,[o("p",Et,[jt,D(" "+x(e.apartment.price)+"$",1)])]),o("li",Vt,[o("p",Bt,[Pt,D(" "+x(e.apartment.longStayPrice)+"$ ",1)])])]),o("p",Ut,x(e.apartment.description),1)]),o("div",zt,[N(c)!==e.apartment.owner?(v(),H(C,{key:0,class:"button-box__button"},{default:L(()=>[D("Reserve")]),_:1})):(v(),H(C,{key:1,class:"button-box__button",onClick:m[0]||(m[0]=y=>I.value=!0)},{default:L(()=>[D("Remove")]),_:1}))])]),o("div",Xt,[o("div",Yt,[Ht,o("p",Gt,"Name: "+x(e.apartment.user.user),1),o("p",Wt,"Tel: "+x(e.apartment.user.phone),1),o("p",Ft,"E-mail: "+x(e.apartment.user.email),1)]),o("ul",qt,[o("li",Jt,[o("h3",Kt,"Country: "+x(e.apartment.country),1)]),o("li",Qt,[o("p",null,[D(" Location: "),o("span",Zt,x(e.apartment.location),1)])])]),en,o("div",tn,[o("p",null,x(N(i).length)+" Reviews",1),nn,N(c)!==e.apartment.owner&&N(a)!==e.apartment.user.email&&N(_)?(v(),w("div",on,[sn,$.value?(v(),w("h5",an,"Thank you for voting")):(v(),H(xt,{key:1,id:e.apartment._id,"onUpdate:isVote":m[1]||(m[1]=y=>$.value=y)},null,8,["id"]))])):V("",!0)]),!N(i).length!==0?(v(),w("div",ln,[(v(!0),w(te,null,se(N(i),y=>(v(),w("div",{key:y._id,class:"comments"},[y.comment.length>1?(v(),w("div",rn,[o("div",cn,[un,o("p",null,x(y.user.name),1)]),o("div",dn,[S.value?(v(),w("p",vn,x(y.comment),1)):(v(),w("p",mn,x(y.comment.slice(0,70)+"..."),1)),y.comment.length>70?(v(),w("button",{key:2,onClick:W},x(S.value?"cкоротити":"Читати далі"),1)):V("",!0),G.value?V("",!0):(v(),w("button",{key:3,onClick:ye=>J(y._id)},"Remove",8,_n))])])):V("",!0)]))),128))])):V("",!0),N(_)?(v(),H(C,{key:1,onClick:ne,class:"button__add-response"},{default:L(()=>[D("Leave a comment")]),_:1})):V("",!0),d.value?(v(),H(De,{key:2,toggleModal:d.value,hideDialog:K},{default:L(()=>[o("form",{onSubmit:Ze(q,["prevent","stop"]),class:"form-response"},[fn,et(o("textarea",{class:"form-response__text","onUpdate:modelValue":m[2]||(m[2]=y=>p.comment=y)},null,512),[[tt,p.comment]]),U(C,{type:"submit"},{default:L(()=>[D("Send")]),_:1})],40,pn)]),_:1},8,["toggleModal"])):V("",!0),I.value?(v(),H(De,{key:3,toggleModal:I.value,hideDialog:P},{default:L(()=>[o("div",gn,[hn,o("div",yn,[U(C,{onClick:m[3]||(m[3]=y=>Q(e.apartment._id))},{default:L(()=>[D("Yes")]),_:1}),U(C,{onClick:P},{default:L(()=>[D("No")]),_:1})])]),U(Z,{loading:R.value},null,8,["loading"])]),_:1},8,["toggleModal"])):V("",!0)])])}}},bn=he(wn,[["__scopeId","data-v-8bddf8f8"]]);const Sn={class:"container"},xn={__name:"ReviewPage",setup(e){const n=nt(),t=Ve(),{id:r}=n.params,i=Pe({position:"top"}),l=u(null),f=u(null);return Be(async()=>{try{const c=await t.fetchApartmentsId(r);l.value=c.result,f.value=c.comments}catch(c){i.error(c.message)}}),(c,_)=>(v(),w("main",null,[o("section",null,[o("div",Sn,[l.value?(v(),H(bn,{key:0,apartment:l.value},null,8,["apartment"])):V("",!0)])])]))}},An=he(xn,[["__scopeId","data-v-fbd3a13e"]]);export{An as default};
