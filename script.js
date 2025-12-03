const button = document.getElementById('analyzeBtn');
const input = document.getElementById('urlInput');
const resultsContainer = document.getElementById('results');
const API_TOKEN = 'FTYBXBZ-5Q2MQYP-KAAG378-W0PKQZQ'; //Free test API token.

button.addEventListener('click', async () => {
  const websiteUrl = input.value.trim();

  if (!websiteUrl) {
    alert('Please enter a URL.');
    return;
  }

  
  resultsContainer.innerHTML = `
    <div class="text-center py-10">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
      <p class="mt-3 text-gray-300">Capturing screenshot and analyzing colors...</p>
    </div>
  `;

  try {
    
    const encodedUrl = encodeURIComponent(websiteUrl);
    const apiUrl = `https://shot.screenshotapi.net/v3/screenshot?token=${API_TOKEN}&fresh=true&url=${encodedUrl}&output=image&file_type=png&wait_for_event=load`;

    
    const img = new Image();
    img.crossOrigin = 'Anonymous'; 
    img.src = apiUrl;
    img.className = 'rounded-lg shadow-lg w-full mb-8 border border-gray-700';

    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error('Failed to load screenshot. Try a different website (e.g., google.com).'));
    });

    
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(img, 8); 

    
    resultsContainer.innerHTML = '';
    resultsContainer.appendChild(img);

    
    const paletteContainer = document.createElement('div');
    paletteContainer.className = 'grid grid-cols-5 gap-3 max-w-md mx-auto mt-6';

    palette.forEach((color) => {
      const [r, g, b] = color;
      const hexColor = rgbToHex(r, g, b);

      const colorBox = document.createElement('div');
      colorBox.className = 'flex flex-col items-center';
      colorBox.innerHTML = `
        <div class="w-12 h-12 rounded-lg shadow-md mb-1" style="background-color: rgb(${r}, ${g}, ${b})"></div>
        <span class="text-xs font-mono text-gray-300">${hexColor}</span>
      `;
      paletteContainer.appendChild(colorBox);
    });

    resultsContainer.appendChild(paletteContainer);

  } catch (error) {
    resultsContainer.innerHTML = `
      <div class="text-center py-10 text-red-400">
        <p class="font-bold">Error:</p>
        <p>${error.message}</p>
        <p class="text-sm mt-2">Try <strong>google.com</strong> or check the console.</p>
      </div>
    `;
    console.error(error);
  }
});


function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}