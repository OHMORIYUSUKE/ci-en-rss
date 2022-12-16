import { GetRss } from "./Domain/GetRss";
import { GetSheet } from "./Domain/GetSheet";

// eslint-disable-next-line no-unused-vars
function main() {
  const spreadsheet = GetSheet.getSheet("RSS");

  const url = spreadsheet.getRange("A1").getValue() as string;
  const id = Number(url.split("/")[url.split("/").length - 1]);
  if (id === undefined) {
    throw new Error("URLが不正です。");
  }
  const rss = GetRss.getRss(id);
  const info = rss.info;

  spreadsheet.getRange("A2").setValue(info.title);
  spreadsheet.getRange("A3").setValue(info.description);

  for (const data of rss.items) {
    spreadsheet.appendRow([data.title, data.description, data.link, data.date]);
  }
}
