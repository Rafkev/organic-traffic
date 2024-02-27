// analytics.js

// Function to generate a unique user identifier using custom UUID generator
function generateUUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

export function generateUserIdentifier() {
  let userIdentifier = localStorage.getItem("user_identifier");
  if (!userIdentifier) {
    userIdentifier = "user_" + generateUUID(); // Generate UUID using custom function
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
