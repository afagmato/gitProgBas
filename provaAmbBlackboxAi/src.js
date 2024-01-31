document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    if (username === 'admin' && password === 'password') {
      // If the credentials are valid, reload the page
      location.reload();
    } else {
      // If the credentials are invalid, display an error message
      document.getElementById('error-message').classList.remove('hidden');
    }
  });