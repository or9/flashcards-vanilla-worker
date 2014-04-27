(function() {
	var rows = document.querySelectorAll(".row");
	var len = rows.length;
	var element = {};
	
	for(var i = 0; i < len; i++) {
		element = document.createElement("a")
		element.id = rows[i].id + "Collapsed";
		element.innerHTML = "Expand " + rows[i].id;
		element.className = "expand";
		element.href = "#";
		collapse(rows[i]);
		rows[i].addEventListener("click", handler_expandCollapse, false);
	}
	
	rows = null;
	len = null;
	element = null;
	
	function collapse(row) {
		var element = document.createElement("a");
		element.id = row.id + "Collapsed";
		element.innerHTML = "Expand " + row.id;
		element.className = "expand";
		row.appendChild(element);

		row.className += " collapsed vertical";
	}
	
	function expand(row) {
		row.removeChild(document.getElementById(row.id + "Collapsed"));
		row.className = row.className.replace(/\s{0,}collapsed/gi, "");
		row.className = row.className.replace(/\s{0,}vertical/gi, "");
		
	}
	
	function handler_expandCollapse(e) {
		if(e.target.className.match(/collapsed/gi)) {
			expand(e.target);
		} else {
			collapse(e.target);
		}
	}
	
}());
