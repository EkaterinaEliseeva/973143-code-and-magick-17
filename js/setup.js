'use strict';

var setupWindow = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

setupWindow.classList.remove('hidden');

var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

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
