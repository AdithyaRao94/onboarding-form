document.getElementById("form-container").innerHTML = `
  <h2>Organization Details</h2>
  <form id="org-form">
    <label>Organisation Name: <input type="text" required></label><br>
    <label>Primary Location Address: <input type="text" required></label><br>
    <label>Remote Locations? 
      <select id="remote-locations">
        <option value="no">No</option>
        <option value="yes">Yes</option>
      </select>
    </label><br>
    <div id="remote-fields" style="display:none;">
      <label>Remote Address 1: <input type="text"></label><br>
    </div>
    <button type="submit">Next</button>
  </form>
`;

document.getElementById("remote-locations").addEventListener("change", (e) => {
  const val = e.target.value;
  document.getElementById("remote-fields").style.display = val === "yes" ? "block" : "none";
});
// Example for organization form
document.getElementById("org-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    data: {
      org_name: document.getElementById("org_name").value,
      location: document.getElementById("hq_location").value,
      // Add other fields here
    },
  };

  fetch("https://sheetdb.io/api/v1/fazt7wz3cci82", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.ok) {
      alert("Organization Details Submitted!");
      document.getElementById("org-form").reset();
    }
  });
});
