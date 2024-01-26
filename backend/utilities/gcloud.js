const calendar = require("@googleapis/calendar");

const gauth = new calendar.auth.GoogleAuth({
  scopes: ["https://www.googleapis.com/auth/calendar"],
});
const authClient = await gauth.getClient();

const client = await calendar.calendar({
  version: "v3",
  auth: authClient,
});

const events = await client.events
  .list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  })
  .then((res) => res.data.items);

events.map((event, i) => {
  const start = event.start.dateTime || event.start.date;
  console.log(`${start} - ${event.summary}`);
});

ref = db.collection("events");

ref.add({
  start: event.start,
  summary: event.summary,
});

function createEvent(
  summary,
  location,
  description,
  startDateTime,
  startTimeZone,
  endDateTime,
  endTimeZone,
  recurrence = [],
  attendees = [],
  reminders = { useDefault: false, overrides: [] }
) {
  return {
    summary: summary || "",
    location: location || "",
    description: description || "",
    start: {
      dateTime: startDateTime || "",
      timeZone: startTimeZone || "",
    },
    end: {
      dateTime: endDateTime || "",
      timeZone: endTimeZone || "",
    },
    recurrence: recurrence,
    attendees: attendees,
    reminders: reminders,
  };
}

const event = createEvent(
  "Test Event",
  "Test Location",
  "Test Description",
  "2021-08-10T09:00:00-07:00",
  "America/Los_Angeles",
  "2021-08-10T17:00:00-07:00",
  "America/Los_Angeles"
);

const response = await client.events.insert({
  calendarId: "primary",
  resource: event,
});

console.log(response.data);
