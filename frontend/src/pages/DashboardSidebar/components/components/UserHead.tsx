import { Card } from '@/components/ui/card';
import Picture from '../../../../components/Picture';
import { FiMessageSquare } from 'react-icons/fi';

const UserHead = ({ user, handleUserClick }) => {
    return (
        <Card
            onClick={() => handleUserClick(user)}
            className="rounded-none shadow-none flex text-gray-500 text-xs items-center py-2 px-3 w-full justify-between hover:bg-gray-200/70 cursor-pointer group"
        >
            <div className="flex items-center gap-2">
                <Picture size={38} user={user} />
                <span className="font-bold text-xs ">
                    {user.firstName} {user.lastName}
                </span>
            </div>
            <span className="text-end group-hover:hidden">
                @{user.username}
            </span>
            <span className="text-sm text-end group-hover:flex hidden">
                <FiMessageSquare />
            </span>
        </Card>
    );
};

export default UserHead;