document.addEventListener("DOMContentLoaded", () => {
  console.log('initialize scroll stuff');
  initScrollStuff();
});

const initScrollStuff = () => {
  // Init ScrollMagic
  const controller = new ScrollMagic.Controller();

  // Enable ScrollMagic only for desktop, disable on touch and mobile devices
  if (!Modernizr.touch) {
    // SCENE - parallax effect on the intro slide
    // move bcg container when intro gets out of the the view

    const introTl = new TimelineMax();

    const introDiv = document.querySelector('#intro');
    const introBackground = document.querySelector('#intro .bcg');
    const introText = document.querySelector('#intro-text');

    introTl
      .to(introText, 1.4, { y: '-10%', ease: Power1.easeOut }, '-=0.2')
      .to(introBackground, 1.4, { y: '20%', ease: Power1.easeOut }, '-=0.2')
      .to(introDiv, 0.7, { autoAlpha: 0.2, ease: Power1.easeNone }, '-=1.4');

    const introScene = new ScrollMagic.Scene({
      triggerElement: '#intro',
      triggerHook: 0,
      duration: "100%"
    })
      .setTween(introTl)
      .addTo(controller);

    // change behaviour of controller to animate scroll instead of jump
    controller.scrollTo(function (newpos) {
      TweenMax.to(window, 1, { scrollTo: { y: newpos }, ease: Power1.easeInOut });
    });
  }
}