// 5글자 영단어(존재하는 단어가 아니어도 됨)
// 6번의 시도 가능
// 존재하면 노란색, 위치도 맞으면 초록색
// 게임 종료 판단
// 상단에 게임 시간 표시
// 키보드에도 동일하게 표시
// 키보드 클릭으로도 입력
const words = 'APPLE';
let index = 0;
let attempts = 0;
let answerKey = '';

function appStart(){

    const displayGameOver = () => {
        const div = document.createElement('div');
        div.innerText = '게임이 종료되었습니다.'
        div.id = 'gameOver';
        document.body.appendChild(div);
    }

    const gameOver = () => {
        window.removeEventListener('keydown', handleKeyDown);
        displayGameOver();
        clearInterval(timer);
    }

    const nextLine = () => {
        if (attempts === 5){
            return gameOver();
        }
        attempts++;
        index = 0;
    }

    

    const handleEnterKey = () => {

        let correctNum = 0;

        for (let i = 0; i < 5; i++){

            const block = document.querySelector(
                `.board-block[data-index='${attempts}${i}']`
            );

            const anwser = block.innerText;
            const word = words[i];

            const keyBlock = document.querySelector(`.keyboard-block[data-key='${anwser}']`)

            if (anwser == word){
                correctNum ++;
                block.style.background = "#6AAA64";
                keyBlock.style.background = "#6AAA64";
            }
            else if (words.includes(anwser)){
                block.style.background = "#C9B458";
                keyBlock.style.background = "#C9B458";
            }
            else{
                block.style.background = "#787C7E";
            }

            block.style.color = 'white';
        }
        console.log('correctNum', correctNum);

        if (correctNum == 5){
            gameOver();
        }
        else nextLine();
    }

    const handleBackSpace = () => {
        if(index > 0){
            const prevBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`)
            prevBlock.innerText = '';
        }

        if(index !==0) index -= 1;
    }

    const handleKeyboard = (e) => {
        // let key = e.key.toUpperCase();
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`)
        const keyBlock = e.target.innerText;
        const checkClick = /^[A-Z]{1}$/; // 대문자 한글자만 허용하는 정규식

        if (keyBlock === 'BACKSPACE') handleBackSpace();
        else if (index === 5){
            if (keyBlock === 'ENTER'){
                console.log('클릭엔터');
                handleEnterKey();
            }
        }

        if (checkClick.test(keyBlock)){
            thisBlock.innerText = keyBlock;
            index++;
        }
        else{
            return;
        }

        console.log(keyBlock);
    }

    const handleKeyDown = (e) => {
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`)

        console.log('index', index);
        console.log('attempts', attempts);

        if (key === 'BACKSPACE') handleBackSpace();
        else if (index === 5) {
            if (key == 'ENTER') {
                console.log('엔터');
                handleEnterKey();
            }
            else return;
        }
        else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key;
            index++;
        }

        console.log(keyCode)
        console.log(key)
    }

    const startTimer = () => {
        const startTime = new Date();
        
        function setTime(){
            const currentTime = new Date(); // 현재시간
            const timePassed = new Date(currentTime - startTime); // 흐른시간
            const min = timePassed.getMinutes().toString().padStart(2,'0'); //분
            const sec = timePassed.getSeconds().toString().padStart(2,'0'); //초
            const timeDiv = document.querySelector('.timer-text');
            timeDiv.innerText = `${min}:${sec}`
        }
        
        timer = setInterval(setTime, 1000);
    }

    startTimer();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click',handleKeyboard);
}

appStart();