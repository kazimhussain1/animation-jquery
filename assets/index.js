var isMobile = false;

function getCurrentRotation(el) {
  var st = window.getComputedStyle(el, null);
  var tm =
    st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    "none";

  if (tm != "none") {
    var values = tm.split("(")[1].split(")")[0].split(",");
    /*
      a = values[0];
      b = values[1];
      angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
      */
    //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI)); //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
    var angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle; //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
  }
  return 0;
}

function getCurrentScale(el) {
  const st = window.getComputedStyle(el, null);
  const tm =
    st.getPropertyValue("-webkit-transform") ||
    st.getPropertyValue("-moz-transform") ||
    st.getPropertyValue("-ms-transform") ||
    st.getPropertyValue("-o-transform") ||
    st.getPropertyValue("transform") ||
    "none";

  if (tm != "none") {
    const values = tm.split("(")[1].split(")")[0].split(",");
    return { scaleX: parseFloat(values[0]), scaleY: parseFloat(values[3]) };
  }
  return { scaleX: 1, scaleY: 1 };
}

function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

$(function () {
  // wait for document ready
  // init controller
  isMobile = window.innerWidth < 768;

  var imgs = $(".picture-ball > img");
  var imgLength = imgs.length;

  for (var i = 0; i <= imgLength - 1; i++) {
    const img = $(imgs[i]);
    var imgWidth = img.width();
    var imgHeight = img.height();

    img.width(imgWidth / 2).height(imgHeight / 2);
  }

  var controller = new ScrollMagic.Controller();

  // build scene
  new ScrollMagic.Scene({
    triggerElement: "#trigger",
    duration: 250,
    offset: isMobile ? 0 : window.innerHeight / 3,
  })
    .addTo(controller)
    //.addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      $("#about-marquee-text").css({
        left: `${-parseInt(e.progress.toFixed(3) * 50)}%`,
      });

      $("#slide-elipse-id").css({
        left: `${parseInt(e.progress.toFixed(3) * 50)}%`,
      });
    });

  // new ScrollMagic.Scene({
  // 			triggerElement: "#trigger1",
  // 			triggerHook: 0.9, // show, when scrolled 10% into view
  // 			duration: "80%", // hide 10% before exiting view (80% + 10% from bottom)
  // 			offset: 50 // move trigger to center of element
  // 		})
  // 		.setClassToggle("#reveal1", "visible") // add class to reveal
  // 		.addIndicators() // add indicators (requires plugin)
  //         .addTo(controller);

  var revealElements = document.getElementsByClassName("reveal");
  for (var i = 0; i < revealElements.length; i++) {
    // create a scene for each element
    new ScrollMagic.Scene({
      triggerElement: revealElements[i], // y value not modified, so we can use element as trigger as well
      offset: i >= 2 ? 100 : 50, // start a little later
      triggerHook: 0.9,
    })
      .setClassToggle(revealElements[i], "visible") // add class toggle
      .addIndicators({
        name: "digit " + (i + 1),
      }) // add indicators (requires plugin)
      .addTo(controller);
  }

  new ScrollMagic.Scene({
    triggerElement: revealElements[0],
    duration: 400,
    offset: 100,
    triggerHook: 0.75,
  })
    .addTo(controller)
    //.addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      $(revealElements[0]).css({
        left: `${parseInt(e.progress.toFixed(3) * 25)}%`,
      });
    });

  new ScrollMagic.Scene({
    triggerElement: revealElements[1],
    duration: 300,
    offset: 100,
    triggerHook: 0.75,
  })
    .addTo(controller)
    //.addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      $(revealElements[1]).css({
        left: `${-parseInt(e.progress.toFixed(3) * 25)}%`,
      });
    });

  $("#showcase-2-img").css({
    top: -$("#showcase-2-img").height() * 1.8,
  });

  const showcaseImages = Array.from(
    document.getElementsByClassName("showcase-img")
  ).map((item) => $(item));

  new ScrollMagic.Scene({
    triggerElement: "#showcase-trigger",
    duration: 500,
    offset: 100,
    triggerHook: 0.75,
  })
    .addTo(controller)
    .addIndicators("Showcase Trigger") // add indicators (requires plugin)
    .on("progress", function (e) {
      showcaseImages[0].css({
        top: `-${
          Math.abs(parseFloat(showcaseImages[1].height() * 1.5)) *
          (e.progress / 4 + 1)
        }px`,
      });

      showcaseImages[1].css({
        top: `-${
          Math.abs(parseFloat(showcaseImages[1].height() * 1.8)) *
          (e.progress / 4 + 1)
        }px`,
      });

      showcaseImages[2].css({
        top: `-${
          Math.abs(parseFloat(showcaseImages[1].height() * 1.5)) *
          (e.progress / 4 + 1)
        }px`,
      });
    });

  new ScrollMagic.Scene({
    triggerElement: "#marquee-3-trigger",
    duration: 600,
    offset: 100,
    triggerHook: 0.95,
  })
    .addTo(controller)
    //.addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      $(".marquee-3-inner").css({
        left: `${-parseInt(
          (e.progress.toFixed(3) *
            ($(".marquee-3-inner").width() - window.innerWidth)) /
            2
        )}px`,
      });
    });

  let hoverEnabled = false;
  new ScrollMagic.Scene({
    triggerElement: "#email-circle-trigger",
    duration: 100,
    offset: 300,
    triggerHook: 0.95,
  })
    .addTo(controller)
    .addIndicators("circle-trigger") // add indicators (requires plugin)
    .on("progress", function (e) {
      const scale = e.progress;
      $(".email-circle").css({
        transform: `scale(${scale})`,
      });

      $(".top-leaves").css({
        transform: `scale(${scale}) translate(${
          110 * (1 - Math.pow(1 - e.progress, 3))
        }px,${-110 * (1 - Math.pow(1 - e.progress, 3))}px)`,
      });

      $(".bottom-leaves").css({
        transform: `scale(${scale}) translate(${
          -125 * (1 - Math.pow(1 - e.progress, 3))
        }px,${125 * (1 - Math.pow(1 - e.progress, 3))}px)`,
      });

      $(".leaves-inner").css({
        transform: `rotate(${(1 - e.progress) * 40}deg) `,
      });

      $(".large-email-top-text").css({
        opacity: e.progress,
        top: 32 * (1 - e.progress),
        transform: `scale(${e.progress})) `,
      });

      $(".large-email-bottom-text").css({
        opacity: e.progress,
        top: -32 * (1 - e.progress),
        transform: `scale(${e.progress})) `,
      });

      hoverEnabled = e.progress === 1;
    });

  const emailCircle = $(".email-circle");
  const leavesInner = $(".leaves-inner");

  emailCircle.hover(
    function () {
      if (hoverEnabled) {
        leavesInner.rotation = getCurrentRotation(leavesInner[0]);
        leavesInner.stop(true, false).animate(
          {
            rotation: 20,
          },
          {
            step: function (rotation) {
              leavesInner.css({
                transform: `rotate(${rotation}deg)`,
              });
            },
          }
        );

        const scale = getCurrentScale(emailCircle[0]);

        emailCircle.scale = scale.scaleX;
        emailCircle.stop(true, false).animate(
          {
            scale: 1.1,
          },
          {
            step: function (scale) {
              if (scale >= 1) {
                emailCircle.css({
                  transform: `scale(${scale})`,
                });
              }
            },
          }
        );
      }
    },
    function () {
      if (hoverEnabled) {
        leavesInner.rotation = getCurrentRotation(leavesInner[0]);
        leavesInner.stop(true, false).animate(
          {
            rotation: 0,
          },
          {
            step: function (rotation) {
              leavesInner.css({
                transform: `rotate(${rotation}deg)`,
              });
            },
          }
        );

        const scale = getCurrentScale(emailCircle[0]);
        emailCircle.scale = scale.scaleX;
        emailCircle.stop(true, false).animate(
          {
            scale: 1,
          },
          {
            step: function (scale) {
              if (scale >= 1) {
                emailCircle.css({
                  transform: `scale(${scale})`,
                });
              }
            },
          }
        );
      }
    }
  );

  const pseudoElem1 = { translateX: -11, translateY: -10 };

  $(".left-button-inner").hover(
    function () {
      const elem = $(this);

      $(pseudoElem1)
        .stop(true, false)
        .animate(
          { translateX: -3, translateY: -2 },
          {
            duration: 500,
            step: function () {
              elem.css({
                transform: `translate(${this.translateX}px,${this.translateY}px)`,
              });
              pseudoElem1.translate = this.translateX;
              pseudoElem1.translate = this.translateY;
            },
          }
        );
    },
    function () {
      const elem = $(this);

      $(pseudoElem1)
        .stop(true, false)
        .animate(
          { translateX: -11, translateY: -10 },
          {
            duration: 500,
            step: function () {
              elem.css({
                transform: `translate(${this.translateX}px,${this.translateY}px)`,
              });
              pseudoElem1.translate = this.translateX;
              pseudoElem1.translate = this.translateY;
            },
          }
        );
    }
  );

  const pseudoElem2 = { translateX: 5, translateY: -10 };
  $(".right-button-inner").hover(
    function () {
      const elem = $(this);

      $(pseudoElem2)
        .stop(true, false)
        .animate(
          { translateX: -3, translateY: -2 },
          {
            duration: 500,
            step: function () {
              elem.css({
                transform: `translate(${this.translateX}px,${this.translateY}px)`,
              });
              pseudoElem2.translateX = this.translateX;
              pseudoElem2.translateY = this.translateY;
            },
          }
        );
    },
    function () {
      const elem = $(this);

      $(pseudoElem2)
        .stop(true, false)
        .animate(
          { translateX: 5, translateY: -10 },
          {
            duration: 500,
            step: function () {
              elem.css({
                transform: `translate(${this.translateX}px,${this.translateY}px)`,
              });
              pseudoElem2.translateX = this.translateX;
              pseudoElem2.translateY = this.translateY;
            },
          }
        );
    }
  );

  const pictureBallsOffset = $(".picture-ball").offset().top;
  const anchorOffset = $("#circle-picture-anchor").offset().top;

  const pictureBalls = $(".picture-ball");
  pictureBalls.css({
    top: -$(".picture-ball").offset().top,
  });

  const lefts = [];

  for (let i = 0; i < pictureBalls.length; i++) {
    lefts.push((window.innerWidth / pictureBalls.length) * i);
    $(pictureBalls[i]).css({
      left: lefts[i],
    });
  }

  new ScrollMagic.Scene({
    triggerElement: "#circle-picture-anchor",
    duration: 400,
    offset: -500,
    triggerHook: 0.5,
  })
    .addTo(controller)
    //.addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      const bounceProgress = easeOutBounce(e.progress);
      pictureBalls.css({
        top:
          -(pictureBallsOffset - anchorOffset + pictureBalls.height()) -
          (1 - bounceProgress) * pictureBallsOffset,
        opacity: e.progress,
      });
    });

  new ScrollMagic.Scene({
    triggerElement: "#circle-picture-anchor",
    duration: 200,
    offset: -100,
    triggerHook: 0.5,
  })
    .addTo(controller)
    //.addIndicators() // add indicators (requires plugin)
    .on("progress", function (e) {
      console.log(parseInt($(pictureBalls[0]).css("left")) + 100 * e.progress);
      $(pictureBalls[0]).css({
        left: lefts[0] + 150 * e.progress,
        transform: `rotate(${e.progress * 90}deg)`,
      });

      $(pictureBalls[1]).css({
        left: lefts[1] + 150 * e.progress,
        transform: `rotate(${e.progress * 90}deg)`,
      });

      $(pictureBalls[2]).css({
        left: lefts[2] + 150 * e.progress,
        transform: `rotate(${e.progress * 90}deg)`,
      });
    });

  //     var flightpath = {
  //         entry : {
  //             curviness: 1.25,
  //             autoRotate: true,
  //             values: [
  //                     {x: 100,	y: -20},
  //                     {x: 300,	y: 10}
  //                 ]
  //         },
  //         looping : {
  //             curviness: 1.25,
  //             autoRotate: true,
  //             values: [
  //                     {x: 510,	y: 60},
  //                     {x: 620,	y: -60},
  //                     {x: 500,	y: -100},
  //                     {x: 380,	y: 20},
  //                     {x: 500,	y: 60},
  //                     {x: 580,	y: 20},
  //                     {x: 620,	y: 15}
  //                 ]
  //         },
  //         leave : {
  //             curviness: 1.25,
  //             autoRotate: true,
  //             values: [
  //                     {x: 660,	y: 20},
  //                     {x: 800,	y: 130},
  //                     {x: $(window).width() + 300,	y: -100},
  //                 ]
  //         }
  //     };
  //     // init controller
  //     var controller = new ScrollMagic.Controller();

  //     // create tween
  //     var tween = new TimelineMax()
  //         .add(TweenMax.from($("#plane"), 0.2, {css:{opacity:0.0}, ease:Power1.easeInOut}))
  //         .add(TweenMax.to($("#plane"), 1.2, {css:{bezier:flightpath.entry, opacity:0.2}, ease:Power1.easeInOut}))
  //         .add(TweenMax.to($("#plane"), 2, {css:{bezier:flightpath.looping,  opacity:0.5}, ease:Power1.easeInOut}))
  //         .add(TweenMax.to($("#plane"), 1, {css:{bezier:flightpath.leave, opacity:1}, ease:Power1.easeInOut}));

  //     // build scene
  //     var scene = new ScrollMagic.Scene({triggerElement: "#trigger", duration: 1500, offset: 200})
  //                     .setPin("#target")
  //                     .setTween(tween)
  //                     .addIndicators() // add indicators (requires plugin)
  //                     .addTo(controller);
});

$(window).on("resize", function () {
  if (window.innerWidth >= 768) {
  }

  $("#showcase-2-img").css({
    top: -$("#showcase-2-img").height() * 1.8,
  });
});
