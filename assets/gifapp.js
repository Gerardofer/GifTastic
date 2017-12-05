$(document).ready(function(){

	var gifs = ["kramer", "jerry", "elaine", "newman", "anakin", "darth vader", "peralta", "nico", "will", "carleton", "bart", "homer", "spiderman", "batman", "ironman", "antman", "wolverin", "storm", "naruto"];

	function displayGif(){
		var picture = $(this).attr('data-name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + picture + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			var objData = response.data;

			console.log(response);

			function gifRender(){
				for (var i = 0; i < objData.length; i++){
					var gifDisplay = $('<div class="img-thumbnail">');
					var rating = objData[i].rating;
					var p = $('<p>').text("Rating: " + rating);
					var gifImage = $('<img class="gifThumbnail">');
					gifImage.attr('src', objData[i].images.fixed_height.url)
					gifImage.attr('data-state', 'still');

					gifDisplay.append(p);
					gifDisplay.append(gifImage);

					$('#gif-display').prepend(gifDisplay);
				};
			};

			gifRender();

				// var state = gifImage.attr('data-state');
				// if (state === 'still') {
				// 	$(this).attr('src', objData[i].images.fixed_height.url);
				// 	gifImage.attr('data-state', 'animate');
				// }
				// if (state === 'animate') {
				// 	$(this).attr('src', objData[i].images.fixed_height_still.url);
				// 	gifImage.attr('data-state', 'still');
				
		});

		// };
	}


	function renderButton (){
		$('#display-buttons').empty();

		gifs.forEach(function(gif){
			var a = $('<button>');
			a.addClass('gif-image btn btn-success btn-lg');
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

	$(document).on("click", ".gif-image", displayGif);

	renderButton();



});