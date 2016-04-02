HTMLElement.prototype.toggle = function() { if (this.classList.contains("hidden")) { this.classList.remove('hidden'); } else { this.classList.add('hidden'); } }
function ajaxGet(url, onSuccess){ var buttonId = document.getElementById("button-load"); buttonId.disabled = "true"; buttonId.style.cursor = "text"; buttonId.style.background = "#CDFFCB";
var xmlhttp = new XMLHttpRequest(); xmlhttp.onreadystatechange = function() { if( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {onSuccess(xmlhttp.responseText); } }
xmlhttp.open('GET', url, true); setTimeout(function(){ xmlhttp.send(); buttonId.disabled = false; buttonId.style.cursor = "default"; }, 2000); }
document.addEventListener("DOMContentLoaded", function() { var reply = document.querySelectorAll('.button-reply'); var r = 0, r_length = reply.length; for (r; r < r_length; r++) { reply[r].addEventListener('click', function() { var parent = this.closest('.post-status-button-div'); var post = this.parentNode.nextElementSibling; post.toggle(); parent.toggle(); }); } }); document.addEventListener("DOMContentLoaded", function() { document.getElementById("post-status-btn").addEventListener("click", function () { document.getElementById('statuspost').toggle(); this.toggle(); }); }); document.addEventListener("DOMContentLoaded", function() { document.getElementById("button-load").addEventListener("click", function () { ajaxGet('statuses-1.html', function(text) { document.getElementById("extra_statuses").innerHTML = text; }); }); });
var lazyLoad = new Event('lazyLoad');
var images = [];
document.addEventListener("DOMContentLoaded", function(){
  images = document.querySelectorAll('img');
  console.log(images);
  document.dispatchEvent(lazyLoad);
});
window.addEventListener("scroll",function(){
  document.dispatchEvent(lazyLoad);
});
document.addEventListener("lazyLoad", function(){
  var inView = window.pageYOffset + window.innerHeight;
  for (var i in images) {
    if (images[i].y < inView) {
      images[i].src = images[i].dataset.src;
    }
  }
});
