
document.addEventListener("DOMContentLoaded", function() {
  selectPlayerDOM();
});

var player = {};
var opponent = {};
var buttons = {
	"Air Bender": "airBender",
	"Fire Bender": "fireBender",
	"Earth Bender": "earthBender",
	"Water Bender": "waterBender"
};




function airBender () {
	this.attackPower = 1;
	this.health = 100;
	this.counterStrike = this.attackPower * 35;
	this.name = "Air Bender";
	this.value = "airBender";
	this.image = "assets/images/yang.jpeg";
}



function fireBender () {
	this.attackPower = 1;
	this.health = 100;
	this.counterStrike = this.attackPower * 6;
	this.name = "Fire Bender";
	this.value = "fireBender"
	this.image = "assets/images/zuko.jpeg";
}

function waterBender(){
	this.attackPower = 1;
	this.health = 100;
	this.counterStrike = this.attackPower * 2;
	this.name = "Water Bender";
	this.value = "waterBender";
	this.image = "assets/images/katara.jpeg";
}

function earthBender(){
	this.attackPower = 1;
	this.health = 100;
	this.counterStrike = this.attackPower * 30;
	this.name = "Earth Bender";
	this.value = "earthBender";
	this.image = "assets/images/toph.jpeg";
}


function playerAttack(){
	opponent.health = opponent.health - player.attackPower;
	player.attackPower += 7;
	console.log("Opponent Health: " + opponent.health);
  console.log("Player Attack Power: " + player.attackPower);
}

function opponentAttack(){
	player.health = player.health - opponent.counterStrike;
	console.log("Player Health: " + player.health);
}


// fix make this better class, attr ect.
function selectPlayerDOM(){
	$('#content').html("<h1>Select Your Player</h1>");
		for (bender in buttons){
			$('#content')
			.append('<button class="pSelection" value=' + '"' + buttons[bender] + '"' +'>'+ bender +'</button>');
		}
		$(".pSelection").on("click",function(){
		    select = ($(this).attr("value"));
				if(select === "waterBender"){
					player = new waterBender();
				}else if (select === "earthBender") {
					player = new earthBender();
				} else if(select === "fireBender"){
					player = new fireBender();
				}else if(select === "airBender"){
					player = new airBender();
				}
				console.log(player.name);
				delete buttons[player.name];
				selectOpponant();
			});
	};


//fix make this better class, attr etc
	function selectOpponant(){
		$('#content').html("<h1>Select Your Opponent</h1>");
			for (bender in buttons){
				$('#content')
				.append('<button class="oSelection" value=' + '"' + buttons[bender] + '"' +'>'+ bender +'</button>');
			}
			$(".oSelection").on("click",function(){
			    select = ($(this).attr("value"));
					if(select === "waterBender"){
						opponent = new waterBender();
					}else if (select === "earthBender") {
						opponent = new earthBender();
					} else if(select === "fireBender"){
						opponent = new fireBender();
					}else if(select === "airBender"){
						opponent = new airBender();
					}
					console.log(opponent.name);
					delete buttons[opponent.name];
					battleArena();
				});
		};

function battleArena(){
		$('#content').html(
				`<img src="${player.image}"><p class='health'>Health: ${player.health}</p>
				<h1>VS</h1>
				<img src="${opponent.image}"><p class='health'>Health: ${opponent.health}</p>
        		<button id="attack">Attack</button>`);
      if(player.health >= 0 && opponent.health >= 0){
      $("#attack").on("click", function(){
        playerAttack();
        opponentAttack();
          $("#battleLog").html
          (`<p>${player.name} hits ${opponent.name} for ${player.attackPower} points of damage</p>
            <p>${opponent.name} hits ${player.name} for ${opponent.counterStrike} points of damage</p>`)
          battleArena();
      	})
      }else{
        winOrLose();
    	}
    };

    function lose(){
    	$("#battleLog").append('<b>You Lose!</b><p>Play Again?</p><button id="yes">Yes</button>');
    	$('#yes').on("click", function(){
    	$('#battleLog').empty()
    	resetGame();
    	selectPlayerDOM();
    	})
    }

    function win(){
      //wierd bug that if you fight earth bender as your second opponent you still win
      if(player.health <= 0){
        lose();
      }else{
    	$("#battleLog").append('<b>You won!</b><p>Continue?</p><button id="yes">Yes</button><button id="no">No</button>');
    	$('#yes').on("click", function(){
    	$('#battleLog').empty();
    	selectOpponant();
      console.log(buttons);
    	})
      $('#no').on("click", function(){
        resetGame();
        $('#battleLog').empty();
        selectPlayerDOM();
      })
    }
  }

    function winOrLose(){
      if(Object.keys(buttons).length === 0){
        youWonTheGame();
      }else{
    	 $("#attack").remove();
         $(".health").remove();
    	if(player.health === 0){
    		lose();
    	}else{
    		win();
    	 }
      }
    }

function youWonTheGame(){
  $("#battleLog").empty()
  $('#content').html("<h1>You have beaten all the benders. You are the Champion!</h1>");
  $('#content').append('<img src="assets/images/youWin.gif">');
}

function resetGame (){
    buttons = {
	"Air Bender": "airBender",
	"Fire Bender": "fireBender",
	"Earth Bender": "earthBender",
	"Water Bender": "waterBender"
		};
  }
