(function () {
  var inactiveSources = []
    , activeSources
    , VISIBLE_IMAGES = 6
    , SWITCH_INTERVAL_TIME = 4000;

  $(".portfolio a").each(function (_, el) {
    var $img = $(el).find("img");
    inactiveSources.push({ href: el.href, src: $img.attr("src") });
  });

  $(".portfolio li").slice(0, VISIBLE_IMAGES).removeClass("hidden");
  activeSources = inactiveSources.splice(0, VISIBLE_IMAGES);

  setInterval(function () {
    var $active = $($(".portfolio li").not(".hidden").get(Math.floor(Math.random() * VISIBLE_IMAGES)))
      , $img = $active.find("img")
      , $a = $active.find("a")
      , oldImgSrc = $img.attr("src")
      , newImgIndex = Math.floor(Math.random() * inactiveSources.length)
      , oldSrcIndex, newImg, i, length;

    for (i = 0, length = activeSources.length; i < length; i += 1) {
      if (activeSources[i].src === oldImgSrc) {
        oldSrcIndex = i;
        break;
      }
    }

    newImg = inactiveSources.splice(newImgIndex, 1)[0];
    oldImg = activeSources.splice(oldSrcIndex, 1)[0];
    inactiveSources.push(oldImg);
    activeSources.push(newImg);

    $img
      .fadeOut(400, function () {
        $a.attr("href", newImg.href);
        $img.attr("src", newImg.src);
      })
      .fadeIn(400);

  }, SWITCH_INTERVAL_TIME);

}());
