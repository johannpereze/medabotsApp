interface Skill {
  type: string;
  description?: string;
}

interface Stats {
  armor: number;
  success?: number;
  power?: number;
  uses?: number;
  charge?: number;
  radiation?: number;
  propulsion?: number;
  evasion?: number;
  defense?: number;
  proximity?: number;
  remoteness?: number;
}

interface SpriteCoordinates {
  width: number;
  height: number;
  x: number;
  y: number;
  top: number;
  left: number;
  animation: number;
}

interface Sprite {
  head?: SpriteCoordinates;
  upperArmRight?: SpriteCoordinates;
  lowerArmRight?: SpriteCoordinates;
  upperArmLeft?: SpriteCoordinates;
  lowerArmLeft?: SpriteCoordinates;
  upperLegLeft?: SpriteCoordinates;
  lowerLegLeft?: SpriteCoordinates;
  upperLegRight?: SpriteCoordinates;
  lowerLegRight?: SpriteCoordinates;
  lowerBody?: SpriteCoordinates;
  upperBody?: SpriteCoordinates;
}

interface Medaparts {
  name: string;
  description: string;
  model: string;
  part: "head" | "right arm" | "left arm" | "legs";
  skill: Skill;
  medal: string;
  scope: string;
  gender: string;
  stats: Stats;
  sprite: Sprite;
}

export interface Medabot {
  head: string;
  right: string;
  left: string;
  legs: string;
}

export const metabee: Medabot = {
  head: "missile",
  right: "revolver",
  left: "submachingun",
  legs: "ochitsuka",
};

const medaParts: Medaparts[] = [
  {
    name: "missile",
    description: "(Missile) 100% hit rate and chain reaction damage",
    model: "KBT-1",
    part: "head",
    skill: {
      type: "shoot",
      description: "A normal shooting attack with no penalty afterwards.",
    },
    medal: "shoot",
    scope: "remoteness",
    gender: "male",
    stats: {
      armor: 35,
      success: 24,
      power: 32,
      uses: 4,
    },
    sprite: {
      head: {
        width: 30,
        height: 29,
        x: 590,
        y: 1147,
        top: 0,
        left: 11,
        animation: 1,
      },
      upperBody: {
        width: 16,
        height: 14,
        x: 583,
        y: 1113,
        top: 29,
        left: 11,
        animation: 2,
      },
    },
  },
  {
    name: "revolver",
    description: "(Rifle) A quick CRG/RAD shooting attack.",
    model: "KBT-1",
    part: "right arm",
    skill: {
      type: "shoot",
      description: "A normal shooting attack with no penalty afterwards.",
    },
    medal: "shoot",
    scope: "remoteness",
    gender: "male",
    stats: {
      armor: 30,
      success: 36,
      power: 19,
      charge: 4,
      radiation: 3,
    },
    sprite: {
      upperArmRight: {
        width: 16,
        height: 21,
        x: 605,
        y: 1119,
        top: 22,
        left: 0,
        animation: 3,
      },

      lowerArmRight: {
        width: 12,
        height: 19,
        x: 602,
        y: 1096,
        top: 43,
        left: 3,
        animation: 5,
      },
    },
  },
  {
    name: "submachingun",
    description: "(Chain Guin) A quick CRG/RAD shooting attack.",
    model: "KBT-1",
    part: "left arm",
    skill: {
      type: "aim shot",
      description:
        "A shooting attack with high chance o a critical hit. Afterwards user cannot evade.",
    },
    medal: "shoot",
    scope: "remoteness",
    gender: "male",
    stats: {
      armor: 30,
      success: 10,
      power: 36,
      charge: 5,
      radiation: 4,
    },
    sprite: {
      upperArmLeft: {
        width: 10,
        height: 22,
        x: 548,
        y: 1118,
        top: 21,
        left: 22,
        animation: 3,
      },
      lowerArmLeft: {
        width: 17,
        height: 21,
        x: 562,
        y: 1097,
        top: 41,
        left: 28,
        animation: 5,
      },
    },
  },
  {
    name: "ochitsuka",
    description: 'Best when battling in "Grasslands" & "Forest" fields.',
    model: "KBT-1",
    part: "legs",
    skill: {
      type: "two legged",
    },
    medal: "shoot",
    scope: "leg type marks",
    gender: "male",
    stats: {
      armor: 45,
      propulsion: 43,
      evasion: 17,
      defense: 42,
      proximity: 10,
      remoteness: 21,
    },
    sprite: {
      lowerBody: {
        width: 16,
        height: 16,
        x: 586,
        y: 1097,
        top: 43,
        left: 11,
        animation: 4,
      },
      upperLegLeft: {
        width: 8,
        height: 13,
        x: 589,
        y: 1078,
        top: 49,
        left: 21,
        animation: 1,
      },
      lowerLegLeft: {
        width: 21,
        height: 21,
        x: 557,
        y: 1067,
        top: 62,
        left: 19,
        animation: 0,
      },
      upperLegRight: {
        width: 8,
        height: 13,
        x: 589,
        y: 1078,
        top: 49,
        left: 12,
        animation: 1,
      },
      lowerLegRight: {
        width: 19,
        height: 21,
        x: 588,
        y: 1064,
        top: 62,
        left: 9,
        animation: 0,
      },
    },
  },
];

export default medaParts;

/* TinPet head:
  head: {
    width: 19,
    height: 18,
    x: 849,
    y: 114,
    top: 12,
    left: 11,
    animation: 1,
  },
 */