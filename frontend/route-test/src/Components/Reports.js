import React from 'react'
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

const sheetClean = async () => {
    console.log("SHEET cleaning")
    let temprows = await doc.sheetsByIndex[0].getRows()
    if (temprows.length === 6) {
        temprows[1].delete()
        temprows[0].delete()
        temprows[2].delete()
        temprows[3].delete()
        temprows[4].delete()
        temprows[5].delete()
    }
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
        sheetClean()
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
            <h1 className="subhead">Reports</h1>
            <table className="table">
                    <th>Student Name</th>
                    <th>Engagement</th>
                    <th>Stress</th>
                    <th>Drowsiness</th>
                    <th>Learning Ability</th>
                <tbody>
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