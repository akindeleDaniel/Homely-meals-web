export const DELIVERY_FEES = {
  gk: 500,
  "outside-gk": 1500,
} as const;

export type DeliveryArea = keyof typeof DELIVERY_FEES;


export const DELIVERY_WINDOW = "Wednesday 2:00 PM – 5:00 PM";
