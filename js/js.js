
var today = new Date();
var day = '';
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
var count = s + 1; // start cycle countdown from the right place

var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function getMinute() {
    today = new Date();
    h = today.getHours();
    m = today.getMinutes();
    s = today.getSeconds();
    var m2 = (m < 10 ? "0" : "") + m;
    var s2 = (s < 10 ? "0" : "") + s;
    var i = s * 6; // transformation degree

    var dayProgress = (((60 * 60 * h) + (60 * m) + s)) / (24 * 60 * 60) * 100;
    var dayProgressRounded = dayProgress.toFixed(3);

    // --- set weekday
    day = today.getDay();
    weekDay = weekday[today.getDay()];
    $(".weekday").html(weekDay);

    // -- set clock time
    $(".clock-time").html(h + ":" + m2 + ":" + s2);

    // --- for testing
    // day = 4;
    // h = 22;
    // m = 59;

    // -- transform seconds
    // I know this could be better done with SVG, but I just wanted to see if I can do it only CSS/JS too
    if (count < 31) { // 1
        $(".half-minute-1").css({ "-o-transform": "rotate(" + i + "deg)", "-moz-transform": "rotate(" + i + "deg)", "-webkit-transform": "rotate(" + i + "deg)" });
        $(".half-minute-2").css({ "-o-transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)", "-webkit-transform": "rotate(0deg)" });
    }

    if (count > 30 && count < 61) { // 2
        $(".half-minute-1").css({ "-o-transform": "rotate(180deg)", "-moz-transform": "rotate(180deg)", "-webkit-transform": "rotate(180deg)" });
        $(".half-minute-2").css({ "-o-transform": "rotate(" + (i - 180) + "deg)", "-moz-transform": "rotate(" + (i - 180) + "deg)", "-webkit-transform": "rotate(" + (i - 180) + "deg)" });
    }

    if (count > 60 && count < 91) { // 3
        $(".half-minute-1").css({ "-o-transform": "rotate(" + (i + 180) + "deg)", "-moz-transform": "rotate(" + (i + 180) + "deg)", "-webkit-transform": "rotate(" + (i + 180) + "deg)" });
        $(".half-minute-2").css({ "-o-transform": "rotate(180deg)", "-moz-transform": "rotate(180deg)", "-webkit-transform": "rotate(180deg)" });
    }

    if (count > 90 && count < 121) { // 4
        $(".half-minute-2").css({ "-o-transform": "rotate(" + i + "deg)", "-moz-transform": "rotate(" + i + "deg)", "-webkit-transform": "rotate(" + i + "deg)" });
        $(".half-minute-1").css({ "-o-transform": "rotate(0deg)", "-moz-transform": "rotate(0deg)", "-webkit-transform": "rotate(0deg)" });
    }

    // --- update cycle count
    if (count == 119) {
        count = 0;
    } else {
        count = count + 1;
    }

    // --- set day progress bar
    if (day == 0 || day == 6) {
        $(".day-third-2").hide();
        $(".day-third-3").hide();
        $(".day-third-1").hide();
    }
    $(".day-progress").css("width", dayProgressRounded + "%");

    // --- calculate h/m syntax
    function displayHours(hCalc) {
        var displayHours = '';
        if (hCalc == 0) { displayHours = '' } else if (hCalc == 1) { displayHours = '1 hour ' } else { displayHours = hCalc + ' hours ' };
        return displayHours;
    };

    function displayMinutes(mCalc) {
        var displayMinutes = '';
        if (mCalc == 0) { displayMinutes = '' } else if (mCalc == 1) { displayMinutes = '1 minute ' } else { displayMinutes = mCalc + ' minutes ' };
        return displayMinutes;
    };

    // --- say the time
    if (day == 0) {
        $(".day-time").html("It's <span class='em'>" + displayHours(23 - h) + displayMinutes(60 - m) + "</span > until Monday.");
    } else if (day == 6) {
        $(".day-time").html("It's <span class='em'>" + displayHours((23 - h) + 24) + displayMinutes(60 - m) + "</span > until Monday.");
    } else {
        if (h == 9 && m == 0) {
            $(".day-time").html("It's time to work!");
        }
        else if (h == 17 && m == 0) {
            $(".day-time").html("It's time to play!");
        }
        else if (h == 0 && m == 0) {
            $(".day-time").html("It's midnight!");
        }
        else if (h >= 0 && h < 4) {
            $(".day-time").html("It's <span class='em'>" + displayHours(h) + displayMinutes(m) + "</span > past midnight. Shouldn't you be sleeping?");
        } else if (h >= 4 && h < 9) {
            $(".day-time").html("Good morning! It's <span class='em'>" + displayHours(8 - h) + displayMinutes(60 - m) + "</span > until work time.");
        } else if (h >= 9 && h < 14) {
            $(".day-time").html("It's been <span class='em'>" + displayHours(h - 9) + displayMinutes(m) + " </span > since workday started.");
        } else if (h >= 14 && h < 17) {
            $(".day-time").html("Almost over! It's <span class='em'>" + displayHours(16 - h) + displayMinutes(60 - m) + "</span > until play time.");
        } else if (h >= 17 && h < 23) {
            $(".day-time").html("It's <span class='em'>" + displayHours(h - 17) + displayMinutes(m) + "</span > since workday ended. Play time!");
        } else if (h >= 23) {
            $(".day-time").html("It's only <span class='em'>" + displayHours(23 - h) + displayMinutes(60 - m) + "</span > until tomorrow. Shouldn't you be getting to sleep?");
        }
    }

    // --- say percent of the day passed
    $(".day-percent").html("Day is <span class='em2'>" + dayProgressRounded + "%</span > over.");

}

s = setInterval("getMinute()", 1000);

// --- Efects
$(document).ready(function () { $('.time-container').fadeIn(3200).delay(2000) });

$('#toggle').click(function () {
    var link = $(this);
    $(".info-container").slideToggle(500, function () {
        if ($(this).is(':visible')) {
            link.text('x');
        } else {
            link.text('i');
        }
    });
    $(".time-container").slideToggle(500, function () {
    });
});

