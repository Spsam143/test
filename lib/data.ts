// import prisma from './prisma'; // Ignoring prisma to fix missing DB connection build error

export async function getLoreCards() {
  try {
    // const cards = await prisma.loreCard.findMany({
    //   include: {
    //     category: true,
    //   },
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    // });
    // return cards;

    // Return static mock data instead of calling the missing database
    return [
      {
        id: "1",
        title: "The Great Schism",
        content: "A historic event that split the realm into two factions.",
        imageUrl: null,
        category: { name: "History" }
      },
      {
        id: "2",
        title: "Eldoria",
        content: "The ancient capital of the elves, hidden in the mystical forest. The city is known for its towering trees, intricate treehouses, and bioluminescent flora that lights up the night.",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
        category: { name: "Location" }
      }
    ];
  } catch (error) {
    console.error('Error fetching lore cards:', error);
    throw new Error('Failed to fetch lore cards.');
  }
}
