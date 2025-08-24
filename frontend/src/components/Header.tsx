import LanguageNav from "./LanguageNav";
import Image from "next/image";

export default function Header() {
  return (
    <header className="p-4 bg-white shadow-md flex justify-center">
      <Image src="/logo.png" alt="OptiLoves Invest Logo" width={80} height={80} priority />
      <LanguageNav />
</header>
  );
}

