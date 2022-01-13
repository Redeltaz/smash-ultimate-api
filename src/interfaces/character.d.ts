export interface Character {
    characterId: string;
    name: string;
    isDLC: boolean;
    license: string;
    images: {
        icon: string;
        portrait: string;
    };
    moves: Moves;
    statistics: Statistics;
}

export interface CharacterDB extends Character {
    id: number;
}

export interface Moves {
    groundAttacks: AttackContent[];
    aerialAttacks: AttackContent[];
    specialAttacks: AttackContent[];
    grabsAndThrows: GrabThrowContent[];
    dodgesAndRolls: DodgeRollContent[];
}

export interface AttackContent {
    attackName: string;
    frameStartup: string;
    onShield: string;
    activeFrame: string;
    totalFrames: string;
    framesLandingLag?: string;
    note?: string;
    baseDamage: string;
    framesShieldLag: string;
    framesShieldStun: string;    
    comment?: string;
}

export interface GrabThrowContent {
    name: string;
    frameStartup?: string;
    activeFrame?: string;
    totalFrames: string;
    framesLandingLag: string;
    note?: string;
    baseDamage?: string;
}

export interface DodgeRollContent {
    name: string;
    totalFrames: string;
    framesLandingLag: string;
    note: string;
}

export interface Statistics {
    airSpeed: number;
    gravity: number;
    weight: number;
    walkSpeed: number;
    grabRange: number;

    airAcceleration: {
        base: number;
        additional: number;
        max: number;
    };
    fallSpeed: {
        regularFall: number;
        fastFall: number;
        purcentageIncrease: number;
    };
    jumpHeight: {
        fullHop: number;
        shortHop: number;
        airJump: number;
    };
    jumpDurations: {
        shortHop: number;
        fullHop: number;
        shortHopFastFall: number;
        fullHopFastFall: number;
    };
    landing: {
        hardLand: number;
        softLand: number;
    };
    dashAndRunSpeed: {
        initialDash: number;
        runSpeed: number;
        dashFrames: number;
        pivotDashFrames: number;
    };
    dashTurnaround: {
        fast: string;
        normal: string;
        slow: number;
    };
    ledgeStats: {
        attackRange: string;
        attackFrames: string;
        neutralGetup: string;
        roll: string;
        jump: string;
    }
}