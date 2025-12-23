export interface BoardCardCreate {
    resetInterval: ResetInterval | null;
    owner: Owner;
    title: string;
    description: string;
}

export interface BoardCard extends BoardCardCreate {
    id: number;
    status: Status;
}

export enum Status {
    OnHold,
    ToDo,
    Doing,
    Done,
    Archived
}

export enum ResetInterval {
    Daily,
    Weekly
}

export enum Owner {
    Mommy,
    Daddy,
    MommyAndDaddy,
    Jacob
}