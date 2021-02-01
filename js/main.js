function startGame() {
    var musica1 = new Audio('musica/musica1.mp3');
    var musica2 = new Audio('musica/musica2.mp3');
    var musica3 = new Audio('musica/musica3.mp3');
    function pausarMusicas(){
        musica1.pause();
        musica2.pause();
        musica3.pause();
    }
    function playMusicas(){
        musica1.play()
        musica2.play()
        musica3.play()
    }
    playMusicas();


    var isMusicaOn = true;
    $("section.gameOver").hide()
    $("span.tempo").text("00");
    $("section").hide();
    $("section.flag-1").show();

    setInterval(function() {
        var tempo = parseInt($("span.tempo").text());
        var soma = tempo + 1;
        if (soma < 10) {
            soma = "0" + soma;
        }
        $("span.tempo").text(soma);
    }, 1000);
    $("section.flag-1 ul img.certo").one("click", function() {
        var acertos = parseInt($("span.acertos").text());
        var soma = acertos + 1;
        var somAcerto = new Audio('musica/correct.mp3')
        somAcerto.play()
        $("span.acertos").text(soma);
        $(this).css({
            opacity: 0.5
        })
        if (soma == 3) {
            pausarMusicas();
            var musica = new Audio('musica/win.wav')
            musica.play()
            win();
        }
    });
    $(".sidoka").one('click',function(){
        musica2.pause();
    })
    $(".matue").one('click',function(){
        musica1.pause();
    })
    $(".igu").one('click',function(){
        musica3.pause();
    })
    $('#home').click(function() {
        location.reload()
    })
    
    $('#mute').click(function() {
        if (isMusicaOn) {
            pausarMusicas()
            $('#mute').text("volume_off")
            isMusicaOn = false
        } else {
            playMusicas();
            $('#mute').text("volume_up")
            isMusicaOn = true
        }

    })
    $('#help').one('click', function() {
        var camposErrados = $("section.flag-1 ul img.errado");
        var n1 = Math.floor(Math.random() * (6 - 1) + 1);
        var n2 = Math.floor(Math.random() * (6 - 1) + 1);
        while (n1 == n2) {
            var n2 = Math.floor(Math.random() * (6 - 1) + 1);
        }
        $(camposErrados[n1]).css({
            opacity: 0.5
        })
        $(camposErrados[n2]).css({
            opacity: 0.5
        })
        $('#help').text("lock")
    })
    var erros = 0;
    $("section.flag-1 ul img.errado").one("click", function() {

        erros = erros + 1;
        //erros += 1;
        $(this).addClass("erro")
        var somErro = new Audio('musica/error.mp3')
        somErro.play()
        $(this).css({
            opacity: 0.5
        })
        if (erros > 1) {
            //trasição de tela
            pausarMusicas();
            var musica = new Audio('musica/game-over.wav')
            musica.play()
            $("section").hide();
            $(".gameOver").show();
            clearInterval()
        }
    });
}
$("section.inicio button").on("click", startGame);

$("#tryagain").click(function() {
    location.reload()
})

function win() {
    $('.flag-1').hide()
    $('.win').show()
    $('#back').click(function() {
        location.reload()
    })
}