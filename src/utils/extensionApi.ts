export type F1TVTier = "Pro" | "Access" | "None" | "Premium" | "Unknown";
export type IsLoggedInArgs = { isLoggedIn: boolean; tier: F1TVTier; rawTier?: string | null };
