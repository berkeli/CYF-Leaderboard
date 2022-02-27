import { Kata } from '.';

export class completedKatas {
    id!: Kata;
    completedAt!: string;
    completedLanguages!: string[];
}

export class rank {
    rank!: number;
    name!: string;
    color!: string;
    score!: number
}

export class languageRanks {
    [key:string]: rank;
}

export class ranks {
    overall!: rank;
    languages!: languageRanks[];
}

export class collectionProgress{
    id!: string;
    completed!: number
    total!:number;
    completeDate!: string;
}

export class weeklyProgress {
    date!: string;
    '-8'!: number;
    '-7'!: number;
    '-6'!: number;
    '-5'!: number;
    '-4'!: number;   
    '-3'!: number;    
    '-2'!: number; 
    '-1'!: number;
}

export class UserClass {
    _id!: string;
    rank!: {
        name: string;
    };
    name!: string;
    completedKatas!: completedKatas[];
    ranks!: ranks;
    collectionProgress!: collectionProgress[];
    codewarsUsername!: string; 
    honor!:number;
    weeklyProgress!: weeklyProgress[];
}