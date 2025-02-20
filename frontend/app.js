document.getElementById('groupForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // Hindra sidladdning

  const groupNumber = document.getElementById('groupNumber').value.trim();
  if (!groupNumber) {
    alert('Ange ett gruppnummer.');
    return;
  }

  // Visa "Hämtar begrepp..."
  const loadingEl = document.getElementById('loading');
  loadingEl.classList.remove('hidden');

  // Dölj tidigare resultat
  const resultEl = document.getElementById('result');
  resultEl.classList.add('hidden');
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.classList.add('hidden');
  const uniqueListMessage = document.getElementById('uniqueListMessage');
  uniqueListMessage.classList.add('hidden');

  // Visa svepeffekt och glitch under randomisering
  const sweepOverlay = document.getElementById('sweepOverlay');
  sweepOverlay.classList.remove('hidden');
  const container = document.getElementById('mainContainer');
  container.classList.add('distort');

  try {
    const API_URL = "https://conrad-backend.onrender.com";
    const response = await fetch(`${API_URL}/api/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupNumber })
    });

    const data = await response.json();
    if (!response.ok) {
      alert(`Fel: ${data.error}`);
      return;
    }

    setTimeout(() => {
      sweepOverlay.classList.add('hidden');
      container.classList.remove('distort');

      document.getElementById('conceptList').innerHTML = data.assignment
        ? Object.values(data.assignment).map(concept => `<li>${concept}</li>`).join('')
        : '';

      resultEl.classList.remove('hidden');
      uniqueListMessage.classList.remove('hidden');
      copyBtn.classList.remove('hidden');

      loadingEl.classList.add('hidden');
    }, 2000);

  } catch (error) {
    console.error('Error:', error);
    alert('Något gick fel.');
  }
});
