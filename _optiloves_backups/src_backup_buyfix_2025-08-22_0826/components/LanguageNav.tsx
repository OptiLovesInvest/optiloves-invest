"use client";
import {useEffect,useState} from "react"; import {t,getLng,L} from "../lib/i18n";
export default function LanguageNav(){
  const [lng,setLng]=useState<L>("en"); useEffect(()=>setLng(getLng()),[]);
  return(<nav className="mb-4 flex items-center gap-4">
    <img src="/logo.png" className="h-8" alt="logo"/><a href="/">{t(lng,"props")}</a><a href="/account">{t(lng,"acct")}</a>
    <div className="ml-auto flex gap-2"><span>{t(lng,"lang")}:</span>{["en","fr","lg","pt"].map(l=><a key={l} className="underline" href={`/?lng=${l}`}>{l.toUpperCase()}</a>)}</div>
  </nav>);
}
