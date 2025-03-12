import {Workbook} from "exceljs";
// import {useAppSelector} from "./useAppSelector.ts";
import {useState} from "react";
import {IGeneralInfoOrder} from "../interfaces/order.interface.ts";


const useDownlandExcel = () => {
    // const {result} = useAppSelector(state => state.order)
    const [objUrl, setObjUrl] = useState<string>()

    const downlandExcel = async (result: IGeneralInfoOrder[]) => {
        const wb = new Workbook()
        wb.title = 'Report - ' + Date.now().toLocaleString()
        const sheet = wb.addWorksheet('Report')

        sheet.columns = [
            {header: 'Id', key: 'id', width: 6},
            {header: 'Name', key: 'name', width: 17},
            {header: 'Surname', key: 'surname', width: 20},
            {header: 'Email', key: 'email', width: 38},
            {header: 'Phone', key: 'phone', width: 18},
            {header: 'Age', key: 'age', width: 6},
            {header: 'Course', key: 'course', width: 7},
            {header: 'Course Format', key: 'course_format', width: 13},
            {header: 'Course Type', key: 'course_type', width: 12},
            {header: 'Status', key: 'status', width: 10},
            {header: 'Sum', key: 'sum', width: 10},
            {header: 'Already Paid', key: 'already_paid', width: 12},
            {header: 'Group', key: 'group', width: 15},
            {header: 'CreatedAt', key: 'created_at', width: 22},
            {header: 'Manager', key: 'manager', width: 14},
        ]
        sheet.addRows(result)

        const bytes = await wb.xlsx.writeBuffer()
        const data = new Blob([bytes],
            {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
        setObjUrl(URL.createObjectURL(data))
    }

    return{
        downlandExcel,
        objUrl
    }
}

export {useDownlandExcel}