import words from './words.js'

const shorterBtn = document.querySelector('.length-buttons>button:nth-child(1)')
const mediumBtn = document.querySelector('.length-buttons>button:nth-child(2)')
const longererBtn = document.querySelector('.length-buttons>button:nth-child(3)')
const figureScaffold = document.querySelector('#scaffold')
const figureHead = document.querySelector('#head')
const figureBody = document.querySelector('#arms')
const figureLegs = document.querySelector('#legs')
const figureArms = document.querySelector('#arms')
const guessingWord = document.querySelector('.correct-guesses')
const wrongGuesses = document.querySelector('.wrong-guesses')

let randomWord = words[Math.floor(Math.random() * words.length)]

function setWord() {
    for (let i = 0; i<randomWord.length; i++) {
        let emptyLetter = document.createElement('li')
        guessingWord.appendChild(emptyLetter)
    }
}
setWord()
