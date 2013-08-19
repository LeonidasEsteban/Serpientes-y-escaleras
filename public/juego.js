$(function(){
    var estado = $('.jugador').position().left;
    var posicion =0;
    var cols, rows, totalgrid;
    var juego = {
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
            var $target;
            var random;
            $('.avanzar').on('click',function(){
                random  = Math.floor((Math.random()*6)+1);
                posicion    = posicion + random;
                avanzando(0);
            });
            function validacion(){
                var pregunta = setTimeout(function(){
                    if($target.hasClass('serpiente')){
                        posicion = posicion - 4;
                        console.log('serpiente');
                        $target.removeClass('active');
                        avanzando(300);
                        $target.removeClass('active');
                    }else if ($target.hasClass('escalera')){
                        posicion = posicion + 5;
                        console.log('escalera');
                        avanzando(300);
                        $target.removeClass('active');
                    }

                },1000);
            }
            function avanzando(tiempo){

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
                    validacion();
                },tiempo);

                function win(){
                    $('.win').addClass('active').fadeOut().fadeIn();
                }

            }
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