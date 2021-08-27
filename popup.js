// set up google analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'G-38G8DCYGL6']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// sends click events to Google Analytics
function trackButtonClick(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

// use event handler for each button's click
var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', trackButtonClick);
}
