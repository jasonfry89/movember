//run the handlebars template
var cardContainer = $("#fit-width").children(".masonry");
cardContainer.append(Handlebars.compile($("#masonry-item").html())(participants));

var MoustacheCard = function () {
    this.likeMe = function (elem, ev) {
        var value = $(elem).children(value);
        if (!$(elem).hasClass("btn-success")) {
            //increment the like counter
            value.text(parseInt(value.text()) + 1);
            $(elem).addClass("btn-success");
        } else {
            //decrement the like counter
            value.text(parseInt(value.text()) - 1);
            $(elem).removeClass("btn-success");
        }
        ev.stopPropagation();
    }

    this.addCard = function () {
        var cardToAdd = $(Handlebars.compile($("#masonry-item").html())(newguy));
        cardContainer.append(cardToAdd);
        var cardInDOM = $("#" + cardToAdd.attr("id"));
        cardContainer.masonry('appended', cardInDOM);
        setTimeout(function () {
            moustachecard.expandCard(cardInDOM);
        }, 500);
    };

    this.onClickRemoveCard = function (elem, ev) {
        removeOverlay(function () {
            moustachecard.removeCard($(elem).parents('.item')[0].id);
        });
        ev.stopPropagation();
    }

    this.removeCard = function (cardId) {
        cardContainer.masonry('remove', $("#" + cardId));
        setTimeout(function () {
            cardContainer.masonry('layout');
        }, 200);
    };

    this.setupCarousels = function (html) {
        var carousels = html.find(".carousel");
        carousels.find(".item:first-child").addClass('active');
        carousels.find(".carousel-indicators").children("li:first-child").addClass("active");
        carousels.carousel({ interval: 3500 }).carousel('pause');
    }

    this.expandCard = function (card) {

        addOverlay();
        
        $(".masonry").append(card.clone().addClass("fade").attr("id", "ghost-item"));

        card.addClass("active")
            .css({
                "position": "fixed",
                "left": card.offset().left,
                "top": card.offset().top - $("body").scrollTop(),
                "z-index": 60
            }).transit({
                width: "80%",
                height: 700,
                left: "10%",
                top: "10%"
            });

        card.find(".carousel").carousel('cycle');
    }
};
moustachecard = new MoustacheCard();


// setup the carousel
moustachecard.setupCarousels($("#fit-width"));

// setup card click handlers
$(document).on("click", ".masonry > .item:not(.active)", function () {
    moustachecard.expandCard($(this));
})

var addOverlay = function () {
    //remember where the card was initially
    $("body").append("<div class='overlay'></div>");

    //setup the overlay
    $(".overlay").transit({ opacity: .4 }).click(function () {
        removeOverlay();
    })
};

var removeOverlay = function (callback) {
    var $overlay = $('.overlay');
    var $ghost = $("#ghost-item");
    var ghostOffset = $ghost.offset();

    $overlay.transit({
        opacity: 0
    }, function () {
        $overlay.remove();
    });


    $(".masonry > .item.active").transit({
        width: "",
        "z-index": "",
        height: "",
        left: ghostOffset.left,
        top: ghostOffset.top - $("body").scrollTop()
    }, function () {
        $(this).css({
            "position": "absolute",
            "top": $ghost.css("top"),
            "left" : $ghost.css("left")
        })
        $("#ghost-item").remove();
        if (callback) callback();
    })
        .removeClass("active")
        .find(".carousel").carousel('pause');

    
};

var signUp = function () {
    moustachecard.addCard();
}