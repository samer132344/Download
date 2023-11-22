$("#download-form").submit(function (e) {
    e.preventDefault();
    $("html").css({ "pointer-events": "none" });
    $(".spinner").show();
  
    var link = $("#youtube-vdieo-link").val();
  
    if (link.indexOf("youtube.com") > -1 || link.indexOf("youtu.be") > -1) {
      $.ajax("https://you-tube-downloader-vercel-cwqie7d2y-samer132344.vercel.app/download", {
        type: "POST",
        data: { link: link },
        success: (videoInfo) => {
          var video = `
                          <div class="container" id="may-remove">
                          <div class="row">
                              <div class="col-lg-6 col-md-6 col-12">
                              <iframe class="d-flex" src="${videoInfo.url}">
                              </iframe>
                              </div>
                              <div class="col-lg-6 col-md-6 col-12 download-btn-container">
                              
                              <button
                                  type="button"
                                  class="btn quality-btn btn-light dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                              >
                                  تحميل الجودة
                              </button>
                              
                              <div class="dropdown-menu">
                              </div>
                              </div>
                          </div>
                      </div>
          
                      
                          `;
          $(".video-info-container").after(video);
  
          var number = 0;
          videoInfo.info.forEach((format) => {
            ++number;
  
            var mimeType = format.mimeType.split(";")[0];
            var videoFormat = format.hasVideo ? format.height + "p" : "";
            var linkQuality = `
                              <a class="dropdown-item element-${number}" href="${format.url}">
                              ${mimeType}
                              ${videoFormat}
                              </a>
                              `;
            $(".dropdown-menu").append(linkQuality);
  
            if (!format.hasAudio) {
              var noAudio = `
                                  <i class="fas fa-volume-mute text-danger"></i>
                                  `;
              $(`.element-${number}`).append(noAudio);
            }
          });
          if (screen.width <= 568) {
            $(".fixed-bottom ").css({ position: "inherit" });
          }
          $(".spinner").hide();
          $("html").css({ "pointer-events": "visible" });
          $(':button[type="submit"]').prop("disabled", true);
        },
        error: (er) => {
          $("#er-code").fadeIn(500).delay(3000).fadeOut(500);
          $(".spinner").hide();
          $("html").css({ "pointer-events": "visible" });
        },
      });
    } else {
      $("#er-code").fadeIn(500).delay(3000).fadeOut(500);
      $("html").css({ "pointer-events": "visible" });
      $(".spinner").hide();
    }
  });
  
  $(document).on("keyup", "#youtube-vdieo-link", function () {
    $("#may-remove").remove();
    $(':button[type="submit"]').prop("disabled", false);
    if (screen.width <= 568) {
      $(".fixed-bottom ").css({ position: "fixed" });
    }
  });
  