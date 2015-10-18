// Your JavaScript goes here...
function parse() {
	data = new XMLHttpRequest();
	data.open("GET", "data.json", true);
	data.onreadystatechange = function () {
		if ( data.readyState == 4) {
			messages = document.getTagByID("messages");
			messages.innerHTML = data.responseText;

		}
	}
}