//AJAX request to get all repository objects, logs the objects
$.ajax({
  url: 'https://api.github.com/users/POLaferriere',
  method: "GET",
  headers: {"Authorization": "token 21d92ccad43c59f3681a32a26b66a41f04711abd"}
}).then(function(whatever){
  console.log(whatever);
});
