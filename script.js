const menu = document.getElementById('menu');
const sortBar = document.getElementById('sort-bar');
const imageGallery = document.getElementById('image-container');
const submit = document.getElementById('submit');
const popUp = document.getElementById('pop-up');
const popUpButton = document.getElementById('pop-up__button');
const subjectInput = document.getElementById('subject');
const descriptionInput = document.getElementById('text');
const popUpSubject = document.getElementById('ms_subject');
const popUpDescription = document.getElementById('ms_text');

// header section 
menu.addEventListener('click', (event) => {
  menu.querySelectorAll('a.menu__item').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});
// header section end

// slider section
const verticalPhone = document.getElementById('vertical-phone');
const horizontalPhone = document.getElementById('horizontal-phone');

verticalPhone.addEventListener('click', () => {
  let verDisplay = document.getElementById('vertical-display');
  (verDisplay.style.zIndex === '' || verDisplay.style.zIndex === '5') ? verDisplay.style.zIndex = '3' : verDisplay.style.zIndex = '5';
});

horizontalPhone.addEventListener('click', () => {
  let horDisplay = document.getElementById('horizontal-display');
  (horDisplay.style.zIndex === '' || horDisplay.style.zIndex === '5') ? horDisplay.style.zIndex = '3' : horDisplay.style.zIndex = '5';
});

// slider section end

// portfolio section
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

function indexesPattern(arr) {
  for(i = 0; i < arr.length; i++) {
    let tempNode = (document.getElementById(`image${arr[i]}`));
    imageGallery.removeChild((document.getElementById(`image${arr[i]}`)));
    imageGallery.appendChild(tempNode);
  }
}

imageGallery.addEventListener('click', (event) => {
  imageGallery.querySelectorAll('div.image-container__item > img').forEach((el) => el.classList.remove('active'));
  event.target.classList.add('active');
});
// portfolio section end

// contacts section
submit.addEventListener('click', () => {
  const regex = /\S+@\S+/;
  if(document.getElementById('user_name').value != '' && regex.test(document.getElementById('email').value)) {
    if(subjectInput.value || descriptionInput.value) {
      popUpSubject.innerText = subjectInput.value;
      popUpDescription.innerText = descriptionInput.value;
    }
    popUp.classList.remove('hidden');
  }
});

popUpButton.addEventListener('click', () => {
  document.querySelector('form').reset();
  popUpSubject.innerText = 'none';
  popUpDescription.innerText = 'none';
  popUp.classList.add('hidden');
});
// contacts section end

