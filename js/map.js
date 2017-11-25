'use strict';

var map = document.querySelector('.map'); // удаляем класс
map.classList.remove('map--faded');

var OFFERS_NAMES = [ // массив загловков предложений
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var OFFERS_TYPES = [ // массив типов недвижимости
  'flat',
  'house',
  'bungalo'
];

var OFFERS_FEATURES = [ // массив дополнительных услуг
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var OFFERS_CHECKINS = [ // массив времени заезда
  '12:00',
  '13:00',
  '14:00'
];

var OFFERS_CHECKOUTS = [ // массив времени выезда
  '12:00',
  '13:00',
  '14:00'
];

var MIN_ROOMS = 1; // минимальное количество комнат
var MAX_ROOMS = 5; // максимальное количество комнат
var MIN_PRICE = 1000; // минимальная стоимость
var MAX_PRICE = 1000000; // максимальная стоимость

var LOCATION = { // координаты метки
  x: {
    min: 300,
    max: 900
  },
  y: {
    min: 100,
    max: 500
  }
};

var OFFERS_QUANTITY = 8;

var offersNames = OFFERS_NAMES.slice(0, OFFERS_NAMES.length); // копируем элемент массива

var getRandomValue = function (min, max) { // поиск случайного числа
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (arr) { // поиск случайного элемента массива
  var randomArr = arr[getRandomValue(0, arr.length - 1)];
  return randomArr;
};

var getOffersNames = function (names) { // функция перебора случайного заголовка из массива
  var offersNamesIndex = getRandomValue(0, names.length - 1);
  var offerName = names[offersNamesIndex];
  names.splice(offersNamesIndex, 1);
  return offerName;
};

var getOffersFeatures = function (feature) { // функция перебора услуг
  var offerFeature = []; // для получения значения в массив
  var featureQuantity = getRandomValue(1, feature.length);
  for (var i = 0; i < featureQuantity; i++) {
    offerFeature.push(feature[i]); // добавляем элемент в конец массива
  }
  return offerFeature;
};

var locationX = getRandomValue(LOCATION.x.min, LOCATION.x.max); // случайная координата метки по Х
var locationY = getRandomValue(LOCATION.y.min, LOCATION.y.max); // случайная координата метки по Y


var getOffersData = function() {// наполнение массива данными
  return {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomValue(1, 8) + '.png'
    },

    'offer': {
      'title': getOffersNames(offersNames),
      'address': 'locationX, locationY',
      'price': getRandomValue(MIN_PRICE, MAX_PRICE),
      'type': getRandomArrayElement(OFFERS_TYPES),
      'rooms': getRandomValue(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomValue(1, 4),
      'checkin': getRandomArrayElement(OFFERS_CHECKINS),
      'checkout': getRandomArrayElement(OFFERS_CHECKOUTS),
      'features': getOffersFeatures(OFFERS_FEATURES),
      'description': '',
      'photos': []
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
};

var getSimilarOffers = function () { // генерируем массив
  var offers = [];
  for (var i = 0; i < OFFERS_QUANTITY; i++) {
    offers.push(getOffersData());
  }
  return offers;
};


