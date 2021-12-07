export interface IPost {
    Id: number,
    Title: string,
    Body: string,
    Category: string,
    Upvotes: number,
    Timestamp: string,  // date created
    Bump: string,       // date bumped
    UserId: string,     // creator netID
    TigerSpaceId: number
}