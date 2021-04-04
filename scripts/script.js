window.onload = () => {
  fadeInIntroText();
}

const fadeInIntroText = () => {
  const bigText = document.querySelector('.big-text');
  bigText.classList.add('fade-in-big-text');

  const desc = document.querySelector('.description');
  desc.classList.add('fade-in-description');  
}