import{S as le,C as ie}from"./containerAuth-78ccb1a0.js";import{_ as ce,u as re,r as O,n as ue,b as de,d as w,q as pe,s as T,e as F,o as r,c as u,f as d,a as t,v as H,g,P as _e,M as me,x as f,y as ge,z as ve,F as S,B as R,t as he,m as W,h as fe,i as ye,C as be,D as Ve,p as ke,k as Ie,A as we,l as N}from"./index-6d82c551.js";let P;const Ue=new Uint8Array(16);function Ce(){if(!P&&(P=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!P))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return P(Ue)}const i=[];for(let s=0;s<256;++s)i.push((s+256).toString(16).slice(1));function xe(s,n=0){return(i[s[n+0]]+i[s[n+1]]+i[s[n+2]]+i[s[n+3]]+"-"+i[s[n+4]]+i[s[n+5]]+"-"+i[s[n+6]]+i[s[n+7]]+"-"+i[s[n+8]]+i[s[n+9]]+"-"+i[s[n+10]]+i[s[n+11]]+i[s[n+12]]+i[s[n+13]]+i[s[n+14]]+i[s[n+15]]).toLowerCase()}const Se=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),q={randomUUID:Se};function Pe(s,n,e){if(q.randomUUID&&!n&&!s)return q.randomUUID();s=s||{};const h=s.random||(s.rng||Ce)();if(h[6]=h[6]&15|64,h[8]=h[8]&63|128,n){e=e||0;for(let y=0;y<16;++y)n[e+y]=h[y];return n}return xe(h)}const c=s=>(ke("data-v-22b9fb24"),s=s(),Ie(),s),z=N+"#icon-cancel-circle",Y=N+"#icon-create__img",De=N+"#icon-camera",Le=["onSubmit"],Ae=c(()=>t("h2",{class:"title__form-create"},"Створити оголошення",-1)),Be={class:"top__wrapper"},Fe=c(()=>t("p",{class:"title-input"},"Назва оголошення",-1)),Re=c(()=>t("p",{class:"title-input"},"Country",-1)),Ne={key:0,class:"countries-list"},Me=["onClick"],Ee={class:"countries-list__text"},$e=c(()=>t("p",{class:"title-input"},"Місто",-1)),je={class:"average__wrapper"},Oe={class:"main__photo"},Te=c(()=>t("h3",{style:{marginBottom:"7px"}},"Головне фото",-1)),He={for:"",class:"cover-img__wrapper"},We=c(()=>t("svg",{class:"clear-img__icon"},[t("use",{"xlink:href":z})],-1)),qe=[We],ze={class:"img__box"},Ye=["src"],Ge={key:1,class:"icon"},Je=c(()=>t("use",{"xlink:href":Y},null,-1)),Ke=[Je],Qe={class:"input-block__right"},Xe={class:"input-wrapper"},Ze=c(()=>t("p",{class:"title-input"},"Кількість кімнат",-1)),et=c(()=>t("p",{class:"title-input"},"Адреса",-1)),tt={class:"price"},st=c(()=>t("p",{class:"title-input"},"ціна за ніч",-1)),ot={class:"price__wrapper"},at=c(()=>t("h2",{class:"price__title"},"$",-1)),nt={class:"price"},lt=c(()=>t("p",{class:"title-input"},"ціна від трьох ночей",-1)),it={class:"price__wrapper"},ct=c(()=>t("h2",{class:"price__title"},"$",-1)),rt=c(()=>t("p",{class:"title-input"},"Опишіть апартаменти",-1)),ut=be('<div data-v-22b9fb24><p class="title-input" data-v-22b9fb24>Клас апартаментів</p><select name="select" class="select" data-v-22b9fb24><option value="Economy" data-v-22b9fb24>Economy</option><option value="Comfort" selected data-v-22b9fb24>Comfort</option><option value="Business" data-v-22b9fb24>Business</option><option value="Premium" data-v-22b9fb24>Premium</option><option value="Lux" data-v-22b9fb24>Lux</option></select></div>',1),dt={class:"bottom-wrapper"},pt={key:0,for:"",class:"img__file-wrapper"},_t={key:0,class:"icon"},mt=c(()=>t("use",{"xlink:href":Y},null,-1)),gt=[mt],vt=c(()=>t("svg",{class:""},[t("use",{"xlink:href":De})],-1)),ht=[vt],ft=["src"],yt=["onClick"],bt=c(()=>t("svg",{class:"clear-img__icon"},[t("use",{"xlink:href":z})],-1)),Vt=[bt],kt={__name:"createPost",setup(s){const n=re(),e=O({name:"",location:"",country:"",address:"",rooms:1,price:40,longStayPrice:30,description:"",images:[],coverImage:"",apartmentClass:""}),h=ue(),y=de(),D=we({position:"top"}),L=w(!1),V=w(null),U=w(!0),M=w(null),b=w(!1);pe(()=>{n.phone==="+380000000000"?b.value=!0:b.value=!1});const G=async()=>{try{const l=await Ve(e.country);!l||l===null?(U.value=!1,V.value=""):(U.value=!0,V.value=l)}catch(l){console.log(l.message)}},J=l=>{U.value=!1,e.country=l,V.value=null},E=["../assets/svg/sprite.svg#icon-cancel-circle","@/assets/svg/sprite.svg#icon-create__img","@/assets/svg/sprite.svg#icon-create__img","@/assets/svg/sprite.svg#icon-create__img","@/assets/svg/sprite.svg#icon-create__img"],A=O([...E]),K=T(()=>e.coverImage?URL.createObjectURL(e.coverImage):null),Q=T(()=>e.images?e.images.map(l=>{if(!(e.images.length>6))return{id:l.id,path:URL.createObjectURL(l.file),name:l.name}}):null),X=l=>{const o=l.target.files[0];o&&(e.coverImage=o)},Z=l=>{const o=l.target.files[0];new FormData().append("image",o),!(!o||e.images.length>5)&&o&&(A.splice(0,1),e.images.push({id:Pe(),file:o}))},ee=()=>{e.coverImage&&(e.coverImage=null)},te=l=>{e.images=e.images.filter(o=>o.id!==l),e.images.length!==5&&A.push(E[0])},se=()=>{const l=M.value;l&&l.click()},oe=async l=>{const{name:o,location:k,country:_,address:C,rooms:a,price:I,longStayPrice:B,description:$,images:ne,coverImage:j}=e,x=ne.map(v=>v.file),m={coverImage:j,images:x,apartmentClass:l.target.select.value,name:o,location:k,country:_,address:C,rooms:Number(a),price:Number(I),longStayPrice:Number(B),description:$};console.log(m);const p=new FormData;p.append("apartmentClass",m.apartmentClass);for(let v=0;v<x.length;v++)p.append("images",x[v],x[v].name);if(p.append("coverImage",m.coverImage),p.append("name",m.name),p.append("location",m.location),p.append("country",m.country),p.append("address",m.address),p.append("rooms",m.rooms),p.append("price",m.price),p.append("longStayPrice",m.longStayPrice),p.append("description",m.description),!o||!k||!_||!C||!a||!I||!B||!$||!j)return D.warning("Make sure all fields are filled");try{return L.value=!0,await h.addApartmentPost(p),L.value=!1,y.push({name:"apartments"}),D.success("data successfully added")}catch(v){return console.log(v.message),D.error(v.message)}},ae=()=>(y.push({name:"apartments"}),b.value=!b.value);return(l,o)=>{const k=F("ULoader"),_=F("UInput"),C=F("UButton");return r(),u(S,null,[d(k,{loading:L.value},null,8,["loading"]),t("form",{onSubmit:ye(oe,["prevent","stop"]),class:"form__advertisement"},[b.value?(r(),H(me,{key:0,toggleModal:b.value,hideDialog:ae},{default:g(()=>[d(_e)]),_:1},8,["toggleModal"])):f("",!0),Ae,t("div",Be,[d(_,{modelValue:e.name,"onUpdate:modelValue":o[0]||(o[0]=a=>e.name=a),placeholder:"Назва оголошення",class:"uinput"},{default:g(()=>[Fe]),_:1},8,["modelValue"]),t("div",null,[d(_,{modelValue:e.country,"onUpdate:modelValue":o[1]||(o[1]=a=>e.country=a),placeholder:"Country",class:"uinput",onInput:G},{default:g(()=>[Re]),_:1},8,["modelValue"]),V.value!==null?ge((r(),u("ul",Ne,[(r(!0),u(S,null,R(V.value,(a,I)=>(r(),u("li",{key:I,class:"countries-list__item",onClick:B=>J(a.name.common)},[t("p",Ee,he(a.name.common),1)],8,Me))),128))],512)),[[ve,U.value]]):f("",!0)]),d(_,{modelValue:e.location,"onUpdate:modelValue":o[2]||(o[2]=a=>e.location=a),placeholder:"Місто",class:"uinput"},{default:g(()=>[$e]),_:1},8,["modelValue"])]),t("div",je,[t("div",Oe,[Te,t("label",He,[e.coverImage?(r(),u("button",{key:0,class:"clear-img",onClick:ee},qe)):f("",!0),t("div",ze,[e.coverImage?(r(),u("img",{key:0,src:W(K),alt:"",class:"image"},null,8,Ye)):f("",!0)]),e.coverImage?f("",!0):(r(),u("svg",Ge,Ke)),t("input",{type:"file",name:"coverImage",accept:"image/*",class:"input__file__hidden",multiple:"",onChange:X},null,32)])]),t("div",Qe,[t("div",Xe,[d(_,{modelValue:e.rooms,"onUpdate:modelValue":o[3]||(o[3]=a=>e.rooms=a),placeholder:"Кількість кімнат",class:"uinput",type:"number"},{default:g(()=>[Ze]),_:1},8,["modelValue"]),d(_,{modelValue:e.address,"onUpdate:modelValue":o[4]||(o[4]=a=>e.address=a),placeholder:"Адреса",class:"uinput"},{default:g(()=>[et]),_:1},8,["modelValue"]),t("div",tt,[st,t("div",ot,[at,d(_,{modelValue:e.price,"onUpdate:modelValue":o[5]||(o[5]=a=>e.price=a),placeholder:"ціна за ніч",class:"uinput",type:"number"},null,8,["modelValue"])])]),t("div",nt,[lt,t("div",it,[ct,d(_,{modelValue:e.longStayPrice,"onUpdate:modelValue":o[6]||(o[6]=a=>e.longStayPrice=a),placeholder:"ціна від трьох ночей",class:"uinput",type:"number",style:{width:"70px"}},null,8,["modelValue"])])])]),d(_,{modelValue:e.description,"onUpdate:modelValue":o[7]||(o[7]=a=>e.description=a),placeholder:"Опишіть апартаменти",type:"textarea",class:"uinput"},{default:g(()=>[rt]),_:1},8,["modelValue"]),ut])]),t("div",dt,[e.images.length!==6?(r(),u("label",pt,[e.images?(r(),u("svg",_t,gt)):f("",!0),t("input",{type:"file",name:"images",accept:"image/*",class:"input__file__hidden",onChange:Z,ref_key:"input",ref:M},null,544)])):f("",!0),(r(!0),u(S,null,R(A,a=>(r(),u("div",{key:a},[t("div",{class:"img__file-wrapper",onClick:se},ht)]))),128)),(r(!0),u(S,null,R(W(Q),a=>(r(),u("div",{key:a.id,class:"img__box"},[t("img",{src:a.path,alt:"",class:"images"},null,8,ft),t("button",{onClick:I=>te(a.id),class:"clear-img"},Vt,8,yt)]))),128))]),b.value?f("",!0):(r(),H(C,{key:1},{default:g(()=>[fe("Створити оголошення")]),_:1}))],40,Le)],64)}}},It=ce(kt,[["__scopeId","data-v-22b9fb24"]]),Ct={__name:"newPostPage",setup(s){return(n,e)=>(r(),u("main",null,[d(le,null,{default:g(()=>[d(ie,{class:"container"},{default:g(()=>[d(It)]),_:1})]),_:1})]))}};export{Ct as default};
