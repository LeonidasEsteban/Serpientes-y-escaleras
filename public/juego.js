$(function(){
    
    var posicion = 0;
    var cols, rows, totalgrid;
    var $target;
    var playerID;

    window.client = io.connect(window.location.href);

    client.on('avanzar',function(data){
        console.log(data);
        juego.avanzando(0,data.posicion,data.id);
    });
    client.on('newPlayer',function(data){
        juego.newPlayer(data.id);
        console.log(data.total);
        console.log("el data mover es "+data.mover);
        if(data.mover !== undefined){
            playerID = data.mover;
        }
        crearJugadores();
    });
    // window.client.emit('newPlayer',{
    //     id : playerIDlast
    // });
    window.juego = {
        grid : function(){
            rows = 8;
            cols = 8;
            totalgrid = rows * cols;
            var counter = 0;
            
            for(i = 1 ; i<= rows ; i++){

                $('#grid').prepend('<span  class="col '+type()+'" data-count='+ ++counter +'></span>');
                for(y = 2; y <= cols; y++){
                    $('#grid').prepend('<span class="col '+type()+'" data-count='+ ++counter +'></span>');
                }
            }
            function type (argument) {
                var random = Math.floor((Math.random()*5));
                var tipo;
                if(random == 1){
                    tipo = '';
                }else if(random == 2 ){
                    tipo = '';
                }else{
                    tipo = "";
                }
                return tipo;
            }
        },
        avanzar : function(){
            $('.avanzar').on('click',function(){
                var random  = Math.floor((Math.random()*6)+1);
                var movimiento = playerID;
                posicion    = posicion + random;
                juego.avanzando(0, posicion,playerID);
                juego.realtime(posicion,movimiento);

            });
        },
        realtime : function(posicion,jugadorID){
            window.client.emit('avanzar',{
                posicion : posicion,
                id : jugadorID
            });
        },
        avanzando : function(tiempo, posicion, jugador){

            var ir = setTimeout(function(){
                // $("body").scrollTop($('.jugador').position().top - 100);

                // if(posicion > totalgrid ){
                //     posicion = (totalgrid) - (posicion - totalgrid);
                // }else if(posicion == totalgrid){
                //     console.log('Ganaste!');
                //     win();
                // }

                $target = $('.col[data-count='+posicion+']');
                // $target.addClass('active');
                if($target.data('count') !== ""){
                    var left    = $target.position().left;
                    var top     = $target.position().top;
                    $('#player'+jugador).css({'left':left+30,'top':top+30});
                    juego.validacion();
                }

            },tiempo);


            function win(){
                $('.win').addClass('active').fadeOut().fadeIn();
            }
        },
        validacion :function(){
            var delay = setTimeout(function(){
                // if($target.hasClass('serpiente')){
                //     posicion = posicion - 4;
                //     console.log('serpiente');
                //     $target.removeClass('active');
                //     juego.avanzando(300,posicion,playerID);
                //     $target.removeClass('active');

                // }else if ($target.hasClass('escalera')){
                //     posicion = posicion + 5;
                //     console.log('escalera');
                //     juego.avanzando(300,posicion,playerID);
                //     $target.removeClass('active');

                // }




            },1000);

        },
        newPlayer : function(id){
            $('#grid').append('<div class="jugador" id="player'+id+'"></div>');
        },
        init : function(){
            juego.grid();
            juego.avanzar();
            // juego.newPlayer(0);
            $('.col:first').removeClass('escalera serpiente');
            $('.col:last').removeClass('escalera serpiente');
            // $("body").scrollTop($('.jugador').position().top);
        }
    };
    juego.init();


});