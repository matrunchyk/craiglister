var exports = module.exports = {};

exports.add_post = function(settings){
	var Nightmare = require('nightmare');
	var _ = require('lodash');

	require('nightmare-upload')(Nightmare);

	var defaults = {
		email: 'email@gmail.com',
		password: 'pass',
		phone: '16047111111',
		contact_name: 'John Doe',
		posting_title: 'Skoda Fabia 2005 Yellow like NEW (LOW Price)!',
		posting_price: 5000,
		postal_code: 'V6A',
		posting_content: "Lorem ipsum dolor sit amet, est delectus platonem te, partiendo scribentur sit in. Ne est lucilius expetenda, impetus noluisse assentior vel in. Has an deleniti delectus reformidans, sed duis ludus voluptatibus at, ei duo consul dicunt pericula. Nam melius timeam dolorem id, ut tacimates constituto est. Ei eam delenit molestie qualisque, te est eirmod lobortis. \nUt vide fuisset vulputate sed, cetero fabulas referrentur sed ea. Ea dico dolore maiestatis vim, nec invenire perpetua torquatos ex, at nihil tantas intellegam vix. Nonumes definiebas reformidans sea ex, vel at case elit omittam. In est etiam definiebas, cu per exerci temporibus.",
		auto_year: 2005,
		auto_make_model: 'Skoda',
		language: 5, // English
		photos: [],
		show_window: true,
		show_dock: true,
		showDevTools: false
	};

	_.merge(defaults, settings);
	settings = defaults;
	
	var nightmare = Nightmare({
		show: settings.show_window,
		openDevTools: settings.showDevTools,
		dock: settings.show_dock
	});

	
	nightmare
		.goto('https://accounts.craigslist.org/login/home')
		.cookies.clear()
		.refresh()
		.wait(2000)
		.goto('https://accounts.craigslist.org/login/home')

		// Login Page
		.insert('#inputEmailHandle', settings.email)
		.insert('#inputPassword', settings.password)
		.click('.loginBox button')
		
		// Dashboard
		.wait('.new_posting_thing')
		.select('.new_posting_thing [name=areaabb]', 'van')
		.click('.new_posting_thing input[type=submit]')
		
		// Posting type
		.wait('.picker input[name=id]')
		.click('.picker input[name=id][value=fso]')
		.click('.picker .pickbutton')
		
		// Posting subject
		.wait(2000)
		.wait('.picker .pickbutton')
		.wait('.picker input[name=id][value="145"]')
		.click('.picker input[name=id][value="145"]')

		// Posing location
		.wait(1000)
		.wait('.picker .pickbutton')
		.wait('.picker input[name=n][value="1"]')
		.click('.picker input[name=n][value="1"]')
		.click('.picker .pickbutton')

		// Posting details
		.wait(2000)
		.wait('.bigbutton')
		.click('#contact_phone_ok')
		.click('#contact_text_ok')
		.insert('#contact_phone', settings.phone)
		.insert('#contact_name', settings.contact_name)
		.insert('#PostingTitle', settings.posting_title)
		.insert('#Ask', settings.price)
		.insert('#postal_code', settings.postal_code)
		.insert('#PostingBody', settings.posting_content)
		.select('#auto_year', settings.auto_year)
		.insert('#auto_make_model', settings.auto_make_model)
		.select('#language', settings.language)
		.wait(1000)
		.select('#auto_fuel_type', 1) // Gas
		.select('#auto_title_status', 1) // Clean
		.select('#auto_transmission', 1) // Manual
		.click('.bigbutton')

		// Position on the Map
		.wait(3000)
		.click('.bigbutton')

		// Image Upload
		.wait(2000)
		.wait('#classic')
		.click('#classic')
		.wait(2000)
		.wait('#modern')
		.upload('input[name=file]', settings.photos)
		.click('.bigbutton')

		// Preview & Publish
		.wait(3000)
		.wait('button[type=submit]')
		.click('button[type=submit]')

		// Check email
	    .end()
	    .catch(function (error) {
	    	console.error('Action failed:', error);
	  	});

  	return this;

}

exports.do_test = function(settings) {
	console.log(settings)
}
