const tresorID = '256';

function createCadenas() {
  document.getElementById("dialogueButton").style.display = "none";
  document.getElementById("lock-plate").style.display = "block";
}


var comboArray = [0, 0, 0, 0];
var combination = [1, 1, 5, 1];

var gridIncrement = $( ".lock-dial ul" ).css('line-height').replace('px', '')/2;
var numNums = $( ".lock-dial:eq(0) ul li" ).length;
var halfHeight = gridIncrement*numNums;
var initTop = -(halfHeight-gridIncrement);

let lockDial = $( ".lock-dial ul" );

lockDial.on("click", function(){
  let middleValue = 0;
  $(this).find('li').each(function(){
    let currentValue = parseInt($(this).text());
    currentValue = (currentValue + 1) % 10;
    $(this)[0].innerText = currentValue.toString();
    if ( $(this).attr("class") === "middle" ) {
      middleValue = currentValue;
    }
  });

  comboArray[parseInt($(this).attr("data-combo-num"))] = middleValue;

  if(comboArray[0] === combination[0] && comboArray[1] === combination[1] && comboArray[2] === combination[2] && comboArray[3] === combination[3]){
    $('#lock-wrapper').addClass("unlocked");
    $('.lock-dial').each(function(){
      var $this = $(this);
      $this.find('ul').delay(400).css('color', '#0f0').fadeOut(function(){
        $this.animate({
          marginTop: 150
        }, function(){
          $this.fadeOut(function(){
            sessionStorage.setItem('current_personage', tresorID);
            location.href = '../' + event_map[tresorID]["url"];
          });
        });
      });
    });
  }
});


