var questions = [
  {
    "id": "greed",
    "name": "Do you think that you are greedy?",
    "options": [
      {
        "name": "Yes",
        "value": 0
      },
      {
        "name": "No",
        "value": 1
      }
    ],
    "why": "This attempts to catch people lying by asking a seemingly simple question. If you answered no to this, you were lying; everyone is greedy to some extent, whether by standing in the middle of the hallway talking to friends or just using too much oxygen."
  },
  {
    "id": "dogsVsCats",
    "name": "Dogs or cats?",
    "options": [
      {
        "name": "Dogs",
        "value": 0
      },
      {
        "name": "Cats",
        "value": 0
      }
    ]
  },
  {
    "id": "greed2",
    "name": "Are you greedy 13854y?",
    "options": [
      {
        "name": "Yes",
        "value": 0
      },
      {
        "name": "No",
        "value": 1
      }
    ],
    "why": "none"
  }
];

var greed = 0;
var fakeGreed = 0;
var totalGreed = 0;
var question;
var answer;

function nextQuestion() {
  if (question && answer) {
    greed += answer.value;
    fakeGreed -= answer.value;
    answer.selected = true;
    answer = null;
    var index = questions.indexOf(question) + 1;
    if (index < questions.length)
      setQuestion(questions[index]);
    else onFinish();
  } else if (!answer) {
    setQuestion(questions[0]);
  }
}

function getMaxQuestionGreed(question) {
  var value = 0;
  for (var i = 0; i < question.options.length; i++) {
    if (Math.abs(question.options[i].value) > value)
      value = Math.abs(question.options[i].value);
  }

  return value;
}

function getAnswer(name) {
  if (question) {
    for (var i = 0; i < question.options.length; i++) {
      if (question.options[i].name == name)
        return question.options[i];
    }
  }
}

function setAnswer(name) {
  answer = getAnswer(name);
  onGreedChange(fakeGreed - answer.value);
}

function saveResult() {
  if (typeof(Storage) !== "undefined" && localStorage) {
    var items = JSON.parse(localStorage.getItem("items"));
    if (!items) items = [];
    items.push({
      "questions": questions,
      "greed": totalGreed + greed
    });
    localStorage.setItem("items", JSON.stringify(items));

    return items;
  } else return null;
}

for (var i = 0; i < questions.length; i++) {
  totalGreed += getMaxQuestionGreed(questions[i]);
}
