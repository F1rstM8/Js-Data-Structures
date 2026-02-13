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
