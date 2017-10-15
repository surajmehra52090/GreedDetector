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
        "value": 2
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
    "id": "sweetVsSavoury",
    "name": "What kind of desserts do you like?",
    "options": [
      {
        "name": "Sweet",
        "value": 0
      },
      {
        "name": "Savoury",
        "value": 0
      }
    ],
    "why": "It is a common stereotype for greedy people to like sweet things. While this question doesn\'t affect greediness, I thought it would be interesting to see statistics related to this question."
  },
  {
    "id": "teacherReccomendations",
    "name": "How long did you wait to ask your teachers for a letter of reccomendation?",
    "options": [
      {
        "name": "Will not need a letter",
        "value": 0
      },
      {
        "name": "At the start of the year!",
        "value": -1
      },
      {
        "name": "Two months before the deadline",
        "value": 0
      },
      {
        "name": "One month before the deadline",
        "value": 1
      },
      {
        "name": "Two weeks before the deadline",
        "value": 2
      },
      {
        "name": "Less than a week before the deadline",
        "value": 3
      }
    ]
  },
  {
    "id": "bathroomPass",
    "name": "About how many times do you use the bathroom pass each day?",
    "options": [
      {
        "name": "Less than 4 times a day",
        "value": 0
      },
      {
        "name": "4 - 6 times a day",
        "value": 1
      },
      {
        "name": "More than 6 times a day",
        "value": 2
      }
    ]
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
