import words from './words.js'

const shorterBtn = document.querySelector('.length-buttons>button:nth-child(1)')
const mediumBtn = document.querySelector('.length-buttons>button:nth-child(2)')
const longerBtn = document.querySelector('.length-buttons>button:nth-child(3)')
const figureScaffold = document.querySelector('#scaffold')
const figureHead = document.querySelector('#head')
const figureBody = document.querySelector('#body')
const figureLegs = document.querySelector('#legs')
const figureArms = document.querySelector('#arms')
const guessingWord = document.querySelector('.correct-guesses')
const wrongGuesses = document.querySelector('.wrong-guesses')
const overlay = document.querySelector('.overlay-screen')
const winLoseEl = document.querySelector('.overlay-screen>h2')
const loseInfoEl = document.querySelector('.overlay-screen>p')
const playAgain = document.querySelector('.overlay-screen>button')

let letters = [...'qwertyuiopåasdfghjklöäzxcvbnm']
let wrongLetters = []
let correctGuesses = []
let randomWord = words[Math.floor(Math.random() * words.length)]
let gameDone = false

function reveal(element) {
    element.style.visibility = 'visible'
}

function hide(element) {
    element.style.visibility = 'hidden'
}

function setGame() {
    wrongLetters = []
    correctGuesses = []
    wrongGuesses.innerHTML = ''
    hide(figureScaffold)
    hide(figureHead)
    hide(figureBody)
    hide(figureArms)
    hide(figureLegs)
    for (let i = 0; i<randomWord.length; i++) {
        let emptyLetter = document.createElement('li')
        guessingWord.appendChild(emptyLetter)
    }
    setTimeout(() => {
        reveal(overlay)
        winLoseEl.innerText = 'Du förlorade!'
        loseInfoEl.innerHTML = `Du tog för lång tid på dig. Rätt ord var <b>${randomWord}</b>.`
    }, 300000)
}
setGame()

shorterBtn.addEventListener('click', () => {
    guessingWord.innerHTML = ''
    while (randomWord.length>4) {
        randomWord = words[Math.floor(Math.random() * words.length)]
    }
    setGame()
})

mediumBtn.addEventListener('click', () => {
    guessingWord.innerHTML = ''
    while (randomWord.length<5 || randomWord.length>7) {
        randomWord = words[Math.floor(Math.random() * words.length)]
    }
    setGame()
})

longerBtn.addEventListener('click', () => {
    guessingWord.innerHTML = ''
    while (randomWord.length<8) {
        randomWord = words[Math.floor(Math.random() * words.length)]
    }
    setGame()
})

playAgain.addEventListener('click', () => {
    location.reload()
})

document.addEventListener('keydown', (e) => {
    if (gameDone == false) {
        let keyLetter = e.key
        if (randomWord.includes(keyLetter) && !correctGuesses.includes(keyLetter)) {
            for (let i = 0; i<randomWord.length; i++) {
                if (randomWord[i] == keyLetter) {
                    guessingWord.children[i].innerText = randomWord[i].toUpperCase()
                    correctGuesses.push(keyLetter)
                }
            }
            if (correctGuesses.length == randomWord.length) {
                gameDone = true
                setTimeout(() => {
                    reveal(overlay)
                    winLoseEl.innerText = 'Du vann!'
                }, 1000);
            }
        } else if (letters.includes(keyLetter) && !wrongLetters.includes(keyLetter) && !randomWord.includes(keyLetter)) {
            wrongLetters.push(keyLetter)
            let wrongLetter = document.createElement('li')
            wrongLetter.innerText = keyLetter.toUpperCase()
            wrongGuesses.appendChild(wrongLetter)
            switch (wrongLetters.length) {
                case 1: reveal(figureScaffold); break
                case 2: reveal(figureHead); break
                case 3: reveal(figureBody); break
                case 4: reveal(figureArms); break
                case 5: reveal(figureLegs); gameDone = true; setTimeout(() => {
                    reveal(overlay)
                    winLoseEl.innerText = 'Du förlorade!'
                    loseInfoEl.innerHTML = `Rätt ord var <b>${randomWord}</b>`
                }, 1000);
            }
        }
    }
})
