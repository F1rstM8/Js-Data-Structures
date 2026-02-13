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
