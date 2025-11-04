import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор

export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями
  // Заполните выпадающие списки данными. Для этого после // @todo: #4.1 переберите по ключам объект с индексами и для каждого в соответствующий элемент создайте и выведите тег <option value="name">name</option>.

  Object.keys(indexes) // Получаем ключи из объекта
    .forEach((elementName) => {
      elements[elementName].append(
        // в каждый элемент добавляем опции
        ...Object.values(indexes[elementName]) // формируем массив имён, значений опций
          .map((name) => {
            const option = document.createElement("option");
            option.textContent = name;
            option.value = name;
            // используйте name как значение и текстовое содержимое
            // @todo: создать и вернуть тег опции
            return option;
          })
      );
    });

  return (data, state, action) => {
    // @todo: #4.2 — обработать очистку поля
    // После комментария // @todo: #4.2 проверьте наличие действия. Если это кнопка с именем clear, тогда найдите input рядом с нашей кнопкой. Для этого можете получить родительский элемент кнопки и в нём выполнить поиск. Для найденного поля ввода сбросьте value и сделайте то же самое для соответствующего поля в state. Поле можно узнать через значение атрибута data-field кнопки.

    if (action?.name === "clear") {
      const input = action.closest("label").querySelector("input");
      input.value = "";
      state[action.dataset.field] = "";
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    const compare = createComparison(defaultRules);
    return data.filter((row) => compare(row, state));
  };
}
