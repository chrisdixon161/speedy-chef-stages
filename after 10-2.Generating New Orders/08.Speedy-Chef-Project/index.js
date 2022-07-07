const pizzas = [
	{
		name: "Margherita",
		method:
			"1/ Roll the dough base to the required thickness and shape. 2/ Add sauce to the base. 3/ Top with cheese.",
		requiredSteps: ["ROLL DOUGH", "PIZZA SAUCE", "CHEESE"],
	},
	{
		name: "Pepperoni",
		method:
			"1/ Roll the dough base to the required thickness and shape. 2/ Add sauce to the base. 3/ Top with cheese. 4/ Add 12 slices of pepperoni.",
		requiredSteps: ["ROLL DOUGH", "PIZZA SAUCE", "CHEESE", "PEPPERONI"],
	},
	{
		name: "Ham and Pineapple",
		method:
			"1/ Roll the dough base to the required thickness and shape. 2/ Add sauce to the base. 3/ Top with cheese. 4/ Add 12 pieces of ham. 5/ Add 12 pieces of pineapple.",
		requiredSteps: ["ROLL DOUGH", "PIZZA SAUCE", "CHEESE", "HAM", "PINEAPPLE"],
	},
	{
		name: "Chicken",
		method:
			"1/ Roll the dough base to the required thickness and shape. 2/ Add sauce to the base. 3/ Top with cheese. 4/ Add 12 pieces of chicken",
		requiredSteps: ["ROLL DOUGH", "PIZZA SAUCE", "CHEESE", "CHICKEN"],
	},
	{
		name: "Vegetarian",
		method:
			"1/ Roll the dough base to the required thickness and shape. 2/ Add sauce to the base. 3/ Top with cheese. 4/ Add handful of onions. 5/ Add handful of peppers. 6/ Add small handful of mushrooms. 7/ Add garlic.",
		requiredSteps: [
			"ROLL DOUGH",
			"PIZZA SAUCE",
			"CHEESE",
			"ONIONS",
			"PEPPERS",
			"MUSHROOMS",
			"GARLIC",
		],
	},
];

let orders = [
	{
		id: 1,
		pizzas: [
			{
				quantity: 1,
				name: "Ham and Pineapple",
			},
			{
				quantity: 2,
				name: "Pepperoni",
			},
		],
	},
	{
		id: 2,
		pizzas: [
			{
				quantity: 2,
				name: "Margherita",
			},
			{
				quantity: 1,
				name: "Pepperoni",
			},
		],
	},
	{
		id: 3,
		pizzas: [
			{
				quantity: 2,
				name: "Pepperoni",
			},
			{
				quantity: 1,
				name: "Margherita",
			},
			{
				quantity: 1,
				name: "Ham and Pineapple",
			},
		],
	},
];

const ingredients = [
	"ROLL DOUGH",
	"PIZZA SAUCE",
	"CHEESE",
	"PEPPERONI",
	"HAM",
	"PINEAPPLE",
	"ONIONS",
	"PEPPERS",
	"MUSHROOMS",
	"GARLIC",
	"CHICKEN",
];

document.querySelector("#endBtn").style.display = "none";

let oven = [];
const ovenCapacity = 6;
let pizzasCompletedForOrder = 0;
let gameStarted = false;

function createListOfPizzas(pizzas) {
	const pizzaList = document.createElement("ul");
	pizzas.forEach(function (pizza) {
		const orderQuantityEl = buildElement("span", `${pizza.quantity} - `);
		const pizzaNameEl = buildElement("span", pizza.name);
		const pizzaItem = document.createElement("li");
		pizzaNameEl.classList.add("pizza_name");
		pizzaItem.append(orderQuantityEl, pizzaNameEl);
		pizzaList.appendChild(pizzaItem);
	});
	return pizzaList;
}

function createSingleOrder(order) {
	// wrapper
	const orderWrapper = document.createElement("div");
	orderWrapper.className = "order_wrapper";
	orderWrapper.addEventListener("click", selectCurrentOrder);
	// order number
	const orderNumberEl = buildElement("h4", `Order: ${order.id}`);
	orderWrapper.appendChild(orderNumberEl);
	// create pizza ul for each order
	const pizzaList = createListOfPizzas(order.pizzas);
	orderWrapper.appendChild(pizzaList);
	return orderWrapper;
}

function createOrdersList() {
	orders.forEach(function (order) {
		const singleOrder = createSingleOrder(order);
		document.querySelector("#orders").appendChild(singleOrder);
	});
}

function selectCurrentOrder(e) {
	const pizzas = document.querySelectorAll(".pizza_name");
	pizzas.forEach(function (pizza) {
		pizza.addEventListener("click", setCurrentPizza);
	});

	if (document.querySelector("#working_on").children.length > 1) return;
	let element = e.target;
	const orderWrapper = element.closest(".order_wrapper");
	if (orderWrapper !== null) {
		orderWrapper.removeEventListener("click", selectCurrentOrder);
		const orderDiv = document.querySelector("#working_on");
		orderDiv.appendChild(orderWrapper);
	}
	console.log(orderWrapper);
}

function buildElement(elementName, elementContent) {
	const element = document.createElement(elementName);
	const content = document.createTextNode(elementContent);
	element.appendChild(content);
	return element;
}

function setCurrentPizza(e) {
	const pizzaName = e.target.innerText;
	document.querySelector("#current_pizza").innerText = pizzaName;
	displayMethod(pizzaName);
}

function displayMethod(pizzaName) {
	document.querySelector("#pizza_name").innerHTML = pizzaName;
	const selectedPizza = pizzas.find((pizza) => pizza.name === pizzaName);
	const methodSteps = selectedPizza.method.split(".");
	document.querySelector("#pizza_method").innerHTML = "";
	methodSteps.forEach(function (method) {
		const steps = buildElement("p", method);
		document.querySelector("#pizza_method").appendChild(steps);
	});
}

function displayOvenItems() {
	document.querySelector("#oven").innerHTML = "";
	oven.forEach(function (pizza) {
		const pizzaDiv = document.createElement("div");
		pizzaDiv.className = "pizza_div";
		const image = document.createElement("img");
		image.src = "pizza.svg";
		const pizzaName = buildElement("p", `${pizza.name}`);
		pizzaDiv.append(image, pizzaName);
		document.querySelector("#oven").appendChild(pizzaDiv);
	});
}

function addToOven() {
	pizzasCompletedForOrder++;
	const pizzaName = document.querySelector("#current_pizza").innerText;
	if (pizzaName) {
		const pizzaForOven = {
			name: pizzaName,
			timeAdded: "5/5/28",
		};
		oven.push(pizzaForOven);
		displayOvenItems();
	}
	console.log(oven);
}

// Objective: To create start and end of game functions to begin our orders
// displaying, clear an existing selected orders, and also to control the UI
// 1. Create startOfGame() and endOfGame() functions
// 2. Call these by adding an event listener (click) to the #startBtn & #endBtn HTML elements
// 3. Create a gameStarted boolean variable. Set to true in startOfGame() and false in endOfGame()
// 4. Return from startOfGame() if gameStarted is true
// 5. All orders have a class of "order_wrapper". In startOfGame(), clear these to remove any existing orders.
// 6. Move the createOrdersList() function call to inside of the startOfGame() function
// 7. startOfGame() function - show #endBtn / hide #startBtn (using style property)
// 8. endOfGame() function - hide #endBtn / show #startBtn (using style property)
// 9. hide #endBtn when game first loads

function startOfGame() {
	if (gameStarted) {
		return;
	}
	document.querySelector("#startBtn").style.display = "none";
	document.querySelector("#endBtn").style.display = "inline";
	gameStarted = true;
	const orders = document.getElementsByClassName("order_wrapper");
	Array.from(orders).forEach(function (order) {
		order.remove();
	});
	createOrdersList();
}
function endOfGame() {
	gameStarted = false;
	document.querySelector("#startBtn").style.display = "inline";
	document.querySelector("#endBtn").style.display = "none";
}

document.querySelector("#addToOven").addEventListener("click", addToOven);
document.querySelector("#startBtn").addEventListener("click", startOfGame);
document.querySelector("#endBtn").addEventListener("click", endOfGame);

let orderNumber = orders.length + 1;
function generateNewOrder() {
	let pizzas = [];
	const orderItem = Math.ceil(Math.random() * 5);
	for (i = 1; i <= orderItem; i++) {
		pizzas.push(generateNewPizza());
	}
	const newOrder = {
		id: orderNumber,
		pizzas,
	};
	orders.push(newOrder);
	orderNumber++;
}
function generateNewPizza() {
	const quantity = Math.ceil(Math.random() * 3);
	const randomPizza = pizzas[Math.floor(Math.random() * pizzas.length)];
	const pizza = {
		quantity,
		name: randomPizza.name,
	};
	return pizza;
}
generateNewOrder();
