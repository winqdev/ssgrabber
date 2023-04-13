function get() {
    var screen = document.getElementById("frame");
    fetch('/get-screenshot')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('No response/traffic from server!');
        }
        return response.blob();
      })
      .then(function(myBlob) {
        var objectURL = URL.createObjectURL(myBlob);
        screen.src = objectURL;
      })
      .catch(function(error) {
        console.log('Unexpected error:', error);
      });
  }

  function screenshot() {
     fetch('/screenshot')
     .then(function(response) {
      if (!response.ok) {
        throw new Error('No response/traffic from server!')
      }
     })
     .catch(function(error) {
      console.log('Unexpected error:', error)
     })
  }
