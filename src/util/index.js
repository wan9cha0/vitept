
function getDays(month, year) {
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    return 31
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30
  }
  if (month == 2) {
    return isRunYear(year) ? 29 : 28
  }
}
function isRunYear(year) {
  return year % 4 == 0 && year % 100 != 0 || year % 400 == 0
}

export default getDays