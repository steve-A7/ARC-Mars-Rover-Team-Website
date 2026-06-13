import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Mars3DProps {
  className?: string;
}

export const Mars3D: React.FC<Mars3DProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    // Dynamically adjust camera distance to fit globe inside screen boundary
    const updateCameraDistance = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const aspect = width / height;
      
      if (aspect < 1) {
        // Portrait/Mobile view (aspect is narrow)
        // Adjust the z-position based on aspect ratio to guarantee Globe fits nicely
        const targetWidth = 2.45; // slightly wider than diameter to leave visual padding
        const requiredZ = targetWidth / (aspect * 0.828427); // 0.828427 = 2 * Math.tan(45/2 * Math.PI/180)
        camera.position.z = Math.min(Math.max(requiredZ, 3), 7.5);
      } else {
        // Landscape/Desktop view
        camera.position.z = 3;
      }
    };

    updateCameraDistance();

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.enableZoom = false; // Keep it focused

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    
    // Load textures
    const colorMap = textureLoader.load('/MarsTexture/2k_mars.jpg');
    const normalMap = textureLoader.load('/MarsTexture/mars_1k_normal.jpg');
    const bumpMap = textureLoader.load('/MarsTexture/marsbump1k.jpg');
    const topoMap = textureLoader.load('/MarsTexture/mars_1k_topo.jpg');

    // Mars Geometry & Material
    const geometry = new THREE.SphereGeometry(1, 256, 256); // Even higher detail for displacement
    const material = new THREE.MeshStandardMaterial({
      map: colorMap,
      normalMap: normalMap,
      bumpMap: bumpMap,
      bumpScale: 0.015,
      displacementMap: topoMap,
      displacementScale: 0.025,
      roughnessMap: topoMap,
      roughness: 0.85,
      metalnessMap: topoMap,
      metalness: 0.15,
    });

    const mars = new THREE.Mesh(geometry, material);
    scene.add(mars);

    // Atmosphere/Glow effect (simple outer sphere)
    const atmosphereGeometry = new THREE.SphereGeometry(1.02, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xff4d29,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Inner glow for a more high-tech feel
    const innerGlowGeometry = new THREE.SphereGeometry(1.01, 64, 64);
    const innerGlowMaterial = new THREE.MeshPhongMaterial({
      color: 0xff7d4d,
      transparent: true,
      opacity: 0.1,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
    });
    const innerGlow = new THREE.Mesh(innerGlowGeometry, innerGlowMaterial);
    scene.add(innerGlow);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05); // Dimmer ambient for more drama
    scene.add(ambientLight);

    // Main Sun Light (Rim light effect)
    const sunLight = new THREE.DirectionalLight(0xff7d4d, 2.5); // Warmer, stronger light
    sunLight.position.set(-5, 2, -5); // Positioned for rim lighting
    scene.add(sunLight);

    // Subtle fill light
    const fillLight = new THREE.PointLight(0x921d1a, 1, 10);
    fillLight.position.set(5, -2, 5);
    scene.add(fillLight);

    // Reflected light from the Martian surface (simulated bounce)
    const reflectedLight = new THREE.DirectionalLight(0xff4d29, 0.4); 
    reflectedLight.position.set(5, -5, 5); // Positioned to fill in shadows from below
    scene.add(reflectedLight);

    // Dust Particles
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Random position in a sphere around Mars
      const r = 1.2 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Varied random drift speeds
      const speedScale = 0.0005 + Math.random() * 0.003;
      velocities[i * 3] = (Math.random() - 0.5) * speedScale;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * speedScale;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speedScale;

      // Varied sizes
      sizes[i] = 0.002 + Math.random() * 0.012;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffb4ab) },
        opacity: { value: 0.6 }
      },
      vertexShader: `
        attribute float size;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = size * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.5 ) discard;
          gl_FragColor = vec4( color, opacity );
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate Mars - slow, cinematic rotation
      mars.rotation.y += 0.0008;
      mars.rotation.x += 0.0001; // Slight axial tilt variation
      
      // Update particles
      const positionsAttr = particlesGeometry.attributes.position;
      for (let i = 0; i < particlesCount; i++) {
        positionsAttr.setX(i, positionsAttr.getX(i) + velocities[i * 3]);
        positionsAttr.setY(i, positionsAttr.getY(i) + velocities[i * 3 + 1]);
        positionsAttr.setZ(i, positionsAttr.getZ(i) + velocities[i * 3 + 2]);

        // Keep particles within a certain range
        const x = positionsAttr.getX(i);
        const y = positionsAttr.getY(i);
        const z = positionsAttr.getZ(i);
        const dist = Math.sqrt(x*x + y*y + z*z);
        
        if (dist > 4 || dist < 1.1) {
          // Reset to a random position
          const r = 1.2 + Math.random() * 2;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          positionsAttr.setXYZ(
            i, 
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          );

          // Also randomize velocity again for variety
          const speedScale = 0.0005 + Math.random() * 0.003;
          velocities[i * 3] = (Math.random() - 0.5) * speedScale;
          velocities[i * 3 + 1] = (Math.random() - 0.5) * speedScale;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * speedScale;
        }
      }
      positionsAttr.needsUpdate = true;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      updateCameraDistance();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      innerGlowGeometry.dispose();
      innerGlowMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full cursor-grab active:cursor-grabbing ${className}`}
      id="mars-canvas-container"
    />
  );
};
