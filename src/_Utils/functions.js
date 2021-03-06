//Alert
import Store from "@Redux/Store/index";
import { mostrarAlertaRoja } from "@Redux/Actions/alerta";

export const mostrarAlerta = (texto) => {
	Store.dispatch(mostrarAlertaRoja({
		mostrarIconoCerrar: true,
		icono: 'error_outline',
		texto: texto
	}));
}

export const getIdTipoTributo = (tributo) => {
	if (typeof tributo !== "string") return false;

	tributo = tributo.toLowerCase();
	return (tributo == 'automotores' && 1) || (tributo == 'inmuebles' && 2) || (tributo == 'comercios' && 3) || (tributo == 'cementerios' && 4) || false;
}

export const stringToFloat = (str, decimales, opciones) => {
	if (opciones && opciones.permitirVacio && str == "") {
		return str;
	}

	if (str == undefined || str == "")
		return 0;

	//alert(str)
	if (str.toString().indexOf(",") > 0) {
		var n = str.toString().replace(/\./g, "");
		n = n.toString().replace(",", ".");
		if (!(!isNaN(parseFloat(n)) && isFinite(n)))
			return 0;
		else {
			if (!decimales)
				return parseFloat(n);
			else
				return Math.round(parseFloat(n) * Math.pow(10, decimales)) / Math.pow(10, decimales);
		}
	}
	else {

		if (!(!isNaN(parseFloat(str)) && isFinite(str))) {
			return 0;
		}
		else {
			if (!decimales)
				return parseFloat(str);
			else
				return Math.round(parseFloat(str) * Math.pow(10, decimales)) / Math.pow(10, decimales);
		}
	}
};

export const agregoCero = (num) => {
	if (num <= 9)
		return "0" + num;
	else
		return num;
};

export const dateToString = (date, format) => {
	const day = agregoCero(date.getDate());
	const month = agregoCero(parseInt(date.getMonth()) + 1);
	const year = date.getFullYear();

	return format.replace('DD', day).replace('MM', month).replace('YYYY', year);
};

export const stringToDate = (stringDate) => {
	const day = parseInt(stringDate.split("/")[0]);
	const month = parseInt(stringDate.split("/")[1]) - 1;
	const strYear = stringDate.split("/")[2];
	const year = strYear.length > 2 ? parseInt(strYear) : (2000 + parseInt(strYear));

	return new Date(year, month, day);
};

export const diffDays = (fromDate, toDate) => {
	return Math.round(Math.abs((fromDate.getTime() - toDate.getTime()) / (24 * 60 * 60 * 1000)));
};


export const getAllUrlParams = function (url) {

	// get query string from url (optional) or window
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

	// we'll store the parameters here
	var obj = {};

	// if query string exists
	if (queryString) {

		// stuff after # is not part of query string, so get rid of it
		queryString = queryString.split('#')[0];

		// split our query string into its component parts
		var arr = queryString.split('&');

		for (var i = 0; i < arr.length; i++) {
			// separate the keys and the values
			var a = arr[i].split('=');

			// in case params look like: list[]=thing1&list[]=thing2
			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function (v) {
				paramNum = v.slice(1, -1);
				return '';
			});

			// set parameter value (use 'true' if empty)
			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

			// if parameter name already exists
			if (obj[paramName]) {
				// convert value to array (if still string)
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [obj[paramName]];
				}
				// if no array index number specified...
				if (typeof paramNum === 'undefined') {
					// put the value on the end of the array
					obj[paramName].push(paramValue);
				}
				// if array index number specified...
				else {
					// put the value at that index number
					obj[paramName][paramNum] = paramValue;
				}
			}
			// if param name doesn't exist yet, set it
			else {
				obj[paramName] = paramValue;
			}
		}
	}

	return obj;
}