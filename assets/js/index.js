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
