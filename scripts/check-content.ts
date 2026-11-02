// 課程內容結構檢查：改完 src/content/days/ 之後執行 npx tsx scripts/check-content.ts
// 檢查句型 id 不重複、測驗答案在範圍內、每條情境對話都接得上而且走得到結尾。
import { DAYS } from "../src/content/index.ts";
let problems = 0;
const bad = (...m: unknown[]) => { console.log("⚠️", ...m); problems++ };
const phraseIds = new Set<string>(); const phraseEn = new Map<string, number>();
DAYS.forEach((d, i) => {
  if (d.day !== i + 1) bad("天數順序錯", d.day);
  if (d.phrases.length !== 5) bad(`Day ${d.day} 句型不是 5 句`);
  for (const p of d.phrases) {
    if (!p.id.startsWith(`d${d.day}-`)) bad(`Day ${d.day} id 前綴錯`, p.id);
    if (phraseIds.has(p.id)) bad("句型 id 重複", p.id); phraseIds.add(p.id);
    const k = p.en.toLowerCase().replace(/[^a-z ]/g, "");
    if (phraseEn.has(k)) bad(`Day ${d.day} 句型和 Day ${phraseEn.get(k)} 重複`, p.en); phraseEn.set(k, d.day);
  }
  for (const q of d.quiz) if (q.answer < 0 || q.answer >= q.options.length) bad(`Day ${d.day} 測驗答案超出範圍`);
  if (d.quiz.length < 2) bad(`Day ${d.day} 測驗少於 2 題`);
  if (d.dialogue.lines.length < 6) bad(`Day ${d.day} 對話太短`);
  const rp = d.roleplay; const ids = new Set(rp.nodes.map(n => n.id));
  if (ids.size !== rp.nodes.length) bad(`Day ${d.day} 節點 id 重複`);
  if (!ids.has(rp.start)) bad(`Day ${d.day} start 不存在`);
  const seen = new Set<string>(); const st = [rp.start];
  while (st.length) { const id = st.pop()!; if (seen.has(id)) continue; seen.add(id);
    const n = rp.nodes.find(x => x.id === id); if (!n) continue;
    if (!n.choices.length) bad(`Day ${d.day} ${id} 沒選項`);
    const ens = n.choices.map(c => c.en); if (new Set(ens).size !== ens.length) bad(`Day ${d.day} ${id} 選項重複`);
    for (const c of n.choices) { if (c.next !== null && !ids.has(c.next)) bad(`Day ${d.day} ${id} 指到不存在的 ${c.next}`); if (c.next) st.push(c.next) } }
  for (const id of ids) if (!seen.has(id)) bad(`Day ${d.day} ${id} 走不到`);
  const memo = new Map<string, boolean>();
  const ends = (id: string, path = new Set<string>()): boolean => { if (memo.has(id)) return memo.get(id)!; if (path.has(id)) return false; path.add(id);
    const n = rp.nodes.find(x => x.id === id)!; const r = n.choices.every(c => c.next === null || ends(c.next, path)); path.delete(id); memo.set(id, r); return r };
  if (!ends(rp.start)) bad(`Day ${d.day} 有走不完的路`);
  const main = rp.nodes.filter(n => n.choices.length >= 3).length;
  console.log(`Day ${String(d.day).padStart(2)} ${d.title}｜題 ${rp.nodes.length}｜選項 ${rp.nodes.reduce((a, n) => a + n.choices.length, 0)}｜3 個以上選項的題 ${main}`);
});
console.log(`共 ${DAYS.length} 天，結構問題 ${problems} 個`);
process.exit(problems ? 1 : 0);
