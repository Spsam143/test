import LoreCardPlaceholder from "@/components/LoreCardPlaceholder";

export default function Home() {
  const cards = [
    { title: "The High City of Zenith", description: "A sprawling metropolis suspended above the clouds, home to the ruling elite and advanced technomagic." },
    { title: "Verdant Depths", description: "An ancient, seemingly endless forest where the trees are as wide as castles and the flora is fiercely territorial." },
    { title: "Aeronaut's Compass", description: "A mystical artifact said to always point towards the user's true desire, regardless of physical location." },
    { title: "Captain Elara Vance", description: "A renowned sky-pirate turned reluctant hero, known for her unmatched skills with a multi-phase blaster." },
    { title: "The Obsidian Citadel", description: "A fortress carved from a single, massive piece of black stone, emanating a faint, unsettling hum." },
    { title: "Crystal Resonators", description: "Rare gems that, when struck with specific frequencies, can manipulate gravity within a localized area." },
    { title: "The Whispering Wastes", description: "A vast desert where the wind carries the voices of long-forgotten ancestors." },
    { title: "Order of the Eclipse", description: "A secretive faction of scholars dedicated to unlocking the forbidden knowledge of the celestial alignment." },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">The World of Aethelgard</h1>
        <p className="text-neutral-400">Explore the lore, locations, and characters of this expanding universe.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold text-white mb-6 border-b border-[#333] pb-2">Recent Lore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <LoreCardPlaceholder
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
