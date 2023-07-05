/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./config.js":
/*!*******************!*\
  !*** ./config.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Data = {\r\n  key : \"2dc173b0ff579a19d5b495197fda8765\"\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Data);\n\n//# sourceURL=webpack://Modularization/./config.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./utils.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config.js */ \"./config.js\");\n\n\n\nconst searchBar = document.querySelector('#searchBar');\nconst container = document.querySelector(\".container\");\nconst cityNameContainer = document.querySelector('.city-name');\n\nconst weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];\n\nsearchBar.addEventListener(\"keyup\", (event) => {\n  if (event.key === \"Enter\") {\n    const city = event.target.value.toLowerCase();\n    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&appid=${_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].key}`;\n    event.currentTarget.value = \"\";\n\n    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData)(apiUrl, container)\n      .then((data) => {\n        const lon = data.city.coord.lon;\n        const lat = data.city.coord.lat;\n        cityNameContainer.innerHTML = data.city.name;\n\n        const finalUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=5&units=metric&exclude=minutely,hourly,alerts&appid=${_config_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].key}`;\n        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchWeatherData)(finalUrl, container);\n      })\n      .then((data) => {\n        console.log(\n          \"Welcome to this basic weather app. this is not a product but the product of an academic exercise.\"\n        );\n        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.processWeatherData)(data, container, weekdays);\n      });\n  }\n});\n\n\n//# sourceURL=webpack://Modularization/./index.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearContainer: () => (/* binding */ clearContainer),\n/* harmony export */   createWeatherCard: () => (/* binding */ createWeatherCard),\n/* harmony export */   fetchWeatherData: () => (/* binding */ fetchWeatherData),\n/* harmony export */   processWeatherData: () => (/* binding */ processWeatherData)\n/* harmony export */ });\nconst clearContainer = (container) => {\r\n    while (container.firstChild) {\r\n      container.removeChild(container.firstChild);\r\n    }\r\n  };\r\n  \r\n  const fetchWeatherData = (url, container) => {\r\n    return fetch(url)\r\n      .then((response) => response.json())\r\n      .catch((error) => {\r\n        console.error(\"Error:\", error);\r\n        clearContainer(container);\r\n        alert(\"Are you sure you aren't holding your map upside down?\");\r\n      });\r\n  };\r\n  \r\n  const createWeatherCard = (day, data, container) => {\r\n    const cardContent = `\r\n      <div class=\"card\">\r\n          <div class=\"imgBx\">\r\n              <img src=\"http://openweathermap.org/img/wn/${data.weather[0].icon}.png\">\r\n          </div>\r\n          <div class=\"contentBx\">\r\n              <h2>${day}</h2>\r\n              <h4>${data.weather[0].description}</h4>\r\n              <div class=\"color\">\r\n                  <h3>Temp:</h3>\r\n                  <span class=\"current-temp\">${data.temp.day}°C</span>\r\n              </div>\r\n              <div class=\"details\">\r\n                  <h3>More:</h3>\r\n                  <span class=\"min-temp\">${data.temp.min}°C</span>\r\n                  <span class=\"max-temp\">${data.temp.max}°C</span>\r\n              </div>\r\n          </div>\r\n      </div>`;\r\n    container.innerHTML += cardContent;\r\n  };\r\n  \r\n  const processWeatherData = (data, container, weekdays) => {\r\n    clearContainer(container);\r\n    for (let i = 0; i < 5; i++) {\r\n      const date = new Date();\r\n      const dayOfTheWeek = weekdays[(date.getDay() + i) % 7];\r\n      createWeatherCard(dayOfTheWeek, data.daily[i], container);\r\n    }\r\n  };\r\n  \n\n//# sourceURL=webpack://Modularization/./utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;