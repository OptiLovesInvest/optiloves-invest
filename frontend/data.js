// Data for properties used in the Optiloves Invest MVP.
// This file exports an array of property objects that the rest of the
// front‑end uses to populate the home page and individual property
// pages. If additional properties are added in Airtable or Webflow
// later on, update this array accordingly or source the data from
// an API/CSV loader.

const properties = [
  {
    name: "Kinshasa – Riverside Apartment (Gombe)",
    slug: "kinshasa-riverside-apartment-gombe",
    city: "Kinshasa, DR Congo",
    pricePerToken: 50,
    totalTokens: 1000,
    tokensSold: 120,
    availableTokens: 880,
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    description:
      "3-bedroom apartment in Gombe near the Congo River embankment. Strong rental demand.",
    stripeLink: null,
  },
  {
    name: "Luanda – Oceanview Villas",
    slug: "luanda-oceanview-villas",
    city: "Luanda, Angola",
    pricePerToken: 75,
    totalTokens: 800,
    tokensSold: 250,
    availableTokens: 550,
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    description: "Oceanview villas in Luanda, targeting premium rentals.",
    stripeLink: null,
  },
  {
    name: "Kinshasa – City Center Offices",
    slug: "kinshasa-city-center-offices",
    city: "Kinshasa, DR Congo",
    pricePerToken: 100,
    totalTokens: 500,
    tokensSold: 50,
    availableTokens: 450,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    description: "Grade-A offices with long-term lease potential.",
    stripeLink: null,
  },
];

/**
 * Retrieve a property by its slug. Returns undefined if no match is found.
 * @param {string} slug
 */
function getPropertyBySlug(slug) {
  return properties.find((p) => p.slug === slug);
}

// Expose the data and helper on the global window object so they can
// be consumed by plain script tags without using ES modules. Using
// global assignment avoids the need to run a local web server, which
// Chrome extensions may block.
window.properties = properties;
window.getPropertyBySlug = getPropertyBySlug;

export { properties, getPropertyBySlug };