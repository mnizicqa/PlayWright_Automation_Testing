const ExcelJs = require("exceljs");
const { test, expect } = require("@playwright/test");

async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const searchTerm = await readExcelTest(worksheet, searchText);

  const cell = worksheet.getCell(
    searchTerm.row,
    searchTerm.column + change.colChange
  );
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}
async function readExcelTest(worksheet, searchText) {
  let output = { row: 0, column: 0 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}

// writeExcelTest(
//   "Mango",
//   "350",
//   { rowChange: 0, colChange: 2 },
//   "D:/excelDownloadTest.xlsx"
// );

test("File Download and Upload Validation", async ({ page }) => {
  const desiredFruit = "Mango";
  const desiredPrice = "350";
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const downloadedFile = await downloadPromise;
  await downloadedFile.saveAs("C:/Users/mario/Downloads/download.xlsx");
  writeExcelTest(
    desiredFruit,
    desiredPrice,
    { rowChange: 0, colChange: 2 },
    "C:/Users/mario/Downloads/download.xlsx"
  );
  await page.locator("#fileinput").click();
  await page
    .locator("#fileinput")
    .setInputFiles("C:/Users/mario/Downloads/download.xlsx");
  const textToLocate = page.getByText(desiredFruit);
  const desiredRow = page.locator("#row-0").filter({ has: textToLocate });
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText("350");
});
