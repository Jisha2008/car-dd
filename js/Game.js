class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car_1",imgcar1);

    car2 = createSprite(300,200);
    car2.addImage("car_2",imgcar2);

    car3 = createSprite(500,200);
    car3.addImage("car_3",imgcar3);
    
    car4 = createSprite(700,200); 
    car4.addImage("car_4",imgcar4);

    cars = [car1, car2, car3, car4];




  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    Player.fetchcarEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 130;
      var y;

      background("#33FFE2");
      image(track,0,-displayHeight*3,1000,displayHeight*5);

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 150;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        textSize(40);
        textAlign(CENTER);
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+100);
        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 2900){
      gameState = 2;
       player.rank+=1;
      Player.updatecar(player.rank);
      
    }

    drawSprites();
  }

  end(){
    console.log("game ended");
    console.log(player.rank);
  }




}
