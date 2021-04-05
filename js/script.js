window.onload = () => {
  fadeInIntro();
}

const fadeInIntro = () => {
  const bigText = document.querySelector('.big-text');
  bigText.classList.add('fade-in-big-text');

  const desc = document.querySelector('.description');
  desc.classList.add('fade-in-description');

  const everything = document.querySelector('body');
  everything.classList.add('fade-in-intro');
}