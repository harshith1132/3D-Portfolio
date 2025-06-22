console.log("main.js loaded");

// Import Three.js dependencies via CDN (only works if you serve with a bundler or use a local version)
// For GitHub Pages, we need to load Three.js via CDN in index.html or embed it here.
// So let's load Three.js via CDN in this file dynamically:

function loadScript(url, callback){
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = callback;
  script.src = url;
  document.head.appendChild(script);
}

// Load Three.js and then run init
loadScript('https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js', () => {
  loadScript('https://cdn.jsdelivr.net/npm/three@0.150.1/examples/js/loaders/FontLoader.js', () => {
    loadScript('https://cdn.jsdelivr.net/npm/three@0.150.1/examples/js/geometries/TextGeometry.js', () => {
      init();
    });
  });
});

function init() {
  // Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212);

  // Camera setup
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 80);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.zIndex = '0';

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  // Load font and create 3D text
  const loader = new THREE.FontLoader();
  loader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    function (font) {
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0x58a6ff });
      const texts = [
        'Muthineni Harshith',
        'Software Engineer | CSE Student',
        '',
        'Skills: Python, Java, C, JavaScript, SQL, AI & ML',
        '',
        'Projects:',
        '- Fraud Detection using ML (Random Forest, KNN)',
        '- Railway Object Detection (YOLOv8, Knowledge Distillation)',
        '- Library Management System (Python/PHP, MySQL)',
        '',
        'Education:',
        '- B.Tech CSE - Gurunanak Institute of Technology (8.12/10)',
        '- Intermediate (MPC) - Sri Chaitanya Junior Kalasala (968/1000)',
        '- SSC (X) - Krishnaveni Talent School (9.2/10)',
        '',
        'Certifications:',
        '- Salesforce Developer Trailhead',
        '- Python 3.4.3 Training - IIT Bombay',
        '- Java Full Stack - Wipro TalentNext',
        '- Machine Learning A-Z: AI, Python',
        '',
        'Courses:',
        '- Intro to AI, NLP, Deep Learning',
        '',
        'Extracurricular:',
        '- HR Conclave 2024',
        '- International Workshop on Data Science',
      ];

      const group = new THREE.Group();
      let yOffset = 20;

      texts.forEach((line) => {
        if (line.trim() === '') {
          yOffset -= 4;
          return;
        }
        const textGeo = new THREE.TextGeometry(line, {
          font: font,
          size: 2,
          height: 0.5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.1,
          bevelOffset: 0,
          bevelSegments: 3,
        });
        textGeo.computeBoundingBox();
        const textMesh = new THREE.Mesh(textGeo, textMaterial);
        textMesh.position.set(
          - (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x) / 2,
          yOffset,
          0
        );
        group.add(textMesh);
        yOffset -= 4; // space between lines
      });

      scene.add(group);

      // Animate rotation
      function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.002;
        group.rotation.x += 0.001;
        renderer.render(scene, camera);
      }
      animate();
    }
  );

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
