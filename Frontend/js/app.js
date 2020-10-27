$(function () {
  $(".hamburger").on("click", function () {
    $(this).toggleClass("is-active");
  });

  $(".people-effect img").each(function (index) {
    if (index == 2) {
      setTimeout(() => {
        heroPeople(this);
      }, 2000);
    }
  });

  if($(".loading").length > 0){
    setTimeout(() => {
      var tl = gsap.timeline({});
      tl.to(".loading", {
        opacity: '0',
      }).to(".loading", {
        display: 'none',
      });
    }, 3000);
  }



  $(".faqs__content .collapse").each(function (index) {

    $("#" + $(this).attr("id")).on('show.bs.collapse', function (e) {
      console.log(e.currentTarget)
      $(e.currentTarget).parent().addClass("active");
    });
    $("#" + $(this).attr("id")).on('hide.bs.collapse	', function (e) {
      console.log(e.currentTarget)
      $(e.currentTarget).parent().removeClass("active");
    })

  });




  $(".sidebard-OS__content .close, .sidebard-OS__content .close-2").on("click", function () {
    $(".phone-tabs__link").removeClass("active");

    $(".sidebard-OS").removeClass("show");

    $(".sidebard-OS__content__item").removeClass("active");
  });


  $(".phone-tabs__link").on("click", function () {
    $(".phone-tabs__link").removeClass("active");
    $(this).addClass("active");
    $(".sidebard-OS").addClass("show");

    $(".sidebard-OS__content__item").removeClass("active");
    $($(this).data("target")).addClass("active");
  });

  $(".input-number-count__plus,.input-number-count__minus").on("click", function () {
    var value = parseInt($(this).parent().find("input").val());
    if (isNaN(value)) {
      value = 1;
    } else {
      if ($(this).hasClass("input-number-count__plus")) {
        $(this).parent().find("input").val(value + 1);
      } else {
        if (value > 1) {
          $(this).parent().find("input").val(value - 1);
        } else {
          $(this).parent().find("input").val(1);
        }
      }

    }

  });

  $(".select-a-plan__content__nav a").on("click", function () {
    var data = $(this).data();
    $(this).parent().parent().find("a").removeClass("active");
    $(this).addClass("active");
    $(".change-value-count").html(data.count);
    $(".change-value-unit").html(data.unit);
    $(".change-value-price").html(data.price);
    $("#plan_id").val(data.id);
    if (data.removeclass !== undefined) {
      $(".select-a-plan-details").removeClass(data.removeclass);
    } else {
      $(".select-a-plan-details").addClass(data.class);
    }

  });

  $(".login-nav a").on("click", function () {
    $(this).parent().find("a").removeClass("active");
    $(this).addClass("active");

    $($(this).data("target")).parent().find("div").removeClass("active");
    $($(this).data("target")).addClass("active");

  });



  $(".people-effect img").on("mouseover", function () {
    heroPeople(this);
  });

  $(".toggle-main-nav").on("click", function (e) {
    e.preventDefault();
    $(".main-nav").toggleClass("collasep");
    $(this).toggleClass("show");
  });
  $(window).resize(function () {
    if (window.matchMedia("(max-width: 1100px)").matches) {
      $(".main-nav").addClass("collasep");
    }
  }).trigger("resize");


  if ($('.data-table').length > 0) {
    //  Data tables
    var table = $('.data-table').DataTable();

    $('#search-input').on('keyup', function () {
      table.search(this.value).draw();
    });

    $('.data-table__arrow-back').on('click', function (e) {
      e.preventDefault();
      if (!$(".dataTables_paginate .previous").hasClass("disabled")) {
        $(".dataTables_paginate .previous a").trigger("click");
      }
    });
    $('.data-table__arrow-next').on('click', function (e) {
      e.preventDefault();
      if (!$(".dataTables_paginate .next").hasClass("disabled")) {
        $(".dataTables_paginate .next a").trigger("click");
      }
    });


    $("#export-data").on("click", function name(params) {
      var data = table.buttons.exportData({
        columns: ':visible'
      });
      exportCSVFile(data.header, data.body, 'Data');
    });

    $('.column-visibility-control-close, .column-visibility-control-show').on('click', function (e) {
      e.preventDefault();
      $(".column-visibility-control").toggleClass("show");
    });

    $('.column-visibility-control  input').on('click', function (e) {
      columnVisibilityControl(table);
    });
    columnVisibilityControl(table);
  }


  //  Form controls
  $(".form-group").on("change", function () {

    if ($(this).find(".form-control").get(0).checkValidity()) {
      $($(this).find(".form-control").get(0)).parent().addClass("is-valid");
      $($(this).find(".form-control").get(0)).parent().removeClass("is-invalid ");
    } else {
      $($(this).find(".form-control").get(0)).parent().addClass("is-invalid ");
      $($(this).find(".form-control").get(0)).parent().removeClass("is-valid");
    }

  });

  $(".form-group").on("keyup", function () {
    $(".form-group .form-control").each(function () {
      if ($(this).val().length > 0) {
        $(this).parent().addClass("has-content");
      } else {
        $(this).parent().removeClass("has-content");
      }
    });
  }).trigger("keyup");

  // Slider
  if ($('.info-slider').length > 0) {
    $('.info-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      arrows: true
    });
  }
  //  Charts

  if ($(".chart-content-item").length > 0) {
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.tooltips.enabled = false;
    var charts = [];
    $(".chart-content-item").each(function () {

      var type = $(this).data("type");
      // var labels = $(this).data("labels").split(",");
      var data = $(this).data("data").split(",");
      var colors = $(this).data("colors").split(",");
      for (i = 0; i < data.length; i++) {
        data[i] = parseFloat(data[i]);
      }

      var chart = new Chart(this.getContext('2d'), {
        // The type of chart we want to create
        type: type,
        // The data for our dataset
        data: {
          // labels: labels,
          datasets: [{
            "backgroundColor": colors,
            data: data,
            borderWidth: 0,

          }]
        },

        // Configuration options go here
        options: {
          responsive: true,
        }
      });
      // chart.defaults.global.legend.display(false);
      charts.push(chart);
    });
  }

  if($("#church").length > 0){
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#church",
        start: "top center",
        end: "bottom",
        scrub: true
      }
    });
    tl.to("#church___1", {
        scale: 1.3
      }, "church")
      .to("#church___2", {
        y: '-5%',
        scale: 1.1
      }, "church")
      .to("#church___3", {
        y: '10%',
        scale: .9
      }, "church")
      .to("#church___4", {
        y: '-30%'
      }, "church")
      .add("church");
  }


});

function columnVisibilityControl(table) {
  $('.column-visibility-control  input').each(function (params) {
    // Get the column API object
    var column = table.column($(this).val());
    if ($(this).is(':checked')) {
      // Toggle the visibility
      column.visible(true);
    } else {
      // Toggle the visibility
      column.visible(false);
    }
  });
}

function convertToCSV(objArray) {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";
  for (let i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += ",";
      line += array[i][index];
    }
    str += line + "\r\n";
  }
  return str;
}

function exportCSVFile(headers, items, fileName) {
  if (headers) {
    items.unshift(headers);
  }
  var jsonObject = JSON.stringify(items);
  var csv = convertToCSV(jsonObject);
  var exportName = fileName + ".csv" || "export.csv";
  var blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;"
  });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, exportName);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportName);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function heroPeople(item) {
  var this_people = $(item).attr("people");
  var this_people_top = $(item).offset().top;
  var this_people_left = $(item).offset().left;
  var this_people_right = $(item).offset().left + $(item).width();
  $(".background-effect img").removeClass("active");
  $(".background-effect img").each(function () {
    if ($(this).attr("people") == this_people) {
      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
      }
    }
  });

  $(".text-effect > div").removeClass("active");
  $(".text-effect > div").each(function () {
    if ($(this).attr("people") == this_people) {
      if ($(this).hasClass("bubble-left")) {
        if ($(window).width() > 992) {
          $(this)
            .attr(
              "style",
              "top:calc(" +
              this_people_top +
              "px - 12vw); left:calc(" +
              this_people_right +
              "px - 10vw)"
            )
            .addClass("active");
        }
        if ($(window).width() <= 992 && $(window).width() > 600) {
          $(this)
            .attr(
              "style",
              "top:calc(" +
              this_people_top +
              "px - 18vw); left:calc(" +
              this_people_right +
              "px - 10vw)"
            )
            .addClass("active");
        }
        if ($(window).width() <= 600) {
          $(this)
            .attr(
              "style",
              "top:calc(" +
              this_people_top +
              "px - 23vw); left:calc(" +
              this_people_right +
              "px - 10vw)"
            )
            .addClass("active");
        }
      } else {
        if ($(window).width() > 992) {
          this_people_left = this_people_left - $(this).width();
          $(this)
            .attr(
              "style",
              "top:calc(" +
              this_people_top +
              "px - 12vw); left:calc(" +
              this_people_left +
              "px + 8vw)"
            )
            .addClass("active");
        }
        if ($(window).width() <= 992 && $(window).width() > 600) {
          this_people_left = this_people_left - $(this).width();
          $(this)
            .attr(
              "style",
              "top:calc(" +
              this_people_top +
              "px - 18vw); left:calc(" +
              this_people_left +
              "px + 8vw)"
            )
            .addClass("active");
        }
        if ($(window).width() <= 600) {
          this_people_left = this_people_left - $(this).width();
          $(this)
            .attr(
              "style",
              "top:calc(" +
              this_people_top +
              "px - 23vw); left:calc(" +
              this_people_left +
              "px + 8vw)"
            )
            .addClass("active");
        }
      }
    }
  });

  $(window).resize(function () {
    $(".text-effect > div").removeClass("active");
  });
}