const frames = [
  "resources/images/book_animation/book2.png",
  "resources/images/book_animation/book3.png",
  "resources/images/book_animation/book4.png",
  "resources/images/book_animation/book5.png",
  "resources/images/book_animation/book6.png",
  "resources/images/book_animation/book7.png",
  "resources/images/book_animation/book8.png",
];

const base_frame = "resources/images/book.png";
const frame_delay = 65;
const fade_duration = 250;

[...frames, base_frame].forEach((src) => {
  const i = new Image();
  i.src = src;
});

const keyframe = document.querySelector(".scrapbook-keyframe");
const pages = [...document.querySelectorAll(".scrapbook-content")];
let current_page = pages.findIndex((p) => p.classList.contains("active"));
if (current_page === -1) {
  current_page = 0;
  pages[current_page].classList.add("active");
}
let animating = false;

function play_flip_animation(onDone) {
  animating = true;
  let i = 0;
  const interval = setInterval(() => {
    keyframe.src = frames[i];
    i++;
    if (i >= frames.length) {
      clearInterval(interval);
      keyframe.src = base_frame;
      animating = false;
      onDone();
    }
  }, frame_delay);
}

function flip_to_page(index) {
  if (
    animating ||
    index === current_page ||
    index < 0 ||
    index >= pages.length
  ) {
    return;
  }

  pages[current_page].classList.remove("active");
  play_flip_animation(() => {
    current_page = index;
    pages[current_page].classList.add("active");
  });
}

document.querySelectorAll(".next-page-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    flip_to_page((current_page + 1) % pages.length);
  });
});

document.querySelectorAll(".prev-page-button").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    flip_to_page((current_page - 1 + pages.length) % pages.length);
  });
});
