var selectedTiles = 0;

let guessedCombinations = [];

//var originalWords = ["dog", "chicken", "cat", "pig"];
//var word1Synonyms = ["hound", "puppy", "canine", "cur"];
//var word2Synonyms = ["fowl", "biddy", "capon", "hen"];
//var word3Synonyms = ["puss", "kitten", "tom", "mouser"];
//var word4Synonyms = ["hog", "sow", "swine", "baconer"];

const result = getRandomWords(wordsAndSynonymsHUN);
const originalWords = result.wordList;
const word1Synonyms = result.word1Synonyms;
const word2Synonyms = result.word2Synonyms;
const word3Synonyms = result.word3Synonyms;
const word4Synonyms = result.word4Synonyms;

const correctCombinations = [word1Synonyms, word2Synonyms, word3Synonyms, word4Synonyms];


for (let i = 1; i < 5; i++) {
    $(`#sol${i} h3`).text(`Synonyms for "${originalWords[i - 1]}"`);
    $(`#sol${i} p`).text(correctCombinations[i - 1]);
}

let lives = 4;
let correctAnswers = 0;

let combinedArray = word1Synonyms.concat(word2Synonyms, word3Synonyms, word4Synonyms);
let words = shuffleArray(combinedArray);

let buttons = document.querySelectorAll('.tile');

buttons.forEach((button, index) => {
    button.textContent = words[index];
});

document.addEventListener('DOMContentLoaded', (event) => {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const clickedTiles = document.querySelectorAll('.clicked');
            const count = clickedTiles.length;
            if(!button.classList.contains('clicked') && count < 4){
                button.classList.add('clicked');
            } else if(button.classList.contains('clicked')){
                button.classList.remove('clicked');
            }
        });
    });
});

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

function getAnswer(){
    var answerList = [];
    var clickedTiles = $('.clicked');
    var numOfTiles = clickedTiles.length;

    for(let i = 0; i < numOfTiles; i++){
        answerList.push(clickedTiles[i].innerHTML)
    }

    return answerList;
}

function matchingWords(list1, list2) {
    let matchCount = 0;
    let set2 = new Set(list2);

    for (let element of list1) {
        if (set2.has(element)) {
            matchCount++;
        }
    }
    return matchCount;
}

function alreadyGuessed(list) {
    for (let i = 0; i < guessedCombinations.length; i++) {
        if (matchingWords(list, guessedCombinations[i]) === 4){
            return true;
        }
    }
    return false;
};

function checkCorrect(list) {
    for (let i = 0; i < correctCombinations.length; i++) {
        const match = matchingWords(list, correctCombinations[i]);
        if (match === 3) {
            guessedCombinations.push(list)
            statusMessage("Három jó!");
            animateReaction(".susdog");
            animateWrongAnswer();
            loseLife();
            return;
        } else if (match === 4){
            correctAnswers++;
            var solString = "#sol" + String(i+1);
            $(".clicked").slideUp('fast', function() {
                $(solString).slideDown('fast');
            });
            $(".clicked").removeClass("clicked");
            selectedTiles = 0;
            $("#tiles").css("padding-top", "0px");
            return;
        }
    }

    // for loop completed with no 3 or 4 matches - solution incorrect
    animateWrongAnswer();
    loseLife();
    guessedCombinations.push(list);
};

function checkGameOver(){
    if (lives === 0){
        return "lose";
    } else if (correctAnswers === 4) {
        return "win";
    }
}

function submitAnswer() {
    let answer = getAnswer();
    if (alreadyGuessed(answer)){
        statusMessage("Már próbáltad...")
    } else {
        checkCorrect(answer);
    }

    var gameOver = checkGameOver();
    if (gameOver === "lose") {
        $("#status").text("Vesztettél! 😭");
        $("#lives").slideUp();
        // hide all tiles
        $(".tile").slideUp('fast', function() {
            $("#sol1").slideDown('slow');
            $("#sol2").slideDown('slow');
            $("#sol3").slideDown('slow');
            $("#sol4").slideDown('slow');
        });
        $("#Submit").slideUp();
        $("#tiles").hide();
        $("#DeselectAll").hide();
        $("#Reset").show();
    } else if (gameOver === "win") {
        $("#status").text("Gratulálok! Nyertél! 😁")
        $("#Submit").slideUp();
        $("#tiles").hide();
        $("#DeselectAll").hide();
        $("#Reset").show();
    }
}

function animateWrongAnswer() {
    $(".clicked").css("background-color", "rgb(219, 29, 0)");
    $(".clicked").css("color", "hsl(35, 100%, 96%)");
    setTimeout(function() {
        $(".clicked").css("background-color", "");
        $(".clicked").css("color", "");
    }, 300);
}

function loseLife() {
    $(`#life${lives}`).slideUp();
    lives--;
}

function statusMessage(message) {
    var statusAnnouncer = $("#status");
    statusAnnouncer.text(message)
    setTimeout(function() {
        statusAnnouncer.text("Keress szinonímákat!");
    }, 1000);
}

function animateReaction(classToAnimate){
    $(classToAnimate).fadeIn(1000, function(){
        $(classToAnimate).fadeOut(3000)
    })
}

function deselectAll() {
    $(".clicked").removeClass("clicked");
}