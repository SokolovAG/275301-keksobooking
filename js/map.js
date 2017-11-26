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


var getOffersData = function () { // наполнение массива данными

  var locationX = getRandomValue(LOCATION.x.min, LOCATION.x.max); // случайная координата метки по Х
  var locationY = getRandomValue(LOCATION.y.min, LOCATION.y.max); // случайная координата метки по Y

  return {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomValue(1, 8) + '.png'
    },

    'offer': {
      'title': getOffersNames(offersNames),
      'address': locationX + ',' + locationY,
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

var fragment = document.createDocumentFragment();
var template = document.querySelector('template').content;
var mapPins = document.querySelector('.map__pins');

var getFeatures = function (features) { // получаем список доступных удобств
  var feature = '';
  for (var i = 0; i < features.length; i++) {
    feature += '<li class="feature feature--' + features[i] + '"></li>';
  }
  return feature;
};

var getPin = function (arrData) { // получаем метку объекта c данными массива
  var mapPin = template.querySelector('.map__pin').cloneNode(true);
  mapPin.querySelector('img').src = arrData.author.avatar;
  mapPin.style.left = arrData.location.x + 'px';
  mapPin.style.top = arrData.location.y + 'px';
  return mapPin;
};

var addPinsToMap = function (offers) { // добавляем метки на карту
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(getPin(offers[i]));
  }
  mapPins.appendChild(fragment);
};

var getCard = function (arrData) { // получаем карточку объета с данными массива
  var mapCard = template.querySelector('.map__card').cloneNode(true);
  var offerType = ''; // пустая строка для типа недвижимости
  mapCard.querySelector('h3').textContent = arrData.offer.title;
  mapCard.querySelector('small').textContent = arrData.offer.address;
  mapCard.querySelector('.popup__price').textContent = arrData.offer.price;
  if (arrData.offer.type === 'flat') {
    offerType = 'Квартира';
  } else if (arrData.offer.type === 'house') {
    offerType = 'Дом';
  } else if (arrData.offer.type === 'bungalo') {
    offerType = 'Бунгало';
  } else {
    offerType = arrData.offer.type;
  }

  mapCard.querySelector('h4').textContent = offerType;
  mapCard.querySelector('h4 + p').textContent = arrData.offer.rooms + ' для ' + arrData.offer.guests + '  гостей';
  mapCard.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + arrData.offer.checkin + ', выезд до ' + arrData.offer.checkout;
  mapCard.querySelector('.popup__features').innerHTML = getFeatures(arrData.offer.features);
  mapCard.querySelector('.popup__features + p').textContent = arrData.offer.description;

  return mapCard;
};

var renderOffers = function (offers, i) { // заполняем объявления данными из массива
  var offer = getCard(offers[i]);
  map.appendChild(offer);
};

var items = getSimilarOffers(8);
addPinsToMap(items);
renderOffers(items, 0);
