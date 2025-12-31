"use server";

import { storefront } from "@/lib/storefront";
import type { ShipmentMethodsWithLocationsResponse } from "@putiikkipalvelu/storefront-sdk";

/**
 * Get shipment methods with pickup locations for a postal code
 */
export async function getShipmentMethods(
  postalCode: string
): Promise<ShipmentMethodsWithLocationsResponse> {
  return storefront.shipping.getWithLocations(postalCode);
}
