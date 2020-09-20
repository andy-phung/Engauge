import React from 'react'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import '../Styles/FileUpload.css'

const SPREADSHEET_ID = '1pt410W7vnqMWDZC5a5J829-WUU5TlNwQAUZFlaSQZpA';
// const SHEET_ID = 0;
const CLIENT_EMAIL = 'engauge@engauge-290100.iam.gserviceaccount.com';
const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQClmYSPAKdfLCCj\nXUeszjLTUGARcdtqkM8Qls6fhRGBeTmLwbmvfY5ysnwQbddPfaEy1fv9TtMY/yUz\nxpm7HKYrLP/Fd0eRSeDCJwzb9OER4pKVFYoDgz0ptj5qt8WyQc5t64i9v0SzzIme\n0FAWZGsEqLhqlfT7g6W9IYdtmDLjfkPnSMPAKRo1hSS4fDy1+93NDy0ojqLldBJA\nMpO5ZO45cO41QYcDmBM+lE9StqSY+6NMATJqI2oFjoTXEurkEgK5c3KLzEwLyR1c\neqnIlSv3ncA7rI1o8UNAMxwFIRNnYz2vXhBVw0GcrYILFzsfeAhJvVExfueeRnKg\n/8Qmln8lAgMBAAECggEABmdQlTAPCNLdwzty71d85yd7Q4lt1OnbG/bc8BW29tT/\neOxJmCPoi35j5kW9FvWSc3MLXsD60ENjhqRGIxJpSY+gp1vksFVVQ+S7LlFCl8y1\nYt71mourZI7HzJwlIK7DQwRh4gaAq1w8MSA4jJke+0vj77kzQzuUv+LJSB9jzmCu\nY5lA42fAz9cO7tTnoVwzNZCZEoe9qc/2KAQil1FZR/4qPgL4r7OOmME+8Ll7F1X5\nOZ5RbH4nt+5/3tD1aY09wfZj4FPIGvlVtxL2FfuA7o53hSo+FRgMNLL7m+5eiz8r\nmnChJYDDWmdnkbTm85rMh4gX67Q/hRmlwhN+44cGsQKBgQDV0npXung11dahHQJk\nAsSTdTQ7kEbqRr0zQZCvn71zUyS1Nvw/kgN8vxR4yjx+QzM/B+TTrcJKAmMs34x1\nATbl/mWHJXNFKAXxNsFfSEv1+b97UDiBASf0BS03PRlFteLsgguvCjNiPHW1OhS6\nV9Qu4QCRuJxdtpTbhUqnAhVSdQKBgQDGQ+p7AdAViK6c31mTYFL8r4GUxfvJvKCz\ngm3Ob+ClKmNU4Y97C6Fv9EO9Llp/9HJ/IIYHU1cHAIvPCG/8kJaKpA7rtMVSrStT\ngJhebqZOTiLAGHRm+5w53bC7MloiVUb0gkcvDTGWrYuFFXN5OmtkmeT7fwejtGlA\ndt/Fe8qD8QKBgQCLOpxzV3ZDB9TT4AHYgXziz6SNTGsAzcMRBxZhZVCFMZRrczxZ\nYIhoyDtaU8WEKdnKpyc3NqOWcWuGoqHg5kOLC1Ws5JPkaiVEZfUQSBE+P7uRXjEM\nv2X2nRBOMbitDbyPaDaXabr/soKq2QD6PYpqZBRszpry4pqXPnnXuaGMqQKBgQCd\njsFbSWCEjF8/GRuFS+oHFq4ifYePlRAcN41tnWjnuJzBipLMVLzRTEs8nwaaYrdO\noZkBX1BspxlzyJ++FWUc/i1BUSHyht1EeZAck1AkMGHbSFPQtyk6rxtQWD5axGwj\nyRgqoxCCTp3uf9KJR0yq4MWgux1mEewGp7FCrhKM8QKBgQCfJP3yXgp/ShtJf2Dt\nGmaYAbnMvhxM791nDT8mM5V9R4TilirBzVvCbyPqi+7PUiz4qSM9c7H8pIgEvSOA\nSJXs98LBk/B0QRcdPOI3P5vXSF+vM6O6tFsABKy7qJJQBPdrVK0/zfhnlD1CWnJm\nW6+WczvhQ+BInmyCAmtYKbNzYA==\n-----END PRIVATE KEY-----\n';

export const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
doc.useServiceAccountAuth({
  client_email: CLIENT_EMAIL,
  private_key: PRIVATE_KEY,
});

export let sheet;
const initDoc = async  () => {
  await doc.loadInfo(); // loads document properties and worksheets
  sheet = doc.sheetsByIndex[0];
  await console.log(doc);
  await sheet.loadCells()
}
initDoc()

const filesUploaded = async () => {
  await doc.loadInfo(); // loads document properties and worksheets
  sheet = doc.sheetsByIndex[0];
  await sheet.loadCells()
  const rows = await sheet.getRows()
  console.log(rows[0].Student_Name)
  sheet.getCell(1,6).value = 'x'
  await sheet.saveCells([sheet.getCell(1, 6)])
}
// filesUploaded()

require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: 'n3noMeBsNA4AAAAAAAAAAXMVXw1Xyx6IFNdHBQ5bXTvSBko6-ezxdz8A1SiHSf4t' });


function changeHandler(event) {
  console.log(event.target.files[0])
  dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  dbx.filesUpload({contents: event.target.files[0], path: '/test', mute: true, mode: {".tag": 'add'}, autorename: true, strict_conflict: false})
  filesUploaded()
}

export default function FileUpload () {
    return(
      <input type="file" id="file-up" className="fileup" onChange={changeHandler} />
    )
}