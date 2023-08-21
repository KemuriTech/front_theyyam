class DateFormatModule {
  formatDay(day) {
    const tensPlace = Math.floor(day / 10);
    const onesPlace = day % 10;
    if (tensPlace === 1) return day + 'th';
    switch (onesPlace) {
    case 1: return day + 'st';
    case 2: return day + 'nd';
    case 3: return day + 'rd';
    default: return day + 'th';
    }
  }
  formatDate(fromDateStr, toDateStr) {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);

    // Get day, month, and year values for "from" date
    const fromDay = this.formatDay(fromDate.getDate());
    const fromMonth = fromDate.toLocaleString('en-us', { month: 'short' });
    const fromYear = fromDate.getFullYear();

    // Get day, month, and year values for "to" date
    const toDay = this.formatDay(toDate.getDate());
    const toMonth = toDate.toLocaleString('en-us', { month: 'short' });
    const toYear = toDate.getFullYear();

    const currentYear = new Date().getFullYear();

    // If same month and year, format as "fromDay - toDay Month Year"
    if (fromMonth === toMonth && fromYear === toYear && fromYear === currentYear && toYear === currentYear) {
      return `${fromDay} - ${toDay} ${fromMonth}`;
    }
    // If same month and year, format as "fromDay - toDay Month Year"
    if ((fromMonth === toMonth && fromYear === toYear) && ((fromYear > currentYear && toYear > currentYear) || (fromYear < currentYear && toYear < currentYear))) {
      return `${fromDay} - ${toDay} ${toMonth} ${toYear}`;
    } 
    else if ((fromMonth !== toMonth && fromYear === toYear) && ((fromYear > currentYear && toYear > currentYear)|| (fromYear < currentYear && toYear < currentYear))) {
      return `${fromDay} ${fromMonth} - ${toDay} ${toMonth} ${toYear}`;
    }

    // If different month but same year, format as "fromDay Month - toDay Month Year"
    if (fromYear === toYear) {
      return `${fromDay} ${fromMonth} - ${toDay} ${toMonth}`;
    }
    // If different year, format as "fromDay Month Year - toDay Month Year"
    return `${fromDay} ${fromMonth} ${fromYear} - ${toDay} ${toMonth} ${toYear}`;
  }
}

export default DateFormatModule;