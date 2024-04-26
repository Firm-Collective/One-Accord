require('dotenv').config();

import React, { Suspense } from 'react';
import { supabaseServer } from '@/utils/supabase/server';

const twilio = require("twilio");
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const supabase = supabaseServer();

const { data } = await (await supabase).from('User').select('*,users(*)');

function sendSMS(from, to, body) {
    client.messages
      .create({ from, to, body })
      .then((message) => {
        console.log(
          'SMS message sent from' + {data} + 'to' + {to} + 'Message SID: ' + {message}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

sendSMS(
    process.env.TWILIO_PHONE_NUMBER,
    process.env.TO_PHONE_NUMBER,
    "This is an SMS from One Accord"
  );