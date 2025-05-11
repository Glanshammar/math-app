'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry.js';

interface ParametricSurfaceProps {
  width?: number;
  height?: number;
  func?: (u: number, v: number, target: THREE.Vector3) => void;
}

const defaultParametricFunction = (u: number, v: number, target: THREE.Vector3) => {
  // Default function: f(u,v) = (sin(2πu)cos(2πv), sin(2πu)sin(2πv), cos(2πu))
  // This creates a sphere
  u = u * Math.PI * 2;
  v = v * Math.PI * 2;
  
  target.x = Math.sin(u) * Math.cos(v);
  target.y = Math.sin(u) * Math.sin(v);
  target.z = Math.cos(u);
};

export const ParametricSurface: React.FC<ParametricSurfaceProps> = ({ 
  width = 500, 
  height = 500,
  func = defaultParametricFunction
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Create parametric geometry
    const geometry = new ParametricGeometry(func, 50, 50);
    
    // Create material
    const material = new THREE.MeshPhongMaterial({
      color: 0x0088ff,
      side: THREE.DoubleSide,
      flatShading: false,
      wireframe: false,
    });
    
    // Create mesh
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(1, 1, 1);
    scene.add(light1);
    
    const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
    light2.position.set(-1, -1, -1);
    scene.add(light2);
    
    // Add coordinate axes for reference
    const axesHelper = new THREE.AxesHelper(1);
    scene.add(axesHelper);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [width, height, func]);
  
  return <div ref={containerRef} style={{ width, height }} />;
};

export default ParametricSurface; 