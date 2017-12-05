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

			// console.log(response);
			
			for (var i = 0; i < objData.length; i++){
				var gifDisplay = $('<div class="img-thumbnail">');
				var rating = objData[i].rating;
				var p = $('<p id="rating">').text("Rating: " + rating);
				var gifStill = $('<img>').attr('src', objData[i].images.fixed_height_still.url);
				gifStill.attr('data-state', 'still');
				var gifAnimate = $('<img>').attr('src', objData[i].images.fixed_height.url);
				gifAnimate.attr('data-state', 'animate');

				gifDisplay.append(p);
				gifDisplay.append(gifAnimate);

				$('#gif-display').prepend(gifDisplay);

				var status = $('img').attr('data-state');

				// $('img').on('click', function(){
				// 	if (status === 'still') {
				// 		$(this).attr('src', $(this).attr(gifAnimate));
				// 		$('img').attr('data-state', 'animate');
				// 	}
				// 	if (status === 'animate') {
				// 		$(this).attr($(this).attr(gifStill));
				// 		$('img').attr('data-state', 'still');
				// 	}
				// })

			};
		});
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
		if (newGif === ""){
			alert("Please enter a TV or Movie character!");
			return;
		};
		gifs.push(newGif);
		renderButton();
	})

	$(document).on("click", ".gif-image", displayGif);

	renderButton();



});