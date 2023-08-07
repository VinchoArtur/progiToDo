import { PERMISSIONS, request, RESULTS } from "react-native-permissions";
import RNCalendarEvents from 'react-native-calendar-events';
import { Task } from "react-native";

export const createCalendarEvent = async (
  title: string,
  startDate: Date,
  dueDate: Date | undefined,
  notificationTime: number,
  description: string,
  taskDuration: 'day' | 'week' | 'month',
): Promise<string | null> => {
  const permissions = RESULTS.GRANTED; // Change this to your actual permission check

  if (permissions === RESULTS.GRANTED) {
    try {
      const alarmDate = new Date(
        (dueDate?.getTime() || 0) - notificationTime * 60 * 1000,
      );

      let recurrence = null;

      if (taskDuration === 'week') {
        recurrence = 'weekly'; // Еженедельное повторение
      } else if (taskDuration === 'month') {
        recurrence = 'monthly'; // Ежемесячное повторение
      }
      const eventOptions = {
        startDate: startDate?.toISOString() || '',
        endDate: dueDate?.toISOString() || '',
        allDay: false,
        notes: description,
        alarms: [{date: notificationTime}],
        // recurrence, // Устанавливаем правильное повторение в зависимости от продолжительности
      };

      // @ts-ignore
      await RNCalendarEvents.saveEvent(title, eventOptions);

      // Get the created event's ID
      const events = await RNCalendarEvents.fetchAllEvents(
        // @ts-ignore
        new Date('2000-01-01T00:00:00Z'),
        new Date('2100-01-01T00:00:00Z'),
      );

      const createdEvent = events.find(event => event.title === title);

      if (createdEvent) {
        return createdEvent.id;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error saving calendar event:', error);
      return null;
    }
  } else {
    console.log('Calendar permissions not granted');
    return null;
  }
};

export const saveOrUpdateEventToCalendar = async (
  eventId: string,
  task: Task,
  notificationTime: number,
  taskDuration: string,
  description: string) => {
  try {
    const alarmDate = new Date(
      // @ts-ignore
    task.dueDate?.getTime() - notificationTime * 60 * 1000,
    );

    let recurrence = null;

    if (taskDuration === 'week') {
      recurrence = 'weekly'; // Еженедельное повторение
    } else if (taskDuration === 'month') {
      recurrence = 'monthly'; // Ежемесячное повторение
    }
    const eventOptions = {
      // @ts-ignore
      startDate: task.startDate?.toISOString() || '',
      // @ts-ignore
      endDate: task.dueDate?.toISOString() || '',
      allDay: false,
      notes: description,
      alarms: [{date: notificationTime}],
      // recurrence, // Устанавливаем правильное повторение в зависимости от продолжительности
    };

    // @ts-ignore
    return await RNCalendarEvents.saveEvent(eventId, eventOptions);
  } catch (error) {
    console.error('Error saving calendar event:', error);
    return null;
  }
}

export const getEventById = async (eventId: string) => {
  return await RNCalendarEvents.findEventById(eventId)
}

export const removeEventById = async (eventId: string) => {
  return await RNCalendarEvents.removeEvent(eventId);
}

export const requestCalendarPermissions = async () => {
  try {
    return await request(PERMISSIONS.ANDROID.WRITE_CALENDAR);
  } catch (error) {
    console.error("Error requesting calendar permissions:", error);
    return RESULTS.DENIED;
  }
};

export const deleteCalendarEvent = async (title: string, dueDate: Date) => {
  const permissions = await requestCalendarPermissions();

  if (permissions === RESULTS.GRANTED) {
    try {
      const events = await RNCalendarEvents.fetchAllEvents(
        // @ts-ignore
        dueDate.getTime() - 3600000, // Задаем интервал в один час для поиска события
        dueDate.getTime() + 3600000
      );

      const eventToDelete =
        events.find(event => event.title === title);

      if (eventToDelete) {
        await RNCalendarEvents.removeEvent(eventToDelete.id);
      }
    } catch (error) {
      console.error("Error deleting calendar event:", error);
    }
  } else {
    console.log("Calendar permissions not granted");
  }
};
