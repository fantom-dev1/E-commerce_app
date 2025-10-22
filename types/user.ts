export interface Address {
  id: string;
  type: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: string;
  cardType: string;
  lastFourDigits: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  shippingAddresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
}