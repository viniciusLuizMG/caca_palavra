let foundWordsCount = 0;
const spanWin = document.querySelector('.spanWin');

    const gridSize = 16;
        const allWords = [
            "ÁTOMO", 
            "MOLÉCULA", 
            "ELEMENTO", 
            "COMPUESTO", 
            "REAÇÃO", 
            "CATALISADOR", 
            "SOLUTO", 
            "SOLVENTE", 
            "SOLUÇÃO",
            "ACIDEZ", 
            "ALCALINIDADE", 
            "ION", 
            "ISÓTOPO", 
            "LIGAÇÃO", 
            "COVALENTE", 
            "IÔNICA", 
            "METAIS", 
            "NÃO-METAIS", 
            "SEMI-METAIS", 
            "TABELA PERIÓDICA", 
            "SÍNTESE", 
            "EQUILÍBRIO", 
            "TERMODINÂMICA", 
            "ENERGIA", 
            "CALOR", 
            "ENTALPIA", 
            "ENTROPIA", 
            "PRESSÃO", 
            "VOLUME", 
            "TEMPERATURA", 
            "MISTURA", 
            "DESTILAÇÃO", 
            "FILTRAÇÃO", 
            "PRECIPITAÇÃO", 
            "OXIDAÇÃO", 
            "REDUÇÃO", 
            "POLÍMERO", 
            "MONÔMERO", 
            "ÁCIDO", 
            "BASE", 
            "SAL", 
            "QUÍMICA", 
            "ÁLCOOIS", 
            "CARBOXÍLICOS", 
            "AMOSTRA", 
            "HIDROCARBONETO", 
            "AROMÁTICO", 
            "ALIFÁTICO", 
            "SOLUBILIDADE", 
            "DENSIDADE", 
            "MASSA", 
           
        ];
        const validWords = getRandomWords(allWords, 9);
        let grid = Array.from({length: gridSize}, () => Array(gridSize).fill(''));

        function getRandomWords(words, count) {
            const shuffled = words.sort(() => 0.5 - Math.random()); // Mistura as palavras
            return shuffled.slice(0, count); // Seleciona as primeiras 'count' palavras
        }

        function fillEmptyCells() {
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    if (grid[row][col] === '') {
                        grid[row][col] = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Gera uma letra aleatória entre A-Z
                    }
                }
            }
        }

        function drawGrid() {
            const table = document.getElementById('puzzleGrid');
            grid.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                row.forEach((cell, cellIndex) => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    td.dataset.row = rowIndex;
                    td.dataset.col = cellIndex;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
        }

        function shuffleWords() {
            validWords.forEach(word => {
                let placed = false;
                while (!placed) {
                    const vertical = Math.random() < 0.5;
                    const rowStart = Math.floor(Math.random() * gridSize);
                    const colStart = Math.floor(Math.random() * gridSize);
                    const stepR = vertical ? 1 : 0;
                    const stepC = vertical ? 0 : 1;
                    let fits = true;

                    for (let i = 0; i < word.length; i++) {
                        const r = rowStart + i * stepR;
                        const c = colStart + i * stepC;
                        if (r >= gridSize || c >= gridSize || (grid[r][c] !== '' && grid[r][c] !== word[i])) {
                            fits = false;
                            break;
                        }
                    }

                    if (fits) {
                        for (let i = 0; i < word.length; i++) {
                            const r = rowStart + i * stepR;
                            const c = colStart + i * stepC;
                            grid[r][c] = word[i];
                        }
                        placed = true;
                    }
                }
            });
        }

        function displayWords() {
            const wordsDiv = document.getElementById('wordsList');
            validWords.forEach((word, index) => {
                const wordElement = document.createElement('p');
                wordElement.textContent = word;
                wordElement.id = `word${index}`;
                wordElement.className = 'word';
                wordsDiv.appendChild(wordElement);
            });
        }

        let selectedCells = [];

        function handleCellSelection() {
            document.querySelectorAll('#puzzleGrid td').forEach(cell => {
                cell.addEventListener('mousedown', () => {
                    selectedCells = [cell];
                    cell.classList.add('highlight');
                });
                cell.addEventListener('mouseenter', () => {
                    if (selectedCells.length > 0 && !selectedCells.includes(cell)) {
                        selectedCells.push(cell);
                        cell.classList.add('highlight');
                    }
                });
            });

            document.addEventListener('mouseup', () => {
                checkWord();
                selectedCells.forEach(cell => cell.classList.remove('highlight'));
                selectedCells = [];
            });
        }

        function checkWord() {
            const word = selectedCells.map(cell => cell.textContent).join('');
            validWords.forEach(validWord => {
                if (validWord === word) {
                    selectedCells.forEach(cell => cell.classList.add('found'));
                    document.getElementById(`word${validWords.indexOf(validWord)}`).classList.add('found-word');
     
                    foundWordsCount++;
                }
            });

            if(foundWordsCount === validWords.length){
                
                spanWin.style.display = "flex";
            }
        }

        function reiniciarGame(){
            location.reload();
        }

        shuffleWords();
        fillEmptyCells();
        drawGrid();
        displayWords();
        handleCellSelection();  