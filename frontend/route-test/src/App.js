/* global gapi */

import React from 'react';
import { gapi } from 'gapi-script'
import Routes from './Components/Routes';
import Navbar from './Components/Navbar';
import './Styles/App.css';

// const fs = require('fs');
// const readline = require('readline');
// const { google } = require('googleapis');

console.log(gapi)
window.addEventListener("google-loaded", () => {
  console.log(gapi)
  handleClientLoad();
  initClient();
});
const CLIENT_ID = '485430344571-ans3q5ql0gu1q6826o5t21hh42220d2v.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBefOJJ5J4hhJVJTs5clq-wwa0CeQTOnnc';

require('isomorphic-fetch'); // or another library of choice.
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: 'uj19moYp_NIAAAAAAAAAAbSPRn10Ac9U5dBteiLLyvDyD5EryYnyIEAFOndwEZ31' });


function changeHandler(event) {
  console.log(event.target.files[0])
  dbx.filesListFolder({path: ''})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

  // dbx.filesUpload({contents: event.target.files[0], path: '/test', mute: true, mode: {".tag": 'add'}, autorename: true, strict_conflict: false})
  doSheetStuff()
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1><strong>{'\u2203'}</strong>ngauge</h1>
        <Navbar />
      </header>
      <div className="headblock headblock3" />
      <div className="headblock headblock2" />
      <div className="headblock headblock1" />
      <Routes />
      <input type="file" id="file-up" onChange={changeHandler} />
    </div>
  )
}

function doSheetStuff() {
  handleAuthClick();
}

var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    listMajors();
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  console.log(gapi)
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      appendPre('Name, Major:');
      for (let i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        appendPre(row[0] + ', ' + row[4]);
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}

function initClient() {
  console.log(gapi.client)
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    // authorizeButton.onclick = handleAuthClick;
    // signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}


export default App;