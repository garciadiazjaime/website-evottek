var lang = $('#lang_link').html() == 'ESP' ? 'EN' : 'ES';
var messages = {
				'ES':{
						'required_fields':'Favor de capturar los campos requeridos y/o cambiar la información inválida.',
						'sending':'Enviando, espere por favor...',
						'network_error':'Error en la red. Intente más tarde.',
				},
				'EN':{
						'required_fields':'Please fill required fields and/or change invalid data.',
						'sending':'Sending, please wait...',
						'network_error':'There was a network error. Try again later.'
				}
			}