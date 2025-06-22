console.log("main.js is loaded");
// Setup scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 5;
controls.maxDistance = 20;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Load font and add text panels
const loader = new THREE.FontLoader();
loader.load(
  'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
  function (font) {
    addTextPanels(font);
  }
);

function createTextMesh(text, font, size = 0.5, color = 0x66ccff) {
  const geometry = new THREE.TextGeometry(text, {
    font: font,
    size: size,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  geometry.computeBoundingBox();

  // Center the text
  const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
  geometry.translate(xMid, 0, 0);

  const material = new THREE.MeshStandardMaterial({ color: color });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function addTextPanels(font) {
  // Career Objective
  const careerObj = createTextMesh(
    'Career Objective:\nI am a student of Computer Science aiming to be a Software Engineer.\nSkilled in Java, Python, C and passionate about AI & ML.',
    font,
    0.3,
    0x44ff44
  );
  careerObj.position.set(0, 3.5, 0);
  scene.add(careerObj);

  // Education
  const educationText = `
Education:
B.Tech - Computer Science and Engineering
Gurunanak Institute of Technology
CGPA: 8.12/10

Intermediate (MPC)
Sri Chaitanya Junior Kalasala
Marks: 968/1000

SSC (X)
Krishnaveni Talent School
CGPA: 9.2/10
  `;
  const education = createTextMesh(educationText.trim(), font, 0.3, 0x66ccff);
  education.position.set(0, 1.5, 0);
  scene.add(education);

  // Projects
  const projectsText = `
Projects:
1) Fraud Detection in Internet Banking (ML)
- Random Forest, KNN for fraud detection.

2) Railway Objects Detection (Improved YOLO)
- Two-stage system for foreign object detection on railway tracks.

3) Library Management System
- Python/PHP, MySQL based system with role-based access.
  `;
  const projects = createTextMesh(projectsText.trim(), font, 0.3, 0xff6666);
  projects.position.set(0, -0.5, 0);
  scene.add(projects);

  // Skills
  const skillsText = `
Skills:
Technical: Python, Java, C, JavaScript, SQL, AI & ML
Soft: Time Management, Problem-solving, Communication, Teamwork
  `;
  const skills = createTextMesh(skillsText.trim(), font, 0.3, 0xffff66);
  skills.position.set(0, -2.5, 0);
  scene.add(skills);

  // Certificates
  const certText = `
Certificates:
- Salesforce Developer Trailhead Completion
- Python 3.4.3 Training by Spoken Tutorial, IIT Bombay
- Digital Skills Readiness Program (Java Full Stack)
- Machine Learning A-Z: AI, Python
  `;
  const certificates = createTextMesh(certText.trim(), font, 0.25, 0x66ffff);
  certificates.position.set(0, -4.5, 0);
  scene.add(certificates);

  // Courses & Extra Curricular
  const extraText = `
Courses:
- Introduction to Artificial Intelligence
- Introduction to Natural Language Processing
- Introduction to Deep Learning

Extra Curricular:
- Participated in HR Conclave 2024
- International Level Workshop on Data Science using Python (2024)
  `;
  const extra = createTextMesh(extraText.trim(), font, 0.25, 0xff66ff);
  extra.position.set(0, -6.5, 0);
  scene.add(extra);
}

// Animate and render
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

// Responsive window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
