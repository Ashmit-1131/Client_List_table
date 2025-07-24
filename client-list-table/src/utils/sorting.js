// utils/sorting.js
export function multiSort(data, sortItems) {
  // Create a shallow copy to avoid mutating original array
  return [...data].sort((a, b) => {
    for (let i = 0; i < sortItems.length; i++) {
      const { field, direction } = sortItems[i];
      let aVal = a[field];
      let bVal = b[field];
      let comparison = 0;

      // Numeric comparison for numbers
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        comparison = aVal - bVal;
      }
      // Date comparison for ISO date strings
      else if (!isNaN(Date.parse(aVal)) && !isNaN(Date.parse(bVal))) {
        comparison = new Date(aVal) - new Date(bVal);
      }
      // String comparison for everything else
      else {
        comparison = aVal.toString().localeCompare(bVal.toString());
      }

      // If values differ, return 1 or -1 depending on direction
      if (comparison !== 0) {
        return direction === 'asc' ? comparison : -comparison;
      }
      // If equal, continue to next sort criterion
    }
    return 0;
  });
}
