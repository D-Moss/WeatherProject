function myFunction() {
	var x = document.getElementById("myTopNav");

	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

function changeTheme() {
	let body = document.querySelector("body");

	if (body.classList.contains("dark")) {
		body.classList.remove("dark");
	} else {
		body.classList.add("dark");
	}
}

function openTab(tabName) {
	var a, y;
	y = document.getElementsByClassName("containerTab");
	for (a = 0; a < y.length; a++) {
		y[a].style.display = "none";
	}
	document.getElementById(tabName).style.display = "block";
}

let themeButton = document.querySelector(".theme");
themeButton.addEventListener("click", changeTheme);