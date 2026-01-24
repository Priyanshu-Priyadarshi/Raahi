// Razorpay checkout script loader
(function() {
  if (!window.Razorpay) {
    var script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }
})();
