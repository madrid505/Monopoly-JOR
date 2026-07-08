// script.js - العقل المدبر للعبة

// 1. انتظر حتى تتحمل الصفحة بالكامل ثم نفذ الكود
document.addEventListener('DOMContentLoaded', () => {
    
    let pos = 0, balance = 1500, diceBal = 500, isMoving = false;

    const tiles = [
        {name: "انطلاق", icon: "🚀"}, {name: "مكة", icon: "🕋"}, {name: "ضريبة", icon: "💰"}, {name: "البتراء", icon: "🏛️"}, 
        {name: "سكة", icon: "🚂"}, {name: "القاهرة", icon: "🇪🇬"}, {name: "باريس", icon: "🗼"}, {name: "دبي", icon: "🏙️"}, 
        {name: "القدس", icon: "🕌"}, {name: "لندن", icon: "🎡"}, {name: "سجن", icon: "⚖️"}, {name: "طوكيو", icon: "🗾"},
        {name: "خدمات", icon: "⚡"}, {name: "نيويورك", icon: "🗽"}, {name: "سكة", icon: "🚂"}, {name: "روما", icon: "🇮🇹"},
        {name: "مدريد", icon: "🇪🇸"}, {name: "سور", icon: "🧱"}, {name: "أسطنبول", icon: "🇹🇷"}, {name: "بيروت", icon: "🇱🇧"},
        {name: "موقف", icon: "🅿️"}, {name: "موسكو", icon: "🇷🇺"}, {name: "سدني", icon: "🇦🇺"}, {name: "برلين", icon: "🇩🇪"},
        {name: "سكة", icon: "🚂"}, {name: "خدمات", icon: "⚡"}, {name: "بانكوك", icon: "🇹🇭"}, {name: "أهرامات", icon: "🔺"},
        {name: "عمان", icon: "🇯🇴"}, {name: "أثينا", icon: "🇬🇷"}, {name: "للسجن", icon: "🔒"}, {name: "فيينا", icon: "🇦🇹"},
        {name: "دلهي", icon: "🇮🇳"}, {name: "ضريبة", icon: "💰"}, {name: "سكة", icon: "🚂"}, {name: "سنغافورة", icon: "🇸🇬"},
        {name: "مراكش", icon: "🇲🇦"}, {name: "الكويت", icon: "🇰🇼"}, {name: "الرياض", icon: "🇸🇦"}, {name: "بغداد", icon: "🇮🇶"}
    ];

    const layout = [0,1,2,3,4,5,6,7,8,9,10, 39,-1,-1,-1,-1,-1,-1,-1,-1,-1,11, 38,-1,-1,-1,-1,-1,-1,-1,-1,-1,12, 37,-1,-1,-1,-1,-1,-1,-1,-1,-1,13, 36,-1,-1,-1,-1,-1,-1,-1,-1,-1,14, 35,-1,-1,-1,-1,-1,-1,-1,-1,-1,15, 34,-1,-1,-1,-1,-1,-1,-1,-1,-1,16, 33,-1,-1,-1,-1,-1,-1,-1,-1,-1,17, 32,-1,-1,-1,-1,-1,-1,-1,-1,-1,18, 31,-1,-1,-1,-1,-1,-1,-1,-1,-1,19, 30,29,28,27,26,25,24,23,22,21,20];

    const board = document.getElementById('board');

    function init() {
        layout.forEach(idx => {
            if (idx === -1) {
                let center = document.createElement('div'); center.className = 'center-area';
                center.innerHTML = '<h1>MONOPOLY</h1><p>JOR</p>'; board.appendChild(center);
            } else {
                let tile = tiles[idx]; let div = document.createElement('div');
                div.className = 'tile'; div.id = 'tile-' + idx;
                div.innerHTML = `<span style="font-size:1.2rem">${tile.icon}</span><br>${tile.name}`;
                board.appendChild(div);
            }
        });
        document.getElementById('tile-0').classList.add('active');
    }

    // ربط الدالة بالزر (نستخدم نافذة النافذة لنجعلها عالمية)
    window.startRolling = async function() {
        if (isMoving) return;
        let mult = parseInt(document.getElementById('multiplier').value);
        if (diceBal < mult) { alert("لا يوجد رصيد نرد كافٍ!"); return; }

        isMoving = true; document.getElementById('go-btn').disabled = true;
        diceBal -= mult;
        let total = (Math.floor(Math.random() * 6) + 1) + (Math.floor(Math.random() * 6) + 1);
        
        for (let i = 0; i < total; i++) {
            document.getElementById('tile-' + pos).classList.remove('active');
            pos = (pos + 1) % 40;
            document.getElementById('tile-' + pos).classList.add('active');
            await new Promise(r => setTimeout(r, 200));
        }

        if (pos === 0) { balance += (200 * mult); diceBal += (100 * mult); }
        else { balance += (50 * mult); }
        
        document.getElementById('balance').innerText = balance;
        document.getElementById('dice-bal').innerText = diceBal;
        isMoving = false; document.getElementById('go-btn').disabled = false;
    };

    init();
});
