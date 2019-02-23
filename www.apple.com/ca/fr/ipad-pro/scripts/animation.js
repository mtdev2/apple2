
var replaceSrc = function (video) {
  if (!video || !video.src) {
    return;
  }
  if (video && (video.src.indexOf("anim/ipad") > -1) || (video.src.indexOf("anim/apple-pay") > -1) || (video.src.indexOf("anim/swipe-up") > -1)) {
        //TODO: This code will also replace large, which you don't want, add small to the find string
        video.src = video.src.replace("/us/","/cafr/");
        video.load();
      }
    };

    var editSrc = function (mutationsList, editObserver) {
      for (var mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "src") {
          var video = mutation.target;
          if (video) {
            editObserver.disconnect();
            replaceSrc(video);
            editObserver.observe(video, {
              attributes: true
            });
          }
        }
      }
    };

    var waitForVideos = function (mutationsList, observer) {
      for (var mutation of mutationsList) {
        if (
          mutation.type === "childList" &&
          mutation.target.classList.contains("video-wrapper")
          ) {
          var video = mutation.target.querySelector("video");
        if (video) {
          replaceSrc(video);
          if(!video.dataset.hasobserver){
            video.dataset["hasobserver"] = true;
            var observer = new MutationObserver(editSrc);
            observer.observe(video, {
              attributes: true
            });
          }
        }
      }
    }
  };

  var bodyObserver = new MutationObserver(waitForVideos);
  bodyObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
