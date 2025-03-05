import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "John Doe",
      email: "admin@example.com",
      password: hashSync("123456", 10),
      role: "admin",
    },
    {
      name: "Jane Doe",
      email: "user@example.com",
      password: hashSync("123456", 10),
      role: "user",
    },
  ],
  products: [
    // Adult dog 1
    {
      name: "Love 'em air dried beef liver ",
      slug: "love-em-air-dried-beef-liver",
      categoryId: "81e0c0fb-8f14-40d7-8e99-f5ae5669dfe3",
      description:
        "Treat your furry friend to the rich, savory taste of Love em air dried beef liver. Packed with protein and essential nutrients, this delicious snack is perfect for training or just showing your pet some extra love.",
      images: [
        "/images/sample-products/da1.webp",
        "/images/sample-products/da1-2.webp",
      ],
      price: 19.99,
      brand: "Love 'em",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Adult dog 2
    {
      name: "Chicken with rice",
      slug: "love-em-air-dried-beef-liver",
      categoryId: "81e0c0fb-8f14-40d7-8e99-f5ae5669dfe3",
      description:
        "Treat your furry friend to the rich, savory taste of Love em air dried beef liver. Packed with protein and essential nutrients, this delicious snack is perfect for training or just showing your pet some extra love.",
      images: [
        "/images/sample-products/da2.webp",
        "/images/sample-products/da2-2.webp",
      ],
      price: 19.99,
      brand: "Advance",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Adult dog 3
    {
      name: "Royal Canin Digestive care",
      slug: "love-em-air-dried-beef-liver",
      categoryId: "81e0c0fb-8f14-40d7-8e99-f5ae5669dfe3",
      description:
        "Treat your furry friend to the rich, savory taste of Love em air dried beef liver. Packed with protein and essential nutrients, this delicious snack is perfect for training or just showing your pet some extra love.",
      images: [
        "/images/sample-products/da3.webp",
        "/images/sample-products/da3-2.webp",
      ],
      price: 19.99,
      brand: "Royal Canin",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Adult dog 4
    {
      name: "Purina ONE SmartBlend ",
      slug: "purina-one-smartblend",
      categoryId: "81e0c0fb-8f14-40d7-8e99-f5ae5669dfe3",
      description: "Classic Polo style with modern comfort",
      images: ["/images/sample-products/da-4.avif"],
      price: 19.99,
      brand: "Purina",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Puppy dog 1
    {
      name: "Turkey fillet treats",
      slug: "purina-one-smartblend",
      categoryId: "03c83fbf-d0d2-453e-84fa-3c6935c63ff6",
      description: "Classic Polo style with modern comfort",
      images: ["/images/sample-products/dp1.avif"],
      price: 19.99,
      brand: "Prime100",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Puppy dog 2
    {
      name: "Royal canin dry food puppy",
      slug: "purina-one-smartblend",
      categoryId: "03c83fbf-d0d2-453e-84fa-3c6935c63ff6",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/dp2.avif",
        "/images/sample-products/dp2-2.avif",
      ],
      price: 19.99,
      brand: "Royal Canin",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Puppy dog 3
    {
      name: "Royal canin daschund dry food puppy",
      slug: "purina-one-smartblend",
      categoryId: "03c83fbf-d0d2-453e-84fa-3c6935c63ff6",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/dp3.avif",
        "/images/sample-products/dp3-2.avif",
      ],
      price: 19.99,
      brand: "Royal Canin",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Special care dog 1
    {
      name: "Advocate fleas heartworm and worm medicine",
      slug: "purina-one-smartblend",
      categoryId: "f737d8e0-e1b5-435c-ab81-3c83947968d9",
      description: "Classic Polo style with modern comfort",
      images: ["/images/sample-products/ds1.avif"],
      price: 19.99,
      brand: "Advocate",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Special care dog 2
    {
      name: "NexGard spectra parasite treatment",
      slug: "purina-one-smartblend",
      categoryId: "f737d8e0-e1b5-435c-ab81-3c83947968d9",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/ds2.avif",
        "/images/sample-products/ds2-2.avif",
      ],
      price: 19.99,
      brand: "NexGard",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },

    // Kitten 1
    {
      name: "Grilled Chicken Fillet treat",
      slug: "purina-one-smartblend",
      categoryId: "3c7db759-08ce-4a42-a805-9c0ecb1d49f4",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/ck1.avif",
        "/images/sample-products/ck1-2.avif",
      ],
      price: 19.99,
      brand: "INABA",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Kitten 2
    {
      name: "Royal Canin 12 pack chicken chunks in jelly",
      slug: "purina-one-smartblend",
      categoryId: "3c7db759-08ce-4a42-a805-9c0ecb1d49f4",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/ck2.avif",
        "/images/sample-products/ck2-2.avif",
      ],
      price: 19.99,
      brand: "Royal Canin",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Kitten 3
    {
      name: "Purina Pro plan chicken formula",
      slug: "purina-one-smartblend",
      categoryId: "3c7db759-08ce-4a42-a805-9c0ecb1d49f4",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/ck3.avif",
        "/images/sample-products/ck3-2.avif",
      ],
      price: 19.99,
      brand: "Purina",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Cat adult 1
    {
      name: "Royal Canin home life dry food moderate calorie",
      slug: "purina-one-smartblend",
      categoryId: "ae6eff32-a51d-455d-8db7-7cdba9461df0",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/ca1.avif",
        "/images/sample-products/ca1-2.avif",
      ],
      price: 19.99,
      brand: "Royal Canin",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Cat adult 2
    {
      name: "Fancy feast petite delights triple flavor pack",
      slug: "purina-one-smartblend",
      categoryId: "ae6eff32-a51d-455d-8db7-7cdba9461df0",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/ca2.avif",
        "/images/sample-products/ca2-2.avif",
      ],
      price: 19.99,
      brand: "Purina",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Cat adult 3
    {
      name: "Dine tuna & chicken",
      slug: "purina-one-smartblend",
      categoryId: "ae6eff32-a51d-455d-8db7-7cdba9461df0",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/ca3.avif",
        "/images/sample-products/ca3-2.avif",
      ],
      price: 19.99,
      brand: "Dine",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Cat special 1
    {
      name: "Bravecto flea tick and worm medicine",
      slug: "purina-one-smartblend",
      categoryId: "ff9e074c-4855-45b8-a2a1-091e42ea8552",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/cs1.avif",
        "/images/sample-products/cs1-2.avif",
      ],
      price: 19.99,
      brand: "Bravecto",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Cat special 2
    {
      name: "Royal canin urinary care molases in gravy",
      slug: "purina-one-smartblend",
      categoryId: "ff9e074c-4855-45b8-a2a1-091e42ea8552",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/cs2.avif",
        "/images/sample-products/cs2-2.avif",
      ],
      price: 19.99,
      brand: "Royal Canin",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
    // Cat special 3
    {
      name: "Feline Greenies dental treats",
      slug: "purina-one-smartblend",
      categoryId: "ff9e074c-4855-45b8-a2a1-091e42ea8552",
      description: "Classic Polo style with modern comfort",
      images: [
        "/images/sample-products/cs3.avif",
        "/images/sample-products/cs3-2.avif",
      ],
      price: 19.99,
      brand: "Greenies",
      rating: 4.5,
      numReviews: 10,
      stock: 6,
      isFeatured: false,
      banner: null,
    },
  ],
  categories: [
    {
      name: "all",
    },
    {
      name: "cat",
      subcategories: [
        { name: "kitten" },
        { name: "adult" },
        { name: "special care" },
      ],
    },
    {
      name: "dog",
      subcategories: [
        { name: "puppy" },
        { name: "adult" },
        { name: "special care" },
      ],
    },
    {
      name: "fish",
      subcategories: [
        { name: "freshwater" },
        { name: "saltwater" },
        { name: "tropical and exotic" },
      ],
    },
    {
      name: "bird",
      subcategories: [
        { name: "parakeet" },
        { name: "wild bird" },
        { name: "parrot" },
      ],
    },
  ],
};

export default sampleData;
