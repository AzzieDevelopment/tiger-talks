export interface ITigerSpace {
    Id: number,
    UserId: string, // creator
    Title: string,
    Description: string,
    Type: number // TODO: update DB to string? 
}

export enum TigerSpaceType {
    Academic = 1,
    Social = 2
}