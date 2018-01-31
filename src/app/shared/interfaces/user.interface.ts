export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    phoneNumber?: string;
    document?: number;
    birthDate?: Date;
    gender?: string;
}
