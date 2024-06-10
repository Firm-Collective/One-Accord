type Activity = {
  id: number;
  name: string;
  icon: string;
  timeLeft: number;
  text?: string;
  videoUrl?: string;
  questions?: string[];
};

export const activities: Activity[] = [
  {
    id: 1,
    name: 'Worship',
    icon: '/worship-activity.svg',
    timeLeft: 0,
    videoUrl: 'https://www.youtube.com/embed/CMVZ9Vat_w8?si=ncY_sIswjabMm9rb&autoplay=1'
  },
  {
    id: 2,
    name: 'Prayer',
    icon: '/prayer-activity.svg',
    timeLeft: 0,
    videoUrl: 'https://www.youtube.com/embed/N6RkBTJXGE4?si=k98yMFWCH9tPMGCT&autoplay=1'
  },
  {
    id: 3,
    name: 'Communion',
    icon: '/communion-activity.svg',
    timeLeft: 0,
     videoUrl: 'https://www.youtube.com/embed/ifXtTSdVxrU?si=P0uwEfxmbcffVc9X&autoplay=1'
  },
  {
      id: 4,
      name: 'Reflection',
      icon: '/god-voice-activity.svg',
      timeLeft: 0,
      questions: [
        'What is the Lord saying to you about the future of your country?',
         'What is Yeshua saying regarding the future of your city?',
         'What do you sense Jesus is saying about denominations in this season?',
         'What do you believe Yeshua is saying about Israel?',
         'What is a single word that Jesus is impressing on your heart?',
         'What image comes to mind when you think about global politics?',
         'What image does the Lord show you regarding the word Unity?',
         'What is Jesus saying about the United States?',
         'What Nation is Yeshua highlighting to you and why?',
         'After spending time in worship, prayer, and communion, what scripture has The Lord put on your heart?',
         'What vision has Jesus given you for the church\'s role in addressing social issues?',
         'What do you feel Yeshua is saying about the importance of global missions?'
       ],
    }
    
];
