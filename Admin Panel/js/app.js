$(function () {
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
});



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