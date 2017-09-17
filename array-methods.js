var dataset = require('./dataset.json');
var bankBalances = dataset.bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
function getAmount(element) {
  if (element.amount > 100000) {
    return element;
  }
}

var hundredThousandairs = bankBalances.filter(getAmount);

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
function roundedDollar(element, index, array) {
  var dollarObj = {};
  dollarObj.amount = element.amount;
  dollarObj.state = element.state;
  dollarObj.rounded = Math.round(element.amount);

  return dollarObj;
}

var datasetWithRoundedDollar = bankBalances.map(roundedDollar);

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
function roundedDime(element) {
  var dimeObj = {};
  dimeObj.amount = element.amount;
  dimeObj.state = element.state;
  dimeObj.roundedDime = Math.round(element.amount*10)/10;
  return dimeObj;
}

var datasetWithRoundedDime = bankBalances.map(roundedDime);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
function sumOfBalances(previous, current, index, array) {
  return previous + parseFloat(current.amount);
}

var sumOfBankBalances = parseFloat(bankBalances.reduce(sumOfBalances, 0).toFixed(2));

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
function bumpDatInterest(previous, current, index, array) {
  var searchArray = ['WI', 'IL', 'WY', 'OH', 'GA', 'DE'];
  var amount = 0;

  if (searchArray.includes(current.state)) {
    amount = parseFloat(((current.amount) * 0.189).toFixed(2));
  } 

  return previous + amount;
}

var sumOfInterests = parseFloat(bankBalances.reduce(bumpDatInterest, 0).toFixed(2));

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
function collectStateSums(previous, current) {
  previous[current.state] += parseFloat(current.amount);
  previous[current.state] = Math.round(previous[current.state] * 100)/ 100;
  return previous;
}


var stateSums = bankBalances.reduce(collectStateSums, {});
console.log(stateSums);
/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it
  only sum values greater than 50,000 and save it to `sumOfInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var sumOfHighInterests = null;

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  datasetWithRoundedDollar : datasetWithRoundedDollar,
  datasetWithRoundedDime : datasetWithRoundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
