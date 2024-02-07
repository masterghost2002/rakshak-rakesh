export type DocumentsType = {
    _id?: string;
    name:string;
    secret_url: string;
    public_id: string;
    user: string;
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