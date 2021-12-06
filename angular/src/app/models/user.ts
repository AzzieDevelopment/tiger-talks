export interface IUser {
    Id: string, // netID
    FirstName: string,
    LastName: string,
    Email: string,
    UserType: number,
    Permission: number,
    Bio: string,
    PreferredName: string,
    Pronouns: string,
    IsVerified?: number,
    Password: string,
    Token?: string
}

export enum Permission{
    Basic=0,
    Moderator=1
}