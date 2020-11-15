// import React, { useState, useEffect } from "react";
// import aframe from 'aframe';
// import registerClickDrag from 'aframe-click-drag-component';
// import Spinner from "../../components/@vuexy/spinner/Fallback-spinner";
// registerClickDrag(aframe);
// export default function Frame(props) {
//   const {
//     image,
//     animation,
//     fov,
//     nadir,
//     nadirScale,
//     nadirOpacity,
//     isMobile,
//     loading,
//     style,
//     rotato
//   } = props;

//   const initialState = {
//     zoom: parseFloat(props.zoom),
//   };

//   const [state, setState] = useState(initialState);
//   const [imageLoading, setImageLoading] = useState(loading);
//   const [show, setShow] = useState(false);
//   let forceLoading = props.loading;

//   useEffect(() => {
//     console.log("count changed", props.image);
//   }, [props.image]);

//   //Skipping first iteration (exactly like componentWillReceiveProps):
//   const isFirstRun = React.useRef(true);
//   useEffect(() => {
//     if (isFirstRun.current) {
//       isFirstRun.current = false;
//       return;
//     }
//     console.log("count changed", props.image);
//     setImageLoading(true);
//   }, [props.image]);



//   return (
//     <>

//       <a-scene
//         loading-screen="enabled:false"
//         embedded
//         style={{
//           zIndex: "1",
//           // width: props.width,
//           // height: props.height,
//           width: "72%",
//           height: "80%",
//           position: "absolute",
//           top: "0",
//         }}
//         vr-mode-ui="enabled: false "
//         // isMobile={isMobile}
//       >
//     <a-sphere click-drag position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
//     <a-camera look-controls-enabled="false"></a-camera>

//         {/*  */}
//         <a-assets>
//           <img
//             id="my-asset"
//             src={image}
//             onLoad={() => setImageLoading(false)}
//             crossorigin="anonymous"
//           />
//         </a-assets>
//         {imageLoading ? (
//           <Spinner />
//         ) : (
//           <a-sky
//             shader="flat"
//             rotation={rotato}
//             src={image}
//             animation={animation}
//             animation__mouseenter="property: components.material.material.color; type: color; to: blue; startEvents: mouseenter; dur: 500"
//           >  </a-sky>
//         )}



//       </a-scene>

//     </>
//   );
// }










// import React from "react";
// import { Pannellum, PannellumVideo } from "pannellum-react";
// export default function Frame(props) {
//   const { image, rotation } = props;

//   return (
//     <div>
//       <Pannellum
 
//         width="73vw"
//         height="80vh"
//         image={image}
//         pitch={10}
//         yaw={0}
//         hfov={320}
//         showFullscreenCtrl={true}
//         autoLoad={true}
//         autoRotate={rotation}
//         // autoRotateInactivityDelay={0}
//         // autoRotateStopDelay={1000}
//         showZoomCtrl={false}
//         draggable={true}
//         friction={(0.0, 1.0)}
//         onLoad={() => {
//           console.log("panorama loaded");
//         }}
//       ></Pannellum>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';
import imga from '../Assets/point.png';
import Modal from "react-modal";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

require('aframe-event-set-component');registerClickDrag(aframe);

export default function Frame(props) {
  const {
    image,
    animation,
    fov,
    nadir,
    nadirScale,
    nadirOpacity,
    isMobile,
    loading,
    style,
    rotato,
    parentMethod
  } = props;

const [addNew, setAddNew] = useState(false);


  
  const click_eventHandle = ()=>{
    alert("this is my checking");
  }

  const toggleModal=()=>{
    // setIsOpen(!isOpen);
    props.parentMethod();
  }
  const contextClick=(e)=>{
    console.log(e);
  }
  const handleClick=(e)=>{
    alert("this right click");
    console.log(e);
    setAddNew(true);
  }
  // alert_click(){
  //   alert('this is my vefnt');
  // }


  return (
    
    <div>
      {/* <ContextMenu style={{top: xPos, left: yPos}} /> */}
      
      <ContextMenuTrigger id="myContext">
      <a-scene>
      
      <a-image src={imga} click-drag="false" position="0 1.25 -1"  rotation="0 0 360" scale="0.1 0.1 0.1" opacity="0.7" 
      cursor="rayOrigin: mouse"  ></a-image>
      <a-image src={imga} click-drag="false" position="0 1.35 -1"  rotation="0 0 360" scale="0.1 0.1 0.1" opacity="0.7" 
      cursor="rayOrigin: mouse" ></a-image>
      {
        addNew? 
        <a-image src={imga} click-drag="false" position="0 2 -1"  rotation="0 0 360" scale="0.1 0.1 0.1" opacity="0.7" 
      cursor="rayOrigin: mouse" ></a-image>:""
      }
      
  

      <a-sky   look-controls-enabled="false" src={image}></a-sky>
      {/* <a-camera><a-cursor></a-cursor></a-camera> */}
 
    </a-scene>
    </ContextMenuTrigger>
     <ContextMenu id="myContext" className="myContext">
        <MenuItem data={{foo: 'bar'}} className="my_menuItem" onClick={handleClick}>
          Add new Hotspot
        </MenuItem>
        
        <MenuItem data={{foo: 'bar'}} className="my_menuItem" onClick={handleClick}>
          ContextMenu Item 2
        </MenuItem>
        <MenuItem divider className="myMenudivider"/>
        <MenuItem data={{foo: 'bar'}} className="my_menuItem" onClick={handleClick}>
          ContextMenu Item 3
        </MenuItem>
      </ContextMenu>
    </div>
  )
}




