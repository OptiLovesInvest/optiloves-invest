import Image from "next/image";

export default function Footer() {
  return (
    <footer className="p-6 bg-[#0b2c36] text-center text-white">
      <div className="flex flex-col items-center space-y-3">
        <Image src="/logo.png" alt="OptiLoves Invest Logo" width={60} height={60} />
        <p className="text-sm tracking-wide">FIGHTING POVERTY WITH LOVE AND INVESTMENT</p>
        <p className="text-xs text-gray-400">© 2025 OptiLoves Invest</p>
      </div>
    </footer>
  );
}

