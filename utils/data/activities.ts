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
      icon: '/worship-icon.png',
      timeLeft: 0,
      videoUrl: 'https://www.youtube.com/embed/vA83MufOCoA?si=b_MxuIghE482HKEK',
    },
    {
      id: 2,
      name: 'Prayer',
      icon: '/praying-icon.png',
      timeLeft: 0,
      text: `Heavenly Father, <br> 
    We come before You today, seeking unity among us as Your children. As Psalm 133:1 declares, "How good and pleasant it is when God’s people live together in unity!" <br> 
    Lord, help us to embody this truth, living in harmony and love. Guide us to follow the words of Ephesians 4:3, making every effort to keep the unity of the Spirit through the bond of peace. <br> 
    May we be of one mind, as Christ prayed in John 17:21, that all of us may be one, just as You are in Him and He is in You. Bind us together with cords of love that cannot be broken, and may Your peace rule in our hearts, as members of one body, we were called to peace. In Jesus’ precious name, we pray. <br> 
    Amen.`    },
    {
      id: 3,
      name: 'Communion',
      icon: '/Communion-icon.png',
      timeLeft: 0,
    },
    {
        id: 4,
        name: 'Reflection',
        icon: '/shofar-icon.png',
        timeLeft: 0,
        questions: [
          'What message do you believe God is conveying about the current state of your country?',
          'How do you feel God is guiding the global church in this season?',
          'What specific word or phrase has God impressed upon your heart regarding unity among believers?',
          'What prophetic insight has God given you about the future of the church worldwide?',
          'How is God calling you to pray for your nation\'s leaders?',
          'What do you sense God is saying about the relationship between different denominations?',
          'What vision has God given you for the church\'s role in addressing social issues?',
          'How is God speaking to you about the spiritual health of your community?',
          'What do you feel God is saying about the importance of global missions?',
          'How has God spoken to you about fostering unity within your local church?',
          'What direction do you sense God is giving about the church\'s involvement in politics?',
          'What word has God given you about peace and reconciliation in your country?',
          'How is God guiding you to support unity among Christians globally?',
          'What prophetic word has God given you about the church\'s response to crises (e.g., pandemics, natural disasters)?',
          'What do you believe God is saying about the role of prayer in uniting believers worldwide?'
        ],
      }
      
  ];
  