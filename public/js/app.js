$(document).ready(function(){
  var calculator = Object.create(Calculator);
  var $display = $('#display');
  var lastOperation = '';
  var clearDisplay = true;
  var equalPressCount = 0
  var lastDisplay = 0;
  var periodCount = 0;

/*  Known bugs
      When you press the same operator multiple times, it should ignore the additional inputs
        instead, it clears the screen
      Number length needs to be set to no more than 11 characters
      If a number is divided by 0, the result is infinity, trying to display "Div/0"
      When you press the minus button FIRST, it should show a negative number

*/

  $('#clear').on('click', clear);
  $('#clear-entry').on('click', clearEntry);
  $('#plus').on('click', plus);
  $('#equal').on('click', equal);
  $('#subtract').on('click', subtract);
  $('#multiply').on('click', multiply);
  $('#divide').on('click', divide);
  $('.num').on('click', updateDisplay);
  $('#mem-plus').on('click', memAdd);
  $('#mem-minus').on('click', memSub);
  $('#mem-recall').on('click', memDisplay);
  $('#mem-clear').on('click', memClear);
  $('#back').on('click', back);
  $('#sqrt').on('click', sqrt);
  $('#inverse').on('click', inverse);
  $('#percentage').on('click', percentage);



  function updateDisplay(){
    equalPressCount=0;
    var num = $(this).text();
    if(num === "."){
      periodCount = periodCount + 1;
    }
    if(periodCount <= 1){
      if(clearDisplay === true || $display.text() === "0" || $display.text() === "Div/0" || $display.text() === ""){
          $display.text(num);
      } else {
          if($display.text().length===11){
          }else{
            $display.text($display.text() + num);
          }
      }
    }
    clearDisplay = false;
    if(periodCount > 1){
      periodCount = 1;
    }
  }

  function back(){
    var checkForPeriod = $display.text().charAt($display.text().length-1);
    var num = $display.text();
    num = num.slice(0, -1); // This removes the last character in a string
    $display.text(num);
    if(checkForPeriod === "."){
      periodCount = 0;
    }
  }

  function divide(){
    equalPressCount=0;
    periodCount=0;
    if(lastOperation !== "/"){
      equal();
    }
    lastOperation = $(this).text();
    if(calculator.current === 0){
      console.log($display.text());
      if ($display.text().charAt(0)==="-") {
        calculator.current = parseFloat($display.text()) * -1;
      } else {
        calculator.current = parseFloat($display.text());
      }
    } else {
      calculator.current = calculator.current / parseFloat($display.text());
      $display.text(calculator.current);
    }
    clearDisplay=true;
  }

  function multiply(){
    equalPressCount=0;
    periodCount=0;
    if(lastOperation !== "x"){
      equal();
    }
    lastOperation = $(this).text();
    if(calculator.current === 0){
      calculator.current = parseFloat($display.text());
    } else {
      calculator.current = calculator.current * parseFloat($display.text());
      $display.text(calculator.current);
    }
    clearDisplay=true;
  }

  function subtract(){
    equalPressCount=0;
    periodCount=0;
    if(lastOperation !== "-"){
      equal();
    }
    lastOperation = $(this).text();
    if(calculator.current === 0){
      calculator.current = parseFloat($display.text());
    } else {
      calculator.current = calculator.current - parseFloat($display.text());
      $display.text(calculator.current);
    }
    clearDisplay=true;
  }

  function plus(){
    equalPressCount=0;
    periodCount=0;
    if(lastOperation !== "+"){
      equal();
    }
    lastOperation = $(this).text();
    if(calculator.current === 0){
      calculator.current = parseFloat($display.text());
    } else {
      calculator.current = calculator.current + parseFloat($display.text());
      $display.text(calculator.current);
    }
    clearDisplay=true;
  }

  function sqrt(){
    lastOperation = '';
    periodCount=0;
    calculator.current = Math.sqrt(parseFloat($display.text()));
    $display.text(calculator.current);
    clearDisplay=true;
  }

  function inverse(){
    lastOperation = '';
    periodCount=0;
    calculator.current = 1 / parseFloat($display.text());
    $display.text(calculator.current);
    clearDisplay=true;
  }

  function percentage(){
    lastOperation = '';
    periodCount=0;
    calculator.current = parseFloat($display.text()) / 100
    $display.text(calculator.current);
    clearDisplay=true;
  }

  function equal(){ //  This runs once the equal button is clicked
    equalPressCount = equalPressCount + 1;
    periodCount=0;
    if(lastOperation === ''){ //  checking to see if the user has a calculation to perform. If the press
                              //  8 then "=", the result will be what the user entered as their last number.
                              // (e.g. 8 = 8, 4 = 4, 234 = 234)
      calculator.result = parseFloat($display.text());
    } else if(lastOperation === "/") {
        if(equalPressCount === 1){
          lastDisplay = parseFloat($display.text());
          calculator.result = calculator.current / lastDisplay;
          $display.text(calculator.result);
        }else{
          calculator.result = calculator.result / lastDisplay;
          $display.text(calculator.result);
        }
    } else if(lastOperation === "x"){
        if(equalPressCount === 1){
          lastDisplay = parseFloat($display.text());
          calculator.result = calculator.current * lastDisplay;
          $display.text(calculator.result);
        }else{
          calculator.result = calculator.result * lastDisplay;
          $display.text(calculator.result);
        }
    } else if(lastOperation === "+"){
        if(equalPressCount === 1){
          lastDisplay = parseFloat($display.text());
          calculator.result = calculator.current + lastDisplay;
          $display.text(calculator.result);
        }else{
          calculator.result = calculator.result + lastDisplay;
          $display.text(calculator.result);
        }
    } else if(lastOperation === "-"){
        if(equalPressCount === 1){
          lastDisplay = parseFloat($display.text());
          calculator.result = calculator.current - lastDisplay;
          $display.text(calculator.result);
        }else{
          calculator.result = calculator.result - lastDisplay;
          $display.text(calculator.result);
        }
    } else {
        $display.text(calculator.result);
    }
    calculator.current = 0;
    clearDisplay=true;
  }

  function clear(){
    equalPressCount=0;
    lastOperation = '';
    $display.text(0);
    clearDisplay=true;
    calculator.current=0;
    periodCount=0;
  }

  function clearEntry(){
    $display.text(0);
    periodCount=0;
  }

  function memAdd(){
    calculator.memory = calculator.memory + parseFloat($display.text());
    clearDisplay=true
  }

  function memSub(){
    calculator.memory = calculator.memory - parseFloat($display.text());
    clearDisplay=true
  }

  function memClear(){
    calculator.memory = 0;
    clearDisplay=true;
  }

  function memDisplay(){
    $display.text(calculator.memory);
    clearDisplay=true;
  }
/*
  function fixedLength(num){ still working on the error checker to make sure no display will ever be over 11 characters
    if(num.length > 11){
      {num}.toFixed(11);
    }
  }
*/
});
