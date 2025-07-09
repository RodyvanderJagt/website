import classNames from "classnames";
import { ArrowBigLeftDash, ArrowBigRightDash, ArrowRightCircleIcon } from "lucide-react";

export default function CollapseButton({isCollapsed, toggleIsCollapsed} : {isCollapsed: boolean, toggleIsCollapsed: () => void})
{
    return (
        <div className={classNames("w-full h-10 flex",
            isCollapsed ? "justify-center" : "justify-end"
        )}>
            <button className={classNames("size-10 bg-primary rounded-full text-white flex")}
                    onClick={toggleIsCollapsed}>
                {isCollapsed ? 
                <ArrowBigRightDash className="m-auto"/> :
                <ArrowBigLeftDash className="m-auto"/>}
                
            </button>
        </div>
    )
}
