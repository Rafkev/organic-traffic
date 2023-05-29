// analytics.js

// Function to generate a unique user identifier
export function generateUserIdentifier() {
  const userIdentifier = localStorage.getItem("user_identifier");
  if (!userIdentifier) {
    userIdentifier = "user_" + Date.now() + Math.random();
    localStorage.setItem("user_identifier", userIdentifier);
  }
  return userIdentifier;
}

// Function to set a cookie with the organic source information
export function setOrganicSourceCookie(organicSource) {
  document.cookie = "organic_source=" + organicSource + "; path=/";
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
  var referrer = document.referrer;
  let organicSource = "Other Organic Traffic";

  if (referrer.includes("google.com")) {
    // Organic search traffic from Google
    organicSource = "Google";
  } else if (referrer.includes("bing.com")) {
    // Organic search traffic from Bing
    organicSource = "Bing";
  } else if (referrer.includes("yahoo.com")) {
    // Organic search traffic from Yahoo
    organicSource = "Yahoo";
  }

  return organicSource;
}
