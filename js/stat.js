'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_SIZE = 16;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, text, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var roundToWhole = function (arr) {

  for (var i = 0; i < arr.length; i++) {
    arr[i] = Math.round(arr[i]);
  }

  return arr;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgb(255, 255, 255)');

  ctx.font = FONT_SIZE + 'px PT Mono';
  renderText(ctx, CLOUD_X + 2 * GAP, CLOUD_Y + 3 * GAP, 'Ура вы победили!', 'rgb(0, 0, 0)');
  renderText(ctx, CLOUD_X + 2 * GAP, CLOUD_Y + FONT_SIZE + 4 * GAP, 'Список результатов:', 'rgb(0, 0, 0)');

  var maxTime = getMaxElement(roundToWhole(times));

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, (CLOUD_X + 3 * GAP) + (BAR_GAP + TEXT_WIDTH) * i, CLOUD_Y + 2 * FONT_SIZE + 8 * GAP + BAR_HEIGHT, names[i], 'rgb(0, 0, 0)');
    renderText(ctx, (CLOUD_X + 3 * GAP) + (BAR_GAP + TEXT_WIDTH) * i, CLOUD_Y + 2 * FONT_SIZE + 5 * GAP + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime, times[i], 'rgb(0, 0, 0)');
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 77, 255,' + Math.random() + ')';
    }
    ctx.fillRect((CLOUD_X + 3 * GAP) + (BAR_GAP + TEXT_WIDTH) * i, CLOUD_Y + 2 * FONT_SIZE + 6 * GAP + BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime, TEXT_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
  }
};


