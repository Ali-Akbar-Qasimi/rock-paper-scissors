let scoreElement = document.querySelector('.score')
let content = document.querySelector('.content')
let options = content.querySelectorAll('.options')
let winLostState = document.querySelector('.win-lose-state')
let firstState = document.querySelector('.first-state')

let score
if(window.localStorage.getItem('score')){
    score = window.localStorage.getItem('score')
}else{
    score = 0
}
scoreElement.textContent = parseInt(score)

let rulesCloseBTN = document.querySelector('.close-btn')
let RulesBTN = document.querySelector('.rules-btn')
let rulesContainer = document.querySelector('.rules-container')

function playAgain(){
    winLostState.style.display = 'none'
    firstState.style.display='flex'
    content.classList = 'content'
}

// computer's guess
function computer(yourChoice){
    let possiblity = ['paper','scissors','rock']
    let random = Math.floor(Math.random()*possiblity.length)
    if(possiblity[random] === yourChoice){
        possiblity[random]
    }
    return possiblity[random]
}

function makeGame(yourChoice,computerChoice){
    let winner = checkingWinner(yourChoice,computerChoice)
    scoreElement.textContent = parseInt(score)

    content.classList.add(winner)
    if(winner === 'you-win'){
        winner = 'you win'
    }else if(winner === 'you-lose'){
        winner = 'you lose'
    }else if(winner === 'draw'){
        winner = 'draw'
    }
    
    winLostState.style.display = 'grid'
    firstState.style.display = 'none'
    
    window.localStorage.setItem('score',score)

    winLostState.innerHTML = `
        <div class="your-choice">
            <div class="image ${yourChoice}">
                <img src="./images/icon-${yourChoice}.svg" alt="${yourChoice}">
            </div>
            <span>you pick</span>
        </div>
        <div class="computer-choice">
            <div class="image ${computerChoice}">
                <img src="./images/icon-${computerChoice}.svg" alt="${computerChoice}">
            </div>
            <span>the house picked</span>
        </div>
        <div class="message-container">
            <div class="message">${winner}</div>
            <div onclick="playAgain()" class="play-again">play again</div>
        </div>
    `

}


options.forEach(option=>{
    option.addEventListener('click',()=>{
        let yourChoice = option.dataset.option
        let computerChoice = computer(yourChoice)
        makeGame(yourChoice,computerChoice)
    })
})


function checkingWinner(yourChoice,computerChoice){
    if(yourChoice === 'paper' && computerChoice === 'scissors'){
        score -= 1
        return 'you-lose'
    }else if(yourChoice === 'paper' && computerChoice === 'rock'){
        score++
        return 'you-win'
    }else if(yourChoice === 'paper' && computerChoice === 'paper'){
        return 'draw'
    }else if(yourChoice === 'rock' && computerChoice === 'scissors'){
        score++
        return 'you-win'
    }else if(yourChoice === 'rock' && computerChoice === 'rock'){
        return 'draw'
    }else if(yourChoice === 'rock' && computerChoice === 'paper'){
        score -= 1
        return 'you-lose'
    }else if(yourChoice === 'scissors' && computerChoice === 'scissors'){
        return 'draw'
    }else if(yourChoice === 'scissors' && computerChoice === 'rock'){
        score -= 1
        return 'you-lose'
    }else if(yourChoice === 'scissors' && computerChoice === 'paper'){
        score++
        return 'you-win'
    }
}

// Rules

RulesBTN.addEventListener('click',Rules)
rulesCloseBTN.addEventListener('click',closeRules)
function Rules(){
    rulesContainer.style.display = 'block'
}

function closeRules(){
    rulesContainer.style.display = 'none'
}