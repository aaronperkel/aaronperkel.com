// Contact details for /me, the luggage-tag card. This is the one place on the
// site that deliberately shows a phone number and street address, and the page
// is noindex for that reason — keep these out of every other data file and out
// of the Person schema in app/layout.tsx.
export const contact = {
  name: "Aaron Perkel",
  firstName: "Aaron",
  lastName: "Perkel",
  phone: "+1 478-262-8935",
  email: "me@aaronperkel.com",
  street: "77 N Union St Unit 3",
  city: "Burlington",
  region: "VT",
  postal: "05401",
  country: "USA",
  tagline: "If this tag is on something I’ve lost, please reach out — thank you.",
};

export const fullAddress = `${contact.street}, ${contact.city}, ${contact.region} ${contact.postal}, ${contact.country}`;
export const phoneDigits = contact.phone.replace(/[^+\d]/g, "");
export const mapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(
  `${contact.street} ${contact.city} ${contact.region} ${contact.postal}`,
)}`;
export const foundMailto = `mailto:${contact.email}?subject=${encodeURIComponent(
  "Found your bag",
)}&body=${encodeURIComponent(`Hi ${contact.firstName}, I found your bag.`)}`;
