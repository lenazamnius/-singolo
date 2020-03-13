const MENU = document.getElementById('menu');
const SORT_BAR = document.getElementById('sort-bar');
const IMAGE_GALLERY = document.getElementById('image-container');
const SUBMIT = document.getElementById('submit');
const POP_UP = document.getElementById('pop-up');
const POP_UP_BUTTON = document.getElementById('pop-up__button');
const SUBJECT_INPUT = document.getElementById('subject');
const DESCRIPTION_INPUT = document.getElementById('text');
const POP_UP_SUBJECT = document.getElementById('ms_subject');
const POP_UP_DESCRIPTION = document.getElementById('ms_text');

// header section 
MENU.addEventListener('click', (event) => {
  MENU.querySelectorAll('a.menu__item').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});
// header section end

// slider section

// slider section end

// portfolio section
SORT_BAR.addEventListener('click', (event) => {
  IMAGE_GALLERY.querySelectorAll('div.image-container__item > img').forEach((el) => el.classList.remove('active'));
  SORT_BAR.querySelectorAll('a.sort-bar__button').forEach((el) => el.classList.remove('active'));
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

function indexesPattern(arr) {
  for(i = 0; i < arr.length; i++) {
    let tempNode = (document.getElementById(`image${arr[i]}`));
    IMAGE_GALLERY.removeChild((document.getElementById(`image${arr[i]}`)));
    IMAGE_GALLERY.appendChild(tempNode);
  }
}

IMAGE_GALLERY.addEventListener('click', (event) => {
  IMAGE_GALLERY.querySelectorAll('div.image-container__item > img').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});
// portfolio section end

// contacts section
SUBMIT.addEventListener('click', () => {
  const regex = /\S+@\S+/;
  if(document.getElementById('user_name').value != '' && regex.test(document.getElementById('email').value)) {
    if(SUBJECT_INPUT.value || DESCRIPTION_INPUT.value) {
      POP_UP_SUBJECT.innerText = SUBJECT_INPUT.value;
      POP_UP_DESCRIPTION.innerText = DESCRIPTION_INPUT.value;
    }
    POP_UP.classList.remove('hidden');
  }
});

POP_UP_BUTTON.addEventListener('click', () => {
  document.querySelector('form').reset();
  POP_UP_SUBJECT.innerText = 'none';
  POP_UP_DESCRIPTION.innerText = 'none';
  POP_UP.classList.add('hidden');
});
// contacts section end

