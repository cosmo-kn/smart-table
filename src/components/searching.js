import { rules, createComparison, compare } from "../lib/compare.js";

export function initSearching(searchField) {
  // @todo: #5.1 — настроить компаратор

  const compare = createComparison(
    ['skipEmptyTargetValues'],
    [
      rules.searchMultipleFields(
        searchField,
        ["date", "customer", "seller"],
        false
      ),
    ]
  );

  return (data, state, action) => {
    const searchValue = state[searchField];
    if (!searchValue) return data;

    return data.filter((row) => compare(row, { [searchField]: searchValue }));
  };
}
