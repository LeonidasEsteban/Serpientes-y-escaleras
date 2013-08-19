$(function(){
    
    var posicion = 0;
    var cols, rows, totalgrid;
    var $target;

    window.client = io.connect(window.location.href);

    client.on('avanzar',function(data){
        juego.avanzando(0,data.posicion);
    });
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
                    tipo = 'escalera';
                }else if(random == 2 ){
                    tipo = 'serpiente';
                }else{
                    tipo = "";
                }
                return tipo;
            }
        },
        avanzar : function(){
            $('.avanzar').on('click',function(){
                var random  = Math.floor((Math.random()*6)+1);
                posicion    = posicion + random;
                juego.avanzando(0, posicion);
            });
        },
        realtime : function(posicion){
            window.client.emit('avanzar',{
                posicion : posicion,
            });
        },
        avanzando : function(tiempo, posicion){

            var ir = setTimeout(function(){
                $("body").scrollTop($('.jugador').position().top - 100);

                if(posicion > totalgrid ){
                    posicion = (totalgrid) - (posicion - (totalgrid));
                }else if(posicion == totalgrid){
                    console.log('Ganaste!');
                    win();
                }

                $target = $('.col[data-count='+posicion+']');
                $target.addClass('active');

                var left    = $target.position().left;
                var top     = $target.position().top;
                $('.jugador').css({'left':left+30,'top':top+30});
                juego.validacion();
            },tiempo);

            function win(){
                $('.win').addClass('active').fadeOut().fadeIn();
            }
        },
        validacion :function(){
            var delay = setTimeout(function(){
                if($target.hasClass('serpiente')){
                    posicion = posicion - 4;
                    console.log('serpiente');
                    $target.removeClass('active');
                    juego.avanzando(300,posicion);
                    $target.removeClass('active');
                }else if ($target.hasClass('escalera')){
                    posicion = posicion + 5;
                    console.log('escalera');
                    juego.avanzando(300,posicion);
                    $target.removeClass('active');
                }
            juego.realtime(posicion);
                

            },1000);
        },
        init : function(){
            juego.grid();
            juego.avanzar();
            $('.col:first').removeClass('escalera serpiente');
            $('.col:last').removeClass('escalera serpiente');
            $("body").scrollTop($('.jugador').position().top);
        }
    };
    juego.init();


});