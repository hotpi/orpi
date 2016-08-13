
import rootReducer from './reducers'

import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'

import createLogger from 'redux-logger'

import { v4 } from 'node-uuid';
import throttle from 'lodash/throttle';

export const noteIds = [v4(), v4(), v4(), v4(), v4(), v4()]
const noteLineIds = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()]
export const patientIds = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()]
/*
  {
    byId: {
      [noteLineIds[0]]: {
        
      },
    },
    allIds: noteLineIds
  }
*/

const configureStore = () => {
  const persistedState = {
    entities: {
      patients: {
        [patientIds[0]]: {
          ID: patientIds[0],
          lastName: 'Mustermann',
          firstName: 'Max',
          bedNumber: 10,
          clinic: 'Endo',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds.slice(0, 3)
        },
        [patientIds[1]]: {
          ID: patientIds[1],
          lastName: 'Mustermann',
          firstName: 'Robert',
          bedNumber: 17,
          clinic: 'Endo',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds.slice(1, 2)
        },
        [patientIds[2]]: {
          ID: patientIds[2],
          lastName: 'Mustermann',
          firstName: 'Samuel',
          bedNumber: 3,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds.slice(2, 3)
        },
        [patientIds[3]]: {
          ID: patientIds[3],
          lastName: 'Mustermann',
          firstName: 'Jürgen',
          bedNumber: 5,
          clinic: 'Endo',
          station: '29',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds.slice(3, 4)
        },
        [patientIds[4]]: {
          ID: patientIds[4],
          lastName: 'Mustermann',
          firstName: 'George',
          bedNumber: 21,
          clinic: 'All',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds.slice(5, 6)
        },
        [patientIds[5]]: {
          ID: patientIds[5],
          lastName: 'Mustermann',
          firstName: 'Pablo',
          bedNumber: 12,
          clinic: 'Pneu',
          station: '29',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds.slice(7, 8)
        },
        [patientIds[6]]: {
          ID: patientIds[6],
          lastName: 'Mustermann',
          firstName: 'Ramón',
          bedNumber: 19,
          clinic: 'All',
          station: '29',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: noteIds.slice(8, 9)
        }/*,
        [patientIds[7]]: {
          ID: patientIds[7],
          lastName: 'Mustermann',
          firstName: 'Johnny',
          bedNumber: 9,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[8]]: {
          ID: patientIds[8],
          lastName: 'Mustermann',
          firstName: 'Johannes',
          bedNumber: 1,
          clinic: 'Endo',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[9]]: {
          ID: patientIds[9],
          lastName: 'Mustermann',
          firstName: 'Julian',
          bedNumber: 3,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        },
        [patientIds[10]]: {
          ID: patientIds[10],
          lastName: 'Mustermann',
          firstName: 'Johan',
          bedNumber: 24,
          clinic: 'Pneu',
          station: '28',
          admissionDate: new Date(2016, 5, 12),
          dischargeDate: new Date(2016, 5, 12),
          birthday: new Date(1991, 11, 21),
          notes: []
        }*/
      },
      notes: {
        [noteIds[0]]: {
          ID: noteIds[0],
          type: 'diagnosis',
          noteLines: noteLineIds.slice(0,1)
        },
        [noteIds[1]]: {
          ID: noteIds[1],
          type: 'history',
          noteLines: noteLineIds.slice(1,3)
        },
        [noteIds[2]]: {
          ID: noteIds[2],
          type: 'todo',
          noteLines: noteLineIds.slice(3,6)
        },
        [noteIds[3]]: {
          ID: noteIds[3],
          type: 'diagnosis',
          noteLines: noteLineIds.slice(6,7)
        },
        [noteIds[4]]: {
          ID: noteIds[4],
          type: 'diagnosis',
          noteLines: noteLineIds.slice(7,8)
        },
        [noteIds[5]]: {
          ID: noteIds[5],
          type: 'diagnosis',
          noteLines: noteLineIds.slice(8,9)
        }
      },
      noteLines: {
        [noteLineIds[0]]: {
          ID: noteLineIds[0],
          text: 'something from note 1',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[1]]: {
          ID: noteLineIds[1],
          text: 'something from note 1',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[2]]: {
          ID: noteLineIds[2],
          text: 'something from note 2',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[3]]: {
          ID: noteLineIds[3],
          text: 'something from note 2',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[4]]: {
          ID: noteLineIds[4],
          text: '',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[5]]: {
          ID: noteLineIds[5],
          text: '',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[6]]: {
          ID: noteLineIds[6],
          text: '',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[7]]: {
          ID: noteLineIds[7],
          text: '',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[8]]: {
          ID: noteLineIds[8],
          text: '',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
        [noteLineIds[9]]: {
          ID: noteLineIds[9],
          text: '',
          important: {
            set: false,
            color: "grey",
            value: "0"
          },
          highlight: {
            set: false,
            color: "grey",
            value: "0"
          }
        },
      }
    }
  };

  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(thunk, /*api, */createLogger()),
      window.devToolsExtension && window.devToolsExtension()
      //DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }


  // store.subscribe(throttle(() => {
  //   saveState({
  //     noteLines: store.getState().noteLines,
  //   });
  // }, 1000));

  return store;
}

export default configureStore;

/*,
  {
    ID: v4(),
    text: '12312312',
    important: {
      set: false,
      color: "transparent",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: false,
    isEmpty: false
  },
  {
    ID: v4(),
    text: '',
    important: {
      set: false,
      color: "transparent",
      value: "0"
    },
    highlight: {
      set: false,
      color: "transparent",
      value: "0"
    },
    last: true,
    isEmpty: false
  }*/