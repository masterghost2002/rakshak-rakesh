export type DocumentsType = {
    _id: string;
    name:string;
    secureUrl: string;
    publicUrl: string;
    user: string;
    format: string;
}
export type UserType = {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phoneNumber: string;
    accessToken?: string;
    documents?: DocumentsType[];
}