import Board from "./Board";
import Keyboard from "./KeyBoard";

class App {
    constructor(){
        this.words = 'PLANT';
        this.index = 0;
        this.attempts = 0;
        this.answerKey = '';
        this.keyArray = [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
        ];
    }


    render() {

        new Board(this.answerKey, this.index, this.attempts).render();
        new Keyboard(this.keyArray, this.index, this.attempts).render();
    }
}

export default App;