import exceljs from "exceljs";

import { IQuery } from "../interfaces/query.interface";
import { orderRepository } from "../repositories/order.repository";

class ExcelService {
  public async getWorkbook(query: IQuery): Promise<exceljs.Workbook> {
    const result = await orderRepository.getListForExcel(query);

    const workbook = new exceljs.Workbook();
    workbook.title = "Report - " + Date.now().toLocaleString();
    const sheet = workbook.addWorksheet("Report");

    sheet.columns = [
      { header: "Id", key: "id", width: 6 },
      { header: "Name", key: "name", width: 17 },
      { header: "Surname", key: "surname", width: 20 },
      { header: "Email", key: "email", width: 38 },
      { header: "Phone", key: "phone", width: 18 },
      { header: "Age", key: "age", width: 6 },
      { header: "Course", key: "course", width: 7 },
      { header: "Course Format", key: "course_format", width: 13 },
      { header: "Course Type", key: "course_type", width: 12 },
      { header: "Status", key: "status", width: 10 },
      { header: "Sum", key: "sum", width: 10 },
      { header: "Already Paid", key: "already_paid", width: 12 },
      { header: "Group", key: "group", width: 15 },
      { header: "CreatedAt", key: "created_at", width: 22 },
      { header: "Manager", key: "manager", width: 14 },
    ];
    sheet.addRows(result);

    return workbook;
  }
}

export const excelService = new ExcelService();
