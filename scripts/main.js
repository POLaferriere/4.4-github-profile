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

//AJAX request to get all repository objects, logs the objects
$.ajax(user).then(function(whatever){
  console.log(whatever);
  var newThumbnail = whatever.avatar_url;
  $('.profile-thumbnail').attr('src', newThumbnail);
});

$.ajax(repo).then(function(whatever){
  console.log(whatever);
});
