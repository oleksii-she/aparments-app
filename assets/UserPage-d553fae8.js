import{_ as q,ab as A,b as N,ac as B,d as D,u as E,r as y,q as $,e as L,o,c as i,a as e,t as h,h as x,m as _,y as F,v as b,x as k,f as w,g as R,ad as j,ae as z,j as T,af as G,ag as H,A as J,ah as K,p as M,k as O,l as U}from"./index-7dc6413b.js";const m=u=>(M("data-v-40a0bc68"),u=u(),O(),u),S=U+"#icon-edit",V=U+"#icon-confirm",Q={class:"container user-page"},W={class:"home-page__wrapper"},X={class:"user"},Y={class:"wrapper"},Z={key:0,class:"user__text-wrapper"},ee={class:"user__text"},te=m(()=>e("svg",{class:"btn-edit__icon"},[e("use",{"xlink:href":S})],-1)),se=[te],ae={key:1,class:"user__text-wrapper"},ne={class:"user__text"},oe=["value"],re=m(()=>e("svg",{class:"btn-edit__icon"},[e("use",{"xlink:href":V})],-1)),ce=[re],ie={class:"user__text-wrapper"},_e={class:"user__text"},le={class:"wrapper"},pe={key:0,class:"user__text-wrapper"},ue={key:0,class:"user__text"},de={key:1,class:"user__text"},me=m(()=>e("svg",{class:"btn-edit__icon"},[e("use",{"xlink:href":S})],-1)),he=[me],ge={key:1,class:"user__text-wrapper"},ve={class:"user__text"},fe=["value"],ye=m(()=>e("svg",{class:"btn-edit__icon"},[e("use",{"xlink:href":V})],-1)),xe=[ye],be={__name:"UserPage",setup(u){const g=A(),C=N(),I=9,l=B(),p=D(parseInt(g.query.page)||1),c=E(),P=J({position:"top"}),r=y({name:!1,phone:!1}),n=y({name:"",phone:""});$(()=>{const{id:t}=c;if(C.push({query:{...g.query,page:p.value}}),l.fetchUserApartments(t,p.value),n.name=c.name,c.phone){const s=K(c.phone);n.phone=s}});const v=t=>{if(t.target.name==="name"&&(n.name=t.target.value),t.target.name==="phone"){const s=t.target.value;/^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(s)&&(n.phone=t.target.value)}},f=async()=>{try{const t=T(n.phone),s=n.name,d={phone:t,name:s};await c.fetchUpdateUser(d),r.phone=!1,r.name=!1}catch(t){if(r.phone=!1,r.name=!1,t.request.status===400)return n.phone=c.phone,P.warning(t.request.response);console.log(t.message)}};return(t,s)=>{const d=L("ULoader");return o(),i("main",null,[e("section",null,[e("div",Q,[e("div",W,[e("div",X,[e("div",Y,[r.name?(o(),i("div",ae,[e("label",ne,[x(" і’мя: "),e("input",{class:"user__input-rename",name:"name",value:n.name,onChange:v},null,40,oe)]),e("button",{onClick:f,class:"btn-edit"},ce)])):(o(),i("div",Z,[e("p",ee,"і’мя: "+h(n.name),1),e("button",{onClick:s[0]||(s[0]=a=>r.name=!0),class:"btn-edit"},se)]))]),e("div",ie,[e("p",_e,"E-mail: "+h(_(c).email),1)]),e("div",le,[r.phone?(o(),i("div",ge,[e("label",ve,[x(" Телефон: "),F(e("input",{ref:"phoneInput",class:"user__input-rename",type:"tel",name:"phone",value:n.phone,onChange:v},null,40,fe),[[_(G),{mask:"+38(0##)###-##-##"}]])]),e("button",{onClick:f,class:"btn-edit"},xe)])):(o(),i("div",pe,[n.phone?(o(),i("p",ue,"Телефон: "+h(n.phone),1)):(o(),i("p",de,"Телефон: +38(000)000-00-00")),e("button",{onClick:s[1]||(s[1]=a=>r.phone=!0),class:"btn-edit"},he)]))])]),e("div",null,[_(l).loading?(o(),b(d,{key:0,loading:!0})):k("",!0),w(j,{apartments:_(l).apartments},{apartment:R(a=>[w(H,{id:a.apartment._id,coverImage:a.apartment.coverImage,description:a.apartment.description,price:a.apartment.price,longStayPrice:a.apartment.longStayPrice,country:a.apartment.country,rating:a.apartment.rating},null,8,["id","coverImage","description","price","longStayPrice","country","rating"])]),_:1},8,["apartments"])])]),_(l).totalPosts>9&&!_(l).loading?(o(),b(z,{key:0,class:"paginate",modelValue:p.value,"onUpdate:modelValue":s[2]||(s[2]=a=>p.value=a),perPage:I,rangeSize:1,"active-color":"#DCEDFF","onUpdate:value":s[3]||(s[3]=a=>p.value=a),totalPost:_(l).totalPosts},null,8,["modelValue","totalPost"])):k("",!0)])])])}}},we=q(be,[["__scopeId","data-v-40a0bc68"]]);export{we as default};