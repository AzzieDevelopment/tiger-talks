export interface IUser {
    Id: string, // netID
    FirstName: string,
    LastName: string,
    Email: string,
    UserType: number,
    Permission: number,
    Bio: string,
    PName: string,
    Pronouns: string,
    IsVerified?: number,
    Password?: string,
    Token?: string
}

export enum UserType {
    Faculty = 0,
    Student = 1
}

export enum Permission {
    Basic = 0,
    Moderator = 1
}

export interface IStudent {
    UserId: string,
    Major: string,
    Minor?: string,
    Track?: string,
    GradYear?: string
}

export interface IFaculty {
    UserId: string,
    Title: string,
    Department: string
}