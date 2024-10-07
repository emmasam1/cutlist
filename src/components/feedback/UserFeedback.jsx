import { Link, useLocation } from "react-router-dom";
import close from '../../assets/images/icons/close.png'
import { Button } from "antd";

const UserFeedback = () => {
  const location = useLocation();
  const record = location.state ? location.state.record : null;
  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4">
        <div className="flex justify-between items-center">
          <img src={record.avatar} alt={record.fullName} className="w-16" />
            <Link to="">
                <Button>
                    <img src={close} alt="" className="w-3"/>
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
