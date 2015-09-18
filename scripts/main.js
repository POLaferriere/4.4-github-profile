var user = {
  url: 'https://api.github.com/users/POLaferriere',
  method: "GET",
  headers: {"Authorization": "token 21d92ccad43c59f3681a32a26b66a41f04711abd"}
};

var repo = {
  url: 'https://api.github.com/user/repos',
  method: "GET",
  headers: {"Authorization": "token 21d92ccad43c59f3681a32a26b66a41f04711abd"}
};

//AJAX request to profile stats
$.ajax(user).then(function(whatever){
  console.log(whatever);
  $('.js-profile-thumbnail, .js-profile-pic').attr('src', whatever.avatar_url);
  $('.js-user-full-name').text(whatever.name);
  $('.js-user-name').text(whatever.login);
  $('.js-email').text(whatever.email);
  $('.js-email').attr('href', "mailto:" + whatever.email);
  var dateJoined = new Date(whatever.created_at);
  $('.js-joined').text("Joined on " + convertMonths(dateJoined.getMonth()) + " " + dateJoined.getDate() + ", " + dateJoined.getFullYear());
});

//AJAX request to repo stats
$.ajax(repo).then(function(whatever){
  console.log(whatever);
});

var convertMonths = function(i) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[i-1];
};
