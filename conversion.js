import {
  generateUserIdentifier,
  getOrganicSourceFromCookie,
  setOrganicSourceCookie,
  getOrganicSource,
} from "./analytics.js";
const simpleDb = [];
let totalView = 0;

// conversion.js

// Function to check if the organic source cookie exists
export function checkOrganicSourceCookie() {
  const organicSource = getOrganicSourceFromCookie();
  return organicSource !== "";
}

// Function to track conversions
export function trackConversion() {
  const referrer = document.referrer;
  const organicSource = getOrganicSourceFromCookie();
  const userIdentifier = generateUserIdentifier();
  if (!checkOrganicSourceCookie()) {
    const source = getOrganicSource();
    setOrganicSourceCookie(source); // Set the organic source in the cookie if it doesn't exist
  }

  // Send the conversion event to Google Analytics only if the organic source cookie exists
  if (checkOrganicSourceCookie()) {
    console.log(userIdentifier, organicSource, referrer);
    const traffic = {
      userIdentifier,
      organicSource,
      referrer,
      page: window.location.pathname,
    };
    const exists = simpleDb.find(
      (data) => data.userIdentifier == userIdentifier
    );
    if (!exists) {
      simpleDb.push(traffic);
    }
    totalView++;
    view.innerText = totalView;
    console.log(simpleDb, "SIMPLE DB");
    //   gtag('event', 'conversion', {
    //     'send_to': 'your_tracking_id',
    //     'event_category': 'Conversion',
    //     'event_label': organicSource,
    //     'user_id': userIdentifier
    //   });
  }
}

// Call the trackConversion() function when a conversion occurs
// For example, when a user submits a form or completes a purchase
document
  .getElementById("conversion-button")
  .addEventListener("click", function () {
    trackConversion(); // Track the conversion
  });
