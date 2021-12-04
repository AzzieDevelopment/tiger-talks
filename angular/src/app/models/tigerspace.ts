export interface ITigerSpace {
    Id: number,
    UserId: string, // creator
    Title: string,
    Description: string,
    Type: number 
}

export enum TigerSpaceType {
    Academic = 1,
    Social = 2
}