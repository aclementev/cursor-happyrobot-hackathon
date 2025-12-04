// Mock outfits aligned with backend schema from retail-dataset
// Data extracted from retail-dataset/outfits.csv
// Schema: outfit_id, name, upper_body_product_id, lower_body_product_id, accessory_product_id, occasion, description, created_at

export const mockOutfits = [
  {
    outfit_id: "OUTFIT0001",
    name: "Casual Classic Tee & Relaxed Fit Outfit",
    upper_body_product_id: "PROD00001",
    lower_body_product_id: "PROD00026",
    accessory_product_id: "PROD00093",
    occasion: "casual",
    description: "A stylish casual outfit featuring a purple classic tee paired with orange relaxed fit, completed with navy loafers.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0002",
    name: "Weekend Polo Shirt & Skinny Jeans Outfit",
    upper_body_product_id: "PROD00008",
    lower_body_product_id: "PROD00028",
    accessory_product_id: "PROD00104",
    occasion: "weekend",
    description: "Perfect for weekend occasions, this ensemble combines a red polo shirt with orange skinny jeans and gray sneakers.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0003",
    name: "Business Casual V-Neck T-Shirt & Bootcut Jeans Outfit",
    upper_body_product_id: "PROD00007",
    lower_body_product_id: "PROD00027",
    accessory_product_id: "PROD00110",
    occasion: "business casual",
    description: "An elegant business casual look with a white v-neck t-shirt, brown bootcut jeans, and brown loafers for a complete outfit.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0004",
    name: "Sporty Long Sleeve Tee & Athletic Shorts Outfit",
    upper_body_product_id: "PROD00010",
    lower_body_product_id: "PROD00168",
    accessory_product_id: "PROD00106",
    occasion: "sporty",
    description: "A stylish sporty outfit featuring a pink long sleeve tee paired with red athletic shorts, completed with navy sneakers.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0005",
    name: "Formal Denim Jacket & Dress Pants Outfit",
    upper_body_product_id: "PROD00071",
    lower_body_product_id: "PROD00210",
    accessory_product_id: "PROD00101",
    occasion: "formal",
    description: "Perfect for formal occasions, this ensemble combines a blue denim jacket with red dress pants and brown heels.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0006",
    name: "Date Night Leather Jacket & Skinny Jeans Outfit",
    upper_body_product_id: "PROD00072",
    lower_body_product_id: "PROD00031",
    accessory_product_id: "PROD00105",
    occasion: "date night",
    description: "An elegant date night look with a brown leather jacket, black skinny jeans, and black heels for a complete outfit.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0007",
    name: "Work Pullover Sweater & Chinos Outfit",
    upper_body_product_id: "PROD00154",
    lower_body_product_id: "PROD00225",
    accessory_product_id: "PROD00123",
    occasion: "work",
    description: "A stylish work outfit featuring a red pullover sweater paired with orange chinos, completed with gray watch.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0008",
    name: "Travel Bomber Jacket & Cargo Pants Outfit",
    upper_body_product_id: "PROD00079",
    lower_body_product_id: "PROD00220",
    accessory_product_id: "PROD00100",
    occasion: "travel",
    description: "Perfect for travel occasions, this ensemble combines an orange bomber jacket with white cargo pants and navy boots.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0009",
    name: "Party Graphic Hoodie & Joggers Outfit",
    upper_body_product_id: "PROD00238",
    lower_body_product_id: "PROD00211",
    accessory_product_id: "PROD00111",
    occasion: "party",
    description: "An elegant party look with a black graphic hoodie, yellow joggers, and red sneakers for a complete outfit.",
    created_at: "2025-01-22 19:50:35"
  },
  {
    outfit_id: "OUTFIT0010",
    name: "Everyday Cardigan & A-Line Skirt Outfit",
    upper_body_product_id: "PROD00146",
    lower_body_product_id: "PROD00187",
    accessory_product_id: "PROD00099",
    occasion: "everyday",
    description: "A stylish everyday outfit featuring a beige v-neck sweater paired with khaki a-line skirt, completed with white heels.",
    created_at: "2025-01-22 19:50:35"
  }
];

// Helper function to get outfit by ID
export function getOutfitById(outfitId) {
  return mockOutfits.find(outfit => outfit.outfit_id === outfitId);
}

// Helper function to get outfits by occasion
export function getOutfitsByOccasion(occasion) {
  return mockOutfits.filter(outfit => outfit.occasion === occasion);
}

// Helper function to get all occasions
export function getAllOccasions() {
  const occasions = new Set(mockOutfits.map(outfit => outfit.occasion));
  return Array.from(occasions);
}

