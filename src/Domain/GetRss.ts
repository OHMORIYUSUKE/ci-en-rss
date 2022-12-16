import { XMLParser } from "fast-xml-parser";

export type RssList = {
  title: string;
  link: string;
  description: string;
  date: Date;
};

export class GetRss {
  public static getRss(id: number) {
    const res: RssList[] = [];
    let index = 0;
    while (true) {
      const xml = UrlFetchApp.fetch(
        "https://ci-en.net/creator/" + id + "/article/xml/rss?page=" + index
      ).getContentText();
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

    //   info
    const xml = UrlFetchApp.fetch("https://ci-en.net/creator/" + id + "/article/xml/rss").getContentText();
    const xp = new XMLParser();
    const obj = xp.parse(xml);
    return {
      info: {
        title: obj["rdf:RDF"].channel.title,
        description: obj["rdf:RDF"].channel.description
      },
      items: res
    };
  }
}
