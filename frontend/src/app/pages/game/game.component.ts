import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Alumno,
  CheckScore,
  Puntuacion,
} from '../../interfaces/profesor.interface';
import { AutenticacionAlumnoService } from '../../services/autenticacion-alumno.service';
import { ApiService } from '../../services/api.service';

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
  level: string = '';
  _router = inject(Router);
  alumnoLogueado: Alumno | null = null;
  authService = inject(AutenticacionAlumnoService);
  apiS = inject(ApiService);

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
      this.level = params['nivel'];
      console.log(this.level);
    });
  }

  ngOnInit(): void {
    this.currentQuestion = this.quiz[this.currentQuestionIndex];
    this.startTimer();

    this.authService.getUser().subscribe((usuario) => {
      this.alumnoLogueado = usuario;
    });
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
  endQuiz(puntos: number): void {
    let alumnoId = 0;
    if (this.alumnoLogueado) {
      alumnoId = this.alumnoLogueado?.id;
    }
    const nivelNombre = this.level;
    const revisar: CheckScore = { alumnoId, nivelNombre };

    this.apiS.revisarPuntuacion(revisar).subscribe(
      (response: Puntuacion) => {
        const puntuacionExistente = response;
        console.log('puntuacion existente');

        puntuacionExistente.puntuacionObtenida = puntos;
        this.apiS.actualizarPuntuacion(puntuacionExistente).subscribe(
          () => {
            console.log('Puntuación actualizada');
          },
          (error) => {
            console.log('Error al actualizar la puntuación', error);
          }
        );
      },
      (error) => {
        console.log('No existe');
        let idAlumno = 0;
        let idGrupo = 0;
        if (this.alumnoLogueado) {
          idAlumno = this.alumnoLogueado?.id;
          idGrupo = this.alumnoLogueado?.grupos.id_grupo;
        }
        const nuevaPuntuacion: Puntuacion = {
          puntuacionObtenida: puntos,
          nivel: nivelNombre,
          alumno_id: idAlumno,
          grupo_id: idGrupo,
        };
        // console.log(nuevaPuntuacion);

        this.apiS.newPuntuacion(nuevaPuntuacion).subscribe(
          () => {
            console.log('Puntuación creada');
          },
          (err) => {
            console.log('Error al crear la puntuación', err);
          }
        );
      }
    );

    // this._activeRoute.params.subscribe((params) => {
    //   const personaje = params['personaje'];
    //   // console.log(`${personaje}/${id}`)
    //   this._router.navigateByUrl(`puntuacion/${personaje}/${id}`);
    // });
  }

  isLastQuestion(): boolean {
    return this.currentQuestionIndex === this.quiz.length - 1;
  }
}
