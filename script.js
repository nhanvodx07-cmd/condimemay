const tableData = {
    toan: [
        {a: 132, b: 150, c: 8.5, d: 10, top: "3%"}, {a: 128.5, b: 132, c: 8.1, d: 8.5, top: "5%"},
        {a: 122.5, b: 128.5, c: 7.75, d: 8.1, top: "10%"}, {a: 114.5, b: 122.5, c: 7.0, d: 7.75, top: "20%"},
        {a: 108, b: 114.5, c: 6.6, d: 7.0, top: "30%"}, {a: 102.5, b: 108, c: 6.25, d: 6.6, top: "40%"},
        {a: 97, b: 102.5, c: 6.0, d: 6.25, top: "50%"}, {a: 91, b: 97, c: 5.6, d: 6.0, top: "60%"},
        {a: 85, b: 91, c: 5.25, d: 5.6, top: "70%"}, {a: 77, b: 85, c: 5.0, d: 5.25, top: "80%"},
        {a: 68, b: 77, c: 4.5, d: 5.0, top: "90%"}, {a: 6, b: 68, c: 1.5, d: 4.5, top: "> 90%"}
    ],
    hoa: [
        {a: 129, b: 150, c: 9.5, d: 10, top: "3%"}, {a: 124.5, b: 129, c: 9.25, d: 9.5, top: "5%"},
        {a: 117, b: 124.5, c: 8.75, d: 9.25, top: "10%"}, {a: 107.5, b: 117, c: 8.25, d: 8.75, top: "20%"},
        {a: 100.5, b: 107.5, c: 7.75, d: 8.25, top: "30%"}, {a: 94, b: 100.5, c: 7.25, d: 7.75, top: "40%"},
        {a: 88, b: 94, c: 6.75, d: 7.25, top: "50%"}, {a: 81.5, b: 88, c: 6.25, d: 6.75, top: "60%"},
        {a: 75.5, b: 81.5, c: 5.75, d: 6.25, top: "70%"}, {a: 68.5, b: 75.5, c: 5.25, d: 5.75, top: "80%"},
        {a: 59.5, b: 68.5, c: 4.6, d: 5.25, top: "90%"}, {a: 20, b: 59.5, c: 1.35, d: 4.6, top: "> 90%"}
    ],
    sinh: [
        {a: 130.5, b: 150, c: 9.0, d: 9.75, top: "3%"}, {a: 126.5, b: 130.5, c: 8.75, d: 9.0, top: "5%"},
        {a: 120.5, b: 126.5, c: 8.34, d: 8.75, top: "10%"}, {a: 112.5, b: 120.5, c: 7.85, d: 8.34, top: "20%"},
        {a: 105.5, b: 112.5, c: 7.5, d: 7.85, top: "30%"}, {a: 100, b: 105.5, c: 7.25, d: 7.5, top: "40%"},
        {a: 94.5, b: 100, c: 6.85, d: 7.25, top: "50%"}, {a: 88.5, b: 94.5, c: 6.5, d: 6.85, top: "60%"},
        {a: 82.5, b: 88.5, c: 6.25, d: 6.5, top: "70%"}, {a: 76, b: 82.5, c: 5.85, d: 6.25, top: "80%"},
        {a: 66.5, b: 76, c: 5.25, d: 5.85, top: "90%"}, {a: 26.5, b: 66.5, c: 2.8, d: 5.25, top: "> 90%"}
    ]
};

function getConversion(x, ranges) {
    if (x <= 0) return { y: 0, top: "100%" };
    if (x > 150) x = 150;
    
    const range = ranges.find(r => x > r.a && x <= r.b);
    if (!range) {
        const maxB = Math.max(...ranges.map(r => r.b));
        if (x >= maxB) return { y: ranges[0].d, top: ranges[0].top };
        return { y: ranges[ranges.length - 1].c, top: ranges[ranges.length - 1].top };
    }
    let y = range.c + ((x - range.a) / (range.b - range.a)) * (range.d - range.c);
    return { y: parseFloat(y.toFixed(2)), top: range.top };
}

function calculate() {
    const ids = ['toan', 'hoa', 'sinh'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        let val = el.value === "" ? 0 : Math.round(parseFloat(el.value));
        if (val < 0) val = 0;
        if (val > 150) val = 150;
        el.value = val;
    });

    const t = parseInt(document.getElementById('toan').value);
    const h = parseInt(document.getElementById('hoa').value);
    const s = parseInt(document.getElementById('sinh').value);

    const resT = getConversion(t, tableData.toan);
    const resH = getConversion(h, tableData.hoa);
    const resS = getConversion(s, tableData.sinh);

    document.getElementById('resToan').innerText = resT.y;
    document.getElementById('topToan').innerText = "(Top " + resT.top + ")";
    document.getElementById('resHoa').innerText = resH.y;
    document.getElementById('topHoa').innerText = "(Top " + resH.top + ")";
    document.getElementById('resSinh').innerText = resS.y;
    document.getElementById('topSinh').innerText = "(Top " + resS.top + ")";

    document.getElementById('resRawTotal').innerText = (t + h + s);
    document.getElementById('resTotal').innerText = (resT.y + resH.y + resS.y).toFixed(2);
    
    const ovl = document.getElementById('overlay');
    const box = document.getElementById('resultArea');
    ovl.style.display = 'block';
    box.style.display = 'block'; 
    box.classList.remove('popup-hide');
    setTimeout(() => {
        ovl.style.opacity = '1';
        box.classList.add('popup-show');
    }, 10);
}

function closePopup() {
    const ovl = document.getElementById('overlay');
    const box = document.getElementById('resultArea');
    ovl.style.opacity = '0';
    box.classList.remove('popup-show');
    box.classList.add('popup-hide');
    setTimeout(() => {
        if (box.classList.contains('popup-hide')) {
            ovl.style.display = 'none';
            box.style.display = 'none';
            box.classList.remove('popup-hide');
        }
    }, 300);
}