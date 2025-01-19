import { useState, useRef, useEffect } from 'react'
import './App.css'
import $ from 'jquery'; 
import {motion} from 'framer-motion'; 
import axios from 'axios';
import * as cheerio from 'cheerio'; 
import * as THREE from 'three'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

function AddTHREE(){
  useEffect(() => {
    const scene = new THREE.Scene(); 
    scene.background = new THREE.Color(0x000421); 

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 30); 
    
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    }); 
    renderer.shadowMap.enabled = true; 
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setSize(window.innerWidth, window.innerHeight); 
    renderer.render(scene, camera); 

    const controls = new OrbitControls(camera, renderer.domElement); 
    controls.update()

    const spheregeometry = new THREE.TorusGeometry(2, 1); 
    const spherematerial = new THREE.PointsMaterial({
      color: 0xffffff, 
      size: 0.1, 
    })
    const spheres = new THREE.Points(spheregeometry, spherematerial)
    spheres.name = "0"
    spheres.position.set(0, 10, 0)
    scene.add(spheres)
    
    function resize(){
      camera.aspect = window.innerWidth / window.innerHeight; 
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight); 
      renderer.render(scene, camera)
    }
    let scaling = 0; 
    let posY = 10;
    function animate(){
      if(scaling >= 30){
        scaling = 0; 
      }
      if(posY <= 0){
        posY = 10; 
      }
      posY -= 0.02; 
      scaling += 0.03; 
      scene.getObjectByName("0").scale.set(scaling, scaling, scaling)
      scene.getObjectByName("0").position.set(0, posY, 0)
      
      controls.update()
      window.addEventListener("resize", resize); 
      renderer.render(scene, camera); 
    }
    renderer.setAnimationLoop(animate)
  })
  return(
    <canvas id="bg" className="fixed top-[0] left-[0] z-[98]"></canvas>
  )
}
function AddHeader(){
  const [active, setActive] = useState(false); 
  useEffect(() => {
    const form = document.getElementById("form"); 
    const input = document.getElementById("text"); 
    const review = document.getElementById("review"); 

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); 
      if(input.value){
        $("#review").empty(); 
        console.log(input.value)
        const link = "https://func1-oq2a74yizq-uc.a.run.app?about=" + input.value + ""
        const data = await axios.get(link)
        console.log(data)
        const body = cheerio.load(data["data"])
        let x = document.createElement("h1"); 
        x.classList.add("texting"); 
        x.innerText = body("body").text().toString(); 
        review.appendChild(x); 

        input.value = ""
      }
    })
  })
  return(
    <div className="relative w-[100%] h-[100vh] m-auto p-[0] bg-transparent z-[99] ">
      <section className="flex flex-col align-middle justify-center text-center min-h-[100%] min-w-[100%] ">
        <div className="flex flex-col align-middle text-center justify-center relative min-h-[100%] min-w-[100%] ">
          <div className="flex flex-col align-middle justify-center text-center min-w-[fit-content] min-h-[50%] ">
            <h1 className="text-6xl dark:text-gray-300 text-gray-900">Reviewo</h1>
            <h1 className="text-5xl dark:text-gray-500 text-gray-900">Generate fake reviews</h1>
          </div>
          <div className="flex flex-col bg-whitealign-middle justify-center text-center min-w-[fit-content] min-h-[50%]">
            <motion.button initial={{scale: 1}} whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} onClick={() => setActive(true)} className="w-[15em] h-[5em] m-auto p-[0] relative text-3xl text-violet-500 underline ">Get Started</motion.button>
          </div>
        </div>
      </section>
      <motion.div initial={{translateY: 0 + "%"}} animate={{translateY: active? -100 + "%" : 0 + "%"}} transition={{type: "keyframes", duration: 1}} className="fixed w-[100%] h-[100vh] m-auto p-[0] bg-primary z-[101] flex flex-col align-middle justify-center text-center ">
        <div className="relative w-[100%] h-[15%] m-auto p-[0] flex flex-col align-middle justify-center text-center ">
          <motion.button className="w-[15em] h-[5em] m-auto p-[0] relative text-3xl text-violet-500 underline" initial={{scale: 1}} whileTap={{scale: 0.9}} whileHover={{scale: 1.1}} onClick={() => setActive(false)}>Back to Homepage</motion.button>
        </div>
        <div className="relative w-[95%] h-[85%] m-auto p-[0] lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-[30px] flex flex-col align-middle justify-center text-center ">  
          <div className="relative w-[100%] h-[100%] bg-transparent m-auto p-[0] flex flex-col align-middle justify-center text-center ">
            <h1 className="text-white text-3xl">Generate a fake review</h1>
            <form action="" className="w-[100%] h-[90%] m-auto p-[0] relative flex flex-col align-middle justify-center text-center bg-transparent " method="get" id="form">
              <input type="text" id="text" placeholder="enter a review idea" className="w-[100%] h-[2em] m-auto p-[0] relative text-center border-[0px] bg-gray-700 text-white text-3xl " />
              <input type="submit" value="Generate a fake review" id="submit" className="w-[100%] cursor-pointer h-[2em] m-auto p-[0] relative text-center border-[0px] bg-gray-700 text-white text-3xl" />
            </form>
          </div>
          <div id="review" className="relative w-[100%] h-[100%] bg-transparent m-auto p-[0] flex flex-col align-middle justify-center text-center overflow-y-scroll ">
          </div>
          <div className="relative w-[100%] h-[100%] bg-transparent m-auto p-[0] flex flex-col align-middle justify-center text-center ">

          </div>
          <div className="relative w-[100%] h-[100%] bg-transparent m-auto p-[0] flex flex-col align-middle justify-center text-center ">

          </div>
        </div>
      </motion.div>
    </div>
  )
}
export default function App(){
  const ref = useRef(); 
  return(
    <div className="relative w-[100%] h-[100%] m-auto p-[0] bg-transparent flex flex-col align-middle justify-center text-center  " ref={ref}>
      <AddTHREE></AddTHREE>
      <AddHeader></AddHeader>
    </div>
  )
}