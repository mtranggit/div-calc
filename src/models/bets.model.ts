export interface IBet {
    type: string;
    betting: string;
    stake: number;
}

export interface ITally {
    bet: IBet[];
    result?: string[];
}


