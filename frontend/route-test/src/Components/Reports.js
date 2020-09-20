import React, { useState } from 'react'
import { doc, sheet as ogsheet } from './FileUpload'
import '../Styles/Reports.css'

let sheet;
const sheetReload = async () => {
    console.log("SHEET reloading")
    if (ogsheet === undefined) {
        await doc.loadInfo()
        sheet = doc.sheetsByIndex[0];
        console.log(sheet.getRows());
        let temprows = await sheet.getRows()
        return temprows
    }
    await sheet.loadCells();
}
let contents;
class Reports extends React.Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let th = this
        sheetReload().then(rows => {
            th.setState({
                data: rows
            })
        })
    }

    componentDidUpdate() {
        contents = this.state.data.forEach(item => {
            return <tr>
              <td>{item.Student_Name}</td> 
              <td>{item.Engagement}</td>
              <td>{item.Stress}</td>
              <td>{item.Drowsiness}</td>
              <td>{item.Learning_Ability}</td>
            </tr>
       })
    }

    render() {
        console.log(this.state.data)
        contents = this.state.data.forEach(item => {
            console.log(item.Student_Name, item.Engagement, item.Stress, item.Drowsiness, item.Learning_Ability)
            // return <tr>
            //   <td>{item.Student_Name}</td> 
            //   <td>{item.Engagement}</td>
            //   <td>{item.Stress}</td>
            //   <td>{item.Drowsiness}</td>
            //   <td>{item.Learning_Ability}</td>
            // </tr>
       })
       console.log(contents, "contents")
        return(<>
            <h3>Reports</h3>
            <table className="table">
                <tbody>
                    <th>Student Name</th>
                    <th>Engagement</th>
                    <th>Stress</th>
                    <th>Drowsiness</th>
                    <th>Learning Ability</th>
                {this.state.data.map((item) => 
                <tr>
                    <td>{item.Student_Name}</td> 
                    <td>{item.Engagement}</td>
                    <td>{item.Stress}</td>
                    <td>{item.Drowsiness}</td>
                    <td>{item.Learning_Ability}</td>
                </tr>
            )}
                </tbody>
            </table>
        </>)
    }
}
// export default function Reports() {
//     let [elems, updateRows] = useState([])
//     rows.then((rows) => rows.forEach())
//     console.log(rows, elems)
//     return(<>
//     <h5>REpoRTs</h5>
//     {}
//     </>)
// }

export default Reports;