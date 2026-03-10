const screen = document.getElementById('screen');
const historyList = document.getElementById('history-list');
const modeToggle = document.getElementById('mode-toggle');
const html = document.documentElement;

// --- KEYBOARD HANDLING ---
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (!isNaN(key)) appendValue(key); // Numbers
    if (['+', '-', '*', '/'].includes(key)) appendValue(key);
    if (key === 'Enter' || key === '=') calculate();
    if (key === 'Backspace') backspace();
    if (key === 'Escape') clearScreen();
    if (key === '.') appendValue('.');
});

// --- CALCULATOR LOGIC ---
function appendValue(val) {
    screen.value += val;
}

function clearScreen() {
    screen.value = "";
}

function backspace() {
    screen.value = screen.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = screen.value;
        const result = eval(expression);
        
        if (expression && result !== undefined) {
            addToHistory(`${expression} = ${result}`);
            screen.value = result;
        }
    } catch (err) {
        screen.value = "Error";
        setTimeout(clearScreen, 1500);
    }
}

// --- HISTORY LOGIC ---
function addToHistory(entry) {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerText = entry;
    
    // Remove "No calculations yet" message
    if (historyList.querySelector('.empty-msg')) {
        historyList.innerHTML = '';
    }
    
    historyList.prepend(li); // Newest on top
}

function clearHistory() {
    historyList.innerHTML = '<li class="empty-msg">No calculations yet</li>';
}

// --- THEME TOGGLE ---
modeToggle.addEventListener('change', () => {
    if (modeToggle.checked) {
        html.setAttribute('data-theme', 'dark');
        document.getElementById('mode-label').innerText = "Dark Mode";
    } else {
        html.setAttribute('data-theme', 'light');
        document.getElementById('mode-label').innerText = "Light Mode";
    }
});