import * as Notifications from "expo-notifications";

export async function scheduleDailyCheckIn(hour: number, minute: number) {
  // Clear old notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Daily Check-In",
      body: "How are you feeling today?",
      data: { screen: "CheckIn" },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour,
      minute,
      repeats: true,
    },
  });
}
