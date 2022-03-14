window.onload = function load(){
    alert("Coma 30 maças, boa sorte!")
    var stage = document.getElementById('stage');
    var context = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    
    setInterval(game, 80);
   

    //velocidade é quantas casas a cobra vai andar a cada vez que a function game for chamada.
    const velocidade = 1;
    var velocidadeX=0, velocidadeY=0;
    var pontoX=10, pontoY=15;
    var tamanhoPeca = 20;//tamanho da peça do jogo
    var quantidadePeca=35;
    var AppleX;//Posicção inicial da maça
    var AppleY; 
    var pontuacao=0;

    var trail = [];
    var tail=5;

    function game(){
        pontoX+=velocidadeX;
        pontoY+=velocidadeY;
        if (pontoX<0){
            pontoX=quantidadePeca-1;  
        }
        if (pontoX>quantidadePeca-1){
            pontoX=0;
        }
        if (pontoY<0){
            pontoY=quantidadePeca-1;
        }
        if (pontoY>quantidadePeca-1){
            pontoY=0;
        }

        context.fillStyle = "black";
        context.fillRect(0,0, stage.width, stage.height)
        
        context.fillStyle = "red";
        context.fillRect(AppleX*tamanhoPeca, AppleY*tamanhoPeca, tamanhoPeca, tamanhoPeca);
        
        context.fillStyle="green";
        for (var i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x*tamanhoPeca, trail[i].y*tamanhoPeca, tamanhoPeca,tamanhoPeca);
            if (trail[i].x == pontoX && trail[i].y == pontoY){
                resetGame();
            }
            else{
                document.getElementById("stage").style.border=("2px solid blue")
            }
        }


        trail.push({x:pontoX, y:pontoY})
        while(trail.length > tail){
            trail.shift();
        }
        
        if (AppleX==pontoX && AppleY==pontoY){
            tail++;
            pontuacao++;
            AppleX = Math.floor(Math.random()*quantidadePeca);
            AppleY = Math.floor(Math.random()*quantidadePeca);
        }
        document.getElementById("Score").textContent = 'Maças comidas: ' + pontuacao;
        
        if (tail==35){
            alert("Você ganhou :D");
        }
    }

    function resetGame(){      
        pontoX=10, pontoY=15;
        AppleX = Math.floor(Math.random()*quantidadePeca);
        AppleY = Math.floor(Math.random()*quantidadePeca);
        velocidadeX=1, velocidadeY=0;
        tail=5;
        document.getElementById("stage").style.border=("2px solid red")    
    }

    function keyPush(event){
        if(event.keyCode==37 && velocidadeX!=1){// Left
            velocidadeX = -velocidade;
            velocidadeY = 0;        
        }
        else if(event.keyCode==38 && velocidadeY!=1){// up
            velocidadeX = 0;
            velocidadeY = -velocidade;           
        }
        else if(event.keyCode==39 && velocidadeX!=-1){// right
            velocidadeX = velocidade;
            velocidadeY = 0;
        }
        else if(event.keyCode==40 && velocidadeY!=-1){ // down
            velocidadeX = 0;
            velocidadeY = velocidade;
        }
    }
}