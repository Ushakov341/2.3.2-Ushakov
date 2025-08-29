export interface Product {
    id: number;
    name: string;
    producer: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    availableCount: number;
    imageUrl: string;
  }
  
  export interface CartItem extends Product {
    cartQuantity: number;
  }