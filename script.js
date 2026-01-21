let flowData = {};

async function init() {
    try {
        const response = await fetch('data.json');
        flowData = await response.json();
        showStep('start');
    } catch (error) {
        document.getElementById('question').innerText = "データの読み込みに失敗しました。サーバーが起動しているか確認してください。";
    }
}

function showStep(key) {
    const step = flowData[key];
    const questionEl = document.getElementById('question');
    const optionsEl = document.getElementById('options');

    questionEl.innerText = step.text;
    optionsEl.innerHTML = '';

    step.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.text;
        btn.onclick = () => {
            if (opt.result) {
                showResult(opt.result);
            } else {
                showStep(opt.next);
            }
        };
        optionsEl.appendChild(btn);
    });
}

function showResult(res) {
    document.getElementById('ui-area').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    document.getElementById('res-method').innerText = res.method;
    document.getElementById('res-online').innerText = res.online;
    document.getElementById('res-notes').innerText = res.notes;

    const itemsEl = document.getElementById('res-items');
    itemsEl.innerHTML = '';
    res.items.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        itemsEl.appendChild(li);
    });
}

init();
