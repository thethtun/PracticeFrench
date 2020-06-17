import prepositions from './data/prepositions.js';
import verbs from './data/verb_rules.js';
import practiceListTitles from './data/q_type.js';
import q_makingQuestions from './data/making_questions.js';
import q_numbers from './data/numbers.js';

var dataSource = prepositions;
var availablePracticeList = practiceListTitles;

//Map Question With Answer
const dataSourceMap = {}

const contentPractice = document.getElementsByClassName("content_practice")[0];
const listPracticeType = document.getElementsByClassName('practice_type_list')[0];

const listQuestionItems = document.getElementsByClassName("item_container")[0];
const buttonFinish = document.getElementById("btn_finish");
const navItemMenu = document.getElementById("navItemMenu");


function main() {

    showAvailablePracticeList()

    navItemMenu.addEventListener('click', (e) => {
        showMenu()
    })

    buttonFinish.addEventListener('click', (e) => {
        e.preventDefault()
        check(listQuestionItems)
    })
}

function showAvailablePracticeList() {
    let itemPraticeTitleList = generatePracticeTitleList()
    listPracticeType.innerHTML = itemPraticeTitleList

    const list = document.querySelectorAll('.practice_item_type');
    list.forEach((element) => {
        element.addEventListener('click', (e) => {

            e.preventDefault()
            //hides list items
            listPracticeType.style.display = 'none';

            //show questions
            contentPractice.style.display = 'block';

            const practiceType = e.srcElement.parentElement.dataset.name;
            switch (practiceType) {
                case "prepositions":
                    dataSource = prepositions
                    break;
                case "verb_rules":
                    dataSource = verbs;
                    break;
                case "making_questions":
                    dataSource = q_makingQuestions;
                    break;
                case "numbers":
                    dataSource = q_numbers;
                    break;
                default:
                    dataSource = prepositions
                    break;
            }

            //Generate Item List
            let questionItemListHtml = generateQuestionItems()
            listQuestionItems.innerHTML = questionItemListHtml

        })
    });
}

function generatePracticeTitleList() {
    var htmlEles = ""
    for (const item of availablePracticeList) {
        const itemName = item.name;
        const itemKey = item.key;
        htmlEles += `<li>
            <div class="practice_item_type" data-name="${itemKey}">
                <p>${itemName}</p>
            </div>
        </li>`
    }

    return htmlEles
}


function showMenu() {
    //show list items
    listPracticeType.style.display = 'block';

    //hide questions
    contentPractice.style.display = 'none';
}

function generateQuestionItems() {
    //Shuffle questions
    dataSource = shuffle(dataSource)

    var htmlEles = ""

    for (const item of dataSource) {
        const question = item.question
        const answer = item.answer
        const highlight = item.highlight
        const highlightedQuestion = question
            .replace(` ${highlight} `, ` <b><u>${highlight}</u></b> `)
            .replace(` ${highlight}`, ` <b><u>${highlight}</u></b>`)
            .replace(`${highlight} `, `<b><u>${highlight}</u></b> `)
        const questionEle = `<div> <p>${highlightedQuestion}</p> </div>`
        const answerField = `<div class="answer_field_div"> <input type="text" placeholder="your answer" class="text_field_answer_normal"> </div>`
        const answerEle = `<div class="answer_div"><p>Answer : ${answer}</p></div>`
        const divider = `<div class="divider_solid"></div>`
        const questionForm = `<div>${questionEle}${answerEle}${answerField}${divider}</div>`

        //map the answer
        dataSourceMap[question] = answer

        htmlEles += questionForm
    }
    return htmlEles
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function check(items) {
    const itemList = items.children

    for (let item of itemList) {

        let questionEle = item.firstElementChild
        let answerEle = item.getElementsByClassName('answer_div')[0]
        let inputEle = item.getElementsByClassName('answer_field_div')[0]

        let questionTag = questionEle.getElementsByTagName('p')[0]
        let questionValue = questionTag.innerText;
        let inputFieldEle = inputEle.getElementsByTagName('input')[0];
        let inputAnswer = inputFieldEle.value.toLowerCase();

        let correctAnswer = dataSourceMap[questionValue]
        if (inputAnswer === correctAnswer) {
            inputFieldEle.className = "text_field_answer_correct"
            answerEle.style.display = 'none'
        } else {
            inputFieldEle.className = "text_field_answer_wrong"
            answerEle.style.display = 'block'
        }
    }

}


// When the user scrolls the page, execute myFunction
window.onscroll = function () { makeNavBarSticky() };

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function makeNavBarSticky() {
    var navbar = document.getElementById("idTopnav");

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}

main()