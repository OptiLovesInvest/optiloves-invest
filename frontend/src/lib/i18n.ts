export type L="en"|"fr"|"lg"|"pt";
const d={en:{props:"Properties",acct:"Account",lang:"Language"},fr:{props:"Propriétés",acct:"Compte",lang:"Langue"},lg:{props:"Ebintu by’ettaka",acct:"Akawunti",lang:"Olulimi"},pt:{props:"Propriedades",acct:"Conta",lang:"Idioma"}};
export const t=(l:L,k:string)=>d[l]?.[k]||k;
export const getLng=()=>{try{const u=new URL(window.location.href);const v=(u.searchParams.get("lng")||"en").toLowerCase();return (["en","fr","lg","pt"].includes(v)?v:"en") as L;}catch{return "en"}};
