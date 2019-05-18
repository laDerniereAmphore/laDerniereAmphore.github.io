const event_question_data_json = `{
  "1": {
    "question": "Comment appelle-t-on un pied de vigne ?",
    "responses": {
        "1": "Un cep",
        "2": "Une câpre",
        "3": "Un arbuste",
        "4": "Un pédoncule"
      },
    "good_response": "1"
  },
  "2": {
    "question": "Comment appelle-t-on une année dans le milieu viticole ?",
    "responses": {
        "1": "Un millénium",
        "2": "Un millésime",
        "3": "Un magnum",
        "4": "Un primeur"
      },
    "good_response": "2"
  },
  "3": {
    "question": "Quel est le cépage majoritaire dans le Beaujolais ?",
    "responses": {
        "1": "Le chardonnay",
        "2": "Le gamaray",
        "3": "Le gamay",
        "4": "Le pinot gris"
      },
    "good_response": "3"
  },
  "4": {
    "question": "Comment appelle-t-on la branche d'un cep de vigne ?",
    "responses": {
        "1": "Un serment",
        "2": "Un sarment",
        "3": "Un sermon",
        "4": "Un serpent"
      },
    "good_response": "2"
  },
  "5": {
    "question": "A quoi correspond une grume de raisin ?",
    "responses": {
        "1": "A un pépin",
        "2": "A la peau",
        "3": "A la pulpe",
        "4": "Au jus"
      },
    "good_response": "3"
  },
  "6": {
    "question": "Quelle est la capitale du Beaujolais ?",
    "responses": {
        "1": "Bully",
        "2": "Quincié",
        "3": "Beaujeu",
        "4": "Villefranche"
      },
    "good_response": "4"
  }
}`;

let event_question_data_map = JSON.parse(event_question_data_json);
