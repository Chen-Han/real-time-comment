/*document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  checkPageButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);*/


var ref = new Firebase("https://real-time-comment.firebaseio.com/");

function withCurrTime(callback){
  var currentTab = chrome.tabs.query({ active: true, currentWindow: true })[0]; 

  (function(tab){
    // if(!tab)return;
    console.log(tab);
    alert(tab);
    tab.sendMessage(tab.id,GET_CURR_TIME,callback); //callback executed with current time attached
    // callback(1);
  }) (currentTab);
}
$(document).ready(function(){


  $("#submitComments").on('click',function(){
    var textComment = $("#textComments").val();
    $("#textComment").val('');
    withCurrTime(function(currTime){
      console.log(ref);
      ref.push({
        time:currTime,
        text:textComment,
        animation:"float-to-right-end"
      },function(err){
        console.log(err);
      });


    });
  })

})