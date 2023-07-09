import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', './quizz-responsive.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = "Título Inicial"
  // quizzId:number = 0

  questionIndex:number = 0
  questionMaxIndex:number = 0
  questions:any
  questionSelected:any

  //vetor que armazena respostas do quiz
  answers:string[] = []
  answerSelected:string = ""

  userResultImg:string=""
  finished:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title
      this.finished = false;
      this.questionIndex = 0;
      // this.title = quizz_questions[this.quizzId].title
      this.questions = quizz_questions.questions
      // this.questions = quizz_questions[this.quizzId].questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(choice:string){
    this.answers.push(choice);
    this.nextStep()
    
  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true

      this.answerSelected = quizz_questions.results[ finalAnswer as keyof typeof quizz_questions.results]
      console.log(quizz_questions.resultsUrls)
      this.userResultImg =  quizz_questions.resultsUrls[ finalAnswer as keyof typeof quizz_questions.resultsUrls]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce( (previous, current, i, arr) => {
      if( arr.filter(item => item === previous).length > arr.filter(item => item === current).length ){
        return previous
      }else{
        return current
      }
    })

    return result
  }
  redo(){
    this.ngOnInit();
    console.log('aaaaaa')
  }

}
