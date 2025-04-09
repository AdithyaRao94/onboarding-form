// Page navigation
document.getElementById('org-form').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('org-section').classList.add('hidden');
  document.getElementById('employee-section').classList.remove('hidden');
});

document.getElementById('employee-form').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('employee-section').classList.add('hidden');
  document.getElementById('asset-section').classList.remove('hidden');
});

// Device-based dynamic logic
document.getElementById('device_type').addEventListener('change', function () {
  const type = this.value.toLowerCase();
  const contactGroup = document.getElementById('contact-details-group');
  const osGroup = document.getElementById('os-group');
  const ipGroup = document.getElementById('ip-group');
  const macGroup = document.getElementById('mac-group');

  const contactRequiredTypes = ['laptop', 'desktop', 'smartphone', 'tablet', 'server'];
  const networkingTypes = ['router', 'switch', 'firewall', 'networking'];

  contactGroup.classList.toggle('hidden', !contactRequiredTypes.includes(type));
  osGroup.classList.toggle('hidden', !contactRequiredTypes.includes(type));
  ipGroup.classList.toggle('hidden', !networkingTypes.includes(type));
  macGroup.classList.toggle('hidden', !networkingTypes.includes(type));
});

// Remote Location logic
document.querySelector('select[name=\"remote_location_q\"]').addEventListener('change', function () {
  const show = this.value === 'Yes';
  document.getElementById('remote_location_1').classList.toggle('hidden', !show);
});
