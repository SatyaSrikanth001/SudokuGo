var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}


// BRING THESE IDS FROM INDEX.HTML :: FOR THE BUTTONS FUNCTIONING
let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

// ACTION OR FUNCTION OCCUR CLICKING BUTTON
GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)  //TO FILL THE QUESTION IN THE BOXES
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')//FOR GETTING NEW SUDOKU
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};









function isValid( board, i, j, num ,n){
	//CHECKINS  ROW,COLOUMN,SUBMATRIX 
	//Row check
	// for(let x = 0;x<n;x++;){
	//     if(board[i][x]==num){
	//         return false;    //already filled so not wanted to aain fill
	//     }
	// }
	// //col check
	// for(let x = 0;x<n;x++;){
	//     if(board[x][j]==num){
	//         return false;    //already filled so not wanted to again fill
	//     }
	// }
	 
	
	
	//both row and column checks in one loop//Row and Coloumn checks
	for (let x=0;x<n;x++){
		if(board[i][x]==num || board[x][j]== num){
			return false;
		}
	}
	
	
	//SubMatrix check: for  each 3x3 inner matrix ie,seeing each submatrix and going to top corner with i,j
	let rn = Math.sqrt(n);//this simple a check processes and return the action accordingly
	let si = i - i % rn;
	let sj = j - j % rn;
	
	for(let x=si;x<si+rn;x++){
		for(let y=sj;y<sj+rn;y++){
			if(board[x][y]==num){ //if the position is preoccupied by the number given in question matrix
				return false; //already filled so do not do fil again
			}
		}
	}
	return true;
	}
	














function SudokuSolver(board , i ,  j , n){
    //Base Case
    if(i==n){
        // prlet(board,n);
		FillBoard(board)
        return true;
    }

//CORNER CASES 
//if we are not inside the board ie,filling each box going forward in a row after reached last box in row
if(j==n){
    return SudokuSolver(board,i+1,0,n);     //what ever the answerr be sould return here again
}
//if cell is already filled or given in the question sudoku -> just go to next box
if(board[i][j]!=0){
    return SudokuSolver(board,i,j+1,n);
}
//THESE TWO ARE CORNER CASES



//we try to fill the cell with n appropriate number
    for(let num=1;num<=9;num++){
        //check is num can be filled 
        if (isValid(board,i,j,num,n)){
            board[i][j]=num;
            let subAns = SudokuSolver(board,i ,j+1,n);

            if(subAns){
            return true;
            }

            //Backtracking -> undo changes : seeing no number fits in present box we go back in the row each step to change 
            board[i][j]=0;

        }
    }

    return false; //when every fills go proper((correct) without back tracking 

}
