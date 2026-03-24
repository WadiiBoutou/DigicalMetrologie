export interface Product {
  id: string;
  ref: string;
  /** Product designation — always French / Latin (never translated in UI). */
  name: string;
  image: string;
  category?: string;
  resolution?: string;
  maxError?: string;
  bec?: string;
  lecture?: string;
  cadran?: string;
  classe?: string;
  raccord?: string;
  plage?: string;
  tags?: string[];
  /** @deprecated use description_fr — kept for backward compatibility */
  description?: string;
  description_fr: string;
  description_ar?: string;
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
