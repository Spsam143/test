import Link from 'next/link';
import { Home, Book, Clock, Map } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full w-16 md:w-64 bg-[#141414] border-r border-[#2a2a2a] py-6 px-4 shrink-0">
      <div className="flex items-center justify-center md:justify-start mb-8 text-white font-bold text-xl px-2">
        <span className="md:hidden">V</span>
        <span className="hidden md:block">VVD World</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        <NavItem href="/" icon={<Home size={20} />} label="World" />
        <NavItem href="/wiki" icon={<Book size={20} />} label="Wiki" />
        <NavItem href="/timeline" icon={<Clock size={20} />} label="Timeline" />
        <NavItem href="/map" icon={<Map size={20} />} label="Map" />
      </nav>

      <div className="mt-auto">
        {/* Optional footer area for user profile or settings */}
      </div>
    </div>
  );
};

const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-center md:justify-start gap-3 p-3 rounded-lg text-neutral-400 hover:text-white hover:bg-[#252525] transition-colors"
    >
      {icon}
      <span className="hidden md:block text-sm font-medium">{label}</span>
    </Link>
  );
};

export default Sidebar;
