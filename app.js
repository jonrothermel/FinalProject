$('.neighborhood-list-item ').each(function(index, currentListItem) {
	$(currentListItem).addClass('js-modal-downtown-manhattan-'+index)
	new jBox('Modal', {
	    width: 300,
	    height: 100,
	    attach: '.js-modal-downtown-manhattan-'+index,
	    title: 'What is in Downtown Manhattan?',
		ajax: {
			url: 'https://rawgit.com/jonrothermel/myFirstWebpage/master/index.html',
			data: {
			  id: index,
			},
			reload: true,
			success: function(response) {
			}
		},
	})
});

