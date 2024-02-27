// analytics.js

// Function to generate a unique user identifier using UUID
import { v4 as uuidv4 } from 'uuid';

export function generateUserIdentifier() {
  let userIdentifier = localStorage.getItem("user_identifier");
  if (!userIdentifier) {
    userIdentifier = "user_" + uuidv4(); // Generate UUID
    localStorage.setItem("user_identifier", userIdentifier);
  }
  return userIdentifier;
}

// Function to set a cookie with the organic source information
export function setOrganicSourceCookie(organicSource, expiryDays = 7) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + expiryDays); // Set expiry date
  const cookieValue = `organic_source=${organicSource}; expires=${expiryDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
}

// Function to get the organic source from the cookie
export function getOrganicSourceFromCookie() {
  const name = "organic_source=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

// Function to get the organic source
export function getOrganicSource() {
  const referrer = document.referrer;
  const searchEngines = {
    "google.com": "Google",
    "bing.com": "Bing",
    "yahoo.com": "Yahoo"
    // Add more search engines here if needed
  };

  let organicSource = "Other Organic Traffic";
  for (const domain in searchEngines) {
    if (referrer.includes(domain)) {
      organicSource = searchEngines[domain];
      break;
    }
  }

  return organicSource;
}
