$( document ).ready(function(){
  $('#search_again').click(function(e){
    e.preventDefault();
    var $title = $('h2');
    var $form = $('form');
    // Reset for new search
    $title.text("New physician search");
    $form.find('#address').val("");
    $form.find('#zipcode').val("");
    $form.find('select').val("");
    $form.show();
    $('#doctor_results').hide();
  });
});

$( document ).ready(function(){
  $('.btn-primary').click(function(e){
    e.preventDefault();
    var $form = $(this).closest('form');
    $.ajax({
      url: $form.attr('action'),
      type: 'POST',
      data: $form.serialize(),
      dataType: 'script',
      success: function(d){
        var response = JSON.parse(d);
        if (response.length == 0) {
          // No doctors were found
          $('.no_results').remove();
          $('div.container').prepend("<p class=no_results><strong>No results found in your search area.</strong></p>");
        } else if (response[0].hasOwnProperty("notice")){
          // Address was not provided
          $('.notice').remove();
          $('div.container').prepend("<p class=notice>" + response[0]["notice"]);
        } else {
          $('.no_results').remove();
          $('.notice').remove();
          $form.hide();
          // Successful search; display results
          var $title = $('h2');
          $title.html("Search results");
          var $results = $('#doctor_results > ol');
          $results.html("");
          // Only show closest 10 doctors on the results page
          var limit = Math.min(10, response.length);
          for (var i = 0; i < limit; i++){
            $results.append("<li>" + response[i]["last_name"] + ", " + response[i]["first_name"] + "</li>");
            $results.append("<p>Specialty: " + response[i]["specialties"]);
            $results.append("<p>" + response[i]["full_address"] + "</p>");
            $results.append("<p>Distance: " + response[i]["distance"] + " miles</p>");
          }
          
          if (response.length > 10 && $form.find('#specialty_id').val() == ""){
            $('#doctor_results').prepend("<p><strong>More than 10 results were returned. Try selecting a specialty to narrow the results.</strong></p>");
          }
          $('#doctor_results').append("<a id=search_again href='/'>");
          $('#doctor_results > a').text("Search again");
          $('#doctor_results').show();
        }
      },
      failure: function(){alert('Could not perform search');}
    });
  });
});