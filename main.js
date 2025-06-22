console.log("main.js loaded");

function loadScript(url, callback){
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = callback;
  script.src = url;
  document.head.appendChild(script);
}

loadScript('https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js', () => {
  loadScript('https://cdn.jsdelivr.net/npm/three@0.150.1/examples/js/loaders/FontLoader.js', () => {
    loadScript('https://cdn.jsdelivr.net/npm/three@0.150.1/examples/js/geometries/TextGeometry.js', () => {
      init();
    });
  });
});

function init() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x121212);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 20, 120);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.zIndex = '0';

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  const loader = new THREE.FontLoader();
  loader.load(
    'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    function (font) {
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0x58a6ff });

      // FULL RESUME TEXT LINES
      const texts = [
        'CAREER OBJECTIVE',
        'I am a student of Computer Science to be a Software Engineer.',
        'Skilled in Java, Python, C.',
        'Passion for Machine Learning and AI.',
        '',
        'EDUCATION',
        'B.Tech - Computer Science and Engineering',
        'Gurunanak Institute of Technology, CGPA: 8.12/10',
        'Intermediate (MPC), Sri Chaitanya Junior Kalasala, Marks: 968/1000',
        'SSC (X), Krishnaveni Talent School, CGPA: 9.2/10',
        '',
        'PROJECTS',
        '- Fraud Detection in Internet Banking Using ML (Random Forest, KNN)',
        '- Railway Objects Detection Using Improved YOLO Algorithm',
        '- Library Management System (Python/PHP, MySQL)',
        '',
        'SKILLS',
        'Technical: Python, Java, C, JavaScript, SQL, AI & ML',
        'Soft Skills: Time Management, Problem-solving, Quick Learner, Communication, Teamwork',
        '',
        'CERTIFICATES',
        '- Salesforce Developer Trailhead Completion Certification',
        '- Python 3.4.3 Training by Spoken Tutorial, IIT Bombay',
        '- Digital Skills Readiness Program - Java Full Stack by Wipro TalentNext',
        '- Machine Learning A-Z: AI, Python',
        '',
        'COURSES',
        '- Introduction to Artificial Intelligence',
        '- Introduction to Natural Language Processing',
        '- Introduction to Deep Learning',
        '',
        'EXTRA CURRICULAR',
        '- Participated in HR Conclave 2024',
        '- Participated in International Level Student Workshop 2024 on Data Science using Python',
      ];

      const group = new THREE.Group();
      let yOffset = 40;
      const lineSpacing = 5;

      texts.forEach(line => {
        if (line.trim() === '') {
          yOffset -= lineSpacing / 2;
          return;
        }
        const textGeo = new THREE.TextGeometry(line, {
          font: font,
          size: 3,
          height: 0.7,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.15,
          bevelSize: 0.15,
          bevelOffset: 0,
          bevelSegments: 3,
        });
        textGeo.computeBoundingBox();
        const textWidth = textGeo.boundingBox.max.x - textGeo.boundingBox.min.x;

        const textMesh = new THREE.Mesh(textGeo, textMaterial);
        textMesh.position.set(-textWidth / 2, yOffset, 0);
        group.add(textMesh);

        yOffset -= lineSpacing;
      });

      scene.add(group);

      // Slow rotation for nice effect
      function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.002;
        renderer.render(scene, camera);
      }
      animate();
    }
  );

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
