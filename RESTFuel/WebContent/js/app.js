$(document).ready(function(){
  loadData();
});

var loadData = function() {
  ajax('GET', 'rest/fillUps', buildPage);
};

var getMoreInfo = function(fillUp) {
  var id = fillUp.id;
  var miles = fillUp.miles;
  var gallons = fillUp.gallons;
  var price = fillUp.price;
  var mpg = miles/gallons;
  var ppm = price/miles;
  showInfo(id,miles,gallons,price,mpg,ppm);
};
