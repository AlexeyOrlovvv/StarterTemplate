const quiz = {
    steps: [
        {
            question: 'Quiz question 1',
            answers: [
                'Answer 1',
                'Answer 2',
                'Answer 3',
                'Answer 4'
            ],
            disabled: true
        },
        {
            question: 'Quiz question 2',
            answers: [
                'Answer 5',
                'Answer 6',
                'Answer 7',
                'Answer 8'
            ],
            disabled: true
        },
        {
            question: 'Quiz question 3',
            answers: [
                'Answer 9',
                'Answer 10',
                'Answer 11',
                'Answer 12'
            ],
            disabled: true
        }
    ]
}

const quizPoll = document.querySelector('.quiz__poll')
const quizProgress = document.querySelector('.quiz__progress')
const quizProgressCompleted =  document.querySelector('.quiz__progress-completed')
const quizForm = document.querySelector('.form-quiz')
const quizFormResults = document.querySelector('.form-quiz__results')
const quizQuestion = document.querySelector('.quiz__question')
const quizAnswers = document.querySelector('.quiz__answers')
const quizButtonPrevStep = document.querySelector('.quiz__button_prevStep')
const quizButtonNextStep = document.querySelector('.quiz__button_nextStep')

let currentStep = 0
let step = 0

quizFormResults.innerHTML = quiz.steps.map(() => `<input class="input__result" type="text" hidden/>`).join('')
const inputResult = document.querySelectorAll('.input__result')

document.addEventListener('click', function(e) {
    if (e.target.closest('.quiz__answer-input')) {
        inputResult[currentStep].setAttribute('value', e.target.value)
        quizButtonNextStep.disabled = !quiz.steps[currentStep].disabled
    }
})

quizButtonPrevStep.addEventListener('click', () => quizChangeStep(-1))
quizButtonNextStep.addEventListener('click', () => quizChangeStep(+1))


function quizChangeStep(i) {
    currentStep = Math.max(0, Math.min(quiz.steps.length - 1, currentStep + i))
    step = Math.max(0, Math.min(quiz.steps.length, step + i))
    quizQuestion.innerHTML = quiz.steps[currentStep].question
    quizAnswers.innerHTML = quiz.steps[currentStep].answers.map((quizAnswersItem, index) => `<label class="quiz__answer"><input type="radio" name="quizAnswer-${currentStep + 1}" id="quizAnswer-${currentStep + 1}-${index + 1}" class="quiz__answer-input" value="${quizAnswersItem}"/><span class="quiz__answer-text">${quizAnswersItem}</span></label>`).join('')
    
    quizButtonPrevStep.disabled = currentStep === 0 ? true : false
    quizButtonNextStep.disabled = quiz.steps[currentStep].disabled
    
    quizProgressCompleted.style.width = quizProgress.dataset.steps = Math.round(100 / quiz.steps.length * (step)) + '%'

    if (step === quiz.steps.length) {
        quizPoll.classList.add('hidden')
        quizForm.classList.remove('hidden')
    } else {
        quizPoll.classList.remove('hidden')
        quizForm.classList.add('hidden')
    }

}


quizChangeStep(currentStep)


