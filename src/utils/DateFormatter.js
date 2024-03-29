import { formatDistanceToNow } from 'date-fns';

const formatDate = (date) => {
    const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true });
    console.log("Formatted Date: ", formattedDate);
    return formattedDate;
};

export default formatDate;
