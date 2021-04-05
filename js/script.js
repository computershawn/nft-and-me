window.onload = () => {
  fadeInIntro();
  addFooterStyles();
  window.animateHero = true;
}

const fadeInIntro = () => {
  const bigText = document.querySelector('.big-text');
  bigText.classList.add('fade-in-big-text');

  const desc = document.querySelector('.description');
  desc.classList.add('fade-in-description');

  const everything = document.querySelector('body');
  everything.classList.add('fade-in-intro');
}

const addFooterStyles = () => {
  const row1 = document.querySelectorAll('.r1 div');
  const row2 = document.querySelectorAll('.r2 div');
  const row3 = document.querySelectorAll('.r3 div');
  const row4 = document.querySelectorAll('.r4 div');
  const row5 = document.querySelectorAll('.r5 div');
  const row6 = document.querySelectorAll('.r6 div');

  let t = 0;

  const allRows = [row1, row2, row3, row4, row5, row6];

  allRows.forEach((row, index) => {
    // t = index * 0.2;
    row.forEach((item) => {
      t += 0.03;
      item.style.animationDelay = `${t}s`;
    });
  }); 
}