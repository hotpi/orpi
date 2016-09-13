import { getAllPatients, getNoteById, getAllNotes, getNoteLine } from '../reducers';

import { has as _has } from 'lodash';

import * as syncTypes from '../actions/sync';
import * as noteTypes from '../actions/note';
import * as noteLineTypes from '../actions/noteLines';
import * as patientTypes from '../actions/patients';

const INSERT = 'insert';
const DELETE = 'delete';

export const translateActionToOperation = (action, store) => {
  switch (action.type) {
    case noteTypes.NEW_NOTE:
      console.log(getAllPatients(store.getState()))

      var patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
      var patientIndex = patients.map(patient => patient.ID).indexOf(action.PatientID)
      console.log(patients[patientIndex], 'NEW_NOTE')
      var noteIndex = patients[patientIndex].notes.length
      var accessPath = [{'0': patientIndex},{'1': noteIndex}]
      var node = {
        ID: action.NoteID,
        type: 'new',
        noteLines: []
      }
      return [INSERT, accessPath, node, action];
    case noteLineTypes.CREATE_AND_APPEND_LAST:
    case noteLineTypes.CREATE_AND_APPEND_NEXT:
      var patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
      var patient = patients.reduce((prev, curr, index) => {
        if (curr.notes.indexOf(action.NoteID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)

      var noteIndex = patient.notes.indexOf(action.NoteID)
      var note = getNoteById(store.getState(), action.NoteID)
      var noteLineIndex = typeof action.index !== 'undefined' ? 
        action.index : 
        note.noteLines.length
      var accessPath = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
      var node = {
        ID: action.NoteLineID,
        text: '',
        important: {
          set: false,
          color: "grey",
          value: 0
        },
        highlight: {
          set: false,
          color: "grey",
          value: 0
        }
      }
      return [INSERT, accessPath, node, action];
    case noteLineTypes.UPDATE_LINE_VALUE:
      var notes = getAllNotes(store.getState())
      var note = notes.reduce((prev, curr, index) => {
        if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
      var patient = patients.reduce((prev, curr, index) => {
        if (curr.notes.indexOf(note.ID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
      var noteIndex = patient.notes.indexOf(note.ID)
      var noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
      var noteLine = getNoteLine(store.getState(), action.NoteLineID)

      var textIndex = null;
      for (var i = 0; i < noteLine.text.length; i++) {
        if (noteLine.text[i] !== action.text[i]) {
          textIndex = i;
          break;
        }
      }

      var operationType = ''
      var node = ''
      if (textIndex === null) {
        operationType = INSERT;
        textIndex = noteLine.text.length 
        node = action.text[noteLine.text.length]
      } else if (noteLine.text.length > action.text.length) {
        operationType = DELETE
        node = {}
      } else if (noteLine.text.length < action.text.length) {
        operationType = INSERT
        node = action.text[textIndex]
      }

      var accessPath = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex},{'3': textIndex}]
      return [operationType, accessPath, node, action]
    case noteLineTypes.DELETE_LINE:
      var patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
      var patient = patients.reduce((prev, curr, index) => {
        if (curr.notes.indexOf(action.NoteID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)

      var noteIndex = patient.notes.indexOf(action.NoteID)
      var note = getNoteById(store.getState(), action.NoteID)
      var noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
      var accessPath = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
      var node = {}
      return [DELETE, accessPath, node, action];

    case noteLineTypes.IMPORTANT_LINE:
      var notes = getAllNotes(store.getState())
      var note = notes.reduce((prev, curr, index) => {
        if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
      var patient = patients.reduce((prev, curr, index) => {
        if (curr.notes.indexOf(note.ID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
      var noteIndex = patient.notes.indexOf(note.ID)
      var noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
      var noteLine = getNoteLine(store.getState(), action.NoteLineID)
      var accessPath/*Insert*/ = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
      
      var node = {
        ...noteLine,
        important: {
          set: action.value === 0,
          color: action.color,
          value: action.value
        }
      }
      return [[INSERT, accessPath, node, action], [DELETE, accessPath, {}, action]];
    case noteLineTypes.HIGHLIGHT_LINE:
      var notes = getAllNotes(store.getState())
      var note = notes.reduce((prev, curr, index) => {
        if (curr.noteLines.indexOf(action.NoteLineID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patients = getAllPatients(store.getState()).sort((a, b) => sortAlphabetically(a,b))
      var patient = patients.reduce((prev, curr, index) => {
        if (curr.notes.indexOf(note.ID) !== -1 ) {
          return curr;
        }

        return prev;

      }, {})
      var patientIndex = patients.map(patient => patient.ID).indexOf(patient.ID)
      var noteIndex = patient.notes.indexOf(note.ID)
      var noteLineIndex = note.noteLines.indexOf(action.NoteLineID)
      var noteLine = getNoteLine(store.getState(), action.NoteLineID)
      var accessPath/*Insert*/ = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]
      // var accessPathDelete = [{'0': patientIndex},{'1': noteIndex},{'2': noteLineIndex}]

      var node = {
        ...noteLine,
        highlight: {
          set: action.value === 0,
          color: action.color,
          value: action.value
        }
      }
      return [[INSERT, accessPath, node, action], [DELETE, accessPath, {}, action]]
  }

}

export const getAccessPath = (objectAccessPath) => {
  if (objectAccessPath.length === 1) {
    return [objectAccessPath[0]['0']];
  } else if (objectAccessPath.length === 2) {
    return [objectAccessPath[0]['0'], objectAccessPath[1]['1']]
  } else if (objectAccessPath.length === 3) {
    return [objectAccessPath[0]['0'], objectAccessPath[1]['1'], objectAccessPath[2]['2']]
  }

  return [objectAccessPath[0]['0'], objectAccessPath[1]['1'], objectAccessPath[2]['2'], objectAccessPath[3]['3']]
}

export const translateOperationToAction = (operation, store) => {
  const { type, accessPath, node, action } = operation
  const newAccessPath = getAccessPath(accessPath)
  var actionToDispatch = { type: 'NO-OP'};
  if (operation.type !== 'no-op') {
    actionToDispatch = {
      ...action,
      index: newAccessPath[newAccessPath.length-1],
      fromServer: true
    }
  }

  return actionToDispatch
}

const sortAlphabetically = (a, b) => {
  if (a.ID < b.ID) {
    return -1;
  } else if (a.ID > b.ID) {
    return 1;
  } 

  return 0;
}
