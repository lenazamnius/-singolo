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


MENU.addEventListener('click', (event) => {
  MENU.querySelectorAll('a.menu__item').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});

SORT_BAR.addEventListener('click', (event) => {
  IMAGE_GALLERY.querySelectorAll('div.image-container__item > img').forEach((el) => el.classList.remove('active'));
  SORT_BAR.querySelectorAll('a.sort-bar__button').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});

IMAGE_GALLERY.addEventListener('click', (event) => {
  IMAGE_GALLERY.querySelectorAll('div.image-container__item > img').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});

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

