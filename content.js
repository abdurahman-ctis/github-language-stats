

var newNode = document.createElement('div');
newNode.innerText = "HIIIII";
var header = document.getElementsByClassName("UnderlineNav user-profile-nav js-sticky top-0")[0];
header.parentNode.insertBefore(newNode, header);