**Auth:**
- The user sends a `join` message to perform the login action.
- The user's token is used to verify the user and if successful and active, the user is added
to a `${user.id}-notifications` room. This allows the user to receive notifications to all devices he
is logged in with. 
- If any of the actions involved in logging a user in fails, a `connectionError` message is emitted
along with a payload to indicate this state.

**Notifications:**
- If a new notification is created for the user e.g when the user receives a friend request, a 
`newNotification` message is emitted to the user along with the notification type. Once the user 
receives this message, the user's notification count should then be increased, on the frontend,
for the appropriate notification type.
- Once the user gets reconnected to an internet service, the user is expected to make an 
https call to the `/me/notifications` route. This will ensure that all notifications that 
have been left unread (due to the socket connection not being able to connect with the user)
is relayed to the user. 
- After the action of reading a notification e.g After the user has just reconnected (the case
described above), or after the user has been adjudged, on the frontend, to have read the notification.
(For this the frontend must determine what it means to have read a notification), the user
is expected to emit a `markNotificationAsRead` message. This ensures that the database row containing
the unread notification is updated to read. Note that only one notificationId should be sent at a time.
- If the action of updating the database row is successful, the server emits a `readNotification`
message to the user along with the notificationId of the notification that was read. Using the two
approaches described above, a typical sequence would be, user clicks on the notification tab,
the notification tab opens to reveal the unread notifications. The frontend emits a `markNotificationAsRead`
message with the notificationId for each notification. The server then responds with a `readNotification`
message with the notificationId of the notification that was read. The notification count is then 
reduced on the frontend as each `markNotificationAsRead` -> `readNotification` sequence is completed.
