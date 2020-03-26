const sections = document.querySelectorAll('section');
const menu = document.getElementById('menu');
const burgerIcon = document.getElementById('burger-main');
const popupBurgerIcon = document.getElementById('popup-burger');
const popupPanel = document.getElementById('popup-panel');
const popupMenu = document.getElementById('popup-menu');
const slides = document.querySelectorAll('.slide');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');
const verticalPhone = document.getElementById('vertical-phone');
const horizontalPhone = document.getElementById('horizontal-phone');
const sortBar = document.getElementById('sort-bar');
const imageGallery = document.getElementById('image-container');
const submit = document.getElementById('submit');
const popUp = document.getElementById('pop-up');
const popUpButton = document.getElementById('pop-up__button');
const subjectInput = document.getElementById('subject');
const descriptionInput = document.getElementById('text');
const popUpSubject = document.getElementById('ms_subject');
const popUpDescription = document.getElementById('ms_text');

// make responsive height of section banner
window.onresize = setSliderHeight;

function setSliderHeight() {
  let slideHeight;
  const banner = document.querySelector('section.banner');
  if(window.innerWidth < 768) {
    slideHeight = window.innerWidth / 1.7 + 71;
    banner.style.height = `${slideHeight}px`;
  } else if(window.innerWidth < 1020) {
    slideHeight = window.innerWidth / 1.7 + 95;
    banner.style.height = `${slideHeight}px`;
  } else {
    banner.style.height = '695px';
  }
}

// remove hover styles on touch screens
function watchHover() {
  let hasHoverClass = false;
  let lastTouchTime = 0;
  const container = document.body;

  function enableHover() {
    // filter emulated events coming from touch events
    if (new Date() - lastTouchTime < 500) return;
    if (hasHoverClass) return;
    
    container.classList.add('hasHover');
    hasHoverClass = true;
  }

  function disableHover() {
    if (!hasHoverClass) return;
    
    container.classList.remove('hasHover');
    hasHoverClass = false;
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date();
  }

  document.addEventListener('touchstart', updateLastTouchTime, true);
  document.addEventListener('touchstart', disableHover, true);
  document.addEventListener('mousemove', enableHover, true);

  enableHover();
}

watchHover();

// -----------------------------------------------------------------------------------   HEADER section 
// track position of sections and add class active to menu items
function checkPositionAddActive(container, item, margin) {
  const curPosition = window.scrollY + margin;

  sections.forEach((el) => {
    if(el.offsetTop < curPosition && (el.offsetTop + el.offsetHeight) > curPosition) {
      container.querySelectorAll(item).forEach((a) => {
        a.classList.remove('active');
        if(el.getAttribute('id') === a.getAttribute('href').substring(1)) {
          a.classList.add('active');
        }
      });
    }
  });
}

function onScroll(event) {
  if(window.innerWidth < 768) {
    checkPositionAddActive(popupMenu, 'a.popup-panel__menu-item', 71);
  } else {
    checkPositionAddActive(menu, 'a.menu__item', 95);
  }
}

document.addEventListener('scroll', onScroll);


// popup panel behavior
burgerIcon.addEventListener('click', () => {
  popupPanel.classList.remove('hidden');
});

popupBurgerIcon.addEventListener('click', () => {
  popupPanel.classList.add('hidden');
});

popupMenu.addEventListener('click', (event) => {
  event.target.classList.add('active');
  popupPanel.classList.add('hidden');
});
// HEADER section end

// -----------------------------------------------------------------------------------   SLIDER section
let currentSlide = 0;
let isEnabled = true;

function changeCurrentSlide(num) {
  currentSlide = (num + slides.length) % slides.length;
}

function hideSlide(direction) {
  isEnabled = false;
  slides[currentSlide].classList.add(direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showSlide(direction) {
  slides[currentSlide].classList.add('next', direction);
  slides[currentSlide].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function prevSlide(num) {
  hideSlide('to-left');
  changeCurrentSlide(currentSlide - 1);
  showSlide('from-right');
}

function nextSlide(num) {
  hideSlide('to-right');
  changeCurrentSlide(currentSlide + 1);
  showSlide('from-left');
}

function changeBackground() {
  const background = document.querySelector('section.banner');
  if(!background.style.backgroundColor || background.style.backgroundColor === 'rgb(239, 108, 100)') {
    background.style.backgroundColor = 'rgb(100, 139, 240)';
    background.style.borderBottom = '6px solid rgb(101, 128, 195)'
  } else {
    background.style.backgroundColor = 'rgb(239, 108, 100)';
    background.style.borderBottom = '6px solid #ea676b'
  } 
}

verticalPhone.addEventListener('click', () => {
  let verDisplay = document.getElementById('vertical-display');
  (!verDisplay.style.zIndex || verDisplay.style.zIndex === '5') ? verDisplay.style.zIndex = '3' : verDisplay.style.zIndex = '5';
});

horizontalPhone.addEventListener('click', () => {
  let horDisplay = document.getElementById('horizontal-display');
  (!horDisplay.style.zIndex || horDisplay.style.zIndex === '5') ? horDisplay.style.zIndex = '3' : horDisplay.style.zIndex = '5';
});

leftArrow.addEventListener('click', () => {
  if(isEnabled) {
    prevSlide(currentSlide);
    changeBackground();
  }
});

rightArrow.addEventListener('click', () => {
  if(isEnabled) {
    nextSlide(currentSlide);
    changeBackground();
  }
});
// SLIDER section end

// -----------------------------------------------------------------------------------   PORTFOLIO section
function indexesPattern(arr) {
  for(i = 0; i < arr.length; i++) {
    let tempNode = (document.getElementById(`image${arr[i]}`));
    imageGallery.removeChild((document.getElementById(`image${arr[i]}`)));
    imageGallery.appendChild(tempNode);
  }
}

sortBar.addEventListener('click', (event) => {
  imageGallery.querySelectorAll('div.image-container__item > img').forEach((el) => el.classList.remove('active'));
  sortBar.querySelectorAll('a.sort-bar__button').forEach((el) => el.classList.remove('active'));
  const imagesArrLength =  document.querySelectorAll('.image-container__item').length;
  const indexesArr = Array.from({length:imagesArrLength}, (num1, num2) => num2 + 1);
  if(document.getElementById('web_btn').isSameNode(event.target)) {
    const evenIndexes = indexesArr.filter(a => a % 2 === 0);
    const oddIndexes = indexesArr.filter(a => a % 2 !== 0);
    const evenOddArr = [...evenIndexes, ...oddIndexes];
    indexesPattern(evenOddArr);
  } else if(document.getElementById('graphic_btn').isSameNode(event.target)) {
    const shuffledIndexesArr = indexesArr.sort((a, b) => -1 + Math.random() * 3);
    indexesPattern(shuffledIndexesArr);
  } else if(document.getElementById('art_btn').isSameNode(event.target)) {
    const reversedIndexesArr = indexesArr.reverse();
    indexesPattern(reversedIndexesArr);
  } else {
    indexesPattern(indexesArr);
  }
  event.target.classList.add('active');
});


imageGallery.addEventListener('click', (event) => {
  imageGallery.querySelectorAll('div.image-container__item > img').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});
// PORTFOLIO section end

// -----------------------------------------------------------------------------------   CONTACTS section
submit.addEventListener('click', () => {
  const regex = /\S+@\S+/;
  if(document.getElementById('user_name').value != '' && regex.test(document.getElementById('email').value)) {
    if(subjectInput.value || descriptionInput.value) {
      (subjectInput.value === '') ? popUpSubject.innerText = 'No subject': popUpSubject.innerText = subjectInput.value;
      (descriptionInput.value === '') ? popUpDescription.innerText = 'No description': popUpDescription.innerText = descriptionInput.value;
    }
    popUp.classList.remove('hidden');
  }
});

popUpButton.addEventListener('click', () => {
  document.querySelector('form').reset();
  popUpSubject.innerText = 'No subject';
  popUpDescription.innerText = 'No description';
  popUp.classList.add('hidden');
});
// CONTACTS section end

