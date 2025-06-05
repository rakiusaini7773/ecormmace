const allProducts = [
  {
    id: 1,
    name: "Gold Radiance Day Cream",
    category: "day",
    price: 1500,
    rating: 4.5,
    reviews: 120,
    image: "https://thefaceshop.in/cdn/shop/files/8801051254006_1_812bcf8a-d64a-4d78-997b-7e214bfe8f62.jpg?v=1748409485&width=1780",
    images: [
      "https://thefaceshop.in/cdn/shop/files/8801051254006_8ceb5ed2-fe9f-403c-bb7c-568f02528f81.jpg?v=1748409485&width=1780",
      "https://thefaceshop.in/cdn/shop/files/8801051254006_2_b199a39c-91ba-4f6e-828c-47d6c2450e9c.jpg?v=1744353986&width=1780",
      "https://thefaceshop.in/cdn/shop/files/8801051254006_3_04f07058-dcb9-4cb3-b302-267953e1a1fc.jpg?v=1744353986&width=1780",
      "https://thefaceshop.in/cdn/shop/files/8801051254006_4_93c49297-a8b9-4bfd-8716-a657aca526de.jpg?v=1744353986&width=1780"
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
    },
    reviewDetails: [
      {
        reviewer: "Anjali Mehta",
        rating: 5,
        comment: "Amazing cream! It made my skin glow within a week. Non-greasy and very lightweight.",
        date: "2025-04-10"
      },
      {
        reviewer: "Ritika Sharma",
        rating: 4,
        comment: "I love the texture and scent. My skin feels hydrated all day.",
        date: "2025-03-22"
      },
      {
        reviewer: "Sneha Patel",
        rating: 4.5,
        comment: "Perfect for my morning routine. The glow is subtle but visible.",
        date: "2025-02-28"
      }
    ],
    isNewLaunch: true
  },
 {
  id: 2,
  name: "Hydra Glow Night Serum",
  category: "night",
  price: 1800,
  rating: 4.7,
  reviews: 85,
  image: "https://thefaceshop.in/cdn/shop/files/8806182550997_3_e3d91422-30de-4cf8-ac52-d19408426768.jpg?v=1748409352&width=1780",
  images: [
    "https://thefaceshop.in/cdn/shop/files/rwb-cleanser-150ml-front.jpg?v=1748409352&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8806182550997_1.jpg?v=1748409352&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8806182550997_2_b853e50c-c915-425b-afac-c692e9c0be88.jpg?v=1748409352&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8806182550997_5_fe1b4d9a-87f8-4fcf-b504-33cecbfc9508.jpg?v=1748409352&width=1780"
  ],
  discountPrice: 1620,
  offerPercentage: 10,
  availableOffers: ["Free Travel Size Moisturizer on ₹1500+"],
  technology: "Hydro Boost Complex",
  description: "Revitalizes skin overnight with deep hydration and nourishment.",
  benefits: [
    "Deep moisturizing",
    "Reduces fine lines",
    "Brightens complexion",
    "Non-sticky formula",
    "Suitable for sensitive skin"
  ],
  howToUse: ["Cleanse face before bed", "Apply serum evenly", "Massage gently", "Follow with night cream"],
  ingredients: ["Hyaluronic Acid", "Vitamin E", "Green Tea Extract", "Aloe Vera"],
  info: {
    shelfLife: "18 months",
    skinType: "Normal to Dry",
    manufacturedBy: "Glow Beauty Labs",
    countryOfOrigin: "India"
  },
  reviewDetails: [
    {
      reviewer: "Priya Kapoor",
      rating: 5,
      comment: "My skin feels so soft and hydrated in the morning. Absolutely love this serum!",
      date: "2025-04-12"
    },
    {
      reviewer: "Karan Singh",
      rating: 4.5,
      comment: "Works great for my dry skin. Texture is light and absorbs quickly.",
      date: "2025-03-29"
    },
    {
      reviewer: "Meera Joshi",
      rating: 4,
      comment: "Good serum for nightly use. Noticeable improvement in skin texture.",
      date: "2025-02-15"
    }
  ],
  isNewLaunch: true
},

{
  id: 3,
  name: "Pure Radiance Face Wash",
  category: "cleanser",
  price: 700,
  rating: 4.3,
  reviews: 200,
  image: "https://thefaceshop.in/cdn/shop/files/8806182593796_1_192bb274-2cd5-4b84-9c4a-b0b55c31093b.jpg?v=1748409366&width=1780",
  images: [
    "https://thefaceshop.in/cdn/shop/files/1_63db465e-af2e-4b8f-a128-acf48a2c0e34.jpg?v=1748409366&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8806182593796_2_59c2617d-bb84-4f34-88ab-9f4f7bff70cf.jpg?v=1747911965&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8806182593796_3_3f6348c4-6e58-49d6-9ab3-6b64582c80f9.jpg?v=1747911965&width=1780"
  ],
  discountPrice: 630,
  offerPercentage: 10,
  availableOffers: ["Buy 2 Get 1 Free"],
  technology: "Gentle Foam Cleanse",
  description: "A refreshing and gentle cleanser that removes impurities without drying skin.",
  benefits: [
    "Removes dirt and oil",
    "Gentle on sensitive skin",
    "Hydrating formula",
    "Refreshing scent",
    "Non-comedogenic"
  ],
  howToUse: ["Wet face", "Apply a small amount", "Massage gently", "Rinse thoroughly"],
  ingredients: ["Aloe Vera", "Chamomile Extract", "Glycerin", "Vitamin B5"],
  info: {
    shelfLife: "24 months",
    skinType: "All skin types",
    manufacturedBy: "Pure Essentials Ltd.",
    countryOfOrigin: "India"
  },
  reviewDetails: [
    {
      reviewer: "Ankit Verma",
      rating: 4,
      comment: "Cleans my face well without making it dry or tight.",
      date: "2025-05-01"
    },
    {
      reviewer: "Nisha Gupta",
      rating: 4.5,
      comment: "Mild and effective. Love the scent and how soft my skin feels after.",
      date: "2025-04-22"
    },
    {
      reviewer: "Rahul Mehta",
      rating: 4,
      comment: "Good face wash for everyday use. Doesn’t irritate my sensitive skin.",
      date: "2025-03-30"
    }
  ],
  isNewLaunch: true
},
{
  id: 4,
  name: "Revitalizing Vitamin C Serum",
  category: "serum",
  price: 2200,
  rating: 4.8,
  reviews: 150,
  image: "https://thefaceshop.in/cdn/shop/files/2_b896a951-8b37-4d20-826b-cbf1dcda5737.jpg?v=1748409746&width=1780",
  images: [
    "https://thefaceshop.in/cdn/shop/files/1_2e90d1d0-3eaa-47b8-9c6a-453d15aec33c.jpg?v=1748409746&width=1780",
    "https://thefaceshop.in/cdn/shop/files/3_ce16d932-fb45-4619-9bc5-53e77f5ee578.jpg?v=1747908428&width=1780",
    "https://thefaceshop.in/cdn/shop/files/4_541245f5-db70-45b0-915c-7b79f710f27b.jpg?v=1747908427&width=1780"
  ],
  discountPrice: 1980,
  offerPercentage: 10,
  availableOffers: ["Get 15% off on your first purchase"],
  technology: "Stabilized Vitamin C Formula",
  description: "Brightens skin tone and boosts collagen production for youthful skin.",
  benefits: [
    "Reduces dark spots",
    "Improves skin texture",
    "Fades pigmentation",
    "Antioxidant protection",
    "Lightweight and fast-absorbing"
  ],
  howToUse: ["Cleanse face", "Apply 3-4 drops on face", "Massage gently", "Use before moisturizer"],
  ingredients: ["Vitamin C (Ascorbic Acid)", "Ferulic Acid", "Vitamin E", "Hyaluronic Acid"],
  info: {
    shelfLife: "12 months",
    skinType: "All skin types",
    manufacturedBy: "Glow Labs",
    countryOfOrigin: "India"
  },
  reviewDetails: [
    {
      reviewer: "Sonal Agarwal",
      rating: 5,
      comment: "My skin looks so much brighter after using this serum for a month!",
      date: "2025-05-10"
    },
    {
      reviewer: "Aditya Roy",
      rating: 4.5,
      comment: "Really effective serum. My pigmentation has reduced visibly.",
      date: "2025-04-25"
    },
    {
      reviewer: "Pooja Nair",
      rating: 4.2,
      comment: "Good product, lightweight and pleasant to use daily.",
      date: "2025-03-15"
    }
  ],
   isNewLaunch: false,
},

{
  id: 5,
  name: "Ultra Hydrating Moisturizer",
  category: "moisturizer",
  price: 1400,
  rating: 4.4,
  reviews: 90,
  image: "https://thefaceshop.in/cdn/shop/files/rwb-cleanser-100ml.jpg?v=1744358245&width=1780",
  images: [
    "https://thefaceshop.in/cdn/shop/files/8801051474206_1_2aad0cd8-c7a4-47e7-859e-d33a01929438.jpg?v=1747027999&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8801051474206_2_a3f818e3-51de-4e35-9343-ce4a9197b4e5.jpg?v=1747027999&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8801051474206_3_08b16126-616b-43f7-996f-2303063d189e.jpg?v=1747027999&width=1780"
  ],
  discountPrice: 1260,
  offerPercentage: 10,
  availableOffers: ["Buy 1 Get 1 Half Price"],
  technology: "Deep Moisture Lock",
  description: "Locks in moisture for 24 hours with a non-greasy formula.",
  benefits: [
    "24-hour hydration",
    "Lightweight texture",
    "Soothes dry skin",
    "Improves skin elasticity",
    "Non-comedogenic"
  ],
  howToUse: ["Apply on cleansed face", "Massage gently", "Use daily morning and night"],
  ingredients: ["Shea Butter", "Ceramides", "Glycerin", "Vitamin B5"],
  info: {
    shelfLife: "24 months",
    skinType: "Dry to Normal",
    manufacturedBy: "Nourish Care Pvt Ltd",
    countryOfOrigin: "India"
  },
  reviewDetails: [
    {
      reviewer: "Neha Sharma",
      rating: 4.5,
      comment: "Very moisturizing but light, perfect for my dry skin.",
      date: "2025-04-18"
    },
    {
      reviewer: "Ravi Desai",
      rating: 4,
      comment: "Feels good on skin, no greasiness and absorbs quickly.",
      date: "2025-03-28"
    },
    {
      reviewer: "Simran Kaur",
      rating: 4.2,
      comment: "Nice moisturizer, keeps my skin soft throughout the day.",
      date: "2025-02-12"
    }
  ],
   isNewLaunch: false
},

{
  id: 6,
  name: "Soothing Aloe Vera Gel",
  category: "gel",
  price: 650,
  rating: 4.1,
  reviews: 75,
  image: "https://thefaceshop.in/cdn/shop/files/RWB-150-ml.jpg?v=1744368433&width=1780",
  images: [
    "https://thefaceshop.in/cdn/shop/files/8806182550997_1.jpg?v=1748409352&width=1780",
    "https://thefaceshop.in/cdn/shop/files/8806182550997_1.jpg?v=1748409352&width=1780"
  ],
  discountPrice: 585,
  offerPercentage: 10,
  availableOffers: ["Free face pack on ₹1000+"],
  technology: "Cooling & Hydrating Formula",
  description: "Soothes irritated skin with pure aloe vera and keeps skin refreshed.",
  benefits: [
    "Calms redness and irritation",
    "Hydrates deeply",
    "Non-sticky and fast absorbing",
    "Helps with sunburn relief",
    "Natural antioxidant"
  ],
  howToUse: ["Apply on clean skin", "Use as moisturizer or spot treatment", "Can be used after sun exposure"],
  ingredients: ["Aloe Vera Extract", "Vitamin E", "Green Tea Extract"],
  info: {
    shelfLife: "18 months",
    skinType: "All skin types",
    manufacturedBy: "Nature's Essence",
    countryOfOrigin: "India"
  },
  reviewDetails: [
    {
      reviewer: "Amit Jain",
      rating: 4,
      comment: "Great gel for summer. Keeps skin cool and refreshed.",
      date: "2025-04-05"
    },
    {
      reviewer: "Divya Bhatt",
      rating: 4.3,
      comment: "Good soothing gel, helped with my sunburn easily.",
      date: "2025-03-16"
    },
    {
      reviewer: "Kiran Rao",
      rating: 4,
      comment: "Lightweight and effective. I use it daily after washing face.",
      date: "2025-02-10"
    }
  ],
   isNewLaunch: false
},
{
  id: 7,
  name: "Hydrating Hyaluronic Acid Serum",
  category: "serum",
  price: 1800,
  rating: 4.6,
  reviews: 110,
  image: "https://thefaceshop.in/cdn/shop/files/1_f06280f2-98be-4846-8990-6d5d929a3ec0.jpg?v=1744354660&width=1780",
  images: [
    "https://thefaceshop.in/cdn/shop/files/1_f06280f2-98be-4846-8990-6d5d929a3ec0.jpg?v=1744354660&width=1780",
    "https://thefaceshop.in/cdn/shop/files/1_f06280f2-98be-4846-8990-6d5d929a3ec0.jpg?v=1744354660&width=1780",
    "https://thefaceshop.in/cdn/shop/files/4_912880fd-f429-427a-bb58-b0a98c3a77b9.jpg?v=1744354660&width=1780"
  ],
  discountPrice: 1620,
  offerPercentage: 10,
  availableOffers: ["Get 10% cashback on prepaid orders"],
  technology: "Deep Hydration Boost",
  description: "Provides intense hydration and plumps skin to reduce fine lines.",
  benefits: [
    "Retains moisture for 24 hours",
    "Plumps skin and smooths wrinkles",
    "Lightweight & non-sticky",
    "Improves skin elasticity"
  ],
  howToUse: ["Apply 2-3 drops on cleansed face", "Massage gently", "Use daily morning and night"],
  ingredients: ["Hyaluronic Acid", "Vitamin B5", "Aloe Vera"],
  info: {
    shelfLife: "12 months",
    skinType: "All skin types",
    manufacturedBy: "HydraCare Labs",
    countryOfOrigin: "India"
  },
  reviewDetails: [
    {
      reviewer: "Priya Singh",
      rating: 5,
      comment: "My skin feels so hydrated and soft after using this serum.",
      date: "2025-05-01"
    },
    {
      reviewer: "Ankit Verma",
      rating: 4.5,
      comment: "Good serum, absorbs quickly and doesn’t feel heavy.",
      date: "2025-04-20"
    },
    {
      reviewer: "Maya Patel",
      rating: 4,
      comment: "Nice product, I see reduced fine lines on my forehead.",
      date: "2025-03-12"
    }
  ],
   isNewLaunch: true
},
];
export default allProducts;


// {
//   id: 8,
//   name: "Clarifying Tea Tree Face Wash",
//   category: "cleanser",
//   price: 650,
//   rating: 4.3,
//   reviews: 95,
//   image: "https://example.com/tea-tree-face-wash-main.jpg",
//   images: [
//     "https://example.com/tea-tree-face-wash-1.jpg",
//     "https://example.com/tea-tree-face-wash-2.jpg"
//   ],
//   discountPrice: 585,
//   offerPercentage: 10,
//   availableOffers: ["Buy 1 get 50% off on second item"],
//   technology: "Purifying Tea Tree Formula",
//   description: "Removes impurities and controls excess oil without drying skin.",
//   benefits: [
//     "Clears acne and blemishes",
//     "Balances oily skin",
//     "Gentle on sensitive skin",
//     "Refreshing and cooling"
//   ],
//   howToUse: ["Wet face", "Apply small amount", "Massage gently", "Rinse thoroughly"],
//   ingredients: ["Tea Tree Oil", "Salicylic Acid", "Aloe Vera"],
//   info: {
//     shelfLife: "18 months",
//     skinType: "Oily & Acne-prone",
//     manufacturedBy: "PureGlow Naturals",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Rahul Deshpande",
//       rating: 4,
//       comment: "Helps with my acne without making my skin dry.",
//       date: "2025-04-02"
//     },
//     {
//       reviewer: "Nisha Kumari",
//       rating: 4.5,
//       comment: "Very refreshing wash, love the tea tree scent!",
//       date: "2025-03-18"
//     },
//     {
//       reviewer: "Suresh Malik",
//       rating: 4,
//       comment: "Controls oil well and keeps face clean.",
//       date: "2025-02-25"
//     }
//   ]
// },

// {
//   id: 9,
//   name: "Rejuvenating Night Repair Cream",
//   category: "night",
//   price: 1900,
//   rating: 4.7,
//   reviews: 130,
//   image: "https://example.com/night-repair-cream-main.jpg",
//   images: [
//     "https://example.com/night-repair-cream-1.jpg",
//     "https://example.com/night-repair-cream-2.jpg",
//     "https://example.com/night-repair-cream-3.jpg"
//   ],
//   discountPrice: 1710,
//   offerPercentage: 10,
//   availableOffers: ["Free eye cream on orders above ₹2500"],
//   technology: "Retinol & Peptide Complex",
//   description: "Supports skin repair overnight and reduces visible signs of aging.",
//   benefits: [
//     "Reduces wrinkles and fine lines",
//     "Boosts collagen production",
//     "Improves skin texture",
//     "Deeply nourishes skin"
//   ],
//   howToUse: ["Cleanse face", "Apply cream on face and neck", "Use nightly"],
//   ingredients: ["Retinol", "Peptides", "Shea Butter", "Vitamin E"],
//   info: {
//     shelfLife: "18 months",
//     skinType: "All skin types",
//     manufacturedBy: "Eterna Cosmetics",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Kavita Joshi",
//       rating: 5,
//       comment: "My skin looks firmer and younger after 3 weeks of use.",
//       date: "2025-04-15"
//     },
//     {
//       reviewer: "Manish Gupta",
//       rating: 4.5,
//       comment: "Great night cream, absorbs well and no irritation.",
//       date: "2025-03-30"
//     },
//     {
//       reviewer: "Sunita Reddy",
//       rating: 4.2,
//       comment: "Good texture, wakes up with softer skin.",
//       date: "2025-02-28"
//     }
//   ]
// },

// {
//   id: 10,
//   name: "Matte Finish Sunscreen SPF 50",
//   category: "sunscreen",
//   price: 1200,
//   rating: 4.5,
//   reviews: 105,
//   image: "https://example.com/sunscreen-main.jpg",
//   images: [
//     "https://example.com/sunscreen-1.jpg",
//     "https://example.com/sunscreen-2.jpg"
//   ],
//   discountPrice: 1080,
//   offerPercentage: 10,
//   availableOffers: ["Get free lip balm on sunscreen purchase"],
//   technology: "UV Protection with Matte Effect",
//   description: "Provides broad-spectrum SPF 50 protection with a matte finish.",
//   benefits: [
//     "Non-greasy formula",
//     "Prevents sun damage",
//     "Controls oil and shine",
//     "Suitable for all skin types"
//   ],
//   howToUse: ["Apply generously 15 minutes before sun exposure", "Reapply every 2 hours"],
//   ingredients: ["Zinc Oxide", "Titanium Dioxide", "Niacinamide"],
//   info: {
//     shelfLife: "24 months",
//     skinType: "Oily to Combination",
//     manufacturedBy: "SunSafe Labs",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Meena Kapoor",
//       rating: 4.7,
//       comment: "Love the matte finish and it doesn’t clog my pores.",
//       date: "2025-05-05"
//     },
//     {
//       reviewer: "Arjun Singh",
//       rating: 4.3,
//       comment: "Good protection and very light on the skin.",
//       date: "2025-04-22"
//     },
//     {
//       reviewer: "Rashmi Verma",
//       rating: 4.5,
//       comment: "No white cast and great for daily use.",
//       date: "2025-03-14"
//     }
//   ]
// },

// {
//   id: 11,
//   name: "Calming Chamomile Toner",
//   category: "toner",
//   price: 700,
//   rating: 4.2,
//   reviews: 80,
//   image: "https://example.com/chamomile-toner-main.jpg",
//   images: [
//     "https://example.com/chamomile-toner-1.jpg",
//     "https://example.com/chamomile-toner-2.jpg"
//   ],
//   discountPrice: 630,
//   offerPercentage: 10,
//   availableOffers: ["Buy 2 get 1 free"],
//   technology: "Natural Botanical Extracts",
//   description: "Soothes sensitive skin and restores natural pH balance.",
//   benefits: [
//     "Reduces redness and irritation",
//     "Hydrates and refreshes skin",
//     "Prepares skin for moisturizer",
//     "Alcohol-free and gentle"
//   ],
//   howToUse: ["Apply with cotton pad on clean face", "Use morning and night"],
//   ingredients: ["Chamomile Extract", "Aloe Vera", "Green Tea Extract"],
//   info: {
//     shelfLife: "18 months",
//     skinType: "Sensitive Skin",
//     manufacturedBy: "Herbal Essentials",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Alok Das",
//       rating: 4,
//       comment: "Calms my skin well, especially after sun exposure.",
//       date: "2025-04-10"
//     },
//     {
//       reviewer: "Nikita Sharma",
//       rating: 4.4,
//       comment: "Gentle and refreshing toner, no irritation at all.",
//       date: "2025-03-25"
//     },
//     {
//       reviewer: "Vikram Joshi",
//       rating: 4,
//       comment: "Good toner for sensitive skin types.",
//       date: "2025-02-15"
//     }
//   ]
// },

// {
//   id: 12,
//   name: "Brightening Licorice Face Mask",
//   category: "mask",
//   price: 850,
//   rating: 4.3,
//   reviews: 60,
//   image: "https://example.com/licorice-face-mask-main.jpg",
//   images: [
//     "https://example.com/licorice-face-mask-1.jpg",
//     "https://example.com/licorice-face-mask-2.jpg"
//   ],
//   discountPrice: 765,
//   offerPercentage: 10,
//   availableOffers: ["Free exfoliator on ₹1500+"],
//   technology: "Natural Brightening Agents",
//   description: "Brightens dull skin and evens out skin tone with natural extracts.",
//   benefits: [
//     "Reduces pigmentation",
//     "Improves skin radiance",
//     "Hydrates and softens skin",
//     "Gentle exfoliation"
//   ],
//   howToUse: ["Apply evenly on face", "Leave for 15-20 minutes", "Rinse with lukewarm water"],
//   ingredients: ["Licorice Extract", "Vitamin C", "Honey"],
//   info: {
//     shelfLife: "12 months",
//     skinType: "All skin types",
//     manufacturedBy: "Glow Rituals",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Sheetal Gupta",
//       rating: 4.5,
//       comment: "Skin looks brighter and fresher after using this mask.",
//       date: "2025-04-08"
//     },
//     {
//       reviewer: "Rajesh Nair",
//       rating: 4,
//       comment: "Good mask, gentle on skin and smells nice.",
//       date: "2025-03-22"
//     },
//     {
//       reviewer: "Anita Kaur",
//       rating: 4.3,
//       comment: "Helps with dullness and uneven skin tone.",
//       date: "2025-02-27"
//     }
//   ]
// },

// {
//   id: 13,
//   name: "Exfoliating Walnut Scrub",
//   category: "scrub",
//   price: 750,
//   rating: 4.1,
//   reviews: 70,
//   image: "https://example.com/walnut-scrub-main.jpg",
//   images: [
//     "https://example.com/walnut-scrub-1.jpg",
//     "https://example.com/walnut-scrub-2.jpg"
//   ],
//   discountPrice: 675,
//   offerPercentage: 10,
//   availableOffers: ["Buy 1 get 1 30% off"],
//   technology: "Natural Walnut Shell Particles",
//   description: "Gently removes dead skin cells for smooth and glowing skin.",
//   benefits: [
//     "Exfoliates dead skin",
//     "Smoothens skin texture",
//     "Improves skin clarity",
//     "Non-irritating formula"
//   ],
//   howToUse: ["Apply on damp face", "Massage gently in circular motions", "Rinse thoroughly"],
//   ingredients: ["Walnut Shell Powder", "Aloe Vera", "Vitamin E"],
//   info: {
//     shelfLife: "18 months",
//     skinType: "All skin types",
//     manufacturedBy: "Natural Glow",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Pankaj Sharma",
//       rating: 4,
//       comment: "Leaves my skin very smooth and fresh.",
//       date: "2025-04-12"
//     },
//     {
//       reviewer: "Divya Singh",
//       rating: 4.2,
//       comment: "Nice scrub, gentle but effective.",
//       date: "2025-03-30"
//     },
//     {
//       reviewer: "Anil Kumar",
//       rating: 4,
//       comment: "Good exfoliation without irritation.",
//       date: "2025-02-20"
//     }
//   ]
// },

// {
//   id: 14,
//   name: "Hydrating Rose Water Mist",
//   category: "mist",
//   price: 600,
//   rating: 4.4,
//   reviews: 85,
//   image: "https://example.com/rose-water-mist-main.jpg",
//   images: [
//     "https://example.com/rose-water-mist-1.jpg",
//     "https://example.com/rose-water-mist-2.jpg"
//   ],
//   discountPrice: 540,
//   offerPercentage: 10,
//   availableOffers: ["Free travel size on ₹1000+"],
//   technology: "Pure Rose Extracts",
//   description: "Refreshes and hydrates skin instantly with natural rose water.",
//   benefits: [
//     "Hydrates and tones skin",
//     "Soothes irritation",
//     "Enhances makeup setting",
//     "Natural fragrance"
//   ],
//   howToUse: ["Spray on face anytime", "Use before or after makeup"],
//   ingredients: ["Rose Water", "Glycerin", "Vitamin C"],
//   info: {
//     shelfLife: "24 months",
//     skinType: "All skin types",
//     manufacturedBy: "Floral Essence",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Rekha Joshi",
//       rating: 4.5,
//       comment: "Refreshing and smells amazing.",
//       date: "2025-04-18"
//     },
//     {
//       reviewer: "Vijay Singh",
//       rating: 4.3,
//       comment: "Keeps my skin hydrated throughout the day.",
//       date: "2025-03-15"
//     },
//     {
//       reviewer: "Kiran Desai",
//       rating: 4.2,
//       comment: "Great product for a quick refresh.",
//       date: "2025-02-10"
//     }
//   ]
// },

// {
//   id: 15,
//   name: "Nourishing Vitamin E Eye Cream",
//   category: "eye-care",
//   price: 2200,
//   rating: 4.8,
//   reviews: 140,
//   image: "https://example.com/vitamin-e-eye-cream-main.jpg",
//   images: [
//     "https://example.com/vitamin-e-eye-cream-1.jpg",
//     "https://example.com/vitamin-e-eye-cream-2.jpg"
//   ],
//   discountPrice: 1980,
//   offerPercentage: 10,
//   availableOffers: ["Free facial serum on ₹3000+"],
//   technology: "Vitamin E & Antioxidant Formula",
//   description: "Reduces dark circles, puffiness and fine lines around eyes.",
//   benefits: [
//     "Brightens under-eye area",
//     "Reduces puffiness",
//     "Hydrates delicate skin",
//     "Smoothens fine lines"
//   ],
//   howToUse: ["Apply small amount around eyes", "Pat gently with ring finger", "Use morning and night"],
//   ingredients: ["Vitamin E", "Caffeine", "Shea Butter"],
//   info: {
//     shelfLife: "12 months",
//     skinType: "All skin types",
//     manufacturedBy: "EyeCare Pro",
//     countryOfOrigin: "India"
//   },
//   reviewDetails: [
//     {
//       reviewer: "Smita Patel",
//       rating: 5,
//       comment: "My under eyes look so much brighter and less puffy.",
//       date: "2025-05-01"
//     },
//     {
//       reviewer: "Ravi Kumar",
//       rating: 4.7,
//       comment: "Great eye cream, light texture and effective.",
//       date: "2025-04-22"
//     },
//     {
//       reviewer: "Sunita Mehta",
//       rating: 4.5,
//       comment: "Noticeable difference in fine lines and dark circles.",
//       date: "2025-03-30"
//     }
//   ]
// }