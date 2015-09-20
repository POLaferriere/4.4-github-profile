var user = {
  url: 'https://api.github.com/users/POLaferriere',
  method: "GET",
  headers: {"Authorization": "token 21d92ccad43c59f3681a32a26b66a41f04711abd"}
};

var starred = {
  url: 'https://api.github.com/users/POLaferriere/starred',
  method: "GET",
  headers: {"Authorization": "token 21d92ccad43c59f3681a32a26b66a41f04711abd"}
};

var repo = {
  url: 'https://api.github.com/user/repos?sort=updated',
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
  $('.js-follower').text(whatever.followers);
  $('.js-following').text(whatever.following);
  $('.js-follower-link').attr('href', whatever.followers_url);
  $('.js-following-link').attr('href', whatever.following_url);
  $('.js-starred-link').attr('href', whatever.starred_url);

});

//AJAX request to starred repos
$.ajax(starred).then(function(whatever){
  console.log(whatever);
  $('.js-starred').text(whatever.length);
});

//AJAX request to repo stats
$.ajax(repo).then(function(whatever) {
  whatever.forEach(addRepos);

});

var convertMonths = function(i) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[i-1];
};

var addRepos = function(repos) {
  var source = $('#repo-template').html();
  var template = Handlebars.compile(source);
  $('.repos-list').append(template(repos));
  writeTimePassed(repos);
  if (repos.fork === true) {
    writeForked(repos);    // console.log(writeForked(repos));
  }
};

var writeForked = function(repo) {
  $.ajax('https://api.github.com/repos/POLaferriere/' + repo.name).then(function(forkedRepo) {
    var source = '<h3><i class="fa fa-code-fork"> forked from <a href="{{parent.html_url}}" style="color:rgba(72, 125, 189, 1)">{{parent.full_name}}</a></h3>';
    var template = Handlebars.compile(source);
    var selector = 'h1:contains(' + repo.name + ')';
    $(selector).parent().parent().siblings('.repo-lines').prepend(template(forkedRepo));
  });
};

var writeTimePassed = function(repo) {
  var timePassed = moment(repo.updated_at).fromNow();
  var selector = 'h1:contains(' + repo.name + ')';
  var newHTML = '<h3 class="repo-updated">Updated ' + timePassed +'</h3>';
  $(selector).parent().parent().siblings('.repo-lines').append(newHTML);
};
