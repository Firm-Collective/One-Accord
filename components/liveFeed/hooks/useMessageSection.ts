import { CretePostSchemaType } from '../schemas';

type Props = {
  posts: CretePostSchemaType[] | [];
};

const useMessageSection = ({ posts } : Props) => {

  const moderatorOrInfluencerPosts = posts?.filter(
    (post) =>
      post.User.UserType.name === 'Moderator' || (post.User.UserType.name === 'Influencer' && post.is_visible === true),
  ).reverse();

  const otherPosts = posts?.filter(
    (post) =>
      post.User.UserType.name !== 'Moderator' && post.User.UserType.name !== 'Influencer' && post.is_visible === true,
  ).reverse();

  const formatDate = (created_at: any) => {
    const date = new Date(created_at);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();

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


    return {
      moderatorOrInfluencerPosts,
      otherPosts,
      formatDate

    }
}

export default useMessageSection;