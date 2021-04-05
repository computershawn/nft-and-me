document.addEventListener("DOMContentLoaded", () => {
  console.log('initialize scroll stuff');
  initScrollStuff();
});

const initScrollStuff = () => {
  const controller = new ScrollMagic.Controller();

  if (!Modernizr.touch) {
    const introTl = new TimelineMax();

    const introDiv = document.querySelector('#intro');
    // const introBackground = document.querySelector('#intro .bcg');
    const introText = document.querySelector('#intro-text');

    introTl
      .to(introText, 1, { y: '-10%', ease: Power1.easeOut })
      .to(introDiv, 1, { autoAlpha: 0.2, ease: Power1.easeNone })

    const introScene = new ScrollMagic.Scene({
      triggerElement: '#intro',
      triggerHook: 0,
      duration: "100%"
    })
      .setTween(introTl)
      .addTo(controller);

    controller.scrollTo(function (newpos) {
      TweenMax.to(window, 1, { scrollTo: { y: newpos }, ease: Power1.easeInOut });
    });
  }
}