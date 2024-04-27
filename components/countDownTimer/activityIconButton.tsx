import { useState } from 'react';
import axios from 'axios';

type ActivityJoinButtonProps = {
  activityId: number;
  activityIcon: string;
  // onClick: () => void;
  isActive: boolean;
  timeLeft: number;
  activityName: string;
};

type Participant = {
  userId: string;
};

const ActivityJoinButton: React.FC<ActivityJoinButtonProps> = ({ activityId, activityIcon, isActive, timeLeft, activityName, }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  const handleJoinClick = async (userId: string) => {
    try {
      const response = await axios.post('/api/join', { activityId, userId });
      if (response.status === 200) {
        setParticipants(response.data.newParticipantsList);
        console.log("added")
      }
    } catch (error) {
      console.error('Error joining the activity:', error);
    }
  };

  const buttonClasses = `w-12 h-12 rounded-full flex items-end justify-center overflow-hidden border-transparent  ${
    isActive
      ? 'bg-rose-400'
      : 'bg-white'
  }`;

  const activityNameClasses = `${ isActive ? "text-left text-red-400 text-[15px] font-semibold font-['Poppins']" : "text-left text-red-300 text-[15px] font-medium font-['Poppins']"}`

  const circumference = 2 * Math.PI * 23;
  const offset = ((timeLeft - 10) / 10) * circumference;

  return (
    <div className='relative flex flex-col'>
      {isActive && (
        <svg width='48' height='48' className='absolute top-0 right-0 transparent'>
          <circle
            cx='24'
            cy='24'
            r='23'
            fill='none'
            stroke='#A9A9A9'
            strokeWidth='3'
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform='rotate(-90 24 24)'
          />
        </svg>
      )}
      <button
        className={buttonClasses}
        onClick={() => handleJoinClick('USER_ID')}
        style={{
          backgroundImage: `url(${activityIcon})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          // backgroundSize: 'contain',
          alignSelf: 'flex-end'
        }}
        
      ></button>
      <div className={activityNameClasses}>
        {activityName}
      </div>
      
    </div>
    
  );
};

export default ActivityJoinButton;
