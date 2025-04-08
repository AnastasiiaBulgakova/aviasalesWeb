import React from "react";

const Wrapper = (Component: React.FC, className: string) => {
    return(props: any) =>{
        return(
            <div className={className}>
                <Component {...props} />
            </div>
        );
    };
};
export default Wrapper;