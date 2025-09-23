/**
 * main.js
 * Sets up Three.js 3D particle background and handles resume analysis.
 * Compatible with index.html above.
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// --------------------- CONFIG ---------------------
const CONFIG = {
  PARTICLE_COUNT_DESKTOP: 900,
  PARTICLE_COUNT_MOBILE: 260,
  PARTICLE_SIZE: 1.6,
  GREEN_HEX: 0x16a34a,
  WHITE_HEX: 0xffffff,
  BASE_SPEED: 0.2
};

// --------------------- THREE.JS SETUP ---------------------
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.z = 120;

// Particle system
const particles = new THREE.BufferGeometry();
const particleCount = window.innerWidth > 768 ? CONFIG.PARTICLE_COUNT_DESKTOP : CONFIG.PARTICLE_COUNT_MOBILE;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 400;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 400;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 400;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: CONFIG.PARTICLE_SIZE,
  color: CONFIG.WHITE_HEX
});

const points = new THREE.Points(particles, material);
scene.add(points);

function animate() {
  requestAnimationFrame(animate);
  points.rotation.y += 0.001;
  points.rotation.x += 0.001;
  renderer.render(scene, camera);
}
animate();

// --------------------- RESUME ANALYSIS ---------------------
const resumeInput = document.getElementById('resumeInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultDiv = document.getElementById('result');
const strengthsList = document.getElementById('strengthsList');
const improvementsList = document.getElementById('improvementsList');
const keywordMatch = document.getElementById('keywordMatch');

function simulateAnalysis(file) {
  // Simulated AI response
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        strengths: ['Good formatting', 'Clear sections', 'Relevant keywords'],
        improvements: ['Add more projects', 'Highlight achievements'],
        keywords: ['JavaScript', 'Python', 'Cloud']
      });
    }, 1500);
  });
}

analyzeBtn.addEventListener('click', async () => {
  const file = resumeInput.files[0];
  if (!file) return alert('Please select a resume file.');
  resultDiv.textContent = 'Analyzing...';
  const analysis = await simulateAnalysis(file);

  resultDiv.textContent = 'Analysis Complete!';
  strengthsList.innerHTML = analysis.strengths.map(s => `<li>${s}</li>`).join('');
  improvementsList.innerHTML = analysis.improvements.map(i => `<li>${i}</li>`).join('');
  keywordMatch.textContent = analysis.keywords.join(', ');
});
