$(document).ready(function(){
  var calculator = Object.create(Calculator);
  var $display = $('#display');
  var lastOperation = '';
  var clearDisplay = true;



  $('#clear').on('click', clear);
  $('#plus').on('click', plus);
  $('#equal').on('click', equal);
  $('#subtract').on('click', subtract);
  $('#multiply').on('click', multiply);
  $('#divide').on('click', divide);
  $('.num').on('click', updateDisplay);
  $('mem-plus').on('click', memAdd);
  $('mem-minus').on('click', memSub);
  $('mem-recall').on('click', memDisplay);
  $('mem-clear').on('click', memClear);



  function updateDisplay(){ // this only runs if a "number"ed button was clicked.
    var num = $(this).text(); // This captures the value of the button that was clicked
    //  If the variable clearDisplay is true or if what is displayed on
    //  the calculator screen = "0" or "Div/0" or "", then
    if(clearDisplay === true || $display.text() === "0" || $display.text() === "Div/0" || $display.text() === ""){
        $display.text(num); //  display which button was clicked
    } else {
        $display.text($display.text() + num); // otherwise, take what was previously clicked and append what
                                              //  was just clicked to the end of that number.  This way, if
                                              //  clicked on a 6 first, then clicked on a 4, it would take the 6
                                              //  and put a 4 behind it to show 64.
    }
    clearDisplay = false;
  }

  function divide(){ // This runs when the divide() function is called (i.e. the divide button is clicked)
    lastOperation = $(this).text(); //  Since this only runs if the divide button is clicked, $(this).text() is
                                    //  equal to the string "/", and we assign lastOperation to it (i.e. "/")
                                    //  We do this so we know what the "last" operation was in case the user
                                    //  enters =, we will know what operation to perform.
    if(calculator.current === 0){ //  checks to see if anything has been assigned to calculator.current
                                  //  [This tells us that this is the first operator in the calculated expression
                                  //  (e.g. 16 / 8 + 4 = 6), the first operator in this expression is the "/"]
      calculator.current = parseFloat($display.text()); //  if not, then change the string of numbers that
                                                        //  have been entered to a floating point number using
                                                        //  parseFloat($display.text()) and assign that number
                                                        //  to calculator.current.
    } else {  //  Otherwise, do this operation using what was previously entered (calculator.current), and divide
              //  it by the last number the user entered (parseFloat($display.text()))
              //  The "else" only executes if the "/" button was pressed AFTER another operator was already pressed.
              //  (e.g. (16 + 48) / 8 = 8) Notice the / was the second expression, so calculator.current already
              //  had 16 + 48 (or 64) stored in it.  Here 64 / 8 = 8, so calculator.current will now equal 8.
    }
    clearDisplay=true;  //  This allows the number to not disapear on the display, but sets a flag
                        //  so that the display will be cleared only when another number key is clicked
                        //  and the updateDisplay function is run.
  }

  function multiply(){

  }

  function subtract(){

  }

  function equal(){ //  This runs once the equal button is clicked

    if(lastOperation === ''){ //  checking to see if the user has a calculation to perform. If the press
                              //  8 then "=", the result will be what the user entered as their last number.
                              // (e.g. 8 = 8, 4 = 4, 234 = 234)
      calculator.result = parseFloat($display.text());
    } else {
        calculator.result = calculator.current / parseFloat($display.text());
        $display.text(calculator.result);
    }
    clearDisplay=true;
  }

  function plus(){

  }

  function clear(){

  }

  function memAdd(){

  }

  function memSub(){

  }

  function memClear(){

  }

  function memDisplay(){

  }



});
