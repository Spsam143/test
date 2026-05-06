import prisma from './prisma';

export async function getLoreCards() {
  try {
    const cards = await prisma.loreCard.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return cards;
  } catch (error) {
    console.error('Error fetching lore cards:', error);
    throw new Error('Failed to fetch lore cards.');
  }
}
