import Splide from "@splidejs/splide";

var splide = new Splide('.splide', {
  pagination: false,
});
splide.mount();

splide.on('move', (newIndex, oldIndex) => {
  const progressPercentage = calculateProgressPercentage(newIndex);
  setProgressBar(progressPercentage);
  
  if (newIndex === TOTAL_IMAGES - 1) {
    console.log('TRIGGER FUC')
    activeLastProgressBarCircle();
  }

  if (oldIndex === TOTAL_IMAGES - 1) {
    // deactiveLastProgressBarCircle();
  }
});

const TOTAL_IMAGES = 3;

function activeLastProgressBarCircle() {
  const circleElement = document.querySelector(".date-bar-circle-end");
  circleElement.classList.add("date-bar-circle-active");
}

function deactiveLastProgressBarCircle() {
  const circleElement = document.querySelector(".date-bar-circle-end");
  circleElement.classList.remove("date-bar-circle-active");
}

function calculateProgressPercentage(imageIndex) {
  const percentage = Math.floor((imageIndex + 1) / TOTAL_IMAGES * 100);
  return percentage;
}

function setProgressBar(percentage) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${percentage}%`;
}