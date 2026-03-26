const button = document.getElementById('analyzeBtn');
const input = document.getElementById('urlInput');
const resultsContainer = document.getElementById('results');

button.addEventListener('click', async () => {
  const websiteUrl = input.value.trim();

  if (!websiteUrl) {
    alert('Please enter a URL.');
    return;
  }

 
  resultsContainer.innerHTML = `
    <div class="text-center py-16 bg-white border border-stone-200 rounded-xl shadow-sm">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-terracotta-500 border-t-transparent"></div>
      <p class="mt-4 text-stone-600 font-medium">Capturing canvas & extracting colors...</p>
      <div class="mt-8 max-w-2xl mx-auto px-6">
        <div class="h-64 shimmer rounded-lg mb-6 border border-stone-100"></div>
        <div class="grid grid-cols-4 md:grid-cols-8 gap-3">
          ${Array(8).fill('<div class="h-10 shimmer rounded-md border border-stone-100"></div>').join('')}
        </div>
      </div>
    </div>
  `;

  try {
    const encodedUrl = encodeURIComponent(websiteUrl);
    const apiUrl = `https://api.screenshotmachine.com?key=4abb1c&url=${encodedUrl}&dimension=1024x768`;

    const img = new Image();
    img.crossOrigin = 'Anonymous'; 
    img.src = apiUrl;
    img.className = 'rounded-xl shadow-md w-full mb-10 border border-stone-200 object-cover';

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = () => reject(new Error('Failed to load screenshot. Try a different website (e.g., google.com).'));
    });

    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(img, 8); 

    resultsContainer.innerHTML = '';
    
  
    const presentationWrapper = document.createElement('div');
    presentationWrapper.className = 'bg-white border border-stone-200 p-6 md:p-8 rounded-2xl shadow-sm';
    presentationWrapper.appendChild(img);

    const paletteContainer = document.createElement('div');
    paletteContainer.className = 'grid grid-cols-4 md:grid-cols-8 gap-4 mt-6';

    palette.forEach((color) => {
      const [r, g, b] = color;
      const hexColor = rgbToHex(r, g, b);

      const colorBox = document.createElement('div');
      colorBox.className = 'flex flex-col items-center group';
      colorBox.innerHTML = `
        <div class="w-full aspect-square rounded-lg shadow-sm border border-black/5 mb-3 transition-transform transform group-hover:-translate-y-1" style="background-color: rgb(${r}, ${g}, ${b})"></div>
        <span class="text-xs font-mono font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded select-all">${hexColor}</span>
      `;
      paletteContainer.appendChild(colorBox);
    });

    presentationWrapper.appendChild(paletteContainer);
    resultsContainer.appendChild(presentationWrapper);

  } catch (error) {
    resultsContainer.innerHTML = `
      <div class="text-center py-12 bg-red-50 border border-red-100 rounded-xl text-red-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-red-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p class="font-serif text-lg font-semibold">Processing Error</p>
        <p class="text-sm mt-1 text-red-600">${error.message}</p>
      </div>
    `;
    console.error(error);
  }
});

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}
