export interface Orders {
    id: string;
    items: OrderItem[];
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    name: string;
    address: string;
    birthDate: string;
    phone: string;
    email: string;
    shippingMethod: string;
    userid: string;
    totalprice : number;
}
export interface OrderItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}
