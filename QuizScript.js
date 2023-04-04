const questions = getData();

const appState = {
	currentView : "#intro",
	currentQuestion : -1,
	currentModel : {}
}

document.addEventListener('DOMContentLoaded', () => {
	appState.currentView = "#intro";
	appState.currentModel = { 
		action : "Quiz 1"
	}
	updateView(appState);

	document.querySelector("#widget").onclick = (e) => {
		handleWidget(e)
	}
});

function getData() {
	fetch('https://my-json-server.typicode.com/Johnbro84/QuizAPI/questionSet')
	.then(response => response.json())
	.then(data => console.log(data));
}
function handleWidget(e) {
	if (appState.currentView == "#intro") {
		if (e.target.dataset.action == "Quiz 1") {
			appState.currentQuestion = 0;
			appState.currentModel = questions[appState.currentQuestion];
			setQuestionView(appState);
			updateView(appState);
		}
		/*
		if (e.target.dataset.action == "Quiz 2") {
			appState.currentQuestion = 20;
			appState.currentModel = questions[appState.currentQuestion];
			setQuestionView(appState);
			updateView(appState);
		} */
	}

	if (appState.currentView == "#question_true_false") {
		if (e.target.dataset.action == "answer") {
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_text_input") {
		if (e.target.dataset.action == "submit") {
			userResponse = document.querySelector(`#${appState.currentModel.answerfieldId}`).value;
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			updateQuestion(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_multiple_choice") {
		if (e.target.dataset.action == "answer") {
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_fill_in_blank") {
		if (e.target.dataset.action == "submit") {
			userResponse = document.querySelector(`#${appState.currentModel.answerfieldId}`).value;
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
			updateQuestionView(appState);
			setQuestionView(appState);
			updateView(appState);
		}
	}

	if (appState.currentView == "#question_narrative") {
		if (e.target.dataset.action == "answer") {
			correct = check_user_response(e.target.dataset.answer, appState.currentModel);
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
		if (e.target.dataset.action == "return") {
			appState.currentView = "#intro";
			appState.currentModel = {
				action : "Quiz 1"
			}
			updateView(appState);
		}
	}
}

function check_user_response(answer, model) {
	if (answer == model.correctAnswer) {
		return true;
	}
	else {
		return false;
	}
}

function updateQuestionView(appState) {
	if (appState.currentQuestion < questions.length-1) {
		appState.currentQuestion = appState.currentQuestion + 1;
		appState.currentModel = questions[appState.currentQuestion];
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