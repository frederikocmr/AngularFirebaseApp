export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    phoneNumber?: string;
    document?: number;
    birthDate?: Date;
    gender?: string;
    adresses?: {
        personName: string,
        type: string,
        postalCode: number,
        addressLine: string,
        number: string,
        complement: string,
        reference: string,
        district: string,
        city: string,
        state: string
    }[];
}
