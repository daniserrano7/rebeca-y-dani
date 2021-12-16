import Splide from "@splidejs/splide";
import { info } from "./assets/info";
// @ts-ignore
import imageUrls from "./assets/img/*";

const TOTAL_IMAGES = info.length;

// INIT
initScript();

function initScript() {
  loadImages();
  setupSlider();
  setCommentText(0);
  setProgressBarByIndex(0);
}

// SLIDER
function setupSlider() {
  var splide = new Splide('.splide', {
    pagination: false,
    perMove: 1
  });
  splide.mount();
  
  splide.on('move', (newIndex: number, oldIndex: number) => {
    setProgressBarByIndex(newIndex);
    setCommentText(newIndex);
  
    if (newIndex === TOTAL_IMAGES - 1) {
      activeLastProgressBarCircle();
    }
  
    if (oldIndex === TOTAL_IMAGES - 1) {
      deactiveLastProgressBarCircle();
    }
  });
}


// IMAGES
function loadImages() {
  const carouselList = document.getElementById("carousel-list");

  info.forEach(image => {
    const { img } = image;
    const SlideElement = createCarouselSlide(img);
    carouselList.appendChild(SlideElement);
  });
}

function createCarouselSlide(img: string): HTMLElement {
  const slideElement = document.createElement('li');
  slideElement.classList.add("splide__slide");
  slideElement.style.backgroundImage = `url('${imageUrls[img]}')`;
  return slideElement
}

// COMMENT
function setCommentText(slideIndex: number): void {
  const commentElement = document.getElementById("comment-text");
  const comment = info[slideIndex].text;
  commentElement.textContent = comment;
}

// PROGRESS BAR
function setProgressBarByIndex(imageIndex: number): void {
  const progressPercentage = calculateProgressPercentage(imageIndex);
  setProgressBar(progressPercentage);
}

function activeLastProgressBarCircle(): void {
  const circleElement = document.querySelector(".date-bar-circle-end");
  circleElement.classList.add("date-bar-circle-active");
}

function deactiveLastProgressBarCircle(): void {
  const circleElement = document.querySelector(".date-bar-circle-end");
  circleElement.classList.remove("date-bar-circle-active");
}

function calculateProgressPercentage(imageIndex: number): number {
  const percentage = Math.floor((imageIndex + 1) / TOTAL_IMAGES * 100);
  return percentage;
}

function setProgressBar(percentage: number): void {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${percentage}%`;
}