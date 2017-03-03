//ajax
//ajax
//ajax
var ajax = function(type,url,callback,contentType,jsonData) {
  $.ajax({
    type: type,
    url: url,
    dataType:'json',
    contentType: contentType,
    data: JSON.stringify(jsonData)
  })
  .done(function(data,status){
    callback(data);
  })
  .fail(function(xhr,status,error){
    console.log(error);
  });
};

//build page
var buildPage = function(data){
  //clear page
  $('body').empty();

  addHeader();
  addDataTable(data);
  addExtraInfo();
};

//create header
var addHeader = function(){
  $('body').append($('<h1>').text('RESTFuel'));
};

//build table
var addDataTable = function(data){
  var $table = $('<table>');
  $('body').append($table);
  //build head
  $table.append(
    $('<thead>').append(
      $('<tr>').append(
        $('<th>').text('#ID'),
        $('<th>').text('Miles'),
        $('<th>').text('Gallons'),
        $('<th>').text('Price'),
        $('<th>').text('MoreInfo'),
        $('<th>').text('Edit'),
        $('<th>').text('Delete')
      )
    )
  );
  //build rows
  $table.append($('<tbody>'));
  data.forEach(function(e) {
    $('tbody').append(
      $('<tr>').attr('id',e.id).append(
        $('<td>').addClass('id').text(e.id),
        $('<td>').addClass('miles').text(e.miles),
        $('<td>').addClass('gallons').text(e.gallons),
        $('<td>').addClass('price').text(e.price),
        $('<td>').append($('<button>').attr({name: e.id, class: 'MoreInfo'})),
        $('<td>').append($('<button>').attr({name: e.id, class: 'Edit'})),
        $('<td>').append($('<button>').attr({name: e.id, class: 'Delete'}))
      )
    );
  });
  makeButtons('MoreInfo');
  makeButtons('Edit');
  makeButtons('Delete');
  //make add fillUp button
  $('body').append($('<button>').attr('id','addFillUp'));
  $('#addFillUp').text('New Fill-Up');
  $('#addFillUp').click(function(e){
    makeForm('Create', 'POST');
  });

  //css
  //table border
  $table.css('border','solid #aaa 1px')
    .css('border-collapse','collapse');
  $('td').css('border','solid #aaa 1px')
    .css('border','solid #aaa 1px')
    .css('padding','5px');
  $('th').css('border','solid #aaa 1px')
    .css('padding','5px');
  //table stripes
  $('tr:odd').css('background-color','#ddd');
};

//add extra info section
var addExtraInfo = function() {
  $('#extraInfo').remove();
  //get data
  var totalFillUps = 0;
  var totalMiles = 0;
  var totalGallons = 0;
  var totalPrice = 0;
  $('.miles').each(function(){
    totalFillUps++;
    totalMiles = totalMiles + parseFloat($(this).text());
  });
  $('.gallons').each(function(){
    totalGallons = totalGallons + parseFloat($(this).text());
  });
  $('.price').each(function(){
    totalPrice = totalPrice + parseFloat($(this).text());
  });
  var avgMiles = totalMiles/totalFillUps;
  var avgGallons = totalGallons/totalFillUps;
  var avgPrice = totalPrice/totalFillUps;
  var avgMpg = avgMiles/avgGallons;
  var avgPpm = avgPrice/avgMiles;

  //display data
  $('body').append(
    $('<div>').attr('id','extraInfo').append(
      $('<ul>').text('Totals:').append(
        $('<br>'),
        $('<li>').text('Fill-Ups: '+totalFillUps),
        $('<li>').text('Miles: '+totalMiles.toFixed(1)),
        $('<li>').text('Gallons: '+totalGallons.toFixed(2)),
        $('<li>').text('Price: $'+totalPrice.toFixed(2))
      ),
      $('<ul>').text('Averages:').append(
        $('<br>'),
        $('<li>').text('Miles: '+avgMiles.toFixed(2)),
        $('<li>').text('Gallons: '+avgGallons.toFixed(2)),
        $('<li>').text('Price: $'+avgPrice.toFixed(2)),
        $('<li>').text('MPG: '+avgMpg.toFixed(2)),
        $('<li>').text('Price per Mile: $'+avgPpm.toFixed(2))
      )
    )
  );
  //css
  $('ul').css('list-style-type','square')
    .css('padding-left','0px');
  $('li').css('display','inline-block')
    .css('margin-left','10px');
};

//build more info section
var showInfo = function(id,miles,gallons,price,mpg,ppm){
  $('#extraInfo').empty();
  $('#extraInfo').append(
    $('<ul>').text('Info For Fill-Up #'+id+':').append(
      $('<br>'),
      $('<li>').text('Miles: '+miles),
      $('<li>').text('Gallons: '+gallons),
      $('<li>').text('Price: $'+price),
      $('<li>').text('MPG: '+mpg.toFixed(2)),
      $('<li>').text('Price per Mile: $'+ppm.toFixed(2))
    ),
    $('<button>').text('Show Total/Avg Info')
      .click(function(){
        addExtraInfo();
      })
  );
  //css
  $('ul').css('list-style-type','square')
    .css('padding-left','0px');
  $('li').css('display','inline-block')
    .css('margin-left','10px');
};

//generate buttons
var makeButtons = function(button) {
  $('.'+button).each(function(){
    $(this).text(button);
    $(this).click(function(){
      var id = $(this).attr('name');
      if (button === 'Edit') {
        makeForm('Update', 'PUT', id);
      } else if (button === 'MoreInfo'){
        ajax('GET','rest/fillUps/'+id,getMoreInfo);
      } else {
        if(confirm('Are you sure you want to Delete Fill-Up #'+id+'?')){
          ajax('DELETE','rest/fillUps/'+id,loadData);
        }
      }
    });
  });
};

//generate forms (create or update)
var makeForm = function(submitText, type, dataId){
  //clear form if it exists
  $('#createForm').remove();
  $form = $('<form>').attr('id','createForm');
  $('#addFillUp').after($form);

  //set data if update form
  var id = '';
  var miles = '';
  var gallons = '';
  var price = '';
  if(dataId) {
    id = '/'+dataId;
    miles = $('#'+dataId+' td:nth-child(1)').text();
    gallons = $('#'+dataId+' td:nth-child(2)').text();
    price = $('#'+dataId+' td:nth-child(3)').text();
  }

  $form.append(
    $('<input>').attr({type:'text', id:'milesInput', value: miles, placeholder: 'Miles'}),
    $('<input>').attr({type:'text', id:'gallonsInput', value: gallons, placeholder: 'Gallons'}),
    $('<input>').attr({type:'text', id:'priceInput', value: price, placeholder: 'Price'}),
    $('<input>').attr({type:'submit', id:'submit', value: submitText}),
    $('<button>').text('Hide').attr('id','hideFormButton').click(function(){ $('#createForm').remove(); })
  );

  $('#submit').click(function(e){
    e.preventDefault();
    if(validateForm()){
      var fillUp = {
        miles: $('#milesInput').val(),
        gallons: $('#gallonsInput').val(),
        price: $('#priceInput').val()
      };
      ajax(type,'rest/fillUps'+id,loadData,'application/json',fillUp);
    } else {
      $('.error').remove();
      $('body').append(
        $('<p>').addClass('error')
        .text('All Inputs Must Be Numbers/Cannot Be Blank')
      );
      //css
      $('.error').css('color','red');
    }
  });
};


//validate form inputs
var validateForm = function() {
  var miles = $('#milesInput').val();
  var gallons = $('#gallonsInput').val();
  var price = $('#priceInput').val();
  if(miles !== '' &&
    gallons !== '' &&
    price !== ''){
    if(!isNaN(miles) &&
      !isNaN(gallons) &&
      !isNaN(price) ){
      return true;
    }
  }
  return false;
};
