console.log("--- ЗАВДАННЯ 1: LinkedList (з Error Handling) ---");
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class LinkedList {
  #head;
  #length;
  constructor() {
    this.#head = null;
    this.#length = 0;
  }
  append(data) {
    const newNode = new Node(data);

    if (!this.#head) {
      this.#head = newNode;
    } else {
      let current = this.#head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.#length++;
  }
  /**
   * Метод 1: Видалення першого знайденого елемента за значенням
   * @param {any} data - значення для пошуку
   */
  deleteItem(data) {
    if (!this.#head) {
      console.warn("Список порожній, нічого видаляти.");
      return;
    }
    if (this.#head.value === data) {
      this.#head = this.#head.next;
      this.#length--;
      console.log(`Елемент ${data} видалено (це була голова).`);
      return;
    }
    let current = this.#head;
    while (current.next) {
      if (current.next.value === data) {
        current.next = current.next.next;
        this.#length--;
        console.log(`Елемент ${data} видалено.`);
        return;
      }
      current = current.next;
    }
    console.warn(`Елемент ${data} не знайдено.`);
  }
  /**
   * Метод 2: Вставка після N-го елемента
   * @param {any} data - нові дані
   * @param {number} position - індекс, після якого вставляємо
   */
  addNthElement(data, position) {
    if (!Number.isInteger(position)) {
      throw new TypeError("Позиція має бути цілим числом.");
    }
    if (position < 0 || position >= this.#length) {
      throw new RangeError(
        `Помилка: Індекс ${position} виходить за межі списку (довжина: ${this.#length}).`,
      );
    }

    const newNode = new Node(data);
    let current = this.#head;
    let count = 0;
    while (count < position) {
      current = current.next;
      count++;
    }
    newNode.next = current.next;
    current.next = newNode;

    this.#length++;
    console.log(`Вставлено "${data}" після індексу ${position}.`);
  }
  print() {
    const result = [];
    let current = this.#head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log("LinkedList:", result.join(" -> "));
  }
}
const list = new LinkedList();
list.append("A");
list.append("B");
list.append("C");
list.print();
console.log("--- Тест: addNthElement ---");
try {
  list.addNthElement("X", 1);
  list.print();
  list.addNthElement("Z", 100);
} catch (e) {
  console.error(`!!! СПІЙМАНО ПОМИЛКУ (${e.name}): ${e.message}`);
}
console.log("--- Тест: deleteItem ---");
list.deleteItem("A");
list.print();

list.deleteItem("C");
list.print();

console.log(`--Exercice2--`);
class NumberedCollection {
  #count = 0;

  constructor(...args) {
    args.forEach((item) => this.add(item));
  }

  add(value) {
    this.#count++;
    this[`*${this.#count}*`] = value;
  }
}
const myCollection = new NumberedCollection(
  "first value",
  "second value",
  "third value",
);
console.log(myCollection);

console.log(`--Exercice3`);
class NumberedCollection {
  #count = 0;

  constructor(...args) {
    args.forEach((item) => this.add(item));
  }

  add(value) {
    this.#count++;
    this[`*${this.#count}*`] = value;
  }
  *[Symbol.iterator]() {
    for (let i = 1; i <= this.#count; i++) {
      const key = `*${i}*`;
      yield this[key];
    }
  }
}
const collection = new NumberedCollection("First", "Second", "Third");
console.log("--- Цикл for...of ---");
for (const item of collection) {
  console.log(item);
}
console.log("\n--- Spread operator ---");
const arrayFromCollection = [...collection];
console.log(arrayFromCollection);
console.log(`-exercice4--`);
class BracketValidator {
  #openBrackets;
  #bracketPairs;

  /**
   * @param {string[]} configPairs - масив пар дужок, наприклад ['()', '[]']
   */
  constructor(configPairs = ["()", "[]", "{}", "<>"]) {
    this.#openBrackets = new Set();
    this.#bracketPairs = new Map();

    for (const pair of configPairs) {
      if (typeof pair !== "string" || pair.length !== 2) {
        throw new Error(
          `Некоректна пара дужок: "${pair}". Має бути рядок з 2 символів.`,
        );
      }

      const [open, close] = pair;

      this.#openBrackets.add(open);
      this.#bracketPairs.set(close, open);
    }
  }

  /**
   * Перевіряє валідність послідовності дужок
   * @param {string} sequence
   * @returns {boolean}
   */
  checkSequence(sequence) {
    if (typeof sequence !== "string") return false;

    const stack = [];

    for (const char of sequence) {
      if (this.#openBrackets.has(char)) {
        stack.push(char);
        continue;
      }

      if (this.#bracketPairs.has(char)) {
        const lastOpen = stack.pop();
        const expectedOpen = this.#bracketPairs.get(char);

        if (lastOpen !== expectedOpen) {
          return false;
        }
      }
    }

    return stack.length === 0;
  }
}

const validator = new BracketValidator(["()", "[]", "{}", "<>"]);

console.log("1. Стандартні перевірки:");
console.log(validator.checkSequence("()(([]))")); // true
console.log(validator.checkSequence("{][)")); // false
console.log(validator.checkSequence("((()))")); // true
console.log(validator.checkSequence("<{ [ ] }>")); // true
console.log(validator.checkSequence("( [ ) ]")); // false (перетин дужок)
console.log(validator.checkSequence("(")); // false (не закрита)

console.log("\n2. Налаштовуваний варіант (тільки круглі дужки):");
const simpleValidator = new BracketValidator(["()"]);
console.log(simpleValidator.checkSequence("[]")); // true (бо [] ігноруються, це просто текст)
console.log(simpleValidator.checkSequence("(( ))")); // true

console.log(
  "\n3. Екзотичні дужки (наприклад, для математики або власних пар):",
);

const customValidator = new BracketValidator(["AB", "xy"]);
// Тут 'A' відкриває, 'B' закриває. 'x' відкриває, 'y' закриває.
console.log(customValidator.checkSequence("AxBy")); // true
console.log(customValidator.checkSequence("ABBA")); // false
