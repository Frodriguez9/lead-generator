// set up google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','chrome-analytics.js','ga');

ga('create', 'G-38G8DCYGL6', 'auto');
ga('send', 'pageview');



// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'G-38G8DCYGL6']);
// _gaq.push(['_trackPageview']);
//
// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();

// sends click events to Google Analytics
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

// use event handler for each button's click
var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', trackButtonClick);
}
