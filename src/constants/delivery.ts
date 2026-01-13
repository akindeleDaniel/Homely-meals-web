export type DeliveryArea = "gk" | "outside-gk";

export const DELIVERY_FEES: Record<DeliveryArea, number> = {
  gk: 500,
  "outside-gk": 1500,
};

export const DELIVERY_WINDOW = "Wednesday 2:00 PM – 5:00 PM";
