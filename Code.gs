function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Kakeibo Dashboard')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * データをスプレッドシートに追加する
 * @param {Object} data - 入力フォームからのデータ
 * @returns {Boolean} 成功したかどうかのフラグ
 */
function addTransaction(data) {
  try {
    // アクティブなスプレッドシートの「データ」シートを取得 (必要に応じてシート名を変更してください)
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('データ') || spreadsheet.getSheets()[0];
    
    // スプレッドシートの見出し (1行目): [日付(Date), タイプ(Type), カテゴリ(Category), 金額(Amount), 備考(Note)]
    // シートにデータがない場合は見出しを作成
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['日付', 'タイプ', 'カテゴリ', '金額', '備考', '登録日時']);
    }
    
    // 現在の日時（登録日時として）
    var timestamp = new Date();
    
    // 行を追加
    sheet.appendRow([
      data.date,         // 日付
      data.type,         // タイプ(expense/income)
      data.category,     // カテゴリ
      data.amount,       // 金額
      data.note,         // 備考
      timestamp          // 登録日時
    ]);
    
    return true;
  } catch (error) {
    throw new Error('スプレッドシートへの書き込みに失敗しました: ' + error.message);
  }
}
