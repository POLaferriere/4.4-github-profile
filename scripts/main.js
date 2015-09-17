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
  $('.profile-thumbnail, .profile-pic').attr('src', whatever.avatar_url);
  $('.user-full-name').text(whatever.name);
  $('.user-name').text(whatever.login);
});

//AJAX request to repo stats
$.ajax(repo).then(function(whatever){
  console.log(whatever);
});
