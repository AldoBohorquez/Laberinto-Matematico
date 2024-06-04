import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  _activeRoute = inject(ActivatedRoute);
  personaje: string = '';
  _router = inject (Router);


  quiz = [
    {
      pregunta: '¿Cuál es el resultado de 2 + 2?',
      respuestas: [
        { respuesta: '4', correcta: true },
        { respuesta: '5', correcta: false },
        { respuesta: '6', correcta: false },
      ],
    },
    {
      pregunta: '¿Cuál es el resultado de 4 + 4?',
      respuestas: [
        { respuesta: '4', correcta: false },
        { respuesta: '8', correcta: true },
        { respuesta: '6', correcta: false },
      ],
    },
    {
      pregunta: '¿Cuál es el resultado de 3 + 2?',
      respuestas: [
        { respuesta: '4', correcta: false },
        { respuesta: '6', correcta: false },
        { respuesta: '5', correcta: true },
      ],
    },
  ];

  currentQuestionIndex: number = 0;
  currentQuestion: any;
  score: number = 0;
  timer: number = 20;
  interval: any;
  isOptionSelected: boolean = false;
  showCorrect: boolean = false;
  showIncorrect: boolean = false;
  selectedOption: any;

  constructor() {
    this._activeRoute.params.subscribe((params) => {
      this.personaje = params['personaje'];
    });
  }

  ngOnInit(): void {
    this.currentQuestion = this.quiz[this.currentQuestionIndex];
    this.startTimer();
  }

  startTimer(): void {
    this.timer = 20;
    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.interval);
        this.showIncorrectAnswers();
        this.showCorrectAnswer();
      }
    }, 1000);
  }

  resetTimer(): void {
    clearInterval(this.interval);
    this.startTimer();
  }

  optionSelected(respuesta: any): void {
    if (this.isOptionSelected) {
      return;
    }
    this.isOptionSelected = true;
    this.selectedOption = respuesta;
    clearInterval(this.interval);
    if (respuesta.correcta) {
      this.score += 1;
      this.showCorrectAnswer();
    } else {
      this.showIncorrectAnswers();
    }
  }

  showCorrectAnswer(): void {
    this.showCorrect = true;
  }

  showIncorrectAnswers(): void {
    this.showIncorrect = true;
  }

  nextQuestion(): void {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.quiz.length) {
      this.currentQuestion = this.quiz[this.currentQuestionIndex];
      this.showCorrect = false;
      this.showIncorrect = false;
      this.isOptionSelected = false;
      this.selectedOption = null;
      this.resetTimer();
    } else {
      this.endQuiz(this.score);
    }
  }

  endQuiz(id: number): void {
    this._activeRoute.params.subscribe(params => {
      const personaje=params['personaje'];
      // console.log(`${personaje}/${id}`)
      this._router.navigateByUrl(`puntuacion/${personaje}/${id}`);
    })
  }
}
