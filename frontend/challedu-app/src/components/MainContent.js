import React from "react"

const iframeStyle = {width: '100vw', height:"100vh"};

const MainContent = ()=>{
    return(
        <div>
        <iframe style={iframeStyle} src="http://challedu.com" title="Challedu"></iframe>
        </div>
    )
    
}
export default MainContent;