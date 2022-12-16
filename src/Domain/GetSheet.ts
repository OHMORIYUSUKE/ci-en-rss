type Names = "RSS";

export class GetSheet {
  public static getSheet(sheetName: Names): GoogleAppsScript.Spreadsheet.Sheet {
    const spreadsheet = SpreadsheetApp.openByUrl(
      "https://docs.google.com/spreadsheets/d/1nh0r4KhpuyYOSLeAN-8frCVLvSlD_l6sIbggiCevVEo/edit#gid=0"
    ).getSheetByName(sheetName);
    if (spreadsheet === null) {
      throw new Error("シートが存在しません。");
    }
    return spreadsheet;
  }
}
