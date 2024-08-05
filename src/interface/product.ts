export interface Iproduct {
    id: string;
    name: string;
    price : number;
    image : string;
    category : string;
    desc : string;
}
export type cart_pro = Pick<Iproduct, 'id'| 'name'|'image'|'price'>