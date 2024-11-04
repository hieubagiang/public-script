// ==UserScript==
// @name        trendingcustom.com
// @namespace   Violentmonkey Scripts
// @match       https://trendingcustom.com/products/*
// @grant       none
// @version     1.0
// @author      -
// @description 11/4/2024, 10:54:32 AM
// ==/UserScript==
function downloadFiles(urls) {
  urls.forEach((url, index) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `file${index + 1}`; // Adjust file name as needed
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function downloadTextFile(contentArray, filename = 'download.txt') {
  // Join the array into a single string with line breaks
  const content = contentArray.join('\n');

  // Create a Blob from the content
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  // Create an anchor element and trigger the download
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Revoke the object URL to free up memory
  URL.revokeObjectURL(url);
}

function extractImageSources(container) {
  const imgElements = container.querySelectorAll('img');
  const imageUrls = [];

  imgElements.forEach((img) => {
    const url = img.getAttribute('src');
    imageUrls.push(url);
  });

  return imageUrls;
}
function generateLink(){
// Iterate through each element in singleElements
const singleElements = document.querySelectorAll('div.layer-form-item');

singleElements.forEach((element, index) => {
  const name = element.querySelector('span');
  const nameTxt = name ? name.innerText : `item${index + 1}`; // Fallback name if `span` is missing

  // Extract image sources from the current element
  const imageSources = extractImageSources(element);

  if (imageSources.length > 0) {
    // Create and append a download button for each set of image URLs
    const button = document.createElement('button');
    button.innerText = `Download ${nameTxt}.txt`;
        button.style.padding = '10px 20px';
  button.style.backgroundColor = '#007BFF';
  button.style.color = '#ffffff';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';

    button.onclick = () => downloadTextFile(imageSources, `${nameTxt}.txt`);
    element.appendChild(button);
  }
});
}

// Create the overlay button
function createOverlayButton() {
  const overlayButton = document.createElement('button');
  overlayButton.innerText = 'Generate Links';
  overlayButton.style.position = 'fixed';
  overlayButton.style.bottom = '20px';
  overlayButton.style.left = '20px';
  overlayButton.style.padding = '10px 20px';
  overlayButton.style.backgroundColor = '#007BFF';
  overlayButton.style.color = '#ffffff';
  overlayButton.style.border = 'none';
  overlayButton.style.borderRadius = '5px';
  overlayButton.style.cursor = 'pointer';
  overlayButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  overlayButton.style.zIndex = '1000';

  // Attach the `generateLink` function to the button's click event
  overlayButton.onclick = generateLink;

  // Append the button to the body
  document.body.appendChild(overlayButton);
}

// Run the function to create the button on page load
createOverlayButton();
