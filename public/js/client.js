var tags = new Array()

$( function() { 
    
    $( "#tags" ).autocomplete({ 
      source: tags 
  
/* #tthe ags is the id of the input element 
source: tags is the list of available tags*/ 
  
  
    }); 
  } );
  
  function movies(){
      var value = document.getElementById('tags').value
      console.log(value)

      const URL = '/auto?find=' + value

      fetch(URL).then((response) => {
          response.json().then((data) => {
            for(var i = 0; i < Object.keys(data).length; i++){
                tags[i] = data[i]['Movie Name']
            }
          })
      })
  }

  function search(){
      var value = document.getElementById('tags').value
      document.getElementById('movies').innerHTML = ""

      const URL = '/search?find=' + value

      fetch(URL).then((response) => {
          response.json().then((data) => {
              for(var i = 0; i < Object.keys(data).length; i++){
                  document.getElementById('movies').innerHTML += 'Movie:  '+data[i]['Movie Name']+ "<br>"
                  document.getElementById('movies').innerHTML += 'Year:    '+data[i]['Year']+ "<br>"
                  document.getElementById('movies').innerHTML += 'IMDb rating:    '+data[i]['IMDb Rating']+ "<br><hr><br>"
              }
          })
      })
  }

  var input = document.getElementById("tags");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchbtn").click();
  }
});