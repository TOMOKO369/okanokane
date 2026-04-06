function doGet() {
  var html = `<!DOCTYPE html>
<html lang="ja"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>家計簿 - 支出を追加</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface": "#3c3914",
                    "on-primary-container": "#00594d",
                    "surface-container-low": "#fffadf",
                    "primary": "#007163",
                    "on-secondary-container": "#6b374a",
                    "secondary-dim": "#7f475b",
                    "surface-container-highest": "#f1eba6",
                    "on-primary": "#ffffff",
                    "tertiary": "#785a7e",
                    "error-container": "#fb5151",
                    "primary-container": "#8deedb",
                    "on-error-container": "#570008",
                    "secondary": "#8d5367",
                    "on-secondary-fixed": "#552437",
                    "tertiary-dim": "#6c4e71",
                    "on-tertiary-fixed": "#4f3455",
                    "secondary-fixed-dim": "#f7b0c7",
                    "surface-container-lowest": "#ffffff",
                    "surface": "#fffbff",
                    "error-dim": "#9f0519",
                    "outline": "#868256",
                    "on-secondary": "#ffffff",
                    "outline-variant": "#c0bb8a",
                    "on-tertiary-fixed-variant": "#6d4f72",
                    "primary-fixed": "#8deedb",
                    "on-tertiary-container": "#634668",
                    "on-secondary-fixed-variant": "#764053",
                    "secondary-container": "#ffc1d4",
                    "secondary-fixed": "#ffc1d4",
                    "on-primary-fixed": "#00443b",
                    "tertiary-fixed-dim": "#ebc5ef",
                    "on-background": "#3c3914",
                    "inverse-on-surface": "#a39f70",
                    "surface-tint": "#007163",
                    "surface-bright": "#fffbff",
                    "error": "#c0262d",
                    "tertiary-fixed": "#fad3fd",
                    "surface-container-high": "#f7f0b0",
                    "inverse-surface": "#100f00",
                    "surface-dim": "#ece59e",
                    "primary-fixed-dim": "#7fe0cd",
                    "on-error": "#ffffff",
                    "inverse-primary": "#9bfde9",
                    "primary-dim": "#006457",
                    "tertiary-container": "#fad3fd",
                    "on-primary-fixed-variant": "#006457",
                    "background": "#fffbff",
                    "on-tertiary": "#ffffff",
                    "on-surface-variant": "#69663c",
                    "surface-variant": "#f1eba6",
                    "surface-container": "#fcf6b9"
            },
            "borderRadius": {
                    "DEFAULT": "1rem",
                    "lg": "2rem",
                    "xl": "3rem",
                    "full": "9999px"
            },
            "fontFamily": {
                    "headline": ["Plus Jakarta Sans"],
                    "body": ["Be Vietnam Pro"],
                    "label": ["Be Vietnam Pro"]
            }
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Be Vietnam Pro', sans-serif;
            background-color: #fffbff;
            color: #3c3914;
        }
        h1, h2, h3, .font-headline {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .tonal-layering {
            background: linear-gradient(180deg, rgba(255,251,255,0) 0%, rgba(255,250,223,1) 100%);
        }
        body {
            min-height: max(884px, 100dvh);
        }
        /* 金額の数字が大きすぎてはみ出さないように */
        #amountDisplay {
            word-break: break-all;
        }
    </style>
  </head>
<body class="bg-surface min-h-screen pb-32">
<!-- TopAppBar -->
<header class="bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl rounded-b-[3rem] w-full sticky top-0 z-50 shadow-sm shadow-emerald-900/5 flex items-center justify-between px-6 py-4">
<button class="text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity active:scale-95 active:duration-150">
</button>
<h1 class="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-emerald-800 dark:text-emerald-300">家計簿</h1>
<button onclick="submitData()" class="text-emerald-700 dark:text-emerald-400 hover:opacity-80 transition-opacity active:scale-95 active:duration-150">
</button>
</header>
<main class="px-6 pt-8 max-w-md mx-auto space-y-8">
<!-- Amount Display -->
<section class="text-center space-y-2">
<span class="text-on-surface-variant font-label text-sm font-semibold tracking-widest uppercase">支出額</span>
<div class="flex items-center justify-center gap-2 px-4">
<span class="text-secondary font-headline text-4xl font-bold">¥</span>
<div id="amountDisplay" class="text-on-surface font-headline text-7xl font-extrabold tracking-tighter w-full max-w-full overflow-hidden text-right pr-4">0</div>
</div>
</section>
<!-- Category Selector -->
<section class="space-y-4">
<div class="flex justify-between items-center px-2">
<h2 class="font-headline font-bold text-on-surface">カテゴリ</h2>
</div>
<div class="flex justify-between items-center gap-3">
<!-- Food -->
<button id="cat-food" onclick="selectCategory('食費', 'cat-food')" class="cat-btn flex flex-col items-center gap-2 flex-1 p-4 rounded-xl bg-surface-container-high border-2 border-primary transition-transform active:scale-95">
<div class="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined" data-icon="restaurant" data-weight="fill" style="font-variation-settings: 'FILL' 1;">restaurant</span>
</div>
<span class="text-[11px] font-bold text-on-surface w-max">食費</span>
</button>
<!-- Transport -->
<button id="cat-transport" onclick="selectCategory('交通費', 'cat-transport')" class="cat-btn flex flex-col items-center gap-2 flex-1 p-4 rounded-xl bg-surface-container-low border-2 border-transparent hover:border-outline-variant/15 transition-transform active:scale-95">
<div class="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-primary">
<span class="material-symbols-outlined" data-icon="directions_car">directions_car</span>
</div>
<span class="text-[11px] font-bold text-on-surface w-max">交通費</span>
</button>
<!-- Fun -->
<button id="cat-fun" onclick="selectCategory('交際・娯楽', 'cat-fun')" class="cat-btn flex flex-col items-center gap-2 flex-1 p-4 rounded-xl bg-surface-container-low border-2 border-transparent hover:border-outline-variant/15 transition-transform active:scale-95">
<div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
<span class="material-symbols-outlined" data-icon="celebration">celebration</span>
</div>
<span class="text-[11px] font-bold text-on-surface w-max">娯楽</span>
</button>
<!-- Health -->
<button id="cat-health" onclick="selectCategory('医療・日用', 'cat-health')" class="cat-btn flex flex-col items-center gap-2 flex-1 p-4 rounded-xl bg-surface-container-low border-2 border-transparent hover:border-outline-variant/15 transition-transform active:scale-95">
<div class="w-12 h-12 rounded-full bg-error-container/20 flex items-center justify-center text-error">
<span class="material-symbols-outlined" data-icon="medical_services">medical_services</span>
</div>
<span class="text-[11px] font-bold text-on-surface w-max">医療</span>
</button>
</div>
</section>
<!-- Memo Input -->
<section class="bg-surface-container-low rounded-lg p-1 transition-shadow focus-within:ring-2 ring-primary ring-opacity-50">
<div class="flex items-center px-4 py-3 gap-3">
<span class="material-symbols-outlined text-outline" data-icon="notes">notes</span>
<input id="noteInput" class="bg-transparent outline-none border-none focus:ring-0 w-full font-body text-on-surface placeholder:text-outline-variant font-medium" placeholder="メモを入力..." type="text"/>
</div>
</section>
<!-- Bento Keypad Layout -->
<section class="grid grid-cols-4 gap-3">
<!-- Numeric Keys -->
<div class="col-span-3 grid grid-cols-3 gap-3">
<button onclick="pressKey('1')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">1</button>
<button onclick="pressKey('2')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">2</button>
<button onclick="pressKey('3')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">3</button>
<button onclick="pressKey('4')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">4</button>
<button onclick="pressKey('5')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">5</button>
<button onclick="pressKey('6')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">6</button>
<button onclick="pressKey('7')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">7</button>
<button onclick="pressKey('8')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">8</button>
<button onclick="pressKey('9')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">9</button>
<button onclick="pressKey('00')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">00</button>
<button onclick="pressKey('0')" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none">0</button>
<button onclick="backspace()" class="h-16 rounded-lg bg-surface-container flex items-center justify-center text-xl font-bold font-headline active:scale-90 transition-transform select-none text-red-700/70">
<span class="material-symbols-outlined" data-icon="backspace">backspace</span>
</button>
</div>
<!-- Side Actions -->
<div class="col-span-1 flex flex-col gap-3">
<div class="relative flex-1">
  <!-- カレンダーボタンを押すと日付を選べる -->
  <input type="date" id="dateInput" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
  <button class="w-full h-full rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center active:scale-90 transition-transform pointer-events-none">
  <span class="material-symbols-outlined" data-icon="calendar_today">calendar_today</span>
  </button>
</div>
<button id="submitBtn" onclick="submitData()" class="flex-[2] rounded-lg bg-gradient-to-br from-primary to-primary-container text-white flex items-center justify-center active:scale-90 transition-transform shadow-lg shadow-primary/30 relative overflow-hidden">
<span id="submitIcon" class="material-symbols-outlined text-3xl transition-all" data-icon="done_all" data-weight="fill" style="font-variation-settings: 'FILL' 1;">done_all</span>
</button>
</div>
</section>
</main>
<div class="fixed bottom-0 left-0 w-full h-12 bg-surface-container-low rounded-t-xl opacity-40 pointer-events-none"></div>

<script>
    let currentAmount = "0";
    let activeCategory = "食費";

    document.getElementById('dateInput').valueAsDate = new Date();

    function updateAmountDisplay() {
        const num = parseInt(currentAmount, 10) || 0;
        document.getElementById('amountDisplay').innerText = num.toLocaleString();
    }

    function pressKey(key) {
        if (currentAmount === "0") {
            if (key === "00" || key === "0") return;
            currentAmount = key;
        } else {
            if (currentAmount.length < 8) {
                currentAmount += key;
            }
        }
        updateAmountDisplay();
    }

    function backspace() {
        if (currentAmount.length > 1) {
            currentAmount = currentAmount.slice(0, -1);
        } else {
            currentAmount = "0";
        }
        updateAmountDisplay();
    }

    function selectCategory(catName, btnId) {
        activeCategory = catName;
        const btns = document.querySelectorAll('.cat-btn');
        btns.forEach(b => {
            b.classList.remove('bg-surface-container-high', 'border-primary');
            b.classList.add('bg-surface-container-low', 'border-transparent');
        });
        const activeBtn = document.getElementById(btnId);
        activeBtn.classList.remove('bg-surface-container-low', 'border-transparent');
        activeBtn.classList.add('bg-surface-container-high', 'border-primary');
    }

    function submitData() {
        const amountVal = parseInt(currentAmount, 10);
        if (amountVal === 0 || isNaN(amountVal)) {
            alert("金額を入力してください（0円は登録できません）");
            return;
        }

        const btn = document.getElementById('submitBtn');
        const icon = document.getElementById('submitIcon');
        
        icon.classList.add('animate-spin');
        icon.innerText = 'progress_activity';
        btn.disabled = true;

        const formData = {
            type: 'expense',
            date: document.getElementById('dateInput').value,
            amount: amountVal,
            category: activeCategory,
            note: document.getElementById('noteInput').value
        };

        if (typeof google !== 'undefined' && google.script) {
            google.script.run
                .withSuccessHandler((result) => {
                    icon.classList.remove('animate-spin');
                    icon.innerText = 'check_circle';
                    
                    setTimeout(() => {
                        currentAmount = "0";
                        updateAmountDisplay();
                        document.getElementById('noteInput').value = "";
                        icon.innerText = 'done_all';
                        btn.disabled = false;
                    }, 1500);
                })
                .withFailureHandler((err) => {
                    alert('エラーが発生しました: ' + err.message);
                    icon.classList.remove('animate-spin');
                    icon.innerText = 'error';
                    btn.disabled = false;
                })
                .addTransaction(formData);
        }
    }
</script>
</body></html>`;

  return HtmlService.createHtmlOutput(html)
    .setTitle('家計簿アプリ - 支出入力')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function addTransaction(data) {
  try {
    // お客様のスプレッドシートURLを登録済みです！
    var SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/1Vzl3pSrLLLwp6QssjWGjSM9oLkzYrUIBMyDJn74V6hA/edit?usp=sharing';
    
    var spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    
    // シート名「データ」に書き込み。無い場合は1番目のシートに追加
    var sheet = spreadsheet.getSheetByName('データ');
    if (!sheet) {
        sheet = spreadsheet.getSheets()[0];
    }
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['日付', 'タイプ', 'カテゴリ', '金額', '備考', '登録日時']);
    }
    
    var timestamp = new Date();
    
    sheet.appendRow([
      data.date,
      data.type,
      data.category,
      data.amount,
      data.note,
      timestamp
    ]);
    
    return true;
  } catch (error) {
    throw new Error('スプレッドシートへの保存に失敗しました: ' + error.message);
  }
}
