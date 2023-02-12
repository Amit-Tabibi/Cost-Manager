/*
* Amit Tabibi - 211821368
* David Daida - 313374373
* */

$(document).ready(async function() {

  if(localStorage.visited){
    localStorage.setItem("visited", false);
  }else{
    await introJs()
        .setOption("doneLabel", "Next page")
        .start()
        .oncomplete(function() {
          window.location.href = "/pages/monthly-view.html";
        });
  }
});



$('#clear-old-data').on('click', async function(){
  await localStorage.setItem('expenses',"");
  location.reload();
});



  //Add a row 
  $('#addAnother').on('click', function() {
    let rowNumber = $('tbody').children().length;
    $('#addExpenseInfo').hide();
    $('#expenseSuccessSavedTableHeader').hide();
    let expenseRow = '<tr id="' + rowNumber + '"> <th scope="row">' + rowNumber + '</th><td><input type="text" class="form-control datepicker" id="date-row' + rowNumber + '" placeholder="Date ..." /></td><td><input type="text" class="form-control" /></td> <td><div class="dropdown"><button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</button><div class="dropdown-menu" aria-labelledby="dropdownMenuButton"><li><a class="dropdown-item" href="#">Automobile</a><a class="dropdown-item" href="#">Clothing</a><a class="dropdown-item" href="#">Entertainment</a><a class="dropdown-item" href="#">Food</a><a class="dropdown-item" href="#">Healthcare</a><a class="dropdown-item" href="#">Vacation</a></li></div></div></td><td><input type="text" class="form-control" id="more-info-row' + rowNumber + '"  placeholder="description ..." /></td><td><input type="text" class="form-control" id="comments-row' + rowNumber + '" placeholder="comments ..." /></td></tr>'

    $('tbody').append(expenseRow);

    //Show dropdown content in button area
    $(".dropdown-menu li a").click(function() {
      $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
      $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });

    $('.datepicker').datepicker();
  });

  //save
  $("#save").on("click", function() {
    //get all the input values
    let table = $("table");
    let rowIds = [];
    let cells = [];
    let category = [];
    $("tr", table).each(function() {
      rowIds.push($(this).attr("id"));
      $("td input", $(this)).each(function() {
        cells.push($(this).val());
      });
      $("td #dropdownMenuButton", $(this)).each(function() {
        category.push($(this).text());
      });
    });

    //split the input values
    function split(arr, n) {
      let res = [];
      while (arr.length) {
        res.push(arr.splice(0, n));
      }
      return res;
    }

    let individualExpenses = split(cells.slice(), cells.length / (rowIds.length - 2));
    individualExpenses.forEach(function(elem, i) {
      elem.push(category[i]);
    });

    if (localStorage.expenses) {
      let temp = JSON.parse(localStorage.getItem("expenses"));
      let finalArrToPush = temp;
      if (individualExpenses.length >= 1) {
        individualExpenses.forEach(function(elem) {
          finalArrToPush.push(elem);
        });
        localStorage.setItem("expenses", JSON.stringify(finalArrToPush));
      }
    } else {
      localStorage.setItem("expenses", JSON.stringify(individualExpenses));
    }

    // remove all old tables
    $("tbody").text("");
    $("tbody").append('<tr id="addExpenseInfo"><td colspan="6"><div class="expenseTableHeader text-center">Add an expense by clicking the add button</div></td></tr>');
    $("tbody").append('<tr id="expenseSuccessSavedTableHeader"><td colspan="6"><div class="expenseSuccessSavedTableHeader text-center">All the expenses were successfully saved</div></td></tr>');

    $("#help-container").popover({
      selector: "[data-toggle='popover']",
      container: "body",
      html: true
    });

    console.log("row values  ", JSON.parse(localStorage.getItem("expenses")));});

