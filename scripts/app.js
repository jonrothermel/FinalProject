const modal = function(e) {
	const body = $('body')
	body.css('overflow', 'hidden')
	body.css('position', 'fixed')
	const shim = $('<div></div>');
	shim.css({
		position: 'fixed',
		top: 0,
		left: 0,
		width: $(window).outerWidth(),
		height: $(window).outerHeight(),
		zIndex: 99999,
		backgroundColor: 'rgba(0,0,0,0.5)',
		boxSizing: 'border-box'
	});
	

	const close = $("<div></div>")
	close.html(`<button type="button" class="close p-2" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>`);
	close.css({
		cursor: 'pointer',
		color: 'black',
		position: 'absolute',
		top: 20,
		right: 50,
		fontSize: '36px'
	})
	close.click(function() {
		shim.remove();
		body.css('overflow', 'auto')
		body.css('position', 'static')
	})

	const content = $('<section class="fit-in-center"></section>')
	content.css({
		height: '100%',
		width: '100%',
		margin: '0 auto',
		backgroundColor: 'white',
		boxSizing: 'border-box',
		overflow: 'scroll'

	});
	content.html(`
<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
   <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
</svg>
	`)

	
	shim.append(content)
	shim.append(close)
	body.append(shim);

	const currentNeighborhood = $(e.target).text()
	$.get('https://wt-c5c9dbbf840b9daa284546a2e7dc37cb-0.run.webtask.io/get_locations')
		.then(function(data) {
			content.empty();
			data.forEach(function(row, index) {
				const neighborhood = data[index].fields.neighborhood
				if (neighborhood[0] !== currentNeighborhood) {
					return;
				}
				const name = (data[index].fields.name)
				const address = (data[index].fields.address)
				const description = data[index].fields.description
				const pictureUrl = (data[index].fields.picture[0].thumbnails.large.url)
				const table = `
	<div class="card mb-3" style="padding-top:10px">
	  <img class="card-img-top" src="${pictureUrl}" alt="image">
	  <div class="card-body">
	    <h4 class="card-title">${name}</h4>
	    <p class="card-text"><strong>Description:</strong> ${description}</p>
	    <p class="card-text"><strong>Address:</strong> ${address}</p>
	  </div>
	</div>
					`;
					content.append(table)
			});
			
		})
}
$('.neighborhood-list-item ').click(modal)

const onClick = function (e) {
	// e.preventDefault();
	const navLink = $(e.target)
	const target = navLink.attr("data-target");
	console.log(target);
	$('.borough-container').removeClass('borough--active');
	$(target).addClass('borough--active');
	$('.navbar-collapse').removeClass('show')
}
$('.js-nav-link').click(onClick)

