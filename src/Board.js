

class Board {
    constructor(answerKey, index, attempts) {
        this.index = index;
        this.attempts = attempts;
        this.answerKey = answerKey;
    }

    displayBoard = () => {
        // 기본의 board 요소 제거
        // render 메서드 내에서 기존에 생성된 board 요소를 확인하고, 이미 존재하는 경우에는 제거한다.
        // 이를 통해 중복 렌더링을 방지
        const existingBoardRows = document.querySelectorAll('.board-row');
        existingBoardRows.forEach((row) => {
            row.remove();
        });

        for(let i=0; i <= 5; i++){
            const boardRow = document.createElement('div');
            boardRow.className = `board-row row-${i}`;
            for(let j=0; j < 5; j++){
                const boardBlock = document.createElement('div');
                boardBlock.innerText=this.answerKey;
                // setAttribute에는 value 한개씩만 설정할 수 있다. class 여러개 넣으려고 할때 주의!
                boardBlock.setAttribute('data-index', `${i}${j}`);
                boardBlock.setAttribute('class', "board-block");

                boardRow.appendChild(boardBlock);
            }
            document.querySelector('main').appendChild(boardRow);
        }
    }

    render() {

        this.displayBoard();
    }
}

export default Board;