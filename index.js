window.addEventListener("load", () => {
  const slides = gsap.utils.toArray(".slide");
  const activeSlide = gsap.utils.toArray(".active-slide img");

  const getInitialTranslateZ = (slide) => {
    const style = window.getComputedStyle(slide);
    const matrix = style.transform.match(/matrix3d\((.+)\)/);
    if (matrix) {
      const values = matrix[1].split(", ");
      return parseFloat(values[14] || 0);
    }
    return 0;
  };
  const mapRange = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };
  slides.forEach((slide, index) => {
    const initialZ = getInitialTranslateZ(slide);

    ScrollTrigger.create({
      trigger: ".container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const zincrement = progress * 15000;
        const currentZ = initialZ + zincrement;

        let opacity;

        if (currentZ > -2500) {
          opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
        } else {
          opacity = mapRange(currentZ, -5000, 2500, 0, 0.5);
        }
        slide.style.opacity = opacity;
        slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
        if (currentZ < 100) {
          gsap.to(activeSlide[index], 1.5, {
            opacity: 1,
            ease: "power3.out",
          });
        } else {
          gsap.to(activeSlide[index], 1.5, {
            opacity: 0,
            ease: "power3.out",
          });
        }
      },
    });
  });
});

const startLoader = () => {
  let counterElement = document.querySelector(".counter");

  let currentValue = 0;

  const updateCounter = () => {
    if (currentValue === 100) {
      return;
    }
    currentValue += Math.floor(Math.random() * 10) + 1;

    if (currentValue > 100) {
      currentValue = 100;
    }
    counterElement.textContent = currentValue;

    let delay = Math.floor(Math.random() * 200) + 50;
    setTimeout(updateCounter, delay);
  };
  updateCounter();
};
startLoader();
gsap.to(".counter", 0.25, { delay: 3.5, opacity: 0, display: "none" });
gsap.to(".bar", 1.5, {
  delay: 3.5,
  height: 0,
  stagger: { amount: 0.5 },
  ease: "power4.inOut",
});
gsap.to(".overlay", 0.25, { delay: 3.5, opacity: 0, display: "none" });
