console.log("--- Exercice 1: LinkedList (Clean & Professional) ---");

class Node {
  constructor(value) {
    if (value === undefined || value === null) {
      throw new TypeError("Value cannot be undefined or null.");
    }
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
  get length() {
    return this.#length;
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
   * Видалення першого знайденого елемента.
   * @returns {boolean} true - успішно видалено, false - не знайдено
   */
  deleteItem(data) {
    if (!this.#head) {
      return false;
    }
    if (this.#head.value === data) {
      this.#head = this.#head.next;
      this.#length--;
      return true;
    }
    let current = this.#head;
    while (current.next) {
      if (current.next.value === data) {
        current.next = current.next.next;
        this.#length--;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  addNthElement(data, position) {
    if (!Number.isInteger(position)) {
      throw new TypeError("Position must be an integer.");
    }
    if (position < 0 || position >= this.#length) {
      throw new RangeError(
        `Index ${position} is out of bounds (length: ${this.#length}).`,
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
  }
  toArray() {
    const result = [];
    let current = this.#head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

// --- ТЕСТ LinkedList ---
try {
  const list = new LinkedList();
  list.append("A");
  list.append("B");
  list.append("C");

  console.log("Initial List:", list.toArray());

  // Тестуємо видалення
  const isDeleted = list.deleteItem("A");
  if (isDeleted) {
    console.log("Succesfully deleted  'A'");
  } else {
    console.error("Сouldn't find'A'");
  }

  // Тестуємо невдале видалення
  const isDeletedFake = list.deleteItem("Z");
  if (!isDeletedFake) {
    console.log("Element 'Z' not found .");
  }

  list.addNthElement("X", 1);
  console.log("After insert:", list.toArray());
} catch (e) {
  console.error(`ERROR: ${e.message}`);
}

console.log("\n--- Exercice 2 & 3: NumberedCollection ---");

class NumberedCollection {
  #count = 0;

  constructor(...args) {
    args.forEach((item) => this.add(item));
  }

  add(value) {
    if (value === undefined || value === null) {
      throw new TypeError("Collection cannot accept null/undefined.");
    }
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

// --- ТЕСТ Collection ---
const collection = new NumberedCollection("First", "Second");
console.log("Iterating:");
for (const item of collection) {
  console.log(item);
}

console.log("\n--- Exercice 4: BracketValidator (Clean) ---");

class BracketValidator {
  #openBrackets;
  #bracketPairs;

  constructor(configPairs = ["()", "[]", "{}", "<>"]) {
    this.#openBrackets = new Set();
    this.#bracketPairs = new Map();

    for (const pair of configPairs) {
      if (typeof pair !== "string" || pair.length !== 2) {
        throw new Error(`Invalid pair configuration: "${pair}"`);
      }
      const [open, close] = pair;
      this.#openBrackets.add(open);
      this.#bracketPairs.set(close, open);
    }
  }

  checkSequence(sequence) {
    if (typeof sequence !== "string") return false;

    const stack = [];

    for (const char of sequence) {
      if (this.#openBrackets.has(char)) {
        stack.push(char);
        continue;
      }

      if (this.#bracketPairs.has(char)) {
        if (stack.length === 0) return false;

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

const validator = new BracketValidator();
console.log("Check '()':", validator.checkSequence("()")); // true
console.log("Check '{]':", validator.checkSequence("{]")); // false
