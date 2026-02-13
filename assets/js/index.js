console.log(`--Exercice3--`);
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
