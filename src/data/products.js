const allProducts = [
  {
    id: 1,
    name: "Gold Radiance Day Cream",
    category: "day",
    price: 1500,
    rating: 4.5,
    reviews: 120,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Front+View",
      "https://via.placeholder.com/300x300?text=Back+View",
      "https://via.placeholder.com/300x300?text=Texture+Shot",
      "https://via.placeholder.com/300x300?text=On+Model"
    ],
    discountPrice: 1350,
    offerPercentage: 10,
    availableOffers: ["Free No Shine Eco Sunscreen on ₹1999+"],
    technology: "Nano Ceramide Technology",
    description: "Combines glow-boosting gold particles with nourishing ceramides for radiant skin.",
    benefits: [
      "Long-lasting hydration",
      "Dewy finish",
      "Improves skin barrier",
      "Boosts skin luminosity",
      "Lightweight and non-greasy"
    ],
    howToUse: ["Cleanse face", "Apply to face and neck", "Massage gently", "Use before sunscreen"],
    ingredients: ["Gold Particles", "Ceramides", "Glycerin", "Niacinamide", "Rice Extract"],
    info: {
      shelfLife: "24 months",
      skinType: "All skin types",
      manufacturedBy: "Radiant Skincare Pvt. Ltd.",
      countryOfOrigin: "India"
    }
  },
  {
    id: 2,
    name: "Diamond Glow Night Cream",
    category: "night",
    price: 1800,
    rating: 4.6,
    reviews: 130,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Diamond+Front",
      "https://via.placeholder.com/300x300?text=Diamond+Back",
      "https://via.placeholder.com/300x300?text=Texture",
      "https://via.placeholder.com/300x300?text=Model"
    ],
    discountPrice: 1620,
    offerPercentage: 10,
    availableOffers: ["Free Face Roller on ₹1999+"],
    technology: "Night Repair Peptide Complex",
    description: "Infused with diamond dust and peptides, it repairs and rejuvenates your skin overnight.",
    benefits: [
      "Reduces signs of fatigue",
      "Boosts overnight skin regeneration",
      "Smoothens skin texture",
      "Hydrates deeply",
      "Improves skin tone"
    ],
    howToUse: ["Cleanse your face", "Apply evenly before bed", "Let it absorb overnight"],
    ingredients: ["Diamond Dust", "Peptides", "Hyaluronic Acid", "Shea Butter", "Aloe Vera"],
    info: {
      shelfLife: "24 months",
      skinType: "Normal to dry",
      manufacturedBy: "Diamond Beauty Labs",
      countryOfOrigin: "India"
    }
  },
  {
    id: 3,
    name: "Silver Shield Moisturizer",
    category: "moisturizer",
    price: 1300,
    rating: 4.3,
    reviews: 95,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Silver+Front",
      "https://via.placeholder.com/300x300?text=Silver+Back",
      "https://via.placeholder.com/300x300?text=Texture",
      "https://via.placeholder.com/300x300?text=Model"
    ],
    discountPrice: 1170,
    offerPercentage: 10,
    availableOffers: ["Buy 1 Get 1 on ₹2500+"],
    technology: "Silver Ion Barrier",
    description: "Daily moisturizer enriched with silver ions to protect and hydrate skin.",
    benefits: [
      "Antibacterial protection",
      "Hydrates and soothes",
      "Prevents irritation",
      "Balances oil levels",
      "Strengthens skin barrier"
    ],
    howToUse: ["Use morning and night", "Apply to clean skin", "Massage until absorbed"],
    ingredients: ["Silver Ions", "Aloe Vera", "Vitamin E", "Panthenol", "Jojoba Oil"],
    info: {
      shelfLife: "18 months",
      skinType: "Oily & sensitive",
      manufacturedBy: "SafeSkin Ltd.",
      countryOfOrigin: "India"
    }
  },
  {
    id: 4,
    name: "Platinum Firming Night Cream",
    category: "night",
    price: 2200,
    rating: 4.7,
    reviews: 110,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Platinum+Front",
      "https://via.placeholder.com/300x300?text=Platinum+Back",
      "https://via.placeholder.com/300x300?text=Texture",
      "https://via.placeholder.com/300x300?text=Model"
    ],
    discountPrice: 1980,
    offerPercentage: 10,
    availableOffers: ["Free Eye Cream on ₹2999+"],
    technology: "Platinum Peptide Complex",
    description: "Luxury night treatment with platinum peptides to tighten and smooth skin.",
    benefits: [
      "Firms and tightens skin",
      "Smoothes fine lines",
      "Boosts elasticity",
      "Deep overnight nourishment",
      "Evens skin tone"
    ],
    howToUse: ["Apply nightly", "Use after cleansing", "Massage upward on face and neck"],
    ingredients: ["Platinum Peptides", "Shea Butter", "Coenzyme Q10", "Retinol", "Lavender Oil"],
    info: {
      shelfLife: "24 months",
      skinType: "Aging skin",
      manufacturedBy: "LuxaCare Pvt. Ltd.",
      countryOfOrigin: "France"
    }
  },
  {
    id: 5,
    name: "Hydra Boost Gel",
    category: "day",
    price: 1600,
    rating: 4.2,
    reviews: 80,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Hydra+Front",
      "https://via.placeholder.com/300x300?text=Hydra+Back",
      "https://via.placeholder.com/300x300?text=Gel+Texture",
      "https://via.placeholder.com/300x300?text=On+Skin"
    ],
    discountPrice: 1440,
    offerPercentage: 10,
    availableOffers: ["Flat ₹200 off on ₹1599+"],
    technology: "AquaLock Hydration Matrix",
    description: "Ultra-light gel that deeply hydrates and refreshes skin without clogging pores.",
    benefits: [
      "Oil-free hydration",
      "Reduces dryness",
      "Quick absorption",
      "Cooling effect",
      "Refreshes skin instantly"
    ],
    howToUse: ["Apply to clean skin", "Use in the morning", "Layer under sunscreen"],
    ingredients: ["Hyaluronic Acid", "Green Tea", "Cucumber Extract", "Pro-Vitamin B5", "Aqua"],
    info: {
      shelfLife: "18 months",
      skinType: "Combination to oily",
      manufacturedBy: "HydraCare Co.",
      countryOfOrigin: "India"
    }
  },
  {
    id: 6,
    name: "Glow Revival Night Cream",
    category: "night",
    price: 1750,
    rating: 4.4,
    reviews: 115,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Glow+Front",
      "https://via.placeholder.com/300x300?text=Glow+Back",
      "https://via.placeholder.com/300x300?text=Night+Texture",
      "https://via.placeholder.com/300x300?text=Glowing+Skin"
    ],
    discountPrice: 1575,
    offerPercentage: 10,
    availableOffers: ["Free Face Mist on ₹1999+"],
    technology: "Bio-Retinol Complex",
    description: "Revives dull skin overnight and reduces pigmentation for a fresh morning glow.",
    benefits: [
      "Reduces pigmentation",
      "Brightens complexion",
      "Smooth texture",
      "Enhances cell renewal",
      "Deep hydration"
    ],
    howToUse: ["Apply at night", "Massage gently", "Avoid eye area"],
    ingredients: ["Bio-Retinol", "Licorice Root", "Vitamin C", "Almond Oil", "Shea Butter"],
    info: {
      shelfLife: "24 months",
      skinType: "Normal to dry",
      manufacturedBy: "LumiGlow Pvt. Ltd.",
      countryOfOrigin: "India"
    }
  },
  {
    id: 7,
    name: "Matte Finish Moisturizer",
    category: "moisturizer",
    price: 1400,
    rating: 4.1,
    reviews: 105,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Matte+Front",
      "https://via.placeholder.com/300x300?text=Matte+Back",
      "https://via.placeholder.com/300x300?text=Finish+Texture",
      "https://via.placeholder.com/300x300?text=On+Face"
    ],
    discountPrice: 1260,
    offerPercentage: 10,
    availableOffers: ["10% off on all moisturizers"],
    technology: "Oil-Control Complex",
    description: "Controls oil production and leaves your skin with a matte, non-greasy finish.",
    benefits: [
      "Controls oil for 12 hours",
      "Minimizes pores",
      "Matte effect",
      "Reduces shine",
      "Hydrates skin"
    ],
    howToUse: ["Use AM and PM", "Apply on T-zone and face", "Pat gently until absorbed"],
    ingredients: ["Niacinamide", "Zinc PCA", "Green Tea", "Witch Hazel", "Salicylic Acid"],
    info: {
      shelfLife: "24 months",
      skinType: "Oily & acne-prone",
      manufacturedBy: "FreshMatte Skincare",
      countryOfOrigin: "India"
    }
  },
  {
    id: 8,
    name: "Ceramide Repair Cream",
    category: "night",
    price: 1900,
    rating: 4.5,
    reviews: 140,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Ceramide+Front",
      "https://via.placeholder.com/300x300?text=Ceramide+Back",
      "https://via.placeholder.com/300x300?text=Rich+Texture",
      "https://via.placeholder.com/300x300?text=Before+Sleep"
    ],
    discountPrice: 1710,
    offerPercentage: 10,
    availableOffers: ["Free Travel Pouch on ₹2499+"],
    technology: "Triple Ceramide Complex",
    description: "Repairs the skin barrier and soothes dryness with three types of ceramides.",
    benefits: [
      "Repairs barrier",
      "Intense nourishment",
      "Reduces redness",
      "Soothes sensitivity",
      "Softens rough patches"
    ],
    howToUse: ["Use nightly", "Apply evenly", "Gently massage into skin"],
    ingredients: ["Ceramide NP", "Ceramide AP", "Ceramide EOP", "Squalane", "Oat Extract"],
    info: {
      shelfLife: "24 months",
      skinType: "Dry and sensitive",
      manufacturedBy: "BarrierFix Pvt. Ltd.",
      countryOfOrigin: "India"
    }
  },
  {
    id: 9,
    name: "Vitamin C Bright Day Cream",
    category: "day",
    price: 1700,
    rating: 4.3,
    reviews: 102,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=VitaminC+Front",
      "https://via.placeholder.com/300x300?text=VitaminC+Back",
      "https://via.placeholder.com/300x300?text=Cream+Texture",
      "https://via.placeholder.com/300x300?text=Bright+Skin"
    ],
    discountPrice: 1530,
    offerPercentage: 10,
    availableOffers: ["Free Sunscreen Sample on ₹1999+"],
    technology: "Stable Vitamin C Delivery",
    description: "Energizes dull skin, fades spots, and brightens your complexion visibly.",
    benefits: [
      "Fades dark spots",
      "Brightens skin",
      "Improves clarity",
      "Boosts collagen",
      "Reduces dullness"
    ],
    howToUse: ["Use after cleansing", "Apply in upward strokes", "Layer with SPF"],
    ingredients: ["Vitamin C (SAP)", "Kakadu Plum", "Grapefruit Extract", "Niacinamide", "Licorice"],
    info: {
      shelfLife: "20 months",
      skinType: "All skin types",
      manufacturedBy: "BrightBees Skincare",
      countryOfOrigin: "India"
    }
  },
  {
    id: 10,
    name: "Youth Restore Moisturizer",
    category: "moisturizer",
    price: 1850,
    rating: 4.6,
    reviews: 108,
    image: "https://via.placeholder.com/150",
    images: [
      "https://via.placeholder.com/300x300?text=Youth+Front",
      "https://via.placeholder.com/300x300?text=Youth+Back",
      "https://via.placeholder.com/300x300?text=AntiAge+Texture",
      "https://via.placeholder.com/300x300?text=Firm+Skin"
    ],
    discountPrice: 1665,
    offerPercentage: 10,
    availableOffers: ["Free Mini Serum on ₹2999+"],
    technology: "Rejuvenating Peptide Matrix",
    description: "Daily anti-aging moisturizer to firm, smooth and energize mature skin.",
    benefits: [
      "Reduces wrinkles",
      "Firms skin",
      "Boosts radiance",
      "Improves elasticity",
      "Deep moisture"
    ],
    howToUse: ["Use twice daily", "Massage upward on face and neck", "Follow with SPF (AM)"],
    ingredients: ["Matrixyl 3000", "Bakuchiol", "Squalane", "Vitamin E", "Rosehip Oil"],
    info: {
      shelfLife: "24 months",
      skinType: "Mature skin",
      manufacturedBy: "YouthGenix Pvt. Ltd.",
      countryOfOrigin: "India"
    }
  }
];

export default allProducts;
