export interface IComment {
    Id?: number,
    UserId: string,
    PostId: number,
    Timestamp?: string,
    Body: string,
    Upvotes: number
}