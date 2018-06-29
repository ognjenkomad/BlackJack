$(document).ready(function(){
    
    
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'sounds/cardPlace1.wav');
    
    var audioElement2 = document.createElement('audio');
    audioElement2.setAttribute('src', 'sounds/cardPlace1.wav');
    
    var audioElement3 = document.createElement('audio');
    audioElement3.setAttribute('src', 'sounds/cardPlace1.wav');
    
    var audioCardReveal = document.createElement('audio');
    audioCardReveal.setAttribute('src', 'sounds/cardSlide4.wav');
    
    var audioChipSet = document.createElement('audio');
    audioChipSet.setAttribute('src', 'sounds/chipsStack4.wav');
    
    var audioChipGet = document.createElement('audio');
    audioChipGet.setAttribute('src', 'sounds/chipLay1.wav');
    
    var audioChipRemove = document.createElement('audio');
    audioChipRemove.setAttribute('src', 'sounds/chipsHandle6.wav');
    
    
    
    var w = $(window).width();
    var h = $(window).height();
    console.log(w);
    console.log(h);
    var wrapper = $('#table-wrapper');
    wrapper.css({
        width : w,
        height : h
    });
    // Konstruktor za kartu
    function card(name, suit, value){
        this.name = name;
        this.suit = suit;
        this.value = value;
    }
    var usedCards = new Array();
    // Deck of Card
    var deck = [
        // HEARTS
        new card('Ace', 'hearts',11),
        new card('Two', 'hearts',2),
        new card('Three', 'hearts',3),
        new card('Four', 'hearts',4),
        new card('Five', 'hearts',5),
        new card('Six', 'hearts',6),
        new card('Seven', 'hearts',7),
        new card('Eight', 'hearts',8),
        new card('Nine', 'hearts',9),
        new card('Ten', 'hearts',10),
        new card('King', 'hearts',10),
        new card('Queen', 'hearts',10),
        new card('Jack', 'hearts',10),
        //DIAMONDS
        new card('Ace', 'diamonds',11),
        new card('Two', 'diamonds',2),
        new card('Three', 'diamonds',3),
        new card('Four', 'diamonds',4),
        new card('Five', 'diamonds',5),
        new card('Six', 'diamonds',6),
        new card('Seven', 'diamonds',7),
        new card('Eight', 'diamonds',8),
        new card('Nine', 'diamonds',9),
        new card('Ten', 'diamonds',10),
        new card('King', 'diamonds',10),
        new card('Queen', 'diamonds',10),
        new card('Jack', 'diamonds',10),
        // CLUBS
        new card('Ace', 'clubs',11),
        new card('Two', 'clubs',2),
        new card('Three', 'clubs',3),
        new card('Four', 'clubs',4),
        new card('Five', 'clubs',5),
        new card('Six', 'clubs',6),
        new card('Seven', 'clubs',7),
        new card('Eight', 'clubs',8),
        new card('Nine', 'clubs',9),
        new card('Ten', 'clubs',10),
        new card('King', 'clubs',10),
        new card('Queen', 'clubs',10),
        new card('Jack', 'clubs',10),
        // SPADES
        new card('Ace', 'spades',11),
        new card('Two', 'spades',2),
        new card('Three', 'spades',3),
        new card('Four', 'spades',4),
        new card('Five', 'spades',5),
        new card('Six', 'spades',6),
        new card('Seven', 'spades',7),
        new card('Eight', 'spades',8),
        new card('Nine', 'spades',9),
        new card('Ten', 'spades',10),
        new card('King', 'spades',10),
        new card('Queen', 'spades',10),
        new card('Jack', 'spades',10)
    ];
    
    
    var playerCredits = 1000;
    var playerBets = 0;
    var playerBet = 0;
    var maxBet = 300;
    var minBet = 5;
    
    //********************** FUNCTIONS  ***********************
    
    // -------------------- RANDOM FUNCTION ------------------
    function getRandom(num){
        var myNumber = Math.floor(Math.random()*num);
        return myNumber;
    }
    
    // -------------------- DEAL THE CARDS ------------------
    function deal(){
        hitForPlayer();
        setTimeout(hitForDealer,600);
        setTimeout(hitForPlayer,1200);
        setTimeout(hitForDealer,1800);   
        checkForBlackJack(player_sum);
    }
    // -------------------- CHECK FOR BLACKJACK AFTER DEAL ----------------------
    function checkForBlackJack(player_sum){
        if(player_sum === 21){
            alert('BlackJack!');
        }   
    }
    
    // -------------------- HIT FOR PLAYER ------------------
    var x = $('.player-holder').offset().top;
    var y = $('.player-holder').offset().left;
    var player_sum = 0;
    var flagForDeal = 0;
    var aceForPlayer = false;
    var acesForPlayer = 0;
    function hitForPlayer(){
        audioElement.play();
        var goodCard = false;
        do{
            var randomIndex = getRandom(52);
            var flag = jQuery.inArray(randomIndex, usedCards);
            if(flag === -1){
                goodCard = true;
                var randomCard = deck[randomIndex]; 
                usedCards[usedCards.length] = randomIndex;
                if(randomCard.value === 11)
                {
                    aceForPlayer = true;
                    acesForPlayer++;
                }
                player_sum+=randomCard.value;
                $('.player-holder').html('<p class="sum">'+player_sum+'</p>');
                var d = $('<div>');
                d.appendTo('#table-wrapper');
                d.addClass('card-holder');
                var cardFront = $('<img class="front">').appendTo(d).attr('src', 'img/'+randomCard.name+'_of_'+randomCard.suit+'.svg');
                var cardBack = $('<img class="back">').appendTo(d).attr('src', 'img/back.png');
                d.animate({
                    position : 'absolute',
                    top : x,
                    left : y
                },1000, 'swing', function(){
                          $(this).find('.back').css('transform', 'rotateY(180deg)')
                          $(this).find('.front').css('transform', 'rotateY(0deg)');
                });
            }
        }while(!goodCard);
        goodCard = false;
        x-=20;
        y+=20;
    }
    var firstCard = true;
    
    // -------------- HIT FOR DEALER  ---------------
    var dealer_sum;
    var x2 = $('.dealer-holder').offset().left;
    var indexOfBackCard;
    function hitForDealer(){
        audioElement2.play();
        var goodCard = false;
        do{ 
            var randomIndex = getRandom(52);
            var flag = jQuery.inArray(randomIndex, usedCards);
            if(flag === -1){
                goodCard = true;
                var randomCard = deck[randomIndex];
                usedCards[usedCards.length] = randomIndex;
                var d = $('<div>');
                d.appendTo('#table-wrapper');
                d.addClass('card-holder');
                if(firstCard){
                    dealer_sum=randomCard.value;
                    $('.dealer-holder').html('<p class="sum">'+dealer_sum+'</p>');
                    var cardFront = $('<img class="front">').appendTo(d).attr('src', 'img/'+randomCard.name+'_of_'+randomCard.suit+'.svg');
                    var cardBack = $('<img class="back">').appendTo(d).attr('src', 'img/back.png');
                    firstCard = false;
                    d.animate({
                        position : 'absolute',
                        left : x2,
                        top : $('.dealer-holder').offset().top,
                    },1000, 'swing', function(){
                        $(this).find('.back').css('transform', 'rotateY(180deg)')
                        $(this).find('.front').css('transform', 'rotateY(0deg)');
                    });     
                }else{
                        indexOfBackCard = randomIndex;
                        var cardBack = $('<img class="back">').appendTo(d).attr('src', 'img/back.png');
                        var cardFront = $('<img class="front">').appendTo(d).attr('src', 'img/'+randomCard.name+'_of_'+randomCard.suit+'.svg');
                    d.animate({
                        position : 'absolute',
                        left : x2,
                        top : $('.dealer-holder').offset().top,
                    },1000);
                }
            }
        }while(!goodCard);
        goodCard = false;
        x2+=110;
    }
    
    // -------------- HIT FOR DEALER AFTER STAND ---------------
    function hitForDealer2(){
        audioElement3.play();
        var goodCard = false;
        do{
            var randomIndex = getRandom(52);
            var flag = jQuery.inArray(randomIndex, usedCards);
            if(flag === -1){
                goodCard = true;
                var randomCard = deck[randomIndex];
                usedCards[usedCards.length] = randomIndex;
                var d = $('<div>');
                d.appendTo('#table-wrapper');
                d.addClass('card-holder');
                dealer_sum+=randomCard.value;
                $('.dealer-holder').html('<p class="sum">'+dealer_sum+'</p>');
                var cardFront = $('<img class="front">').appendTo(d).attr('src', 'img/'+randomCard.name+'_of_'+randomCard.suit+'.svg');
                    var cardBack = $('<img class="back">').appendTo(d).attr('src', 'img/back.png');
                    firstCard = false;
                    d.animate({
                        position : 'absolute',
                        left : x2,
                        top : $('.dealer-holder').offset().top,
                    },1000, 'swing', function(){
                        $(this).find('.back').css('transform', 'rotateY(180deg)')
                        $(this).find('.front').css('transform', 'rotateY(0deg)');
                    }); 
            }
        }while(!goodCard);
        goodCard = false;
        x2+=110;
    }
    
    // -------------- END OF GAME ---------------
    function endOfGame(){
       usedCards.length = 0;
       $('#table-wrapper').find('.card-holder').remove();
       $('#btnDeal').bind('click', function(){
            if((playerBets >= minBet) && (playerBets <= maxBet)){
                $('#btnRemoveBets').toggle(500);
                deal();
                $(this).toggle(500).unbind();
                getBtns();
                $('.chips').children().unbind('click');
             }
       });
        firstCard = true;   
        x = $('.player-holder').offset().top;
        y = $('.player-holder').offset().left;
        x2 = $('.dealer-holder').offset().left;
        var btnHit = $('#btnHit').toggle(500);
        var btnStand = $('#btnStand').toggle(500);
        var btnDouble  = $('#btnDouble').hide(500);
        $('#btnRebet').show(500);
        $('#btnNewBet').show(500);
        $('.bets-holder').html('<p>Place your bets</p>');
        $('.dealer-holder').html('');
        $('.player-holder').html('');
        btnHit.bind('click', function(){
            hitForPlayer();
            chekForBurst();
            $('#btnDouble').hide(500);
        });
        btnStand.bind('click', function(){
            stand();
        });
        $('.chips').find('.clone').hide();
        $('.chips').children().unbind('click');
        dealer_sum = 0;
        playerBet = 0;
        playerBets = 0;
        player_sum = 0;
     
   }
    
    // -------------- DISPLAY HIT AND STAND BUTTONS AFTER DEAL ---------------
    function getBtns(){
        var btnHit = $('#btnHit').toggle(500);
        var btnStand = $('#btnStand').toggle(500);
        var btnDouble = $('#btnDouble').toggle(500);
    }
    
    // -------------- CHECK FOR BURST AFTER PLAYER HIT ---------------
    function chekForBurst(){
        var suma = $('.player-holder>p');
        var suma1 = $('.dealer-holder>p');
        if(suma.text() > 21){
            setTimeout(endOfGame, 2500);    
            $('#btnHit').unbind();
            $('#btnStand').unbind();
            $('.bets-holder').find('.sum').html('Burst').css('color', 'red');
            setTimeout(function(){
                    revealTheCard(deck, indexOfBackCard, suma1.text());
            },1000); 
        }
        
    }
    
    // -------------- REVEAL CARD FOR DEALER ---------------
    function revealTheCard(deck, indexOfBackCard, suma1){
        audioCardReveal.play();
        randomCard = deck[indexOfBackCard];
        $('.card-holder').eq(3).find('.back').css('transform', 'rotateY(180deg)');
        $('.card-holder').eq(3).find('.front').css('transform', 'rotateY(0deg)');
        dealer_sum = Number(suma1) + randomCard.value;
        $('.dealer-holder').html('<p class="sum">'+dealer_sum+'</p>');
    }
    
    function ShowCredits()
    {
        $('.credits').html('<p>BALANCE : '+playerCredits+' $</p>');
    }
    ShowCredits();
    function PlayerWin()
    {
        $('.bets-holder').find('.sum').html('You win : '+playerBets*2);
        playerCredits+=playerBets*2
        ShowCredits();
        
    }
    function Push(){
        $('.bets-holder').find('.sum').html('Push');
        playerCredits+=playerBets;
        ShowCredits();
    }
    //********************** EVENTS  ***********************
    var lastChips;
    $('#btnDeal').on('click', function(){
        if((playerBets >= minBet) && (playerBets <= maxBet)){
            $('#btnRemoveBets').toggle(500);
            deal();
            $(this).toggle(500).unbind();
            getBtns();
            $('.chips').children().unbind('click');
        }
    });
    
    $('#btnHit').on('click', function(){
        hitForPlayer();
        chekForBurst();
        $('#btnDouble').hide(500);
    });
    
    
    $('#btnRemoveBets').on('click',function(){
        audioChipRemove.play();
        $('.chips').find('.clone').remove();
        $('.bets-holder').html('<p>Place your bets</p>');
        playerCredits +=playerBets;
        playerBet = 0;
        playerBets = 0;
        i = 0;
        $(this).toggle(500); 
        $('#btnDeal').toggle(500);
        ShowCredits();
    })

    var i = 0;
    function Double(){
        $('#btnDouble').on('click', function(){
            var suma1 = $('.dealer-holder>p');
            var copyChips = $('.chips').find('.clone');
                var kopija = copyChips.clone(true).appendTo('.chips').addClass('kopija')   
                kopija.css({
                    left : $('.bets-holder').offset().left +10,
                    top : $('.bets-holder').offset().top + 10 - i
                })
                i+=3;
            playerCredits-=playerBets;
            playerBets+=playerBets;
            ShowCredits();
            $('.bets-holder').html('<div class="clone"></div>').append('<p class="sum">Bet: '+playerBets+'$</p>');
            hitForPlayer();
            if(player_sum <= 21){
                setTimeout(stand, 1000); 
            }else{
                setTimeout(chekForBurst,500);
            }
            $('#btnHit').unbind();
            $('#btnStand').unbind();
            desioSeDouble = true;
        });
    }
    Double();
    
    $('#btnRebet').on('click', function(){
        $(this).hide(500);
        $('#btnNewBet').hide(500);
        playerCredits -= lastBet;
        playerBets = lastBet;
        ShowCredits();
        $('.chips').find('.clone').show();
        $('.chips').find('.kopija').hide();
        audioChipSet.play();
        $('.bets-holder').html('<div class="clone"></div>').append('<p class="sum">Bet: '+lastBet+'$</p>');
        $('#btnDeal').show(500);
        $('#btnRemoveBets').show(500);
        $('.chips').children().bind('click', putChips());
    })
    
       $('#btnNewBet').on('click', function(){
            i = 0;
            $(this).hide(500);
            $('#btnRebet').hide(500);
            $('.chips').find('.clone').remove();
            $('.chips').children().bind('click', putChips());
        })
       
       
    function stand()
    {
        $('#btnStand').unbind();
        $('#btnHit').unbind();
        var suma1 = $('.dealer-holder>p');
        revealTheCard(deck, indexOfBackCard, suma1.text());
        if(dealer_sum < 17){
            var loop = setInterval(function(){
                hitForDealer2();
                if(dealer_sum >= 17){
                    clearInterval(loop);
                    if((dealer_sum > player_sum) && (dealer_sum < 22)){
                    $('.bets-holder').find('.sum').html('Dealer Wins').css('color', 'red');
                        setTimeout(endOfGame, 2500);
                    }
                    if((dealer_sum < player_sum) && (dealer_sum < 22)){
                        PlayerWin();
                        setTimeout(endOfGame, 2500);
                    }
                    if((dealer_sum === player_sum) && (dealer_sum > 16)){
                        Push();
                        setTimeout(endOfGame, 2500);
                    } 
                    if(dealer_sum > 21){
                        PlayerWin();
                        setTimeout(endOfGame, 2500);
                    }
                }
                
            },1550);
        }
        else{
            if((dealer_sum > player_sum) && (dealer_sum < 22)){
                    $('.bets-holder').find('.sum').html('Dealer Wins').css('color', 'red');
                        setTimeout(endOfGame, 2500);
                    }
                    if((dealer_sum < player_sum) && (dealer_sum < 22)){
                        PlayerWin();
                        setTimeout(endOfGame, 2500);
                    }
                    if((dealer_sum === player_sum) && (dealer_sum > 16)){
                        Push();
                        setTimeout(endOfGame, 2500);
                    } 
                    if(dealer_sum > 21){
                        PlayerWin();
                        setTimeout(endOfGame, 2500);
                    }
        }
        
                
                 
    }
    $('#btnStand').on('click', function(){
        setTimeout(stand, 200);
    })
    
    var kliknutoPomjeranje = false;
    var leftPosition = 0;
    var topPosition = 0;
    var movingChip;
    var klone;
    var betsHolder = $('.bets-holder');
    
    var lastBet;

    putChips();
    function putChips(){
        $('.chips').children().on('click', function(){
        movingChip = $(this);
        $('.bets-holder').css('border-color', 'aqua');
        var chipValue = movingChip.html();
        if(!kliknutoPomjeranje){
            if(!movingChip.hasClass('clone')){
                audioChipGet.play();
                klone = movingChip.clone(true).appendTo('.chips').addClass('clone');
                $(document).bind('mousemove',function(e){
                leftPosition = e.pageX-17;
                topPosition = e.pageY-17;
                    if(topPosition > movingChip.offset().top +21){
                        $(document).unbind('mousemove');
                        klone.toggle();
                        klone.remove();
                        kliknutoPomjeranje = !kliknutoPomjeranje;
                    }
                klone.css({
                    top : topPosition,
                    left : leftPosition
                })
                })
            }
                
        }
        else{
            if((leftPosition > 173) && (leftPosition < 286)){
                $(document).unbind('mousemove');
                playerBet = parseInt(chipValue);
                playerCredits -=playerBet;
                playerBets += playerBet;
                ShowCredits();
                lastBet = playerBets;
                $('#btnDeal').show(500);
                $('#btnRemoveBets').show(500);
                $('.bets-holder').html('<div class="clone"></div>').append('<p class="sum">Bet: '+playerBets+'$</p>')
                klone.css({
                    left : $('.bets-holder').offset().left +10,
                    top : $('.bets-holder').offset().top + 10 - i
                })
                audioChipSet.play();
                kliknutoPomjeranje = !kliknutoPomjeranje;
                i+=3;
                $('.bets-holder').css('border-color', 'black');
            } 
        }
        if(!movingChip.hasClass('clone')){
            kliknutoPomjeranje = !kliknutoPomjeranje;
        }
        
    });
    }
    
})