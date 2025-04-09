function nextStep(step) {
  if (step === 1) {
    document.getElementById("orgForm").classList.add("hidden");
    document.getElementById("empForm").classList.remove("hidden");
  } else if (step === 2) {
    document.getElementById("empForm").classList.add("hidden");
    document.getElementById("assetForm").classList.remove("hidden");
  }
}

// Submit to SheetDB
document.getElementById("assetForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const orgData = Object.fromEntries(new FormData(document.getElementById("orgForm")));
  const empData = Object.fromEntries(new FormData(document.getElementById("empForm")));
  const assetData = Object.fromEntries(new FormData(document.getElementById("assetForm")));

  const fullData = { ...orgData, ...empData, ...assetData };

  fetch("https://sheetdb.io/api/v1/fazt7wz3cci82", {
    method: "POST",
    body: JSON.stringify({ data: fullData }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (res.ok) {
      alert("Form submitted successfully!");
      window.location.reload();
    } else {
      alert("Something went wrong.");
    }
  });
});
