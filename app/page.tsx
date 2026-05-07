import LoreCard from "@/components/LoreCard";
import { getLoreCards } from "@/lib/data";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default async function Home() {
  const cards = await getLoreCards();

  return (
    <div className="relative w-full overflow-x-clip bg-[#0a0a0a]">
      {/* Background Video Section */}
      <div className="absolute inset-x-0 top-0 h-[80vh] z-0 overflow-hidden">
        <video
           autoPlay
           loop
           muted
           playsInline
           className="w-full h-full object-cover object-top opacity-40"
           src="https://cdn.marketing.vvd.sh/website/hero-bg.mp4"
        />
        <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
      </div>

      <nav className="relative z-50 h-8 mt-4">
        <div className="container mx-auto h-full px-4 lg:px-8">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-4">
              <Link href="/" className="group flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img alt="vvd Logo" width="20" height="20" className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[180deg]" src="https://publicassets.vvd.sh/static/images/vvdglobe.svg" />
                <span className="text-white text-lg font-medium font-['Space_Grotesk']">vvd</span>
              </Link>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/why" className="font-['Arizona'] text-white/80 hover:text-white transition-colors text-xs font-medium">Why</Link>
                <Link href="/pricing" className="font-['Arizona'] text-white/80 hover:text-white transition-colors text-xs font-medium">Pricing</Link>
              </div>
              <div className="relative">
                <button className="font-['Arizona'] flex items-center gap-1 text-white/80 hover:text-white transition-colors text-xs font-medium disabled:opacity-50">
                  EN <ChevronDown className="w-3 h-3 transition-transform" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden sm:flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors text-white/80 hover:text-white hover:bg-white/10 h-8 px-4 text-xs">
                Login
              </button>
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg shadow-sm py-2 font-['Arizona'] bg-white/60 hover:bg-white/70 text-black h-8 px-4 text-xs font-medium transition-all duration-150">
                Start Building
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="relative">
          <section className="min-h-[80vh] flex items-center justify-center px-4 relative pb-20">
            <div className="container mx-auto max-w-4xl">
              <div className="text-center flex flex-col items-center">
                <div className="mb-4">
                  <button className="bg-transparent relative text-xl p-[1px] overflow-hidden group rounded-full">
                    <div className="absolute inset-0 rounded-full border border-white/20"></div>
                    <div className="flex items-center justify-center w-full text-sm antialiased bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all px-2.5 py-1.5 h-auto text-white relative z-10 rounded-full">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-emerald-500 text-white rounded-full">New</span>
                        <span className="text-white/90 text-xs font-medium">Collaboration</span>
                      </div>
                    </div>
                  </button>
                </div>
                <h1 className="font-['Arizona'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white mb-6 tracking-tight drop-shadow-lg">
                  The modern storytelling toolkit
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto drop-shadow-md">
                  Create, organize, and share your worlds with tools that work as smoothly as your imagination.
                </p>
                <div>
                  <button className="inline-flex items-center justify-center whitespace-nowrap shadow-sm h-10 font-['Arizona'] bg-white/90 text-black hover:bg-white px-6 py-2 text-base rounded-lg transition-all duration-150">
                    <span className="font-semibold">Start building </span>
                    <span className="pl-1 font-normal text-black/60">- it&apos;s free</span>
                  </button>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img src="https://ui-avatars.com/api/?name=User+1&background=random" alt="" className="w-6 h-6 rounded-full object-cover border border-[#0a0a0a]" />
                    <img src="https://ui-avatars.com/api/?name=User+2&background=random" alt="" className="w-6 h-6 rounded-full object-cover border border-[#0a0a0a]" />
                    <img src="https://ui-avatars.com/api/?name=User+3&background=random" alt="" className="w-6 h-6 rounded-full object-cover border border-[#0a0a0a]" />
                  </div>
                  <span className="text-white/60 text-xs font-medium">Home to 190K+ storytellers</span>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Existing Dynamic Content Section */}
        <section className="relative py-16 md:py-24 bg-[#0a0a0a]">
          <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-10 text-center md:text-left">
              <h2 className="font-['Arizona'] text-3xl md:text-4xl font-medium text-white mb-2">The World of Aethelgard</h2>
              <p className="text-white/70">Explore the lore, locations, and characters of this expanding universe.</p>
            </header>

            <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-2">Recent Lore Entries</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cards.map((card) => (
                <LoreCard
                  key={card.id}
                  title={card.title}
                  content={card.content}
                  categoryName={card.category.name}
                  imageUrl={card.imageUrl}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
