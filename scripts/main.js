var user = {
  url: 'https://api.github.com/users/POLaferriere',
  method: "GET",
  headers: {"Authorization": "token be9af9fd503c77f03ff9f11dcfab2981d384b199"}
};

var starred = {
  url: 'https://api.github.com/users/POLaferriere/starred',
  method: "GET",
  headers: {"Authorization": "token be9af9fd503c77f03ff9f11dcfab2981d384b199"}
};

var repo = {
  url: 'https://api.github.com/user/repos?sort=updated',
  method: "GET",
  headers: {"Authorization": "token be9af9fd503c77f03ff9f11dcfab2981d384b199"}
};

var notifications = {
  url: 'https://api.github.com/notifications',
  method: "GET",
  headers: {"Authorization": "token be9af9fd503c77f03ff9f11dcfab2981d384b199"}
};


//AJAX request to profile stats
$.ajax(user).then(function(whatever){
  console.log(whatever);
  $('.js-profile-thumbnail, .js-profile-pic').attr('src', whatever.avatar_url);
  $('.js-user-full-name').text(whatever.name);
  $('.js-user-name').text(whatever.login);
  $('.js-profile-popup-name').text(whatever.login);
  $('.js-profile-popup-link').attr('href', 'https://github.com/' + whatever.login);
  $('.js-email').text(whatever.email);
  $('.js-email').attr('href', "mailto:" + whatever.email);
  var dateJoined = new Date(whatever.created_at);
  $('.js-joined').text("Joined on " + convertMonths(dateJoined.getMonth()) + " " + dateJoined.getDate() + ", " + dateJoined.getFullYear());
  $('.js-follower').text(whatever.followers);
  $('.js-follower-link').attr('href', 'https://github.com/' + whatever.login + '/followers');
  $('.js-following').text(whatever.following);
  $('.js-following-link').attr('href', 'https://github.com/' + whatever.login + '/following');

});

//AJAX request to starred repos
$.ajax(starred).then(function(whatever){
  $('.js-starred').text(whatever.length);
});

//AJAX request to repo stats
$.ajax(repo).then(function(whatever) {
  whatever.forEach(addRepos);
});

$.ajax(notifications).then(function(whatever) {
  console.log(whatever);
  $('.js-notification-tooltip').text('You have ' + whatever.length + ' unread notifications');
});



var convertMonths = function(i) {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[i-1];
};

var addRepos = function(repos) {
  var source = $('#repo-template').html();
  var template = Handlebars.compile(source);
  $('.repos-list').append(template(repos));
  if(repos.description !== null){
    writeDescription(repos);
  }
  writeTimePassed(repos);
  if (repos.fork === true) {
    writeForked(repos);    // console.log(writeForked(repos));
  }
};

var writeForked = function(repo) {
  $.ajax('https://api.github.com/repos/POLaferriere/' + repo.name).then(function(forkedRepo) {
    var source = '<h3><i class="fa fa-code-fork"> forked from <a href="{{parent.html_url}}" class="forked-link" style="color:rgba(72, 125, 189, 1)">{{parent.full_name}}</a></h3>';
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

var writeDescription = function (repo) {
  var description = repo.description;
  var selector = 'h1:contains(' + repo.name + ')';
  var newHTML = '<h3 class="repo-updated">' + description + '</h3>';
  $(selector).parent().parent().siblings('.repo-lines').append(newHTML);
};

$('.js-create').on('click', function() {
  $('.create-popup').addClass('clicked');
});

$('.create-popup').on('click', function() {
  $('.create-popup').removeClass('clicked');
});

$('.js-profile').on('click', function() {
  $('.profile-popup').addClass('clicked');
});

$('.profile-popup').on('click', function() {
  $('.profile-popup').removeClass('clicked');
});
