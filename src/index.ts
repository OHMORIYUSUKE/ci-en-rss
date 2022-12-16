// const { XMLParser, XMLBuilder } = require("fast-xml-parser");
import { XMLParser } from "fast-xml-parser";

export {};

type RssList = {
  title: string;
  link: string;
  description: string;
  date: Date;
};

// eslint-disable-next-line no-unused-vars
function main() {
  const rssList = getRss();
  Logger.log(rssList[5]);
  const spreadsheet = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1nh0r4KhpuyYOSLeAN-8frCVLvSlD_l6sIbggiCevVEo/edit#gid=0"
  ).getSheetByName("RSS");
  if (spreadsheet === null) {
    throw new Error("シートがありません。");
  }
  for (const data of rssList) {
    spreadsheet.appendRow([data.title, data.description, data.link, data.date]);
  }
}

// eslint-disable-next-line no-unused-vars
function getRss() {
  const res: RssList[] = [];
  let index = 0;
  while (true) {
    const xml = UrlFetchApp.fetch("https://ci-en.net/creator/2349/article/xml/rss?page=" + index).getContentText();
    const xp = new XMLParser();
    const obj = xp.parse(xml);
    const items = obj["rdf:RDF"].item as Array<any>;
    if (!items) {
      break;
    } else {
      for (const item of items) {
        res.push({
          title: item.title,
          link: item.link,
          description: item.description,
          date: new Date(item["dc:date"])
        });
      }
    }
    index += 1;
  }
  return res;
}
