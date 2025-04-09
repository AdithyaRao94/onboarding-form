// Replace these with your actual SheetDB endpoints
const orgSheetURL = "https://sheetdb.io/api/v1/YOUR_ORG_SHEET_ID";
const empSheetURL = "https://sheetdb.io/api/v1/YOUR_EMP_SHEET_ID";
const assetSheetURL = "https://sheetdb.io/api/v1/YOUR_ASSET_SHEET_ID";

// Handle all forms on submit
document.addEventListener("DOMContentLoaded", () => {

  // ========== Organization Form ==========
  const orgForm = document.getElementById("org-form");
  orgForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(orgForm));
    sendDataToSheet(data, orgSheetURL, orgForm);
  });

  // ========== Employee Form ==========
  const empForm = document.getElementById("employee-form");
  empForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(empForm));
    sendDataToSheet(data, empSheetURL, empForm);
  });

  // ========== Asset Form ==========
  const assetForm = document.getElementById("asset-form");
  assetForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(assetForm);
    const deviceType = formData.get("device_type");

    // Show/hide based on device type
    toggleAssetConditionalFields(deviceType);

    const data = Object.fromEntries(formData);
    sendDataToSheet(data, assetSheetURL, assetForm);
  });

  // Watch dropdowns for conditional logic
  document.getElementById("device_type")?.addEventListener("change", (e) => {
    toggleAssetConditionalFields(e.target.value);
  });

  document.querySelectorAll("input[name='remote_location_q']").forEach((input) => {
    input.addEventListener("change", (e) => {
      const show = e.target.value === "Yes";
      document.getElementById("remote_location_1")?.classList.toggle("hidden", !show);
    });
  });
});

function toggleAssetConditionalFields(type) {
  const showDevices = ["Laptop", "Desktop", "Smartphone", "Tablet", "Server"];
  const showNetwork = ["Router", "Switch", "Firewall", "Networking"];

  const contactGroup = document.getElementById("contact-details-group");
  const osGroup = document.getElementById("os-group");
  const ipGroup = document.getElementById("ip-group");
  const macGroup = document.getElementById("mac-group");

  contactGroup?.classList.toggle("hidden", !showDevices.includes(type));
  osGroup?.classList.toggle("hidden", !showDevices.includes(type));
  ipGroup?.classList.toggle("hidden", !showNetwork.includes(type));
  macGroup?.classList.toggle("hidden", !showNetwork.includes(type));
}

// Main function to submit data
function sendDataToSheet(data, url, form) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not OK");
      return res.json();
    })
    .then(() => {
      alert("Form submitted successfully!");
      form.reset();
    })
    .catch((err) => {
      console.error("Submission error:", err);
      alert("There was an error submitting the form.");
    });
}
