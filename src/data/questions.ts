import type { Question } from "../types/question";

export const MOCK_QUESTIONS: Question[] = [
  // Stages 1 to 11 (Easy: 1 Question, 30s)
  {
    id: 'q1',
    stageNumber: 1,
    difficulty: 'easy',
    text: 'What is the correct syntax for a React functional component?',
    optionType: 4,
    options: [
      'function MyComp() { return <div />; }',
      'class MyComp extends React() {}',
      'const MyComp = <div />',
      'MyComp() => <div />'
    ],
    correctAnswer: 'function MyComp() { return <div />; }'
  },
  {
    id: 'q2',
    stageNumber: 2,
    difficulty: 'easy',
    text: 'Which hook is used to perform side effects in React?',
    optionType: 4,
    options: ['useState', 'useEffect', 'useContext', 'useReducer'],
    correctAnswer: 'useEffect'
  },
  {
    id: 'q3',
    stageNumber: 3,
    difficulty: 'easy',
    text: 'TypeScript is a typed superset of which language?',
    optionType: 2,
    options: ['JavaScript', 'Python'],
    correctAnswer: 'JavaScript'
  },
  {
    id: 'q4',
    stageNumber: 4,
    difficulty: 'easy',
    text: 'Does React virtual DOM update the entire page directly?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'No'
  },
  {
    id: 'q5',
    stageNumber: 5,
    difficulty: 'easy',
    text: 'What is the default port for a local Vite dev server?',
    optionType: 4,
    options: ['3000', '8080', '5173', '5000'],
    correctAnswer: '5173'
  },
  {
    id: 'q6',
    stageNumber: 6,
    difficulty: 'easy',
    text: 'Which CSS module property defines React Native flexbox layout direction by default?',
    optionType: 4,
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
    correctAnswer: 'column'
  },
  {
    id: 'q7',
    stageNumber: 7,
    difficulty: 'easy',
    text: 'Can localStorage store JavaScript objects directly without serialization?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'No'
  },
  {
    id: 'q8',
    stageNumber: 8,
    difficulty: 'easy',
    text: 'Which command is used to install npm packages?',
    optionType: 4,
    options: ['npm run', 'npm install', 'npm start', 'npm compile'],
    correctAnswer: 'npm install'
  },
  {
    id: 'q9',
    stageNumber: 9,
    difficulty: 'easy',
    text: 'What does HTML stand for?',
    optionType: 4,
    options: [
      'Hyper Text Markup Language',
      'High Text Markup Language',
      'Hyper Tabular Markup Language',
      'None of the above'
    ],
    correctAnswer: 'Hyper Text Markup Language'
  },
  {
    id: 'q10',
    stageNumber: 10,
    difficulty: 'easy',
    text: 'Is CSS used for structuring web page content?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'No'
  },
  {
    id: 'q11',
    stageNumber: 11,
    difficulty: 'easy',
    text: 'What HTML tag is used to link an external CSS file?',
    optionType: 4,
    options: ['<script>', '<link>', '<style>', '<css>'],
    correctAnswer: '<link>'
  },

  // Stages 12 to 16 (Medium: 2 Questions, 20s)
  {
    id: 'q12_1',
    stageNumber: 12,
    difficulty: 'medium',
    text: 'Which hook provides memory cache for expensive calculations?',
    optionType: 4,
    options: ['useCallback', 'useMemo', 'useRef', 'useContext'],
    correctAnswer: 'useMemo'
  },
  {
    id: 'q12_2',
    stageNumber: 12,
    difficulty: 'medium',
    text: 'TypeScript interfaces can extend other interfaces.',
    optionType: 2,
    options: ['True', 'False'],
    correctAnswer: 'True'
  },
  {
    id: 'q13_1',
    stageNumber: 13,
    difficulty: 'medium',
    text: 'What does the "key" prop do in React list rendering?',
    optionType: 4,
    options: [
      'It secures the DOM element',
      'It helps React identify which items have changed',
      'It speeds up network requests',
      'It is automatically generated and never needs to be written'
    ],
    correctAnswer: 'It helps React identify which items have changed'
  },
  {
    id: 'q13_2',
    stageNumber: 13,
    difficulty: 'medium',
    text: 'Does localStorage persist data after the browser is closed?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'Yes'
  },
  {
    id: 'q14_1',
    stageNumber: 14,
    difficulty: 'medium',
    text: 'Which operator is used for optional chaining in TypeScript?',
    optionType: 4,
    options: ['??', '?.', '||', '&&'],
    correctAnswer: '?.'
  },
  {
    id: 'q14_2',
    stageNumber: 14,
    difficulty: 'medium',
    text: 'Can you use hooks inside normal JavaScript functions?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'No'
  },
  {
    id: 'q15_1',
    stageNumber: 15,
    difficulty: 'medium',
    text: 'What is the purpose of React.lazy?',
    optionType: 4,
    options: [
      'To delay execution of a component',
      'To load components dynamically/lazy-load',
      'To throttle events',
      'To decrease state changes'
    ],
    correctAnswer: 'To load components dynamically/lazy-load'
  },
  {
    id: 'q15_2',
    stageNumber: 15,
    difficulty: 'medium',
    text: 'JSX elements are compiled into plain JavaScript objects.',
    optionType: 2,
    options: ['True', 'False'],
    correctAnswer: 'True'
  },
  {
    id: 'q16_1',
    stageNumber: 16,
    difficulty: 'medium',
    text: 'Which command updates npm package version?',
    optionType: 4,
    options: ['npm update', 'npm upgrade', 'npm install', 'npm publish'],
    correctAnswer: 'npm update'
  },
  {
    id: 'q16_2',
    stageNumber: 16,
    difficulty: 'medium',
    text: 'Does useEffect trigger clean-up function before the component unmounts?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'Yes'
  },

  // Stages 17 to 20 (Hard: 3 Questions, 10s)
  {
    id: 'q17_1',
    stageNumber: 17,
    difficulty: 'hard',
    text: 'What is the time complexity of lookup in a Map object?',
    optionType: 4,
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
    correctAnswer: 'O(1)'
  },
  {
    id: 'q17_2',
    stageNumber: 17,
    difficulty: 'hard',
    text: 'What hook is used to read context without wrapping components in consumers?',
    optionType: 4,
    options: ['useContext', 'useState', 'useReducer', 'useCallback'],
    correctAnswer: 'useContext'
  },
  {
    id: 'q17_3',
    stageNumber: 17,
    difficulty: 'hard',
    text: 'Can const variables be reassigned in JS?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'No'
  },
  {
    id: 'q18_1',
    stageNumber: 18,
    difficulty: 'hard',
    text: 'Which hook should be used to measure DOM node layouts before painting?',
    optionType: 4,
    options: ['useEffect', 'useLayoutEffect', 'useInsertionEffect', 'useImperativeHandle'],
    correctAnswer: 'useLayoutEffect'
  },
  {
    id: 'q18_2',
    stageNumber: 18,
    difficulty: 'hard',
    text: 'What does "unknown" type represent in TypeScript?',
    optionType: 4,
    options: [
      'Same as any but safer',
      'A type with no properties allowed',
      'The null and undefined union',
      'None of the above'
    ],
    correctAnswer: 'Same as any but safer'
  },
  {
    id: 'q18_3',
    stageNumber: 18,
    difficulty: 'hard',
    text: 'Is "never" a valid type in TypeScript?',
    optionType: 2,
    options: ['Yes', 'No'],
    correctAnswer: 'Yes'
  },
  {
    id: 'q19_1',
    stageNumber: 19,
    difficulty: 'hard',
    text: 'Which function is used to create a Portal in React?',
    optionType: 4,
    options: [
      'ReactDOM.createPortal',
      'React.createPortal',
      'ReactDOM.renderPortal',
      'React.usePortal'
    ],
    correctAnswer: 'ReactDOM.createPortal'
  },
  {
    id: 'q19_2',
    stageNumber: 19,
    difficulty: 'hard',
    text: 'What does closure preserve in JavaScript?',
    optionType: 4,
    options: [
      'Outer scope variables',
      'Global scope values only',
      'Only arguments passed',
      'Internal execution speed'
    ],
    correctAnswer: 'Outer scope variables'
  },
  {
    id: 'q19_3',
    stageNumber: 19,
    difficulty: 'hard',
    text: 'Promises have 3 states: pending, fulfilled, and rejected.',
    optionType: 2,
    options: ['True', 'False'],
    correctAnswer: 'True'
  },
  {
    id: 'q20_1',
    stageNumber: 20,
    difficulty: 'hard',
    text: 'Which React hook is designed for syncing with external stores?',
    optionType: 4,
    options: [
      'useSyncExternalStore',
      'useExternalSync',
      'useSubscription',
      'useEffectEvent'
    ],
    correctAnswer: 'useSyncExternalStore'
  },
  {
    id: 'q20_2',
    stageNumber: 20,
    difficulty: 'hard',
    text: 'In Event Loop, microtasks are executed before the next render tick.',
    optionType: 2,
    options: ['True', 'False'],
    correctAnswer: 'True'
  },
  {
    id: 'q20_3',
    stageNumber: 20,
    difficulty: 'hard',
    text: 'What is the output of typeof null?',
    optionType: 4,
    options: ['"null"', '"object"', '"undefined"', '"string"'],
    correctAnswer: '"object"'
  }
];
