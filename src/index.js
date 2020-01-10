import $ from 'jquery'; //импорт модуля-ей
//подкл. библиотеку устан. локально через консоль (npm i jquery --save)
//таким жэ образом можно подкл. любую другую библиотеку
import 'bootstrap';
//import 'popper.js';//нужен для работы js bootstrap

import avg from './some.js';

$(function () {

  // $('.title').html('Some text la la la');

  console.log(avg(1, 3, 4));

});


import './scss/main.scss';
// import icon_m from './img/header/icon-m.png';
// import icon_l from './img/header/icon-l.png';

// import icon_m from './img/*/**.png';