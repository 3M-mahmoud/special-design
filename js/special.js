let icon = document.querySelector(".icons");
let ul = document.querySelector(".links ul");
icon.onclick = function (e) {
  e.stopPropagation();
  ul.classList.toggle("open");
  this.classList.toggle("close");
};
ul.onclick = (e) => {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== icon && e.target !== ul) {
    if (ul.classList.contains("open")) {
      ul.classList.toggle("open");
      icon.classList.toggle("close");
    }
  }
});

// ################################3
let setting_toggle = document.querySelector(".setting-box .setting-toggle");
setting_toggle.onclick = function () {
  setting_toggle.parentElement.classList.toggle("open");
  setting_toggle.children[0].classList.toggle("fa-spin");
};

// ################################################
let color_list = document.querySelectorAll(".color-list li");

if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("color")
  );
  color_list.forEach((e) => {
    e.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${window.localStorage.getItem("color")}"]`)
    .classList.add("active");
}

color_list.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e);
    window.localStorage.setItem("color", e.currentTarget.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      window.localStorage.getItem("color")
    );
  });
});

// ################################################
let randomBackground = document.querySelectorAll(".random-background span");
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItems = window.localStorage.getItem("background_option");

if (backgroundLocalItems === "true") {
  backgroundOption = true;
  document.querySelector(".random-background .yes").classList.add("active");
} else {
  backgroundOption = false;
  document.querySelector(".random-background .no").classList.add("active");
}

randomBackground.forEach((e) => {
  e.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      window.localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      window.localStorage.setItem("background_option", false);
    }
  });
});

let backgrounds = [
  "imgs/01.jpg",
  "imgs/02.jpg",
  "imgs/03.jpg",
  "imgs/04.jpg",
  "imgs/05.jpg",
];

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * backgrounds.length);
      document.querySelector(
        ".landing-page"
      ).style.backgroundImage = `url(${backgrounds[randomNumber]})`;
    }, 5000);
  }
}

randomizeImgs();

// #####################################################
let showBullets = document.querySelectorAll(".bullets-option span");
let bulletsOption = true;

let bulletsLocalItems = window.localStorage.getItem("bullets_option");

if (bulletsLocalItems === "block") {
  bulletsOption = true;
  document.querySelector(".bullets-option .yes").classList.add("active");
} else {
  bulletsOption = false;
  document.querySelector(".bullets-option .no").classList.add("active");
}
document.querySelector(".nav-bullets").style.display =
  window.localStorage.getItem("bullets_option");

showBullets.forEach((e) => {
  e.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.display === "show") {
      bulletsOption = true;
      window.localStorage.setItem("bullets_option", "block");
    } else {
      bulletsOption = false;
      window.localStorage.setItem("bullets_option", "none");
    }
    document.querySelector(".nav-bullets").style.display =
      window.localStorage.getItem("bullets_option");
  });
});

function handleActive(ev) {
  // Remove Active Class From All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class On Self
  ev.target.classList.add("active");
}

// #######################################
let aboutUs = document.querySelector(".about");
let ourSkills = document.querySelector(".skills");
let progress = document.querySelectorAll(".skills-progress span");
window.onscroll = () => {
  progress.forEach((e) => {
    if (
      window.scrollY <
        ourSkills.offsetTop + ourSkills.offsetHeight - this.innerHeight ||
      window.scrollY > 1500
    ) {
      e.style.width = "0";
    } else {
      e.style.width = e.dataset.progress;
    }
  });
  if (
    window.scrollY >
    aboutUs.offsetTop + aboutUs.offsetHeight - window.innerHeight
  ) {
    icon.classList.remove("close");
    ul.classList.remove("open");
  }
};

// ##############################################
document.querySelectorAll(".img-box img").forEach((img) => {
  let arr = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "eight",
    "nine",
    "ten",
  ];
  img.addEventListener("click", (e) => {
    let overly = document.createElement("div");
    overly.className = "overly";
    document.body.appendChild(overly);
    let popup = document.createElement("div");
    popup.className = "popup-overly";
    let imgNumber = e.target.src.slice(
      e.target.src.indexOf("/0") + 2,
      e.target.src.indexOf("/0") + 3
    );
    let h3 = document.createElement("h3");
    if (arr[imgNumber - 1] === undefined) {
      h3.textContent = `Image ten`;
    } else {
      h3.textContent = `Image ${arr[imgNumber - 1]}`;
    }
    popup.append(h3);

    let image = document.createElement("img");
    image.src = e.target.src.slice(e.target.src.indexOf("imgs"));
    popup.append(image);

    let span = document.createElement("span");
    span.textContent = "X";

    popup.append(span);

    document.body.append(popup);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.textContent === "X") {
    e.target.parentElement.previousSibling.remove();
    e.target.parentElement.remove();
  }
});

// ######################################################
let bullets = document.querySelectorAll(".nav-bullets .bullet");

let links = document.querySelectorAll(".links ul li a");
links.forEach((e) => {
  e.addEventListener("click", () => {
    icon.classList.toggle("close");
    ul.classList.toggle("open");
  });
});

document.onkeyup = function(e) {
  if (e.key === "Escape") {
    icon.classList.remove("close");
    ul.classList.remove("open");
  }
}

function scrollAnyWhere(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollAnyWhere(bullets);
scrollAnyWhere(links);
// ##############################################
document.querySelector(".setting-box .reset-option").onclick = function () {
  window.localStorage.clear();
  window.location.reload();
};


let scoller = document.querySelector(".scoller");
let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  scoller.style.width = `${(scrollTop / height) * 100}%`;
})

let landingPage = document.querySelector(".landing-page");
let gallery = document.querySelector(".gallery");
let timeline = document.querySelector(".timeline");
let features = document.querySelector(".features");
window.addEventListener("scroll", () => {
  if (
    window.scrollY >
    landingPage.offsetTop + landingPage.offsetHeight - window.innerHeight
  ) {
    document.querySelector(".about").classList.add("animation-left");
  } else {
    document.querySelector(".about").classList.remove("animation-left");
  }
  if (
    window.scrollY >
    ourSkills.offsetTop + ourSkills.offsetHeight - window.innerHeight
  ) {
    document.querySelector(".gallery").classList.add("animation-opacity");
  } else {
    document.querySelector(".gallery").classList.remove("animation-opacity");
  }
  if (
    window.scrollY >
    gallery.offsetTop + gallery.offsetHeight - window.innerHeight
    ) {
      document.querySelectorAll(".timeline .timeline-content .right").forEach((e) => {
        e.classList.add("animation-left");
      });
      document.querySelectorAll(".timeline .timeline-content .left").forEach((e) => {
        e.classList.add("animation-right");
      });
    } else {
      document.querySelectorAll(".timeline .timeline-content .right").forEach((e) => {
        e.classList.remove("animation-left");
      });
      document.querySelectorAll(".timeline .timeline-content .left").forEach((e) => {
        e.classList.remove("animation-right");
      });
    }
    if (
      window.scrollY >
      timeline.offsetTop + timeline.offsetHeight - window.innerHeight
    ) {
      document.querySelector(".features").classList.add("animation-opacity");
    } else {
      document.querySelector(".features").classList.remove("animation-opacity");
    }
    if (
      window.scrollY >
      features.offsetTop + features.offsetHeight - window.innerHeight
    ) {
      document.querySelector(".testimonials").classList.add("animation-opacity");
    } else {
      document.querySelector(".testimonials").classList.remove("animation-opacity");
    }
});