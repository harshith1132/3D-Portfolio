import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { FontLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 240);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const material = new THREE.MeshPhongMaterial({ color: 0x58a6ff });

  const texts = [
    "CAREER OBJECTIVE",
    "github.com/harshith1132",
    "Aspiring Software Engineer | CS Enthusiast | ML & AI Lover",
    "Skilled in Java, Python, C. Strong in problem solving.",
    "",
    "EDUCATION",
    "B.Tech in CSE - Gurunanak Institute of Technology",
    "CGPA: 8.12/10",
    "Intermediate - Sri Chaitanya Jr. Kalasala - 968/1000",
    "SSC - Krishnaveni Talent School - CGPA: 9.2/10",
    "",
    "PROJECTS",
    "Fraud Detection in Internet Banking",
    "Used ML (Random Forest, KNN), class balancing, and metrics.",
    "Improved detection efficiency in banking transactions.",
    "",
    "Railway Objects Detection (YOLOv8)",
    "Used 2-stage detection with CNN + YOLOv8.",
    "Applied Knowledge Distillation for efficiency.",
    "",
    "Library Management System",
    "Built with Python/PHP, MySQL for libraries.",
    "Role access, inventory mgmt, alerts, reporting.",
    "",
    "SKILLS",
    "Tech: Java, Python, C, JS, SQL, AI/ML",
    "Soft: Communication, Teamwork, Quick Learning, Time Mgmt",
    "",
    "CERTIFICATES",
    "Salesforce Developer Trailhead",
    "Python (IIT Bombay - Spoken Tutorial)",
    "Java Full Stack (Wipro TalentNext)",
    "Machine Learning A-Z",
    "",
    "COURSES",
    "Intro to AI, NLP, Deep Learning",
    "",
    "EXTRACURRICULAR",
    "Participant - HR Conclave 2024",
    "Intl. Workshop 2024 on Data Science using Python",
  ];

  const group = new THREE.Group();
  let yOffset = texts.length * 1.3 / 2;
  const spacing = 2;

  texts.forEach((line) => {
    if (line.trim() === "") {
      yOffset -= spacing / 2;
      return;
    }

    const textGeo = new TextGeometry(line, {
      font: font,
      size: 1.4,
      height: 0.3,
      curveSegments: 8,
      bevelEnabled: false,
    });

    textGeo.computeBoundingBox();
    const width = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;
    const mesh = new THREE.Mesh(textGeo, material);
    mesh.position.set(-width / 2, yOffset, 0);
    group.add(mesh);
    yOffset -= spacing;
  });

  scene.add(group);

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.0015;
    renderer.render(scene, camera);
  }

  animate();
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
