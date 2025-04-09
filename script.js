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
