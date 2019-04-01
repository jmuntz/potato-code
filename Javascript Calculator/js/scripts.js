function send(msg) {
	console.log(msg);
}

model = {
	buttons: [],
}




controller = {
	init: function() {
		// do things
		send("test");
		this.generateButtons();
		view.render();
	},

	createButton: function(text, val, type) {
		send("Create button.");

		var button = document.createElement("button");
		button.setAttribute("value", val);
		button.textContent = text;

		button.className = "btn";

		if (type === "operator") 
			button.className += " operator";
		
		button.onclick = function() {
			document.getElementById("output").value += this.value;
		}	

		return button;

	},

	generateButtons: function() {
		send("Generating buttons.");

		for( var i = 0; i < 10; i++) {
			button = this.createButton(i, i);
			model.buttons.unshift(button);	
		}

		button = this.createButton("+", "+", "operator");
		model.buttons.push(button);
		button = this.createButton("-", "-", "operator");
		model.buttons.push(button);
		button = this.createButton("*", "*", "operator");
		model.buttons.push(button);
		button = this.createButton("/", "/", "operator");
		model.buttons.push(button);

		button = this.createButton("=", "=", "operator");
		button.id = "evaluate";

		button.onclick = function() {
			controller.evaluate(document.getElementById("output").value);
		}

		model.buttons.push(button);
	},

	getButtons: function() {
		return model.buttons;
	},

	evaluate: function(str) {
		view.renderAnswer(eval(str));
	}
}




view = {
	render: function() {
		buttonsList = controller.getButtons();

		for (var i = 0; i < buttonsList.length; i++) {
			if (buttonsList[i].className == "btn operator") 
				document.getElementById("operators").append(buttonsList[i]);
			else

				document.getElementById("button-grid").append(buttonsList[i]);

		}

	},

	renderAnswer: function(str) {
		output = document.getElementById("output");
		output.value = "";
		output.placeholder = str;
	}
}


controller.init();







