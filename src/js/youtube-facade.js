document.addEventListener('DOMContentLoaded', () => {
  const facades = document.querySelectorAll('.youtube-facade-container');
  
  facades.forEach(facade => {
    facade.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video-id');
      const title = this.getAttribute('data-title');
      
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
      iframe.setAttribute('title', title);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('class', 'absolute inset-0 w-full h-full');
      
      this.innerHTML = '';
      this.appendChild(iframe);
      this.classList.remove('cursor-pointer', 'group');
    });
  });
});
