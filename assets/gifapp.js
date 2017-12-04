$(document).ready(function(){

	var gifs = ["kramer", "jerry", "elaine", "newman", "anakin", "darth vader", "peralta", "nico", "will", "carleton", "bart", "homer"];

	function displayGif(){
		var picture = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + picture + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url:queryURL,
			method:'GET'
		}).done(function(response){
			console.log(response);
			function renderGif(){
				var videos = 
				$('#gif-display').append(response.data.images.fixed_width.url);
			};
		})
	}


	function renderButton (){
		$('#display-buttons').empty();

		gifs.forEach(function(gif){
			var a = $('<button>');
			a.addClass('btn btn-success btn-lg');
			a.attr('data-name', gif);
			a.text(gif);
			$('#display-buttons').append(a);
		})
	}

	$('#added-gif').on('click', function(){
		event.preventDefault();

		var newGif = $('#user-input').val().trim();
		gifs.push(newGif);
		renderButton();
	})

	$(document).on("click", ".btn", displayGif);

	renderButton();



});