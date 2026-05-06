import Link from "next/link";
import { User } from "lucide-react";

export default function TopNav() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-zinc-800/50 bg-[#0a0a0a]/80 backdrop-blur-sm z-20">
      <div className="flex items-center space-x-2 text-sm text-zinc-400 font-medium">
        <Link href="/" className="hover:text-zinc-50 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-zinc-50">vvd.world</span>
      </div>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 cursor-pointer hover:bg-zinc-700 transition-colors">
        <User size={16} />
      </div>
    </header>
  );
}
