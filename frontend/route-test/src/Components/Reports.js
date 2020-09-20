import React, { useEffect } from 'react'
import { doc, sheet as ogsheet } from './FileUpload'

let sheet

const sheetReload = async () => {
    if (ogsheet === undefined) {
        await doc.loadInfo()
        sheet = doc.sheetsByIndex[0];
        console.log(sheet.getRows())
    }
    await sheet.loadCells();
}

export default function Reports() {
    useEffect(() => {
        sheetReload()
    })

    return(<h5>REpoRTs</h5>)
}