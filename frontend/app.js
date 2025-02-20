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

    // Hämta de fyra begreppen
    const assignment = data.assignment;
    const concepts = [
      assignment.concept_a,
      assignment.concept_b,
      assignment.concept_c,
      assignment.concept_d
    ];

    // Vänta 2 sekunder under randomiseringseffekten
    setTimeout(() => {
      // Ta bort overlay och distortion
      sweepOverlay.classList.add('hidden');
      container.classList.remove('distort');

      // Fyll listan med begrepp
      const conceptList = document.getElementById('conceptList');
      conceptList.innerHTML = ''; // Rensa gammalt innehåll
      concepts.forEach((concept) => {
        const li = document.createElement('li');
        li.textContent = concept;
        conceptList.appendChild(li);
      });

      // Visa resultatet
      resultEl.classList.remove('hidden');
      uniqueListMessage.classList.remove('hidden'); // Visa meddelandet om unik lista

      // Visa kopieraknappen
      copyBtn.classList.remove('hidden');
      copyBtn.textContent = 'Kopiera begreppen';
      copyBtn.onclick = () => {
        const textToCopy = concepts.join('\n');
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            copyBtn.textContent = 'Kopierat!';
            setTimeout(() => { copyBtn.textContent = 'Kopiera begreppen'; }, 2000);
          })
          .catch(err => console.error('Fel vid kopiering: ', err));
      };

      // Dölj "Hämtar begrepp..."
      loadingEl.classList.add('hidden');
    }, 2000);

  } catch (error) {
    console.error('Error:', error);
    alert('Något gick fel.');
  }
});
