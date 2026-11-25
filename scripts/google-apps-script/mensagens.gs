/**
 * Recebe as mensagens do formulário do site e grava na planilha.
 *
 * Como usar (passo a passo completo no README do projeto):
 * 1. Na planilha do Google: Extensões > Apps Script, apague o conteúdo e cole este arquivo.
 * 2. Implantar > Nova implantação > Tipo "App da Web"
 *    - Executar como: Eu
 *    - Quem pode acessar: Qualquer pessoa
 * 3. Copie a URL do app da Web e cole em `guestbook.endpoint` no src/data/site.ts.
 */

const SHEET_NAME = "Mensagens";
const MAX_NAME = 100;
const MAX_MESSAGE = 2000;

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Campo invisível preenchido = robô. Responde "ok" sem gravar.
    if (data.website) return json({ ok: true });

    const nome = String(data.nome || "").trim().slice(0, MAX_NAME);
    const mensagem = String(data.mensagem || "").trim().slice(0, MAX_MESSAGE);
    if (!nome || !mensagem) return json({ ok: false, error: "campos" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(["Data", "Nome", "Mensagem", "Idioma"]);

    sheet.appendRow([new Date(), seguro(nome), seguro(mensagem), data.lang === "en" ? "en" : "pt"]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: "erro" });
  } finally {
    lock.releaseLock();
  }
}

// Impede que um texto começado por = + - @ vire fórmula na planilha
function seguro(texto) {
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
