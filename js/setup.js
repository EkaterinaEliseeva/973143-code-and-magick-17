'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupWindow = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setupIcon = document.querySelector('.setup-open-icon');
var userName = setupWindow.querySelector('.setup-user-name');
var setupClose = setupWindow.querySelector('.setup-close');
var setupSubmit = setupWindow.querySelector('.setup-submit');
var setupForm = setupWindow.querySelector('.setup-wizard-form');
var wizardCoat = setupWindow.querySelector('.setup-wizard').querySelector('.wizard-coat');
var wizardEyes = setupWindow.querySelector('.setup-wizard').querySelector('.wizard-eyes');
var setupFireball = setupWindow.querySelector('.setup-fireball-wrap');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var fireballColorIndex = 0;

var getRandomIntInGap = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// создание объекта мага
var generateWizard = function () {
  return {
    name: firstNames[getRandomIntInGap(0, firstNames.length - 1)] + ' ' + lastNames[getRandomIntInGap(0, lastNames.length - 1)],
    coatColor: coatColors[getRandomIntInGap(0, coatColors.length - 1)],
    eyesColor: eyesColors[getRandomIntInGap(0, eyesColors.length - 1)]
  };
};

// создание массива объектов магов
var createWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[i] = generateWizard();
  }
  return wizards;
};

var wizards = createWizards();

// добавление свойств объекта мага шаблону
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// отрисовка магов
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarListElement.appendChild(fragment);
setupWindow.querySelector('.setup-similar').classList.remove('hidden');

// закрытие окна setup
var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
};
// открытие окна setup
var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onSetupWindowEscPress);
};
// открытие по клику на иконку
setupOpen.addEventListener('click', function () {
  openSetupWindow();
});
// закрытие по клику на крестик
setupClose.addEventListener('click', function () {
  closeSetupWindow();
});
// открытие по нажатию ентер на иконке
setupIcon.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetupWindow();
  }
});
// закрытие по нажатию ентер на крестике
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetupWindow();
  }
});
// закрытие по нажатию esc, если инпут не имеет фокуса
var onSetupWindowEscPress = function (evt) {
  if ((evt.keyCode === ESC_KEYCODE) & (userName !== document.activeElement)) {
    closeSetupWindow();
  }
};
// по нажатию на кнопку сохранить отправка формы
setupSubmit.addEventListener('click', function () {
  setupForm.submit();
});
// по нажатию enter на кнопку сохранить отправка формы
setupSubmit.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setupForm.submit();
  }
});
// изменение цвета куртки по клику
wizardCoat.addEventListener('click', function () {
  var newColorIndex = Math.floor((coatColors.indexOf(wizardCoat.style.fill) + 1) % coatColors.length);
  wizardCoat.style.fill = coatColors[newColorIndex];
  document.querySelector('input[name="coat-color"]').setAttribute('value', coatColors[newColorIndex]);
});
// изменение цвета глаз по клику
wizardEyes.addEventListener('click', function () {
  var newColorIndex = Math.floor((eyesColors.indexOf(wizardEyes.style.fill) + 1) % eyesColors.length);
  wizardEyes.style.fill = eyesColors[newColorIndex];
  document.querySelector('input[name="eyes-color"]').setAttribute('value', eyesColors[newColorIndex]);
});
// изменение цвета фаербола по клику
setupFireball.addEventListener('click', function () {
  fireballColorIndex++;
  setupFireball.style.background = fireballColors[fireballColorIndex % fireballColors.length];
  document.querySelector('input[name="fireball-color"]').setAttribute('value', fireballColors[fireballColorIndex % fireballColors.length]);
});
