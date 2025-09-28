import { postJson } from "./api";

export async function createOrder({ property_id, quantity, owner }:{
  property_id:string; quantity:number; owner:string;
}) {
  // Adjust path if your backend uses a different buy route
  return postJson("/buy/intent", { property_id, quantity, owner });
}
