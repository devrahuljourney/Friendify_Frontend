import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '../../services/operations/authAPI';

export default function ConfirmationModal({ modalData }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-gray-900 bg-gray-500 p-6">
                <p className="text-2xl font-semibold text-richblack-5">{modalData?.text1}</p>
                <p className="mt-3 mb-5 leading-6 text-richblack-200">{modalData?.text2}</p>
                <div className="flex items-center gap-x-4">
                    <button onClick={handleLogout}>{modalData?.btn1Text}</button>
                    <button className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900" onClick={modalData?.btn2Handler}>{modalData?.btn2Text}</button>
                </div>
            </div>
        </div>
    );
}
