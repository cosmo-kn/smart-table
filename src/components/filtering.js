import { createComparison, defaultRules } from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison([
  "skipNonExistentSourceFields",
  "skipEmptyTargetValues",
  "failOnEmptySource",
  "arrayAsRange",
  "caseInsensitiveStringIncludes",
  "exactEquality",
]);
export function initFiltering(elements, indexes) {
  // @todo: #4.1 — заполнить выпадающие списки опциями

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

    if (action?.name === "clear") {
      const input = action.closest("label").querySelector("input");
      input.value = "";
      state[action.dataset.field] = "";
    }

    if (state.totalFrom || state.totalTo) {
      state.total = [state.totalFrom, state.totalTo];
    }
    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter((row) => compare(row, state));
  };
}
