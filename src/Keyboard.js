class Keyboard {
    constructor(keyArray, index, attempts) {
        this.index = index;
        this.attempts = attempts;
        this.keyArray = keyArray;

        console.log('keyArray',this.keyArray);
    }

    displayKeyboard = () => {
        // 기본의 Keyboard 요소 제거
        // render 메서드 내에서 기존에 생성된 Keyboard 요소를 확인하고, 이미 존재하는 경우에는 제거한다.
        // 이를 통해 중복 렌더링을 방지
        const existingKeyboardRows = document.querySelectorAll('.keyboard-row');
        existingKeyboardRows.forEach((row) => {
            row.remove();
        });

        for (let i = 0; i < this.keyArray.length; i++) {
            const keyboardRow = document.createElement('div');
            keyboardRow.className = `keyboard-row row-${i}`;

            for (let j = 0; j < this.keyArray[i].length; j++) {
                const keyboardBlock = document.createElement('div');
                keyboardBlock.innerText = this.keyArray[i][j];
                // setAttribute에는 value 한개씩만 설정할 수 있다. class 여러개 넣으려고 할때 주의!
                if (this.keyArray[i][j] === 'ENTER'){
                    keyboardBlock.className = 'keyboard-block-big1';
                }
                else if (this.keyArray[i][j] === 'BACKSPACE'){
                    keyboardBlock.className = 'keyboard-block-big2';
                }
                else{
                    keyboardBlock.className = 'keyboard-block';
                }

                keyboardRow.appendChild(keyboardBlock);
            }
            document.querySelector('footer').appendChild(keyboardRow);
            
        }
    }

    render() {
        this.displayKeyboard();
    }
}

export default Keyboard;