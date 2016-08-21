$(document).ready(function() {
  var display = "0";
  var action;
  var total;
  var newNum = true;
  $("#screen p").text(display);

  $("button").click(function() {
    var chosen = this.id;
    console.log(chosen)
    useCalculator(chosen);
  })

  $("body").keypress(function(event) {
    var keycode = event.keyCode || event.which;
    var chosen
    if (keycode == 48 /*0*/ ) {
      chosen = "0";
    } else if (keycode == 49 /*1*/ ) {
      chosen = "1";
    } else if (keycode == 50 /*2*/ ) {
      chosen = "2";
    } else if (keycode == 51 /*3*/ ) {
      chosen = "3";
    } else if (keycode == 52 /*4*/ ) {
      chosen = "4";
    } else if (keycode == 53 /*5*/ ) {
      chosen = "5";
    } else if (keycode == 54 /*6*/ ) {
      chosen = "6";
    } else if (keycode == 55 /*7*/ ) {
      chosen = "7";
    } else if (keycode == 56 /*8*/ ) {
      chosen = "8";
    } else if (keycode == 57 /*9*/ ) {
      chosen = "9";
    } else if (keycode == 43 /* + */ ) {
      chosen = "plus";
    } else if (keycode == 45 /* - */ ) {
      chosen = "minus";
    } else if (keycode == 42 /* * */ ) {
      chosen = "times";
    } else if (keycode == 47 /* / */ ) {
      chosen = "divide";
    } else if (keycode == 46 /* . */ ) {
      chosen = ".";
    } else if (keycode == 61 || keycode == 13 /* = or Enter*/ ) {
      chosen = "equals";
      event.preventDefault();
    } else if (keycode == 37 /* % */ ) {
      chosen = "percent";
    }

    if (chosen) {
      console.log(chosen)
      useCalculator(chosen);
    }
  });

  $("body").keyup(function(event) {
    // keypress doesn't work for the backspace key, but keyup does
    var keycode = event.keyCode || event.which;
    var chosen;
    if (keycode == 8 /* backspace */ ) {
      chosen = "back";
      console.log(chosen)
      useCalculator(chosen);
    }
  })

  var useCalculator = function(chosen) {
    if (chosen == "ac") {
      total = undefined;
      display = "0";
      action = undefined;
      newNum = true;
    } else if (chosen == "back") {
      if (display.length <= 1) {
        display = "0"
        newNum = true;
      } else {
        display = display.slice(0, -1);
      }
    }
    // a number or "." was chosen
    else if (isNum(chosen)) {
      if (newNum) {
        display = "";
        newNum = false;
      }
      concatenate(chosen)
    } else if (chosen == "percent") {
      var result = parseFloat(display) / 100;
      display = result.toString();
    } else if (chosen == "sqrt") {
      var result = Math.sqrt(parseFloat(display))
        //total = result;
      display = result.toString();
    }
    // =, +, -, x, or / was chosen
    else {
      if (!total && total != 0) {
        total = parseFloat(display);
      } else {
        calculate();
      }
      display = total.toString();
      action = chosen;
      newNum = true;
    }

    // Make sure number fits on screen
    if (display.length > 10) {
      display = display.slice(0, 10);
    }
    // Display result on screen
    $("#screen p").text(display)
  }

  var isNum = function(val) {
    if (val == "0" || val == ".") {
      return true
    }
    return parseFloat(val) ? true : false
  }

  var concatenate = function(number) {
    if (display.length < 13) { // This will change once toExponential() is implemented
      display = display.concat(number)
    }
  }

  var calculate = function() {
    var num = parseFloat(display);
    if (action == "plus") {
      total += num;
    } else if (action == "minus") {
      total -= num;
    } else if (action == "times") {
      total *= num;
    } else if (action == "divide") {
      total /= num;
    }
  }

});