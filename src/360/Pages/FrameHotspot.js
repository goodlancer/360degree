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
aframe.registerComponent('drag_mouse', {
  schama: {speed: {default:1}},
  init: function(){
    this.ifMouseDown = false;
    this.addEventListener('mousedown', this.OnMouseDown.bind(this));
    this.addEventListener('mouseup', this.OnMouseUp.bind(this));
    this.addEventListener('mousemove', this.OnMouseMove.bind(this));
  },
  OnMouseDown: function(event){
    this.ifMouseDown = true;
  },
  OnMouseUp: function(event){
    this.ifMouseDown = false;
  },
  OnMouseMove: function(event){
    if(this.ifMouseDown){
      console.log("cehck ok");
    }
  }
});
aframe.registerComponent('drag-rotate-component',{
      schema : { speed : {default:1}},
      init : function(){
        this.ifMouseDown = false;
        this.x_cord = 0;
        this.y_cord = 0;
        this.addEventListener('mousedown',this.OnDocumentMouseDown.bind(this));
        this.addEventListener('mouseup',this.OnDocumentMouseUp.bind(this));
        this.addEventListener('mousemove',this.OnDocumentMouseMove.bind(this));
      },
      OnDocumentMouseDown : function(event){
        this.ifMouseDown = true;
        this.x_cord = event.clientX;
        this.y_cord = event.clientY;
      },
      OnDocumentMouseUp : function(){
        this.ifMouseDown = false;
      },
      OnDocumentMouseMove : function(event)
      {
        if(this.ifMouseDown)
        {
          var temp_x = event.clientX-this.x_cord;
          var temp_y = event.clientY-this.y_cord;
          if(Math.abs(temp_y)<Math.abs(temp_x))
          {
            this.el.object3D.rotateY(temp_x*this.data.speed/1000);
          }
          else
          {
            this.el.object3D.rotateX(temp_y*this.data.speed/1000);
          }
          this.x_cord = event.clientX;
          this.y_cord = event.clientY;
        }
      }
    });
let markers =[
  {
    name: 'image',
    position: '0 1.25 -1'
  },
  {
    name: 'image',
    position: '0 1.2 -1'
  },
];

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

const initialValue = [
  {id: 0, name: 'select value', position: "0 0 0"}
];


const [addNew, setAddNew] = useState(false);
const [showable, setShowable] = useState(true);

const [hotspotItems, SetHotspotItems] = useState(initialValue);

  
  const contextClick=(e)=>{
    console.log(e);
  }
  const toggle_view = (e)=>{
    setShowable(!showable);
    console.log(showable);
  }
  const handleClick=(e)=>{
    alert("this right click");
    console.log(e);
    var rnd_pos = 1+ Math.random() * (2);

    var addItem = {
      name: "image",
      position: "0 "+rnd_pos+" -1"

    }
    markers.push(addItem);
    setAddNew(!addNew)
    SetHotspotItems(markers);
    // hotspotItems.push(addItem);
    console.log("event markers", markers);
    console.log(hotspotItems);
    // setAddNew(false);
  }
  useEffect(()=>{

    SetHotspotItems(markers);
    console.log('markers', markers);
    console.log("use",hotspotItems);

})
  useEffect(()=>{

    // SetHotspotItems(markers);
    console.log('markers', markers);
    console.log("use",hotspotItems);

}, [addNew, hotspotItems ,showable]);

  // alert_click(){
  //   alert('this is my vefnt');
  // }
  // const listmarkers = markers.map(item => {
  //       <a-image src={image} click-drag position={item.position}  rotation="0 0 360" scale="0.1 0.1 0.1" opacity="0.7"
  //     cursor="rayOrigin: mouse"></a-image>
  //     });


  return (

    <div>
      {/* <ContextMenu style={{top: xPos, left: yPos}} /> */}

      <ContextMenuTrigger id="myContext">
      <a-scene>
      
    
      {showable? hotspotItems.map((item, index) => (
        
        <a-image src={imga} click-drag="false" drag-rotate-component position={item.position}  rotation="0 0 0" scale="0.1 0.1 0.1" opacity="0.7"
      cursor="rayOrigin: mouse" visible={showable? "true":"false"} ></a-image>
      )): ""}



     



      <a-sky   look-controls-enabled="false" src={image}></a-sky>
      {/* <a-camera><a-cursor></a-cursor></a-camera> */}

    </a-scene>
    </ContextMenuTrigger>
    
      <ContextMenu id="myContext" className="myContext">
        <MenuItem data={{foo: 'bar'}} className="my_menuItem" onClick={handleClick}>
          Add new Hotspot
        </MenuItem>

        <MenuItem data={{foo: 'bar'}} className="my_menuItem" onClick={toggle_view}>
          hide/show Hotspot
        </MenuItem>
        <MenuItem divider className="myMenudivider"/>
        <MenuItem data={{foo: 'bar'}} className="my_menuItem" onClick={handleClick}>
          delet Hotspot
        </MenuItem>
      </ContextMenu>
    </div>
  )
}




