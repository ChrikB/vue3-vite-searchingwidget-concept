

interface ProductName {
  name?: string;
};


interface Criteria {
  name?: string | null;
  id?: number | null;
  price: {
    min?: number| null;
    max?: number| null;
  } 
};


interface Product {
  name: string;
  id: number;
  price: number;
  clock : string;
  releaseDate : string;
  __src?: string;
  src: string;
  comeout?: boolean;
};

export type{
  ProductName,
  Product,
  Criteria
}




