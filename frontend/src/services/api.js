/**
 * Simulates calling an AI service (like Gemini API) to generate food product descriptions.
 */
export async function generateProductDescription({ productName, ingredients, keyFeatures, tone }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const templates = {
    premium: [
      `Indulge in the exquisite flavor of our artisanal ${productName}. Meticulously crafted using only the finest ingredients, including ${ingredients}. Each bite offers a sophisticated taste journey, highlighting ${keyFeatures}. Perfect for discerning palates seeking a truly luxurious dining experience.`,
      `Elevate your gourmet collection with ${productName}. A symphony of taste and texture, this masterpiece features premium ${ingredients}. Our master chefs have curated this blend to celebrate ${keyFeatures}, delivering an unparalleled epicurean pleasure.`
    ],
    traditional: [
      `Experience the authentic, time-honored taste of our homemade ${productName}. Made from a cherished family recipe with wholesome ${ingredients}, it preserves the rich legacy of traditional cooking. Celebrated for its distinct character and ${keyFeatures}, it brings the warm comfort of heritage straight to your table.`,
      `Handcrafted with passion and heritage, our ${productName} brings you the true flavors of yesteryear. Featuring traditional ${ingredients}, we stay faithful to old-school methods to emphasize its classic taste and ${keyFeatures}.`
    ],
    "health-focused": [
      `Nourish your body and delight your senses with our clean-label ${productName}. Formulated with nutrient-dense ${ingredients}, it is designed to fuel your active lifestyle without compromise. Free from artificial additives, it champions wellness while showcasing ${keyFeatures}.`,
      `Fuel your day the natural way with ${productName}. Rich in premium ${ingredients}, this wholesome choice supports a balanced lifestyle. Crafted specifically to highlight its organic benefits and ${keyFeatures}, it is wellness in every bite.`
    ],
    friendly: [
      `Hey there, food lover! Get ready to meet your new favorite snack: our delicious ${productName}! Packed with goodness and real ${ingredients}, it's the perfect treat for any time of day. We've made sure to lock in amazing flavors and ${keyFeatures} so you can enjoy every single bite.`,
      `Say hello to deliciousness with our ${productName}! We combine high-quality ${ingredients} to create a tasty experience you'll want to share. With standout qualities like ${keyFeatures}, it's guaranteed to put a smile on your face.`
    ]
  };

  const selectedTone = templates[tone] || templates.premium;
  const randomIndex = Math.floor(Math.random() * selectedTone.length);
  return selectedTone[randomIndex];
}
