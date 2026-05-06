import LoreCardPlaceholder from "@/components/LoreCardPlaceholder";
import { getLoreCards } from "@/lib/data";

export default async function Home() {
  const cards = await getLoreCards();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">The World of Aethelgard</h1>
        <p className="text-neutral-400">Explore the lore, locations, and characters of this expanding universe.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">Recent Lore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <LoreCardPlaceholder
              key={card.id}
              title={card.title}
              content={card.content}
              categoryName={card.category.name}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
