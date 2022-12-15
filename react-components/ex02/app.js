const person = {
  name: 'Dragos',
  surname: 'Iordache',
  age: 32,
  petOwner: false,
  skills: [
    'html',
    'javascript',
    'css',
    'java',
    'c++',
    'node',
    'jquery',
    'node.js',
  ],
  friends: [
    {
      name: 'Larry',
      surname: 'Larryson',
      age: 30,
    },
    {
      name: 'Steven',
      surname: 'Stevenson',
      age: 31,
    },
    {
      name: 'Carol',
      surname: 'Carolson',
      age: 29,
    },
  ],
};

console.warn(`
Folosind obiectul person si reduce, afiseaza in consola un string
care contine skill-urile de pe pozitiile pare ale arrayului, separate prin virgula
`);
const skillArray1 = person.skills.reduce((skillArray1, skill, index) => {
  if (index % 2 === 0) {
    skillArray1.push(skill);
  }

  return skillArray1;
}, []);
console.log(skillArray1.toString());

console.warn(`
In mod similar, afiseaza skill-urile care NU incep cu j.
`);
const skillArray2 = person.skills.reduce((skillArray2, skill) => {
  if (!skill.toLowerCase().startsWith('j')) {
    skillArray2.push(skill);
  }

  return skillArray2;
}, []);
console.log(skillArray2.join(' - '));

console.warn(`
Folosind reduce afiseaza propozitia:
"Prietenii mei se numesc xxx yyy, xxx yyy, xxx yyy."
`);
const message1 = person.friends.reduce(
  (message1, { name, surname }, index, friends) => {
    let punctuation = ', ';

    if (index === friends.length - 1) {
      punctuation = '.';
    }

    message1 += `${name} ${surname}${punctuation}`;

    return message1;
  },
  '',
);
console.log(message1);

console.warn(`
Folosind reduce, afiseaza numarul total de ani
pe care il au persoanele din arrayul friends,
doar daca varsta este mai mare sau egala cu 30 de ani.
`);
const sumAge = person.friends.reduce((sumAge, { age }) => {
  if (age >= 30) {
    sumAge += age;
  }

  return sumAge;
}, 0);
console.log(sumAge);

console.warn(`
Folosind reduce, afiseaza suma anilor de nastere a persoanelor.
`);
const currentYear = new Date().getFullYear();
const sumBirthYears = person.friends.reduce((sumBirthYears, { age }) => {
  sumBirthYears += currentYear - age;

  return sumBirthYears;
}, 0);
console.log(sumBirthYears);

console.warn(`
Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani.
Intre Dragos si Steven... ", doar daca varsta prietenului este impara.
`);
const message2 = person.friends.reduce((message2, friend) => {
  const { age, name } = friend;
  const diff = person.age - age;

  if (age % 2 !== 0) {
    message2 += `Intre ${person.name} si ${name} este o diferenta de ${diff} ani. `;
  }

  return message2;
}, '');
console.log(message2.trim());

console.warn(`
Folosind obiectul person si reduce,
afiseaza in consola un string care contine skillurile persoanei,
separate prin virgula
`);
const message3 = person.skills.reduce((message3, skill, index, skills) => {
  let punctuation = ', ';

  if (index === skills.length - 1) {
    punctuation = '.';
  }

  message3 += `${skill}${punctuation}`;
  return message3;
}, '');
console.log(message3);

console.warn(`
In mod similar, afiseaza skillurile care incep cu c
`);
const message4 = person.skills.reduce((message4, skill, index, skills) => {
  let punctuation = ', ';

  if (skill.startsWith('c')) {
    if (index === message4.length - 1) {
      punctuation = '.';
    }
    message4 += `${skill}${punctuation}`;
  }

  return message4;
}, '');
console.log(message4);

console.warn(`
Folosind reduce, afiseaza propozitia: "Numele de familie ale prietenilor mei sunt: xxx, xxx , xxx."
`);
const message5 = person.friends.reduce(
  (message5, { surname }, index, friends) => {
    let punctuation = ', ';

    if (index === friends.length - 1) {
      punctuation = '.';
    }
    message5 += `${surname}${punctuation}`;

    return message5;
  },
  'Numele de familie ale prietenilor mei sunt: ',
);
console.log(message5);

console.warn(`
Folosind reduce, afiseaza numarul total de ani pe care il au persoanele din arrayul friends
`);
const sumAges = person.friends.reduce((sumAges, { age }) => {
  sumAges += age;

  return sumAges;
}, 0);
console.log(sumAges);

console.warn(`
Folosind reduce, afiseaza suma anilor  persoanelor.
`);
// am facut ambele: suma varstelor si suma anilor de nastere pe care ii au toti (inclusiv person),
// pentru ca am calculat mai sus suma varstelor / anilor de nastere ale / ai prietenilor
const totalSumAges = person.friends.reduce((totalSumAges, { age }) => {
  totalSumAges += age;

  return totalSumAges;
}, 0);
console.log(totalSumAges + person.age);

const totalSumBirthYears = person.friends.reduce(
  (totalSumBirthYears, { age }) => {
    totalSumBirthYears += currentYear - age;

    return totalSumBirthYears;
  },
  0,
);
console.log(totalSumBirthYears + (currentYear - person.age));

console.warn(`
Afiseaza diferenta de varsta dintre persoana si prietenii din arrayul friends.
`);
const message6 = person.friends.reduce((message6, { age }, index, friends) => {
  const diff = person.age - age;
  let punctuation = ', ';

  if (index === friends.length - 1) {
    punctuation = '.';
  }

  if (index === friends.length - 2) {
    punctuation = ' si ';
  }

  message6 += `${diff} ani${punctuation}`;

  return message6;
}, 'Diferentele de varsta dintre persoana si prietenii din arrayul friends sunt: ');
console.log(message6);

console.warn(`
Afiseaza fraza: "Intre Dragos si Larry este o diferenta de xx ani.
Intre Dragos si Steven... ". Repeta pentru tot arrayul friends.
`);
const message7 = person.friends.reduce(
  (message7, { name, age }, index, friends) => {
    const diff = person.age - age;
    let punctuation = ', ';

    if (index === friends.length - 1) {
      punctuation = '.';
    }

    if (index === friends.length - 2) {
      punctuation = ' si ';
    }

    message7 += ` Intre ${person.name} si ${name} este o diferenta de ${diff} ani.`;

    return message7;
  },
  '',
);
console.log(message7.trim());
