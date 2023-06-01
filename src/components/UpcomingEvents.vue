<template>
  <div class="bg-gray-50">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="flex items-center justify-center space-x-4">
        <h2 class="text-lg font-medium text-gray-900">Upcoming Events</h2>
      </div>
      <div class="flex items-center justify-end space-x-4">
        <a href="/Events" class="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">View
          all<span aria-hidden="true"> &rarr;</span></a>
      </div>
      <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        <div v-for="event in upcomingEventData" :key="event.id" class="relative group">
          <NuxtLink :to="`Event${event.topics_id}`" class="cursor-pointer">
            <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
              <img :src="event.ext_16.url" class="object-center object-cover h-full w-full" />
            </div>
            <div class="mt-4 flex  text-left justify-between text-base font-medium text-gray-900 space-x-8 mb-1">
              <h3>
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ event.subject }}
              </h3>
            </div>
            <p class="mt-1 text-sm text-gray-500 flex items-center space-x-2">
              <span class="mr-1">{{ event.formattedDate }}</span>
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  async setup() {

    let upcomingEventData = {};

   await fetch(`https://theyyam.g.kuroco.app/rcms-api/1/latest-event?cnt=4`, {
      method: 'GET',
    }).then(response => response.json())
      .then(response => {
        upcomingEventData = response.list;

        upcomingEventData.forEach(event => {
        const fromDate = event.ext_4;
        const toDate = event.ext_5;
        const formattedDate = formatDate(fromDate, toDate);
        event.formattedDate =formattedDate;
      });
    });

    return { upcomingEventData };
  }
}

// Helper function to format day
function formatDay(day) {
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


function formatDate(fromDateStr, toDateStr) {
    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);

    // If event is already over
    if (currentDate > toDate) {
        return "The event is over.";
    }

    // Get day, month, and year values for "from" date
    const fromDay = formatDay(fromDate.getDate());
    const fromMonth = fromDate.toLocaleString('en-us', { month: 'short' });
    const fromYear = fromDate.getFullYear();

    // Get day, month, and year values for "to" date
    const toDay = formatDay(toDate.getDate());
    const toMonth = toDate.toLocaleString('en-us', { month: 'short' });
    const toYear = toDate.getFullYear();
    
    const currentYear = new Date().getFullYear();

    // If same month and year, format as "fromDay - toDay Month Year"
    if (fromMonth === toMonth && fromYear === toYear && fromYear === currentYear && toYear === currentYear) {
        return `${fromDay} - ${toDay} ${fromMonth}`;
    }
    // If same month and year, format as "fromDay - toDay Month Year"
    if (fromMonth == toMonth && fromYear === toYear &&  fromYear > currentYear && toYear > currentYear ) {
        return `${fromDay} - ${toDay} ${toMonth} ${toYear}`;
    }
    if (fromMonth != toMonth && fromYear === toYear &&  fromYear > currentYear && toYear > currentYear ) {
        return `${fromDay} ${fromMonth} - ${toDay} ${toMonth} ${toYear}`;
    }
    
    // If different month but same year, format as "fromDay Month - toDay Month Year"
    if (fromYear === toYear) {
        return `${fromDay} ${fromMonth} - ${toDay} ${toMonth}`;
    }
    // If different year, format as "fromDay Month Year - toDay Month Year"
    return `${fromDay} ${fromMonth} ${fromYear} - ${toDay} ${toMonth} ${toYear}`;
}
</script>
