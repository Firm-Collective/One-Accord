'use client'
import './eventNotification'
import React, { useEffect, useCallback } from 'react';

export default function EventNotification() {
  const sendNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted'){
      new Notification('Event notification'), {
        body: 'This is notification for the following event: ',
        icon: '/public/logo.png',
      }
    }
  };

  const requestNotificationPermission = useCallback(() => {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted')
          sendNotification();
        }
      });
    }
  }, []);

  useEffect(() => {
    if ('Notification' in window) {
      requestNotificationPermission();
    }
  }, [requestNotificationPermission])

  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-center p-24'>
      <button onClick={sendNotification} className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-2'>
        Trigger Notification
      </button>
    </main>
  );
}
