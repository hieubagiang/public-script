// ==UserScript==
// @name         Redmine Image Viewer with Thumbnail & Popup (Download Fix)
// @namespace    Violentmonkey Scripts
// @match        https://*.*/redmine/*
// @grant        none
// @version      1.2
// @author       Hieu
// @description  Hiển thị thumbnail ảnh đính kèm Redmine và mở popup ảnh full khi click.
// @run-at       document-end
// ==/UserScript==

(function () {
  const supportedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.jfif', '.webp'];

  const rows = document.querySelectorAll('table tbody tr');

  rows.forEach(row => {
    const link = row.querySelector('a.icon-attachment');
    if (!link) return;

    const href = link.getAttribute('href'); // e.g., /redmine/attachments/273043/image%20(51).png
    const fileIdMatch = href.match(/\/attachments\/(\d+)\//);
    if (!fileIdMatch) return;

    const fileId = fileIdMatch[1];
    const filename = decodeURIComponent(href.split('/').pop());
    const isImage = supportedExtensions.some(ext => filename.toLowerCase().endsWith(ext));
    if (!isImage) return;

    const imageUrl = `/redmine/attachments/download/${fileId}/${filename}`;

    // Create thumbnail image
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxHeight = '80px';
    img.style.marginTop = '5px';
    img.style.cursor = 'pointer';
    img.style.border = '1px solid #ccc';
    img.style.borderRadius = '4px';
    img.title = 'Click để xem ảnh lớn';

    // Open full image in popup on click
    img.addEventListener('click', () => {
      showPopup(imageUrl);
    });

    row.cells[0].appendChild(document.createElement('br'));
    row.cells[0].appendChild(img);
  });

  function showPopup(imageUrl) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0, 0, 0, 0.8)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';

    // Create image element
    const fullImg = document.createElement('img');
    fullImg.src = imageUrl;
    fullImg.style.maxWidth = '90%';
    fullImg.style.maxHeight = '90%';
    fullImg.style.boxShadow = '0 0 20px rgba(255,255,255,0.3)';
    fullImg.style.borderRadius = '8px';

    // Close overlay when clicked
    overlay.addEventListener('click', () => {
      overlay.remove();
    });

    overlay.appendChild(fullImg);
    document.body.appendChild(overlay);
  }
})();
