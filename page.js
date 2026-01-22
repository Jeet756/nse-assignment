
function drawRadialLines() {
  const canvas = document.getElementById('radial-canvas');
  const wrapper = document.querySelector('.radial-wrapper');
  const center = document.querySelector('.center-circle');
  const items = document.querySelectorAll('.radial-item');

  if (!canvas) return;
  // Draw diagram only if screen width > 770px
  if (window.innerWidth <= 770) {
    canvas.style.display = 'none';
    return;
  }

  canvas.style.display = 'block';
  canvas.width = wrapper.offsetWidth;
  canvas.height = wrapper.offsetHeight;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#ff7f00';
  ctx.lineWidth = 2;

  const wrapperRect = wrapper.getBoundingClientRect();
  const centerRect = center.getBoundingClientRect();
  const centerX = centerRect.left + centerRect.width / 2 - wrapperRect.left;
  const centerY = centerRect.top + centerRect.height / 2 - wrapperRect.top;
  const radius = centerRect.width / 2;
  const padding = 8;

  items.forEach(item => {
    const itemRect = item.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2 - wrapperRect.left;
    const itemCenterY = itemRect.top + itemRect.height / 2 - wrapperRect.top;
    const itemRadius = Math.min(itemRect.width, itemRect.height) / 2;

    const dx = itemCenterX - centerX;
    const dy = itemCenterY - centerY;
    const angle = Math.atan2(dy, dx);

    const startX = centerX + Math.cos(angle) * (radius + padding);
    const startY = centerY + Math.sin(angle) * (radius + padding);
    const endX = itemCenterX - Math.cos(angle) * (itemRadius + padding);
    const endY = itemCenterY - Math.sin(angle) * (itemRadius + padding);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });
}

// Draw on load and resize
window.addEventListener('load', drawRadialLines);
window.addEventListener('resize', drawRadialLines);
