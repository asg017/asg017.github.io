function showMetrics() {
		window.alert("starting shw metrics");
		getMetrics(function(err, data) {
			if(err) {
				
			}
			else {
			var metrics = JSON.parse(data);

			var metricSentence = 'TritonFind has ' + metrics.num_users + 
								' users, ' + metrics.num_items + ' items registered, ' + 
								'and has recovered ' + metrics.num_returned + 
								'items back to their owners.';

				document.getElementById('metrics').textContent = metricSentence;

		});
}

function getMetrics(callback) {
	
	var xlmHttp = new XMLHttpRequest();
	
	xmlHttp.onreadystatechange = function() {
		if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
			callback(null, xmlHttp.responseText);
		else
			callback(true);
	};

	xmlHttp.open('GET', 'triton-find.herokuapp.com/metrics', true);
	xmlHttp.send(null);

}

