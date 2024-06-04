import { useQuery } from 'react-query';
import { CretePostSchemaType } from '../schemas';
import { userAPI } from '@/components/authentication/queries';
import { createClient } from '@/utils/supabase/client';

type Props = {
  pinnedPosts: CretePostSchemaType[] | [];
  registeredPosts: CretePostSchemaType[] | [];
  userId: string;
};

const useMessageSection = ({ pinnedPosts, registeredPosts, userId }: Props) => {
  const supaClient = createClient();

  const moderatorOrInfluencerPosts = pinnedPosts
    ?.filter(
      (post) =>
        post.User.UserType.name === 'Moderator' ||
        (post.User.UserType.name === 'Influencer' && post.is_visible === true),
    )
    .reverse();

  const otherPosts = registeredPosts
    ?.filter(
      (post) =>
        post.User.UserType.name !== 'Moderator' && post.User.UserType.name !== 'Influencer' && post.is_visible === true,
    )
    .reverse();

  const formatDate = (created_at: any) => {
    const date = new Date(created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    if (isToday) {
      return `Today at ${date.toLocaleTimeString(undefined, options)}`;
    } else if (isYesterday) {
      return `Yesterday at ${date.toLocaleTimeString(undefined, options)}`;
    } else {
      return `${date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      })} at ${date.toLocaleTimeString(undefined, options)}`;
    }
  };

  const queryUserTypeInfo = useQuery(
    'userTypeData',
    async () => {
      try {
        const userTypeData = await userAPI.getUserTypeByIdData({ supaClient, userId });
        return userTypeData?.data;
      } catch (error) {
        console.error('Error fetching userType data:', error);
        throw error;
      }
    },
    {
      onSuccess: (postData) => {
        if (!postData) {
          console.error('No userType was found.');
          return [];
        }
      },
      onError: (error) => {
        console.error('Error:', error);
      },
      enabled: !!userId,
    },
  );

  return {
    moderatorOrInfluencerPosts,
    otherPosts,
    formatDate,
    queryUserTypeInfo,
  };
};

export default useMessageSection;
