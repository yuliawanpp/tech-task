import { EmployeeLineItem } from "../interfaces/employees";
import * as ExcelJs from "exceljs";

export const writeEmployeesToExcel = async (
  employees: EmployeeLineItem[]
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const workbook = new ExcelJs.Workbook();
        const workSheet = workbook.addWorksheet("Employees");
        workSheet.columns = ["id", "email", "name", "phone", "occupation"];
        workSheet.addRow(["id", "email", "name", "phone", "occupation"]);
        for (const employee of employees) {
          workSheet.addRow([
            employee.id,
            employee.email,
            employee.name,
            employee.phone,
            employee.occupation,
          ]);
        }

        const data = await workbook.xlsx.writeBuffer();
        const blob = new Blob([data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `EmployeeExport.xlsx`;
        anchor.click();
        window.URL.revokeObjectURL(url);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    })();
  });
};
