var questions = []

const appState = {
	currentView : "#intro",
	currentQuestion : -1,
	currentModel : {}
}

var score = 0;
var time = 0;
var questionsAnswered = 0;

document.addEventListener('DOMContentLoaded', () => {
	appState.currentView = "#intro";
	appState.currentModel = { 
		action : ["Quiz 1", "Quiz 2"]
	}
	updateView(appState);
	document.querySelector("#nameForm").onsubmit = function() {
	const result = createElement('p');
	let name = document.querySelector("#name").value;
	let results_msq = `
						<span> Congradtulations ${name}, you passed the quiz.</span>
					`;
	let results_msq2 = `
						<span> Sorry ${name}, you failed the quiz.</span>
					`;
	document.querySelector("#results").append(span);
	document.querySelector("#name").value = '';
	}

	document.querySelector("#widget").onclick = (e) => {
		handleWidget(e)
	}
});

var timer = setInterval(timeFrame, 1000);

function timeFrame() {
	++time;
	var hour = Math.floor(time / 3600);
	var minute = Math.floor((time - hour * 3600) / 60);
	var second = time - (hour * 3600 + minute * 60);
	document.querySelector("#timer").innerHTML = hour + ":" + minute + ":" + second;
}

function getData() {
	fetch('https://my-json-server.typicode.com/Johnbro84/QuizAPI/questionSet')
	.then(response => response.json())
	.then(json => console.log(json))
}

function getData2() {
	fetch('https://my-json-server.typicode.com/Johnbro84/QuizAPI2/questionSet2')
	.then(response => response.json())
	.then(json => console.log(json));
}

function handleWidget(e) {
	if (appState.currentView == "#intro") {
		if (e.target.dataset.action == "Quiz 1") {
			questions = [getData()];
			appState.currentQuestion = 0;
			appState.currentModel = questions[appState.currentQuestion];
			setQuestionView(appState);
			updateView(appState);
		}
		
		if (e.target.dataset.action == "Quiz 2") {
			questions = [getData2()];
			appState.currentQuestion = 0;
			appState.currentModel = questions[appState.currentQuestion];
			setQuestionView(appState);
			updateView(appState);
		} 
	}

	if (appState.currentView == "#question_true_false") {
		if (e.target.dataset.action == "answer") {
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			handleScore(appState);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_text_input") {
		if (e.target.dataset.action == "submit") {
			userResponse = document.querySelector(`#${appState.currentModel.answerfieldId}`).value;
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			handleScore(appState);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_multiple_choice") {
		if (e.target.dataset.action == "answer") {
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			handleScore(appState);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_fill_in_blank") {
		if (e.target.dataset.action == "submit") {
			userResponse = document.querySelector(`#${appState.currentModel.answerfieldId}`).value;
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			handleScore(appState);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_narrative") {
		if (e.target.dataset.action == "answer") {
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			handleScore(appState);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#feedback") {
		if (e.target.dataset.action == "got_it") {
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#end") {
		clearInterval(timeFrame);
		if (score >= 16) {
			document.querySelector("#results").innerHTML = results_msq;
		}
		else {
			document.querySelector("#results").innerHTML = results_msq2;
		}
		if (e.target.dataset.action == "return") {
			appState.currentView = "#intro";
			appState.currentModel = {
				action : ["Quiz 1", "Quiz 2"]
			}
			updateView(appState);
		}
	}
}

function handleScore(appState) {
	if (answer = appState.currentModel.correctAnswer) {
		score = score + 1;
		document.querySelector("#score").innerHTML = `Score: ${score}`;
		return;
	}
	if (submit = appState.currentModel.correctAnswer) {
		score = score + 1;
		document.querySelector("#score").innerHTML = `Score: ${score}`;
		return;
	}
}

function check_user_response(answer, model) {
	if (answer == model.correctAnswer) {
		setTimeout(() => {
			const msg = "Correct!";
			msg.style.display = 'none';
		}, 1000);
		return true;
	}
	else {
		appState.currentView = "#feedback";
		return false;
	}
}

function updateQuestionView(appState) {
	if (appState.currentQuestion < questions.length-1) {
		appState.currentQuestion = appState.currentQuestion + 1;
		appState.currentModel = questions[appState.currentQuestion];
		questionsAnswered = questionsAnswered + 1;
		document.getElementById("#questionsAnswered").innerHTML = `Questions Answered: ${questionsAnswered}`;
	}
	else {
		appState.currentQuestion = -2;
		appState.currentModel = {};
	}
}

function setQuestionView(appState) {
	if (appState.currentQuestion == -2) {
		appState.currentView = "#end";
		return;
	}
	
	if (appState.currentModel.questionType == "true_false") {
		appState.currentView = "#question_true_false";
	}
	else if (appState.currentModel.questionType == "text_input") {
		appState.currentView = "#question_text_input";
	}
	else if (appState.currentModel.questionType == "multiple_choice") {
		appState.currentView = "#question_multiple_choice";
	}
	else if (appState.currentModel.questionType == "fill_in_blank") {
		appState.currentView = "#question_fill_in_blank";
	}
	else if (appState.currentModel.questionType == "narrative") {
		appState.currentView = "#question_narrative";
	}
}

function updateView(appState) {
	const htmlElement = renderWidget(appState.currentModel, appState.currentView);
	document.querySelector("#widget").innerHTML = htmlElement;
}

const renderWidget = (model,view) => {
	templateSource = document.querySelector(view).innerHTML;
	var template = Handlebars.compile(templateSource);
	var htmlWidgetElement = template({...model,...appState});
	return htmlWidgetElement;
}
