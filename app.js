$('.neighborhood-list-item ').each(function(index, currentListItem) {
	$(currentListItem).addClass('js-modal-downtown-manhattan-'+index)
	new jBox('Modal', {
	    width: 800,
	    height: 400,
	    attach: '.js-modal-downtown-manhattan-'+index,
	    title: 'What is in Manhattan?',
		ajax: {
			url: 'https://wt-c5c9dbbf840b9daa284546a2e7dc37cb-0.run.webtask.io/get_locations',
			data: {
			  id: index,
			},
			reload: true,
			success: function(response) {
				$('.jBox-content').empty()
				const div = $(response);
				const data = JSON.parse(div.text())
				console.log(data)
				const neighborhood = data[0].fields.neighborhood
				const name = (data[0].fields.name)
				const address = (data[0].fields.address)
				const description = data[0].fields.description
				const pictureUrl = (data[0].fields.picture[0].thumbnails.large.url)
				const table = `
<div class="card mb-3">
  <img class="card-img-top" src="${pictureUrl}" alt="image">
  <div class="card-body">
    <h4 class="card-title">${name}</h4>
    <p class="card-text"><strong>Description:</strong> ${description}</p>
    <p class="card-text"><strong>Address:</strong> ${address}</p>
  </div>
</div>
<div class="card mb-3">
  <img class="card-img-top" src="${pictureUrl}" alt="image">
  <div class="card-body">
    <h4 class="card-title">${name}</h4>
    <p class="card-text"><strong>Description:</strong> ${description}</p>
    <p class="card-text"><strong>Address:</strong> ${address}</p>
  </div>
</div>
				`;
				$('.jBox-content').html(table)

			}
		},
	})
});

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

