export interface User {
    id: string, // netID
    firstName: string,
    lastName: string,
    email: string,
    type: number,
    permission: number,
    bio: string,
    preferredName: string,
    pronouns: string,
    isVerified: number
}