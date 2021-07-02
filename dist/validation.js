$('#form').validate({
	rules: {
		title: {
			minlength: 2
		},
		desc: {
			minlength: 4
		},
		people: {
			min: 1,
			max: 20
		}
	},
	messages: {
		title: {
			minlength: 'Your title  must consist of at least 2 characters'
		},
		desc: {
			minlength: 'Your description  must consist of at least 4 characters'
		},
		people: {
			min: 'Atleast 1 person must be',
			max: 'maximum 20 person allowed'
		}
	}
});
