var dataSource = [
    {
        question: "He is living in Paris",
        answer: "á",
        highlight: "in",
    },
    {
        question: "I bought this coat for $200",
        answer: "pour",
        highlight: "for",
    },
    {
        question: "It’s hard without money",
        answer: "sans",
        highlight: "without",
    },
    {
        question: "Mg Mg digs with a shovel.",
        answer: "avec",
        highlight: "with",
    },
    {
        question: "They go to school from 8:30 a.m. to 3:30 p.m.",
        answer: "de",
        highlight: "from",
    },
    {
        question: "The bakery is close to the hotel.",
        answer: "á côté de",
        highlight: "close to",
    },
    {
        question: "I'm next to the swimming pool.",
        answer: "á côté de",
        highlight: "next to",
    },
    {
        question: "They are sitting behind",
        answer: "derrière",
        highlight: "behind",
    },
    {
        question: "They are sitting in front",
        answer: "devant",
        highlight: "in front",
    },
    {
        question: "Go on holidays with your couple or children and save up to 20 on your curise during all the season.",
        answer: "au long de",
        highlight: "during",
    },
    {
        question: "Declining buffalo herds and disease put many nations on the verge of extinction.",
        answer: "au bord de",
        highlight: "on the verge of",
    },
    {
        question: "Feel, relax, enjoy the best products at the center of Yangon.",
        answer: "au centre de",
        highlight: "at the center of",
    },
    {
        question: "This is going to happen in the middle of 2009",
        answer: "au milieu de",
        highlight: "in the middle of",
    },
    {
        question: "He lives at the top of this hill.",
        answer: "au sommet de",
        highlight: "at the top of",
    },
    {
        question: "Your shoes are at the bottom of your closet.",
        answer: "au fond de",
        highlight: "at the bottom of",
    },
    {
        question: "at the end of three days, the situation stabilized.",
        answer: "au bout de",
        highlight: "at the end of",
    },
    {
        question: "Prices available on request.",
        answer: "sur",
        highlight: "on",
    },
    {
        question: "Please check the question written above",
        answer: "dessus",
        highlight: "above",
    },
    {
        question: "Children are under parent’s protections.",
        answer: "sous",
        highlight: "under",
    },
    {
        question: "This price is listed below",
        answer: "dessous",
        highlight: "below",
    },
    {
        question: "We expect to finish the project in a year",
        answer: "dans",
        highlight: "in",
    },
    {
        question: "Nothing can be found inside the building",
        answer: "dedans",
        highlight: "inside",
    },
    {
        question: "The most populated city in France is Paris.",
        answer: "en",
        highlight: "in",
    },
    {
        question: "Myanmar gained independency in 1945",
        answer: "en",
        highlight: "in",
    },
    {
        question: "Here, take that and drop it by my house",
        answer: "chez moi",
        highlight: "my house",
    },
    {
        question: "Mitchell's out of his mind right now.",
        answer: "hors de",
        highlight: "out of",
    },
    {
        question: "Dr. Cranston's waiting outside for you.",
        answer: "dehors",
        highlight: "outside",
    },
    {
        question: " Jane parked her car on the side of the road.",
        answer: "au bord de",
        highlight: "on the side of",
    },
]

//Map Question With Answer
const dataSourceMap = {}

function main() {
    const items = document.getElementsByClassName("item_container")[0];
    const buttonFinish = document.getElementById("btn_finish");

    //Generate Item List
    let itemListHtml = generateItems()
    items.innerHTML = itemListHtml

    buttonFinish.addEventListener('click', (e) => {
        e.preventDefault()
        check(items)

    })
}


function generateItems() {
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

main()