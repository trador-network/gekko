
const request = require('request-promise');

var strat = {};

var closeValues = [];

// Prepare everything our strat needs
strat.init = function () {
  this.requiredHistory = 5;
}

strat.update = function (candle) {
  console.log('start:update');
  closeValues.push(candle.close);
}

// For debugging purposes.
strat.log = function () {
  // your code!
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function (candle) {
  console.log('start:check');
  // ? get last 5 candles
  var history = candles.slice(-5);

  // ? send request to ml_service
  var prediction = rp({

    uri: `127.0.0.1:5000/predict/${history.join(',')}`,
  })
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      console.log(err);
    });


  console.log(prediction);

  // TODO calculate the delta
  var delta = candle.close - prediction;
  console.log(delta);
  // TODO update the advice
  // this.advice({
  //   direction: 'long', // or short
  //   trigger: { // ignored when direction is not "long"
  //     type: 'trailingStop',
  //     trailPercentage: 5
  //     // or:
  //     // trailValue: 100
  //   }
  // });
}

// Optional for executing code
// after completion of a backtest.
// This block will not execute in
// live use as a live gekko is
// never ending.
strat.end = function () {
  // ? TODO clear state
  closeValues = [];
}

module.exports = strat;
