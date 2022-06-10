const URLGET = 'https://api.bluelytics.com.ar/v2/latest';

$('#menu').fadeIn('slow');

$.get(URLGET, function(respuesta, estado) {
	if (estado === 'success') {
		$('#valorCompra').text(`$${respuesta.blue.value_buy}`);
		$('#valorVenta').text(`$${respuesta.blue.value_sell}`);

		var select = document.getElementById('monedaSelect');
		select.addEventListener('change', function() {
			var selectedOption = this.options[select.selectedIndex];

			if (selectedOption.value == 'usd') {
				$('#otherMoneda').html(`<select name="" class="border rounded" id="otherMoneda" disabled>
							<option value="usd">Dólar Blue</option>
							<option value="ars" selected>Peso Argentino</option>
						</select>`);
				$('#valorUsuario').keyup(() => {
					let valorIngresado = parseInt($('#valorUsuario').val());
					let cambio = valorIngresado * valorCompra;
					$('#mostrarCambio').val(cambio);
					if ($('#mostrarCambio').val() === 'NaN') {
						$('#mostrarCambio').val('');
					}
				});
			}
			if (selectedOption.value == 'ars') {
				console.log('peso selected');
				$('#otherMoneda').html(`<select name="" class="border rounded" id="otherMoneda" disabled>
							<option value="usd" selected>Dólar Blue</option>
							<option value="ars">Peso Argentino</option>
						</select>`);
				$('#valorUsuario').keyup(() => {
					let valorIngresado = parseInt($('#valorUsuario').val());
					let cambio = valorIngresado / valorCompra;
					$('#mostrarCambio').val(cambio.toFixed(2));
					if ($('#mostrarCambio').val() === 'NaN') {
						$('#mostrarCambio').val('');
					}
				});
			}
		});
		let valorCompra = `${respuesta.blue.value_sell}`;
	}
});
