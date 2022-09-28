import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  //useEffect
  useEffect(()=>{
    fetch("http://localhost:4000/questions")
    .then(res => res.json())
    .then(questions =>setQuestions(questions));
  },[]);

//handle Delete
function handleDelete(id){
  fetch(`http://localhost:4000/questions/${id}`,{
    method: "DELETE",
  })
  .then((r)=>r.json())
  .then(()=>{
    const updateQuiz= questions.filter((q)=>q.id !== id);
    setQuestions(updateQuiz);
  });
}

function handleAnswer(id, correctIndex){
  fetch(`http://localhost:4000/questions/${id}`,{
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ correctIndex })
})
.then((response) => response.json())
.then(()=>{
  const updateQuiz = questions.map((question) =>{
    if(question.id === updateQuiz.id)
    return updateQuiz;
    return question;
  });
  setQuestions(updateQuiz)
});
}

const questionItems = questions.map((question) =>(
  <QuestionItem
  key={question.id}
  question={question}
  onAnswer={handleAnswer}
  onDelete={handleDelete}
/>) );

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
