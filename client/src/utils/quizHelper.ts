type Steak = {
  name: string;
  priorities: {
    flavor: number;
    texture: number;
    cost: number;
  };
  doneness: string[];
};

const steakCuts: Steak[] = [
  {
    name: "Ribeye",
    priorities: {
      flavor: 5,
      texture: 3,
      cost: 2,
    },
    doneness: ["medium-rare", "medium", "medium-well", "well-done"],
  },
  {
    name: "Flat Iron",
    priorities: {
      flavor: 3,
      texture: 3,
      cost: 4,
    },
    doneness: ["medium-rare", "medium", "medium-well", "well-done"],
  },
];

const convertRankToWeight = (rank: number) => 4 - rank;

export function getRecommendedSteaks(input: {
  priorities: {
    flavor: number;
    texture: number;
    cost: number;
  };
  doneness: string;
}): { name: string; score: number }[] {
  const { priorities, doneness } = input;

  const rankValues = Object.values(priorities);
  const uniqueRanks = new Set(rankValues);
  const minRank = Math.min(...rankValues);
  const maxRank = Math.max(...rankValues);

  if (uniqueRanks.size !== 3 || minRank !== 1 || maxRank !== 3) {
    throw new Error("Rankings must be unique values from 1 to 3.");
  }

  const weights = {
    flavor: convertRankToWeight(priorities.flavor),
    texture: convertRankToWeight(priorities.texture),
    cost: convertRankToWeight(priorities.cost),
  };

  const scored = steakCuts
    .filter((steak) =>
      steak.doneness.includes(doneness.toLowerCase())
    )
    .map((steak) => {
      const { flavor, texture, cost } = steak.priorities;
      const score =
        flavor * weights.flavor +
        texture * weights.texture +
        cost * weights.cost;
      return { name: steak.name, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 2);
}
