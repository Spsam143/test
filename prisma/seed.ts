import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create a World
  const world = await prisma.world.create({
    data: {
      name: 'Aethelgard',
      description: 'A world where magic and machinery interweave, suspended in a boundless sky.',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    },
  });

  // 2. Create Categories
  const charactersCat = await prisma.category.create({
    data: { name: 'Characters', description: 'Notable figures of Aethelgard', worldId: world.id },
  });

  const locationsCat = await prisma.category.create({
    data: { name: 'Locations', description: 'Key places and landmarks', worldId: world.id },
  });

  const loreCat = await prisma.category.create({
    data: { name: 'Lore & Artifacts', description: 'Historical events and powerful items', worldId: world.id },
  });

  // 3. Create LoreCards
  const loreCards = [
    {
      title: 'The High City of Zenith',
      content: 'A sprawling metropolis suspended above the clouds, home to the ruling elite and advanced technomagic. It is held aloft by enormous, humming crystal drives.',
      imageUrl: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2665&auto=format&fit=crop',
      categoryId: locationsCat.id,
    },
    {
      title: 'Verdant Depths',
      content: 'An ancient, seemingly endless forest where the trees are as wide as castles and the flora is fiercely territorial. Legends say the roots connect all floating islands.',
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2664&auto=format&fit=crop',
      categoryId: locationsCat.id,
    },
    {
      title: "Aeronaut's Compass",
      content: 'A mystical artifact said to always point towards the user\'s true desire, regardless of physical location. It is crafted from a rare starmetal alloy.',
      imageUrl: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?q=80&w=2630&auto=format&fit=crop',
      categoryId: loreCat.id,
    },
    {
      title: 'Captain Elara Vance',
      content: 'A renowned sky-pirate turned reluctant hero, known for her unmatched skills with a multi-phase blaster and her custom skiff, the *Zephyr\'s Wake*.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop',
      categoryId: charactersCat.id,
    },
    {
      title: 'The Obsidian Citadel',
      content: 'A fortress carved from a single, massive piece of black stone, emanating a faint, unsettling hum. It serves as the prison for the Void-touched.',
      imageUrl: 'https://images.unsplash.com/photo-1505506874110-6a7a6c9924cb?q=80&w=2574&auto=format&fit=crop',
      categoryId: locationsCat.id,
    },
    {
      title: 'Crystal Resonators',
      content: 'Rare gems that, when struck with specific frequencies, can manipulate gravity within a localized area. They are the primary power source for airships.',
      imageUrl: 'https://images.unsplash.com/photo-1515082101037-f0cb0c0345b1?q=80&w=2670&auto=format&fit=crop',
      categoryId: loreCat.id,
    },
    {
      title: 'The Whispering Wastes',
      content: 'A vast desert where the wind carries the voices of long-forgotten ancestors. Travel here without a mind-shield is strictly forbidden.',
      imageUrl: 'https://images.unsplash.com/photo-1473655584511-91bebd12ce2e?q=80&w=2670&auto=format&fit=crop',
      categoryId: locationsCat.id,
    },
    {
      title: 'Order of the Eclipse',
      content: 'A secretive faction of scholars dedicated to unlocking the forbidden knowledge of the celestial alignment, believing it heralds a new age of magic.',
      imageUrl: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=2574&auto=format&fit=crop',
      categoryId: charactersCat.id,
    },
  ];

  for (const card of loreCards) {
    await prisma.loreCard.create({
      data: card,
    });
  }

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
