export interface Iuser {
    name : string;
    id?: string;
    email : string;
    password : string;
    phone : string;
}
export type register = Pick<Iuser,'email'|'phone'|'name'|'password'>
export type login = Pick<Iuser,'email'|'password'>