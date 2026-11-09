import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Trash2, RotateCcw } from 'lucide-react';

/**
 * Ultra-Realistic Interactive Solar System & Cinema-Grade Gargantua Black Hole (Interestelar)
 * - 3D Rotating Cosmos Starfield with 360° Real Constellations
 * - Planetas e Buraco Negro GRUDADOS no Espaço:
 *    • Segure o SCROLL DO MOUSE (clique da rodinha / MMB) e mexa para girar o espaço em 3D livremente!
 *    • Soltou o scroll? O giro para imediatamente!
 *    • Os planetas, a Terra e o buraco negro giram juntos no céu (você procura eles no cosmos!).
 * - Buraco Negro Gargantua Autêntico (Idêntico à foto de Interestelar):
 *    • Horizonte de Eventos preto absoluto que oculta o fundo
 *    • Anel de fótons branco incandescente
 *    • Disco de acreção horizontal cortando na frente
 *    • Arcos de lente gravitacional curvados superior e inferior (formato exato da foto!)
 *    • Plasma com MOVIMENTO PARA O CENTRO (inward accretion flow contínuo e hipnótico)
 *    • Surge calmamente logo ACIMA da lixeira, pouco maior que ela
 *    • Suga todos os componentes como um RALO/FUNIL (espremendo-os para dentro)
 *    • 5 cliques no Buraco Negro grande colapsam a singularidade e cospem o site de volta para fora!
 */
export default function InteractiveBackground({
  onStartSuction,
  onCompleteSuction,
  onStartRestore,
  onCompleteRestore,
  onPlanetClick,
  dismissTrigger = 0,
}) {
  const containerRef = useRef(null);
  const [hudText, setHudText] = useState('Em órbita distante');
  const [hudActive, setHudActive] = useState(false);
  const [hoveredTarget, setHoveredTarget] = useState(null);
  const [cursorMode, setCursorMode] = useState('default');
  const [blackHoleActiveUI, setBlackHoleActiveUI] = useState(false);
  const [blackHoleClicksUI, setBlackHoleClicksUI] = useState(0);
  const [isRotatingSpaceUI, setIsRotatingSpaceUI] = useState(false);

  const triggerEarthRef = useRef(null);
  const triggerSuctionRef = useRef(null);
  const triggerRestoreRef = useRef(null);
  const dismissPlanetsRef = useRef(null);

  useEffect(() => {
    if (dismissTrigger > 0 && dismissPlanetsRef.current) {
      dismissPlanetsRef.current();
    }
  }, [dismissTrigger]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 2500);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    // 2. High-Res Circular Glowing Star Texture
    const createCircularStarTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.12, 'rgba(240, 249, 255, 0.95)');
      grad.addColorStop(0.3, 'rgba(56, 189, 248, 0.45)');
      grad.addColorStop(0.65, 'rgba(14, 165, 233, 0.1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    };

    const starTexture = createCircularStarTexture();

    // 3. COSMOS ROTATING GROUP:
    // Holds the starfield, constellations, and ALL distant bodies in orbit.
    // When the user holds the middle mouse button (scroll click), EVERYTHING rotates together!
    const cosmosGroup = new THREE.Group();
    scene.add(cosmosGroup);

    // 2,600 Circular Glowing Stars
    const starCount = 2600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starCols = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#e0f2fe'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#fef08a'),
      new THREE.Color('#fed7aa'),
      new THREE.Color('#e9d5ff'),
    ];

    for (let i = 0; i < starCount; i++) {
      const r = THREE.MathUtils.randFloat(80, 800);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i * 3 + 2] = r * Math.cos(phi);

      const col = palette[Math.floor(Math.random() * palette.length)];
      starCols[i * 3] = col.r;
      starCols[i * 3 + 1] = col.g;
      starCols[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCols, 3));

    const starMat = new THREE.PointsMaterial({
      size: 3.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starDome = new THREE.Points(starGeo, starMat);
    cosmosGroup.add(starDome);

    // 4. Real 360° Constellations & Glowing Star Nodes
    const constellationLines = [];
    const constStarPos = [];
    const constStarCols = [];

    const sph = (ra, dec, r = 118) => {
      const radRa = (ra * Math.PI) / 180;
      const radDec = (dec * Math.PI) / 180;
      return new THREE.Vector3(
        r * Math.cos(radDec) * Math.cos(radRa),
        r * Math.sin(radDec),
        r * Math.cos(radDec) * Math.sin(radRa)
      );
    };

    const addStarNode = (vec, colorHex = '#7dd3fc') => {
      const col = new THREE.Color(colorHex);
      constStarPos.push(vec.x, vec.y, vec.z);
      constStarCols.push(col.r, col.g, col.b);
    };

    const addSegment = (p1, p2) => {
      if (p1 && p2) {
        constellationLines.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
      }
    };

    const addPolyline = (points, colorHex = '#7dd3fc') => {
      for (let i = 0; i < points.length - 1; i++) {
        addSegment(points[i], points[i + 1]);
      }
      for (const p of points) {
        addStarNode(p, colorHex);
      }
    };

    // Cruzeiro do Sul
    const acrux = sph(186.6, -63.1);
    const gacrux = sph(187.8, -57.1);
    const mimosa = sph(191.9, -59.7);
    const deltaCru = sph(183.8, -58.7);
    const intrometida = sph(185.3, -60.4);
    const alphaCen = sph(219.9, -60.8);
    const betaCen = sph(210.9, -60.4);

    addSegment(gacrux, acrux);
    addSegment(deltaCru, mimosa);
    addSegment(alphaCen, betaCen);
    addStarNode(acrux, '#93c5fd');
    addStarNode(gacrux, '#fb923c');
    addStarNode(mimosa, '#38bdf8');
    addStarNode(deltaCru, '#bae6fd');
    addStarNode(intrometida, '#ffffff');
    addStarNode(alphaCen, '#fde047');
    addStarNode(betaCen, '#38bdf8');

    // Orion
    const betelgeuse = sph(88.8, 7.4);
    const rigel = sph(78.6, -8.2);
    const bellatrix = sph(81.3, 6.3);
    const saiph = sph(86.9, -9.7);
    const mintaka = sph(83.0, -0.3);
    const alnilam = sph(84.1, -1.2);
    const alnitak = sph(85.2, -1.9);

    addSegment(betelgeuse, bellatrix);
    addSegment(betelgeuse, alnitak);
    addSegment(bellatrix, mintaka);
    addSegment(mintaka, alnilam);
    addSegment(alnilam, alnitak);
    addSegment(alnilam, saiph);
    addSegment(mintaka, rigel);
    addSegment(saiph, rigel);

    addStarNode(betelgeuse, '#f97316');
    addStarNode(rigel, '#bfdbfe');
    addStarNode(bellatrix, '#38bdf8');
    addStarNode(saiph, '#7dd3fc');
    addStarNode(mintaka, '#ffffff');
    addStarNode(alnilam, '#ffffff');
    addStarNode(alnitak, '#ffffff');

    // Ursa Maior
    const dubhe = sph(165.9, 61.8);
    const merak = sph(165.5, 56.4);
    const phecda = sph(178.5, 53.7);
    const megrez = sph(183.9, 57.0);
    const alioth = sph(193.5, 56.0);
    const mizar = sph(200.0, 54.9);
    const alkaid = sph(206.9, 49.3);

    addPolyline([dubhe, merak, phecda, megrez, dubhe], '#38bdf8');
    addPolyline([megrez, alioth, mizar, alkaid], '#7dd3fc');
    addStarNode(dubhe, '#fde047');
    addStarNode(mizar, '#e0f2fe');

    // Cassiopeia
    const caph = sph(2.3, 59.2);
    const schedar = sph(10.1, 56.5);
    const navi = sph(14.2, 60.7);
    const ruchbah = sph(21.4, 60.2);
    const segin = sph(26.6, 63.7);

    addPolyline([caph, schedar, navi, ruchbah, segin], '#38bdf8');
    addStarNode(schedar, '#fbbf24');
    addStarNode(navi, '#ffffff');

    // Cygnus
    const deneb = sph(310.4, 45.3);
    const sadr = sph(305.5, 40.3);
    const albireo = sph(292.7, 27.9);
    const gienah = sph(311.5, 33.9);
    const deltaCyg = sph(296.2, 45.1);

    addSegment(albireo, sadr);
    addSegment(sadr, deneb);
    addSegment(deltaCyg, sadr);
    addSegment(sadr, gienah);
    addStarNode(deneb, '#ffffff');
    addStarNode(sadr, '#38bdf8');
    addStarNode(albireo, '#fde047');
    addStarNode(gienah, '#7dd3fc');
    addStarNode(deltaCyg, '#bae6fd');

    // Escorpião
    const antares = sph(247.4, -26.4);
    const graffias = sph(241.3, -19.8);
    const dschubba = sph(240.1, -22.6);
    const piSco = sph(239.7, -26.1);
    const weiSco = sph(252.5, -34.3);
    const sargas = sph(264.3, -43.0);
    const shaula = sph(263.4, -37.1);

    addPolyline([graffias, dschubba, piSco], '#38bdf8');
    addPolyline([dschubba, antares, weiSco, sargas, shaula], '#7dd3fc');
    addStarNode(antares, '#ef4444');
    addStarNode(shaula, '#38bdf8');

    // Touro
    const aldebaran = sph(68.9, 16.5);
    const elnath = sph(81.6, 28.6);
    const tianguan = sph(84.4, 21.1);
    const ain = sph(67.1, 19.2);
    const gammaTau = sph(64.9, 15.6);

    addSegment(aldebaran, ain);
    addSegment(ain, gammaTau);
    addSegment(aldebaran, tianguan);
    addSegment(ain, elnath);
    addStarNode(aldebaran, '#f97316');
    addStarNode(elnath, '#93c5fd');
    addStarNode(tianguan, '#38bdf8');

    // Pégaso
    const markab = sph(346.2, 15.2);
    const scheat = sph(345.9, 28.1);
    const alpheratz = sph(2.1, 29.1);
    const algenib = sph(3.3, 15.2);

    addPolyline([markab, scheat, alpheratz, algenib, markab], '#38bdf8');
    addStarNode(scheat, '#fbbf24');
    addStarNode(alpheratz, '#ffffff');

    // Leão
    const regulus = sph(152.1, 12.0);
    const algieba = sph(154.9, 19.8);
    const adhafera = sph(154.2, 23.4);
    const denebola = sph(177.3, 14.6);
    const zosma = sph(168.5, 20.5);
    const chertan = sph(168.6, 15.4);

    addPolyline([regulus, algieba, adhafera], '#38bdf8');
    addSegment(algieba, zosma);
    addSegment(zosma, denebola);
    addSegment(denebola, chertan);
    addSegment(chertan, regulus);
    addSegment(zosma, chertan);
    addStarNode(regulus, '#93c5fd');
    addStarNode(algieba, '#fde047');
    addStarNode(denebola, '#ffffff');

    const constGeo = new THREE.BufferGeometry();
    constGeo.setAttribute('position', new THREE.Float32BufferAttribute(constellationLines, 3));
    const constMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.52,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const constLineMesh = new THREE.LineSegments(constGeo, constMat);
    cosmosGroup.add(constLineMesh);

    const constStarsGeo = new THREE.BufferGeometry();
    constStarsGeo.setAttribute('position', new THREE.Float32BufferAttribute(constStarPos, 3));
    constStarsGeo.setAttribute('color', new THREE.Float32BufferAttribute(constStarCols, 3));
    const constStarsMat = new THREE.PointsMaterial({
      size: 6.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const constStarsMesh = new THREE.Points(constStarsGeo, constStarsMat);
    cosmosGroup.add(constStarsMesh);

    // 5. Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.5);
    sunLight.position.set(16, 9, 14);
    scene.add(sunLight);

    const cosmicAmbient = new THREE.AmbientLight(0x0c1530, 0.45);
    scene.add(cosmicAmbient);

    // 6. Earth Setup (NASA Blue Marble)
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (23.4 * Math.PI) / 180;

    const earthGeo = new THREE.SphereGeometry(3.5, 64, 64);
    const dayTex = textureLoader.load('/earth/earth-day.jpg');
    dayTex.colorSpace = THREE.SRGBColorSpace;
    const earthMat = new THREE.MeshPhongMaterial({
      map: dayTex,
      specular: new THREE.Color(0x224466),
      shininess: 12,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Earth Clouds
    const cloudsGeo = new THREE.SphereGeometry(3.53, 64, 64);
    const cloudsTex = textureLoader.load('/earth/earth-clouds.png');
    cloudsTex.colorSpace = THREE.SRGBColorSpace;
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTex,
      transparent: true,
      opacity: 0.55,
      blending: THREE.NormalBlending,
      depthWrite: false,
      roughness: 0.9,
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    earthGroup.add(cloudsMesh);

    // Atmospheric Fresnel Glow
    const atmosphereGeo = new THREE.SphereGeometry(3.56, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = 1.0 - dot(normal, viewDir);
          float alpha = smoothstep(0.35, 0.88, fresnel) * 0.42;
          gl_FragColor = vec4(0.22, 0.74, 0.98, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    earthGroup.add(new THREE.Mesh(atmosphereGeo, atmosphereMat));

    // ATTACH EARTH TO COSMOS GROUP (Gira junto com o céu 3D!)
    cosmosGroup.add(earthGroup);

    // 7. CELESTIAL BODIES (Lua, Marte, Saturno, Júpiter)
    const planetsData = [
      {
        id: 'moon',
        name: 'Lua Terrestre',
        emoji: '🌕',
        radius: 2.2,
        map: '/earth/moon.jpg',
        distantRadius: 0.38,
        orbitRadius: 38,
        orbitSpeed: 0.075,
        yOffset: 3.5,
        tilt: 0.1,
      },
      {
        id: 'mars',
        name: 'Marte (Planeta Vermelho)',
        emoji: '🔴',
        radius: 2.8,
        map: '/earth/mars.jpg',
        distantRadius: 0.48,
        orbitRadius: 54,
        orbitSpeed: 0.05,
        yOffset: -3.8,
        tilt: 0.44,
      },
      {
        id: 'saturn',
        name: 'Saturno com Anéis de Gelo',
        emoji: '🪐',
        radius: 3.0,
        map: '/earth/saturn.jpg',
        ringMap: '/earth/saturn-ring.jpg',
        hasRing: true,
        distantRadius: 0.62,
        orbitRadius: 72,
        orbitSpeed: 0.032,
        yOffset: 6.8,
        tilt: 0.47,
      },
      {
        id: 'jupiter',
        name: 'Júpiter (Gigante Gasoso)',
        emoji: '🟠',
        radius: 3.8,
        map: '/earth/jupiter.jpg',
        distantRadius: 0.78,
        orbitRadius: 92,
        orbitSpeed: 0.02,
        yOffset: -5.5,
        tilt: 0.05,
      },
    ];

    const activePlanets = [];

    planetsData.forEach((pData) => {
      const pGroup = new THREE.Group();

      const pGeo = new THREE.SphereGeometry(pData.radius, 64, 64);
      const tex = textureLoader.load(pData.map);
      tex.colorSpace = THREE.SRGBColorSpace;
      const pMat = new THREE.MeshPhongMaterial({
        map: tex,
        shininess: pData.id === 'saturn' || pData.id === 'jupiter' ? 8 : 4,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pGroup.add(pMesh);

      let ringMesh = null;
      if (pData.hasRing) {
        const rInner = pData.radius * 1.25;
        const rOuter = pData.radius * 2.35;
        const ringGeo = new THREE.RingGeometry(rInner, rOuter, 64);

        const pos = ringGeo.attributes.position;
        const uvs = ringGeo.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const dist = Math.sqrt(x * x + y * y);
          const u = (dist - rInner) / (rOuter - rInner);
          uvs.setXY(i, u, 0.5);
        }

        const ringTex = textureLoader.load(pData.ringMap);
        ringTex.colorSpace = THREE.SRGBColorSpace;
        const ringMat = new THREE.MeshStandardMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.95,
          roughness: 0.6,
        });

        ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.15;
        pGroup.add(ringMesh);
      }

      pGroup.rotation.z = pData.tilt;

      // ATTACH PLANET TO COSMOS GROUP (Gira junto com o céu 3D!)
      cosmosGroup.add(pGroup);

      activePlanets.push({
        ...pData,
        group: pGroup,
        mesh: pMesh,
        ringMesh,
        angle: Math.random() * Math.PI * 2,
        state: 'ORBIT',
        timer: 0,
        startPos: new THREE.Vector3(),
        targetPos: new THREE.Vector3(),
        currentScale: pData.distantRadius / pData.radius,
      });
    });

    // 8. AUTÊNTICO BURACO NEGRO GARGANTUA (100% IDÊNTICO À IMAGEM DE REFERÊNCIA DO USUÁRIO)
    // - Usa a textura autêntica do filme Interestelar / foto do usuário (/earth/gargantua.png)
    // - Sem desconexões, sem moiré, com cúpula e arcos contínuos
    // - Shader de fluxo e advecção contínua de plasma sugado em direção à singularidade ("mexendo para o centro")
    const blackHoleGroup = new THREE.Group();
    blackHoleGroup.visible = true;
    cosmosGroup.add(blackHoleGroup);

    const gargantuaTex = textureLoader.load('/earth/gargantua.png');
    gargantuaTex.colorSpace = THREE.SRGBColorSpace;
    gargantuaTex.generateMipmaps = true;
    gargantuaTex.minFilter = THREE.LinearMipmapLinearFilter;
    gargantuaTex.magFilter = THREE.LinearFilter;

    // Proporção exata da imagem do usuário (781 x 339 -> aspecto 2.304)
    const gargantuaQuadGeo = new THREE.PlaneGeometry(10.0, 4.34, 1, 1);
    const gargantuaUniforms = {
      uMap: { value: gargantuaTex },
      uTime: { value: 0 },
    };

    const gargantuaShaderMat = new THREE.ShaderMaterial({
      uniforms: gargantuaUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uMap;
        uniform float uTime;
        varying vec2 vUv;

        void main() {
          // Centro exato do horizonte de eventos na imagem do usuário
          vec2 centerUv = vec2(0.5122, 0.4218);
          vec2 d = vUv - centerUv;

          // Correção de proporção exata da textura (781 x 339 -> 2.3038)
          vec2 dAspect = vec2(d.x, d.y / 2.3038);
          float r = length(dAspect);

          // A BOLA PRETA DO MEIO NÃO PODE COMPRIMIR:
          // O horizonte de eventos / bola preta central (r <= 0.110) é 100% fixo, estável e nunca comprime!
          // O fluxo de plasma atua suavemente apenas no disco de acreção externo (r > 0.110)
          float flowMask = smoothstep(0.110, 0.170, r);

          // Vetor de fluxo relativístico direcionado para o centro no espaço corrigido por aspecto
          float lenDAspect = max(0.0001, r);
          vec2 dirInwardAspect = -dAspect / lenDAspect;
          vec2 dirSwirlAspect = vec2(-dAspect.y, dAspect.x) / lenDAspect;
          float swirlFactor = clamp(1.0 - r * 2.5, 0.0, 1.0);
          vec2 flowDirAspect = normalize(dirInwardAspect * 0.75 + dirSwirlAspect * swirlFactor * 0.55);

          // Vetor de fluxo projetado uniformemente no espaço UV (sem deformação assimétrica)
          vec2 flowVecUV = vec2(flowDirAspect.x, flowDirAspect.y * 2.3038);

          // Aceleração gravitacional no disco externo, completamente zerada na bola preta
          float plunge = 1.0 + 0.6 / max(0.12, r);
          float speed = 0.16;

          // Advecção contínua bifásica (Flow-Map) para movimento suave e infinito no plasma externo
          float p1 = fract(uTime * speed);
          float p2 = fract(uTime * speed + 0.5);

          float weight = abs(2.0 * p1 - 1.0);
          weight = smoothstep(0.0, 1.0, weight);

          // flowMag é estritamente 0 na bola preta (ela nunca comprime nem se deforma)
          float flowMag = 0.024 * plunge * flowMask;
          vec2 uv1 = vUv - flowVecUV * p1 * flowMag;
          vec2 uv2 = vUv - flowVecUV * p2 * flowMag;

          vec4 col1 = texture2D(uMap, uv1);
          vec4 col2 = texture2D(uMap, uv2);
          vec4 baseCol = mix(col1, col2, weight);

          // Ondas e filamentos de plasma ativos apenas no disco externo (fora da bola preta)
          float streamWave = sin(r * 90.0 - uTime * 4.0) * 0.5 + 0.5;
          float microStream = sin(r * 180.0 - uTime * 7.0) * 0.5 + 0.5;
          float streamBoost = 1.0 + (streamWave * 0.14 + microStream * 0.08) * smoothstep(0.120, 0.35, r);

          vec3 finalRgb = baseCol.rgb * streamBoost;

          // Brilho pulsante sutil estritamente no anel de fótons exterior (sem iluminar o interior da bola preta)
          if (r > 0.110 && r < 0.145) {
            float photonPulse = sin(uTime * 2.8) * 0.08;
            finalRgb += vec3(0.16, 0.14, 0.16) * photonPulse;
          }

          gl_FragColor = vec4(finalRgb, baseCol.a);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    });

    const gargantuaMesh = new THREE.Mesh(gargantuaQuadGeo, gargantuaShaderMat);
    blackHoleGroup.add(gargantuaMesh);

    const blackHoleState = {
      active: true,
      phase: 'ORBIT',
      isSiteCleaned: false,
      clicks: 0,
      timer: 0,
      angle: Math.random() * Math.PI * 2,
      orbitRadius: 55,
      startPos: new THREE.Vector3(),
      targetPos: new THREE.Vector3(),
      currentScale: 0.36,
      pulseScale: 1.0,
      radius: 6.8,
    };

    blackHoleGroup.position.set(
      Math.cos(blackHoleState.angle) * blackHoleState.orbitRadius,
      4.2 + Math.sin(blackHoleState.angle * 1.6) * 2.8,
      Math.sin(blackHoleState.angle) * blackHoleState.orbitRadius - 48
    );
    blackHoleGroup.scale.setScalar(blackHoleState.currentScale);

    // 9. EARTH STATE & DISTANT ORBIT
    let earthAngle = Math.random() * Math.PI * 2;
    const earthState = {
      current: 'ORBIT',
      timer: 0,
      orbitDuration: 60,
      closeDuration: 10,
      startPos: new THREE.Vector3(),
      targetPos: new THREE.Vector3(),
      departPos: new THREE.Vector3(),
      currentScale: 0.16,
      radius: 3.5,
    };

    earthGroup.position.set(
      Math.cos(earthAngle) * 44,
      1.5 + Math.sin(earthAngle * 1.5) * 2.0,
      Math.sin(earthAngle) * 44 - 48
    );
    earthGroup.scale.setScalar(earthState.currentScale);

    // ==========================================
    // 9.5 DOCTOR WHO TARDIS (Easter Egg Cósmico)
    // ==========================================
    // - A cada 30 segundos passa cruzando o cosmos veloz como um cometa
    // - Permanece na tela por exatamente 2 segundos e depois desaparece
    // - Tamanho idêntico ao de um planeta quando distante (pequena e autêntica)
    // - Sem interação de clique (sem ação na TARDIS, puro espetáculo visual)
    const tardisGroup = new THREE.Group();
    tardisGroup.visible = false;
    scene.add(tardisGroup);

    // Textura procedural ultra-detalhada da cabine policial TARDIS
    const createTardisWallTexture = () => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      // Fundo Azul TARDIS Autêntico
      ctx.fillStyle = '#0b3966';
      ctx.fillRect(0, 0, 512, 512);

      // Friso Superior "POLICE PUBLIC CALL BOX"
      ctx.fillStyle = '#051321';
      ctx.fillRect(16, 20, 480, 56);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(18, 22, 476, 52);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 25px "Trebuchet MS", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('POLICE  PUBLIC  CALL  BOX', 256, 48);

      // Linha Central Divisória das Portas
      ctx.fillStyle = '#051829';
      ctx.fillRect(252, 85, 8, 410);

      // Função auxiliar para desenhar painéis das portas
      const drawPanel = (x, y, w, h, isWindow, isNotice) => {
        ctx.fillStyle = '#051829';
        ctx.fillRect(x, y, w, h);

        if (isWindow) {
          // Vidros iluminados (6 vidraças com moldura de madeira)
          ctx.fillStyle = '#d0edff';
          ctx.fillRect(x + 5, y + 5, w - 10, h - 10);

          ctx.fillStyle = '#072440';
          // Divisória vertical
          ctx.fillRect(x + w / 2 - 2, y + 5, 4, h - 10);
          // Divisórias horizontais (3 linhas)
          ctx.fillRect(x + 5, y + (h - 10) / 3 + 3, w - 10, 4);
          ctx.fillRect(x + 5, y + (2 * (h - 10)) / 3 + 3, w - 10, 4);
        } else if (isNotice) {
          // Placa branca oficial da TARDIS "PULL TO OPEN"
          ctx.fillStyle = '#f8fafc';
          ctx.fillRect(x + 6, y + 6, w - 12, h - 12);
          ctx.strokeStyle = '#051829';
          ctx.lineWidth = 2;
          ctx.strokeRect(x + 8, y + 8, w - 16, h - 16);

          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('PULL TO OPEN', x + w / 2, y + 22);

          ctx.fillStyle = '#334155';
          for (let ly = y + 32; ly < y + h - 12; ly += 6) {
            ctx.fillRect(x + 12, ly, w - 24, 2);
          }
        } else {
          // Painel azul chanfrado
          ctx.fillStyle = '#0e467b';
          ctx.fillRect(x + 4, y + 4, w - 8, h - 8);
          ctx.strokeStyle = '#1d5a96';
          ctx.lineWidth = 2;
          ctx.strokeRect(x + 5, y + 5, w - 10, h - 10);
        }
      };

      const panelW = 100;
      const panelH = 90;
      const yStarts = [95, 195, 295, 395];

      // Painéis da Porta Esquerda
      drawPanel(28, yStarts[0], panelW, panelH, true, false);
      drawPanel(138, yStarts[0], panelW, panelH, true, false);
      drawPanel(28, yStarts[1], panelW, panelH, false, true); // Placa de instrução
      drawPanel(138, yStarts[1], panelW, panelH, false, false);
      drawPanel(28, yStarts[2], panelW, panelH, false, false);
      drawPanel(138, yStarts[2], panelW, panelH, false, false);
      drawPanel(28, yStarts[3], panelW, panelH, false, false);
      drawPanel(138, yStarts[3], panelW, panelH, false, false);

      // Painéis da Porta Direita
      drawPanel(274, yStarts[0], panelW, panelH, true, false);
      drawPanel(384, yStarts[0], panelW, panelH, true, false);
      drawPanel(274, yStarts[1], panelW, panelH, false, false);
      drawPanel(384, yStarts[1], panelW, panelH, false, false);
      drawPanel(274, yStarts[2], panelW, panelH, false, false);
      drawPanel(384, yStarts[2], panelW, panelH, false, false);
      drawPanel(274, yStarts[3], panelW, panelH, false, false);
      drawPanel(384, yStarts[3], panelW, panelH, false, false);

      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const tardisWallTex = createTardisWallTexture();

    const tardisBlueMat = new THREE.MeshStandardMaterial({
      color: 0x093a68,
      roughness: 0.5,
      metalness: 0.1,
    });
    const tardisDarkMat = new THREE.MeshStandardMaterial({
      color: 0x04192d,
      roughness: 0.6,
    });
    const tardisWallMat = new THREE.MeshStandardMaterial({
      map: tardisWallTex,
      roughness: 0.45,
    });

    // Corpo da Caixa
    const tardisBodyGeo = new THREE.BoxGeometry(1.0, 1.8, 1.0);
    const tardisBodyMats = [
      tardisWallMat, // direita
      tardisWallMat, // esquerda
      tardisBlueMat, // topo
      tardisDarkMat, // base
      tardisWallMat, // frente
      tardisWallMat, // trás
    ];
    const tardisBody = new THREE.Mesh(tardisBodyGeo, tardisBodyMats);
    tardisBody.position.y = 0.94;
    tardisGroup.add(tardisBody);

    // Rodapé / Base Escura
    const plinthGeo = new THREE.BoxGeometry(1.16, 0.08, 1.16);
    const plinthMesh = new THREE.Mesh(plinthGeo, tardisDarkMat);
    plinthMesh.position.y = 0.04;
    tardisGroup.add(plinthMesh);

    // Pilares dos 4 Cantos
    const pillarGeo = new THREE.BoxGeometry(0.1, 1.82, 0.1);
    const pCoords = [
      [-0.51, 0.94, -0.51],
      [0.51, 0.94, -0.51],
      [-0.51, 0.94, 0.51],
      [0.51, 0.94, 0.51],
    ];
    pCoords.forEach(([px, py, pz]) => {
      const pillar = new THREE.Mesh(pillarGeo, tardisDarkMat);
      pillar.position.set(px, py, pz);
      tardisGroup.add(pillar);
    });

    // Teto Piramidal em Degraus
    const roofBaseGeo = new THREE.BoxGeometry(1.08, 0.07, 1.08);
    const roofBase = new THREE.Mesh(roofBaseGeo, tardisBlueMat);
    roofBase.position.y = 1.87;
    tardisGroup.add(roofBase);

    const roofMidGeo = new THREE.BoxGeometry(0.86, 0.07, 0.86);
    const roofMid = new THREE.Mesh(roofMidGeo, tardisBlueMat);
    roofMid.position.y = 1.93;
    tardisGroup.add(roofMid);

    // Lanterna do Teto (A lâmpada clássica de Doctor Who que pulsa)
    const lampCupGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    const lampCup = new THREE.Mesh(lampCupGeo, tardisDarkMat);
    lampCup.position.y = 1.98;
    tardisGroup.add(lampCup);

    const lampBulbGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const lampBulbMat = new THREE.MeshBasicMaterial({
      color: 0x99e6ff,
      transparent: true,
      opacity: 0.95,
    });
    const lampBulb = new THREE.Mesh(lampBulbGeo, lampBulbMat);
    lampBulb.position.y = 2.03;
    tardisGroup.add(lampBulb);

    const tardisLight = new THREE.PointLight(0x38bdf8, 1.2, 5);
    tardisLight.position.set(0, 2.05, 0);
    tardisGroup.add(tardisLight);

    // Escala da TARDIS: Fica exatamente do tamanho dos planetas quando estão longe (~0.32)
    tardisGroup.scale.setScalar(0.32);

    // Rastro Cósmico de Cometa da TARDIS
    const tardisTrailCount = 22;
    const tardisTrailPositions = new Float32Array(tardisTrailCount * 3);
    const tardisTrailGeo = new THREE.BufferGeometry();
    tardisTrailGeo.setAttribute('position', new THREE.BufferAttribute(tardisTrailPositions, 3));

    const tardisTrailMat = new THREE.PointsMaterial({
      size: 4.2,
      map: starTexture,
      transparent: true,
      opacity: 0.85,
      color: new THREE.Color(0x38bdf8),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const tardisTrail = new THREE.Points(tardisTrailGeo, tardisTrailMat);
    tardisTrail.visible = false;
    scene.add(tardisTrail);

    // Estado da TARDIS: a cada 30 segundos passa por 4 segundos na tela como cometa
    const tardisState = {
      timer: 24.0, // Inicia em 24s para o usuário ver a primeira passagem aos 6s!
      interval: 30.0,
      flyDuration: 4.0,
      isFlying: false,
      flyTimer: 0,
      startPos: new THREE.Vector3(),
      endPos: new THREE.Vector3(),
      history: [],
    };

    // 10. SCREEN-TO-WORLD UNPROJECT & OBSTACLE DETECTION
    const isSolidComponent = (el) => {
      // Quando o site está limpo, NENHUM componente bloqueia!
      if (blackHoleState.isSiteCleaned) return false;
      if (!el) return false;
      if (el.closest('button, a, input, textarea, select, [role="button"]')) return true;
      if (el.closest('.glass-panel, form, pre, [data-spotlight="true"], [role="dialog"], header, nav')) return true;
      const cardParent = el.closest('.bg-slate-900, .bg-slate-950, .rounded-2xl, .rounded-3xl, .shadow-xl, .shadow-2xl, .border-slate-800');
      if (cardParent && !cardParent.classList.contains('fixed') && !cardParent.classList.contains('pointer-events-none')) {
        return true;
      }
      return false;
    };

    const getScreenToWorldZ0 = (screenX, screenY) => {
      const d = camera.position.z - 0;
      const vH = 2 * Math.tan((camera.fov * Math.PI) / 360) * d;
      const vW = vH * (width / height);
      const ndcX = (screenX / width) * 2 - 1;
      const ndcY = -(screenY / height) * 2 + 1;
      return new THREE.Vector3(
        ndcX * (vW / 2) + camera.position.x,
        ndcY * (vH / 2) + camera.position.y,
        0
      );
    };

    const getScreenCoords = (obj3D) => {
      const worldPos = new THREE.Vector3();
      obj3D.getWorldPosition(worldPos);
      const p = worldPos.clone().project(camera);
      return {
        x: ((p.x + 1) * width) / 2,
        y: ((-p.y + 1) * height) / 2,
        isBehind: p.z > 1,
      };
    };

    const findSafeScreenWorldPosition = (avoidWorldPositions = [], bodyRadius = 3.5) => {
      const d = camera.position.z - 0;
      const vH = 2 * Math.tan((camera.fov * Math.PI) / 360) * d;
      const vW = vH * (width / height);

      const isMobile = width < 1024;
      if (isMobile) {
        return new THREE.Vector3(0, 1.2, 0);
      }

      const xRatios = [0.18, 0.28, 0.38, 0.52, 0.68, 0.78, 0.84];
      const yRatios = [0.22, 0.34, 0.48, 0.62, 0.74];

      const candidates = [];
      for (const rx of xRatios) {
        for (const ry of yRatios) {
          candidates.push({ sx: rx * width, sy: ry * height });
        }
      }
      candidates.sort(() => Math.random() - 0.5);

      let bestWorldPos = null;
      let bestScore = -999999;

      for (const cand of candidates) {
        const testPoints = [
          { x: cand.sx, y: cand.sy },
          { x: cand.sx + 45, y: cand.sy },
          { x: cand.sx - 45, y: cand.sy },
          { x: cand.sx, y: cand.sy + 45 },
          { x: cand.sx, y: cand.sy - 45 },
        ];

        let hitsSolid = false;
        for (const pt of testPoints) {
          if (pt.x < 15 || pt.x > width - 15 || pt.y < 75 || pt.y > height - 65) {
            hitsSolid = true;
            break;
          }
          const el = document.elementFromPoint(pt.x, pt.y);
          if (isSolidComponent(el)) {
            hitsSolid = true;
            break;
          }
        }

        const ndcX = (cand.sx / width) * 2 - 1;
        const ndcY = -(cand.sy / height) * 2 + 1;
        const worldX = ndcX * (vW / 2) + camera.position.x;
        const worldY = ndcY * (vH / 2) + camera.position.y;
        const candidateWorld = new THREE.Vector3(worldX, worldY, 0);

        let minClearance = 999;
        for (const avoidPos of avoidWorldPositions) {
          const dist = candidateWorld.distanceTo(avoidPos);
          if (dist < minClearance) {
            minClearance = dist;
          }
        }

        const score = (hitsSolid ? -1000 : 150) + Math.min(minClearance, 25);

        if (score > bestScore) {
          bestScore = score;
          bestWorldPos = candidateWorld;
          if (!hitsSolid && minClearance >= 9.5) {
            break;
          }
        }
      }

      if (!bestWorldPos) {
        const fallbackSide = Math.random() > 0.5 ? 1 : -1;
        bestWorldPos = new THREE.Vector3(fallbackSide * (vW * 0.32), 0.5, 0);
      }

      return bestWorldPos;
    };

    // START EARTH APPROACH
    const startEarthApproach = () => {
      scene.attach(earthGroup);

      const avoidPositions = activePlanets
        .filter((p) => p.state === 'APPROACHING' || p.state === 'CLOSE')
        .map((p) => {
          const wp = new THREE.Vector3();
          p.group.getWorldPosition(wp);
          return wp;
        });

      if (blackHoleState.phase === 'APPROACHING' || blackHoleState.phase === 'CLOSE') {
        const wp = new THREE.Vector3();
        blackHoleGroup.getWorldPosition(wp);
        avoidPositions.push(wp);
      }

      const safeTarget = findSafeScreenWorldPosition(avoidPositions, 3.5);

      earthState.startPos.copy(earthGroup.position);
      earthState.targetPos.copy(safeTarget);
      earthState.departPos.set(
        Math.cos(earthAngle + 1.2) * 44,
        -2.5,
        Math.sin(earthAngle + 1.2) * 44 - 48
      );

      earthState.current = 'APPROACHING';
      earthState.timer = 0;
      setHudText('🌍 Terra em aproximação orbital...');
      setHudActive(true);
    };

    triggerEarthRef.current = () => {
      if (earthState.current === 'ORBIT') {
        startEarthApproach();
      }
    };

    // TRIGGER TRASH SUCTION:
    // Surge logo ACIMA da lixeira, devagar, e suga tudo como um ralo!
    const triggerSuction = () => {
      if (blackHoleState.isSiteCleaned) return;
      blackHoleState.isSiteCleaned = true;
      setBlackHoleActiveUI(true);
      blackHoleGroup.visible = true;

      // Position black hole in scene right ACIMA da lixeira (screen x: ~140px, y: height - 160px)
      scene.attach(blackHoleGroup);
      const spawnPos = getScreenToWorldZ0(140, height - 160);
      blackHoleGroup.position.copy(spawnPos);
      blackHoleGroup.scale.setScalar(0.04);

      blackHoleState.phase = 'SPAWNING_SUCTION';
      blackHoleState.timer = 0;
      setHudText('🕳️ Buraco Negro se aproximando e crescendo no horizonte...');
      setHudActive(true);

      // Trava o scroll do body e reseta para o topo
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // 1. DÁ TEMPO DO BURACO NEGRO CHEGAR E FICAR MAIOR NO LADO ESQUERDO (~1.1s)
      setTimeout(() => {
        // 2. AGORA QUE ELE JÁ ESTÁ GRANDE NO LADO ESQUERDO, SIM COMEÇA A SUGAR OS COMPONENTES!
        setHudText('🕳️ Singularidade aberta! Sugando os componentes para o ralo...');
        if (onStartSuction) onStartSuction();

        // 3. Após o tempo da animação dos componentes (~1.4s), limpa a tela e coloca o buraco negro em órbita
        setTimeout(() => {
          if (onCompleteSuction) onCompleteSuction();

          // Anexa o Buraco Negro ao cosmosGroup para girar junto com o céu!
          blackHoleGroup.position.set(Math.cos(blackHoleState.angle) * 55, 3.5, Math.sin(blackHoleState.angle) * 55 - 45);
          blackHoleGroup.scale.setScalar(0.36);
          cosmosGroup.attach(blackHoleGroup);

          blackHoleState.phase = 'ORBIT';
          blackHoleState.timer = 0;
          setHudText('🕳️ Espaço 100% livre! Segure o Scroll do mouse (clique da rodinha) para girar o cosmos e clique nos planetas!');
        }, 1400);
      }, 1100);
    };

    triggerSuctionRef.current = triggerSuction;

    // TRIGGER COLLAPSE & EXPEL SITE BACK OUT (Upon 5 clicks or button)
    const triggerRestore = () => {
      if (!blackHoleState.isSiteCleaned || blackHoleState.phase === 'COLLAPSING') return;
      blackHoleState.phase = 'COLLAPSING';
      blackHoleState.timer = 0;
      setHudText('✨ Singularidade colapsada! Cuspindo os componentes de volta...');

      // Volta instantaneamente para o topo ao restaurar o site
      window.scrollTo({ top: 0, behavior: 'instant' });

      if (onStartRestore) onStartRestore();

      setTimeout(() => {
        blackHoleState.isSiteCleaned = false;
        setBlackHoleActiveUI(false);
        blackHoleState.clicks = 0;
        setBlackHoleClicksUI(0);

        // Retorna o Buraco Negro para sua órbita normal no cosmosGroup, visível para continuar explorando!
        blackHoleGroup.visible = true;
        blackHoleGroup.position.set(
          Math.cos(blackHoleState.angle) * blackHoleState.orbitRadius,
          4.2 + Math.sin(blackHoleState.angle * 1.6) * 2.8,
          Math.sin(blackHoleState.angle) * blackHoleState.orbitRadius - 48
        );
        blackHoleGroup.scale.setScalar(0.36);
        cosmosGroup.attach(blackHoleGroup);
        blackHoleState.phase = 'ORBIT';

        setHudActive(false);
        setHudText('Em órbita distante');
        document.body.style.overflow = '';
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (onCompleteRestore) onCompleteRestore();
      }, 1250);
    };

    triggerRestoreRef.current = triggerRestore;

    // Afasta todos os planetas que estejam próximos de volta para suas órbitas quando o usuário fecha o bot
    const dismissActivePlanets = () => {
      for (const p of activePlanets) {
        if (p.state === 'CLOSE' || p.state === 'APPROACHING') {
          p.state = 'DEPARTING';
          p.timer = 0;
          p.startPos.copy(p.group.position);
          setHudText(`Afastando ${p.name} de volta à sua órbita...`);
        }
      }
      if (earthState.current === 'CLOSE' || earthState.current === 'APPROACHING') {
        earthState.current = 'DEPARTING';
        earthState.timer = 0;
        earthState.startPos.copy(earthGroup.position);
        setHudText('Afastando Terra de volta à sua órbita...');
      }
      if (blackHoleState.phase === 'CLOSE' || blackHoleState.phase === 'APPROACHING') {
        blackHoleState.phase = 'DEPARTING';
        blackHoleState.timer = 0;
        blackHoleState.startPos.copy(blackHoleGroup.position);
        setHudText('Afastando Buraco Negro de volta à sua órbita profunda...');
      }
    };
    dismissPlanetsRef.current = dismissActivePlanets;

    let lastPlanetClickTime = 0;

    // 11. POINTER INTERACTION: SEGURAR O SCROLL DO MOUSE (MMB / CLIQUE DA RODINHA) PARA GIRAR O ESPAÇO!
    let isHoldingScrollButton = false;
    let activeGrabbedTarget = null;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isDraggingPlanet: false,
      dragStartPos: { x: 0, y: 0 },
      prevPos: { x: 0, y: 0 },
    };

    const handlePointerDown = (clientX, clientY, button = 0) => {
      mouse.dragStartPos = { x: clientX, y: clientY };
      mouse.prevPos = { x: clientX, y: clientY };

      // 1. SEGURAR O SCROLL DO MOUSE (BUTTON === 1 / CLIQUE DA RODINHA) GIRA O ESPAÇO!
      if (button === 1) {
        isHoldingScrollButton = true;
        setIsRotatingSpaceUI(true);
        setCursorMode('grabbing');
        return;
      }

      const el = document.elementFromPoint(clientX, clientY);
      
      // Em modo limpo, apenas os botões fixos da UI (Lixeira/Restaurar) barram o clique
      if (blackHoleState.isSiteCleaned) {
        if (el && el.closest('button, [role="button"]')) return;
      } else {
        const isButtonOrLink = el && el.closest('button, a, input, textarea, select, [role="button"]');
        if (isButtonOrLink) return;
      }

      // 2. Check if clicking on Large Black Hole when CLOSE (Counts towards 5 Clicks to Restore!)
      if (blackHoleState.phase === 'CLOSE' || blackHoleState.phase === 'APPROACHING') {
        const screen = getScreenCoords(blackHoleGroup);
        if (!screen.isBehind && Math.hypot(clientX - screen.x, clientY - screen.y) <= 290) {
          mouse.isDraggingPlanet = true;
          activeGrabbedTarget = 'blackhole';
          setCursorMode('grabbing');
          return;
        }
      }

      // 3. Check if clicking on Earth when CLOSE (Drag across screen)
      if (earthState.current === 'CLOSE' || earthState.current === 'APPROACHING') {
        const screen = getScreenCoords(earthGroup);
        if (!screen.isBehind && Math.hypot(clientX - screen.x, clientY - screen.y) <= 220) {
          mouse.isDraggingPlanet = true;
          activeGrabbedTarget = 'earth';
          setCursorMode('grabbing');
          setHudText('🌍 Arrastando Terra pela tela (Segure para mover!)');
          return;
        }
      }

      // 4. Check if clicking on a CLOSE Planet (Drag across screen)
      for (const p of activePlanets) {
        if (p.state === 'CLOSE' || p.state === 'APPROACHING') {
          const screen = getScreenCoords(p.group);
          if (!screen.isBehind) {
            const hitR = p.id === 'saturn' ? 260 : 210;
            if (Math.hypot(clientX - screen.x, clientY - screen.y) <= hitR) {
              mouse.isDraggingPlanet = true;
              activeGrabbedTarget = p;
              setCursorMode('grabbing');
              setHudText(`${p.emoji} Arrastando ${p.name} pela tela (Segure para mover!)`);
              return;
            }
          }
        }
      }

      // 5. Check if clicking on a DISTANT body embedded in the rotating cosmos!
      if (blackHoleState.isSiteCleaned || !isSolidComponent(el)) {
        // Distant Black Hole (Embedded in cosmosGroup - summon it!)
        if (blackHoleState.phase === 'ORBIT') {
          const bhScreen = getScreenCoords(blackHoleGroup);
          if (!bhScreen.isBehind && Math.hypot(clientX - bhScreen.x, clientY - bhScreen.y) <= 85) {
            const now = Date.now();
            if (now - lastPlanetClickTime > 1000) {
              lastPlanetClickTime = now;
              scene.attach(blackHoleGroup);

              const avoidList = [];
              if (earthState.current === 'APPROACHING' || earthState.current === 'CLOSE') {
                avoidList.push(earthGroup.position);
              }
              for (const other of activePlanets) {
                if (other.state === 'APPROACHING' || other.state === 'CLOSE') {
                  avoidList.push(other.group.position);
                }
              }
              blackHoleState.phase = 'APPROACHING';
              blackHoleState.timer = 0;
              blackHoleState.startPos.copy(blackHoleGroup.position);
              blackHoleState.targetPos.copy(findSafeScreenWorldPosition(avoidList, 5.5));
              setHudText('🕳️ Buraco Negro Gargantua em aproximação orbital...');
              setHudActive(true);
              if (onPlanetClick) onPlanetClick('blackhole');
            }
            return;
          }
        }

        // Distant Earth click
        if (earthState.current === 'ORBIT') {
          const earthScreen = getScreenCoords(earthGroup);
          if (!earthScreen.isBehind && Math.hypot(clientX - earthScreen.x, clientY - earthScreen.y) <= 60) {
            const now = Date.now();
            if (now - lastPlanetClickTime > 1000) {
              lastPlanetClickTime = now;
              startEarthApproach();
              if (onPlanetClick) onPlanetClick('earth');
            }
            return;
          }
        }

        // Distant Planet click (Embedded in cosmosGroup - summon it!)
        for (const p of activePlanets) {
          if (p.state === 'ORBIT') {
            const screen = getScreenCoords(p.group);
            if (!screen.isBehind && Math.hypot(clientX - screen.x, clientY - screen.y) <= 60) {
              const now = Date.now();
              if (now - lastPlanetClickTime > 1000) {
                lastPlanetClickTime = now;
                scene.attach(p.group);

                const avoidList = [];
                if (earthState.current === 'APPROACHING' || earthState.current === 'CLOSE') {
                  avoidList.push(earthGroup.position);
                }
                if (blackHoleState.phase === 'APPROACHING' || blackHoleState.phase === 'CLOSE') {
                  avoidList.push(blackHoleGroup.position);
                }
                for (const other of activePlanets) {
                  if (other !== p && (other.state === 'APPROACHING' || other.state === 'CLOSE')) {
                    avoidList.push(other.group.position);
                  }
                }

                p.state = 'APPROACHING';
                p.timer = 0;
                p.startPos.copy(p.group.position);
                p.targetPos.copy(findSafeScreenWorldPosition(avoidList, p.radius));

                setHudText(`${p.emoji} ${p.name} em aproximação orbital...`);
                setHudActive(true);
                if (onPlanetClick) onPlanetClick(p.id);
              }
              return;
            }
          }
        }
      }
    };

    const handlePointerMove = (clientX, clientY, isTwoFingerTouch = false) => {
      mouse.targetX = (clientX / width) * 2 - 1;
      mouse.targetY = -(clientY / height) * 2 + 1;

      // ROTATING THE 3D COSMOS: SOMENTE AO SEGURAR O SCROLL DO MOUSE (OU DOIS DEDOS EM TOUCH)!
      if (isHoldingScrollButton || isTwoFingerTouch) {
        const deltaX = clientX - mouse.prevPos.x;
        const deltaY = clientY - mouse.prevPos.y;
        cosmosGroup.rotation.y += deltaX * 0.0055;
        cosmosGroup.rotation.x += deltaY * 0.0055;
        mouse.prevPos = { x: clientX, y: clientY };
        return;
      }

      // DRAGGING A CLOSE CELESTIAL BODY ACROSS SCREEN
      if (mouse.isDraggingPlanet && activeGrabbedTarget) {
        const deltaX = clientX - mouse.prevPos.x;
        const deltaY = clientY - mouse.prevPos.y;

        const targetGroup =
          activeGrabbedTarget === 'earth'
            ? earthGroup
            : activeGrabbedTarget === 'blackhole'
            ? blackHoleGroup
            : activeGrabbedTarget.group;

        const d = camera.position.z - targetGroup.position.z;
        const vH = 2 * Math.tan((camera.fov * Math.PI) / 360) * d;
        const vW = vH * (width / height);

        const worldDeltaX = (deltaX / width) * vW;
        const worldDeltaY = -(deltaY / height) * vH;

        targetGroup.position.x += worldDeltaX;
        targetGroup.position.y += worldDeltaY;

        if (activeGrabbedTarget === 'earth') {
          earthState.targetPos.copy(earthGroup.position);
          earthMesh.rotation.y += deltaX * 0.006;
          cloudsMesh.rotation.y += deltaX * 0.006;
        } else if (activeGrabbedTarget === 'blackhole') {
          blackHoleState.targetPos.copy(blackHoleGroup.position);
        } else {
          activeGrabbedTarget.targetPos.copy(targetGroup.position);
          activeGrabbedTarget.mesh.rotation.y += deltaX * 0.006;
        }

        mouse.prevPos = { x: clientX, y: clientY };
        return;
      }

      // Hover detections
      const el = document.elementFromPoint(clientX, clientY);
      let foundHover = null;
      let nextCursor = 'default';

      // 1. Hover on Close Black Hole
      if (blackHoleState.phase === 'CLOSE' || blackHoleState.phase === 'APPROACHING') {
        const screen = getScreenCoords(blackHoleGroup);
        if (!screen.isBehind && Math.hypot(clientX - screen.x, clientY - screen.y) <= 290) {
          nextCursor = 'pointer';
          foundHover = blackHoleState.isSiteCleaned
            ? `🕳️ Buraco Negro [${blackHoleState.clicks}/5 cliques para restaurar o site]`
            : '🕳️ Buraco Negro Gargantua (Clique e segure para arrastar!)';
        }
      }

      // 2. Hover on Close Earth or Planets
      if (!foundHover && (earthState.current === 'CLOSE' || earthState.current === 'APPROACHING')) {
        const screen = getScreenCoords(earthGroup);
        if (!screen.isBehind && Math.hypot(clientX - screen.x, clientY - screen.y) <= 200) {
          nextCursor = 'grab';
          foundHover = '🌍 Terra (Clique e segure para arrastar!)';
        }
      }

      if (!foundHover) {
        for (const p of activePlanets) {
          if (p.state === 'CLOSE' || p.state === 'APPROACHING') {
            const screen = getScreenCoords(p.group);
            if (!screen.isBehind && Math.hypot(clientX - screen.x, clientY - screen.y) <= 220) {
              nextCursor = 'grab';
              foundHover = `${p.emoji} ${p.name} (Clique e segure para arrastar!)`;
              break;
            }
          }
        }
      }

      // 3. Hover on Distant bodies in open space (embedded in the cosmos!)
      if (!foundHover && (blackHoleState.isSiteCleaned || !isSolidComponent(el))) {
        if (blackHoleState.phase === 'ORBIT') {
          const bhScreen = getScreenCoords(blackHoleGroup);
          if (!bhScreen.isBehind && Math.hypot(clientX - bhScreen.x, clientY - bhScreen.y) <= 80) {
            nextCursor = 'pointer';
            foundHover = '🕳️ Buraco Negro Gargantua (Clique para aproximar!)';
          }
        }

        if (!foundHover && earthState.current === 'ORBIT') {
          const earthScreen = getScreenCoords(earthGroup);
          if (!earthScreen.isBehind && Math.hypot(clientX - earthScreen.x, clientY - earthScreen.y) <= 55) {
            nextCursor = 'pointer';
            foundHover = '🌍 Terra Terrestre (Clique para aproximar!)';
          }
        }

        if (!foundHover) {
          for (const p of activePlanets) {
            if (p.state === 'ORBIT') {
              const screen = getScreenCoords(p.group);
              if (!screen.isBehind && Math.hypot(clientX - screen.x, clientY - screen.y) <= 55) {
                nextCursor = 'pointer';
                foundHover = `${p.emoji} ${p.name} (Clique para aproximar!)`;
                break;
              }
            }
          }
        }
      }

      setHoveredTarget(foundHover);
      setCursorMode(nextCursor);
      mouse.prevPos = { x: clientX, y: clientY };
    };

    const handlePointerUp = (clientX, clientY, button = 0) => {
      // SOLTOU O SCROLL DO MOUSE (BUTTON === 1): PARA IMEDIATAMENTE O GIRO!
      if (button === 1 || isHoldingScrollButton) {
        isHoldingScrollButton = false;
        setIsRotatingSpaceUI(false);
        setCursorMode('default');
      }

      // 5 CLIQUES NO BURACO NEGRO GRANDE PARA RESTAURAR O SITE!
      if (blackHoleState.isSiteCleaned && activeGrabbedTarget === 'blackhole' && blackHoleState.phase === 'CLOSE') {
        const movedDist = Math.hypot(clientX - mouse.dragStartPos.x, clientY - mouse.dragStartPos.y);
        if (movedDist < 12) {
          blackHoleState.clicks += 1;
          setBlackHoleClicksUI(blackHoleState.clicks);
          blackHoleState.pulseScale = 1.35;

          if (blackHoleState.clicks >= 5) {
            triggerRestore();
          } else {
            setHudText(`🕳️ Colapso da Singularidade: [${blackHoleState.clicks}/5 cliques para restaurar o site]`);
          }
        }
      }

      mouse.isDraggingPlanet = false;
      activeGrabbedTarget = null;
    };

    const onMouseDown = (e) => {
      if (e.button === 1) e.preventDefault();
      handlePointerDown(e.clientX, e.clientY, e.button);
    };
    const onMouseMove = (e) => handlePointerMove(e.clientX, e.clientY, false);
    const onMouseUp = (e) => {
      if (e.button === 1) e.preventDefault();
      handlePointerUp(e.clientX, e.clientY, e.button);
    };

    const onAuxClick = (e) => {
      if (e.button === 1) e.preventDefault(); // Prevents autoscroll icon
    };

    const onWindowBlur = () => {
      isHoldingScrollButton = false;
      setIsRotatingSpaceUI(false);
      setCursorMode('default');
      mouse.isDraggingPlanet = false;
      activeGrabbedTarget = null;
    };

    let isTouchTwoFinger = false;
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isTouchTwoFinger = false;
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY, 0);
      } else if (e.touches.length === 2) {
        isTouchTwoFinger = true;
        mouse.prevPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (e.touches.length === 1 && !isTouchTwoFinger) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY, false);
      } else if (e.touches.length === 2) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    };
    const onTouchEnd = (e) => {
      isTouchTwoFinger = false;
      const touch = e.changedTouches[0] || { clientX: mouse.prevPos.x, clientY: mouse.prevPos.y };
      handlePointerUp(touch.clientX, touch.clientY, 0);
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('auxclick', onAuxClick);
    window.addEventListener('blur', onWindowBlur);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 12. Main Animation & Physics Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Orient Gargantua toward camera and update inward plasma flow
      gargantuaMesh.lookAt(camera.position);
      gargantuaUniforms.uTime.value = elapsed;

      // Cosmic background idle slow drift (when user is not rotating with scroll click)
      if (!isHoldingScrollButton && !isTouchTwoFinger) {
        cosmosGroup.rotation.y += dt * 0.04;
      }

      // Parallax camera movement
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;
      camera.position.x = mouse.x * 1.6;
      camera.position.y = mouse.y * 1.2;
      camera.lookAt(0, 0, 0);

      // EARTH ROTATION & LIFECYCLE
      if (!mouse.isDraggingPlanet || activeGrabbedTarget !== 'earth') {
        earthMesh.rotation.y += 0.0012;
        cloudsMesh.rotation.y += 0.0016;
      }

      switch (earthState.current) {
        case 'ORBIT':
          earthAngle += dt * 0.035;
          earthGroup.position.x = Math.cos(earthAngle) * 44;
          earthGroup.position.z = Math.sin(earthAngle) * 44 - 48;
          earthGroup.position.y = 1.8 + Math.sin(earthAngle * 1.5) * 2.5;

          earthState.currentScale = 0.16;
          earthGroup.scale.setScalar(earthState.currentScale);

          earthState.timer += dt;
          if (earthState.timer >= earthState.orbitDuration) {
            startEarthApproach();
          }
          break;

        case 'APPROACHING':
          earthState.timer += dt;
          const appT = Math.min(1, earthState.timer / 3.0);
          const easeApp = appT < 0.5 ? 4 * appT * appT * appT : 1 - Math.pow(-2 * appT + 2, 3) / 2;

          earthState.currentScale = THREE.MathUtils.lerp(0.16, 1.0, easeApp);
          earthGroup.scale.setScalar(earthState.currentScale);
          earthGroup.position.lerpVectors(earthState.startPos, earthState.targetPos, easeApp);

          if (appT >= 1) {
            earthState.current = 'CLOSE';
            earthState.timer = 0;
            setHudText('🌍 Terra Hiper-Realista (Segure e arraste para mover!)');
          }
          break;

        case 'CLOSE':
          earthState.timer += dt;
          earthState.currentScale = 1.0;
          earthGroup.scale.setScalar(1.0);

          if (!mouse.isDraggingPlanet || activeGrabbedTarget !== 'earth') {
            const driftOffset = Math.sin(elapsed * 0.8) * 0.22;
            earthGroup.position.y = earthState.targetPos.y + driftOffset;
            earthGroup.position.x = earthState.targetPos.x + Math.cos(elapsed * 0.5) * 0.25;
          }

          if (earthState.timer >= earthState.closeDuration) {
            earthState.current = 'DEPARTING';
            earthState.timer = 0;
            earthState.startPos.copy(earthGroup.position);
            setHudText('Afastando Terra de volta à órbita...');
          }
          break;

        case 'DEPARTING':
          earthState.timer += dt;
          const depT = Math.min(1, earthState.timer / 3.0);
          const easeDep = depT < 0.5 ? 4 * depT * depT * depT : 1 - Math.pow(-2 * depT + 2, 3) / 2;

          const returnPos = new THREE.Vector3(
            Math.cos(earthAngle) * 44,
            1.8,
            Math.sin(earthAngle) * 44 - 48
          );

          earthState.currentScale = THREE.MathUtils.lerp(1.0, 0.16, easeDep);
          earthGroup.scale.setScalar(earthState.currentScale);
          earthGroup.position.lerpVectors(earthState.startPos, returnPos, easeDep);

          if (depT >= 1) {
            cosmosGroup.attach(earthGroup);
            earthState.current = 'ORBIT';
            earthState.timer = 0;
            earthState.currentScale = 0.16;
            setHudActive(false);
            setHudText('Em órbita distante');
          }
          break;
      }

      // DISTANT PLANETS LIFECYCLE
      for (const p of activePlanets) {
        if (!mouse.isDraggingPlanet || activeGrabbedTarget !== p) {
          p.mesh.rotation.y += 0.003;
        }

        switch (p.state) {
          case 'ORBIT':
            p.angle += dt * p.orbitSpeed;
            p.group.position.x = Math.cos(p.angle) * p.orbitRadius;
            p.group.position.z = Math.sin(p.angle) * p.orbitRadius - 45;
            p.group.position.y = p.yOffset + Math.sin(p.angle * 2) * 1.6;
            p.currentScale = p.distantRadius / p.radius;
            p.group.scale.setScalar(p.currentScale);
            break;

          case 'APPROACHING':
            p.timer += dt;
            const pApp = Math.min(1, p.timer / 3.0);
            const easePApp = pApp < 0.5 ? 4 * pApp * pApp * pApp : 1 - Math.pow(-2 * pApp + 2, 3) / 2;

            p.currentScale = THREE.MathUtils.lerp(p.distantRadius / p.radius, 1.0, easePApp);
            p.group.scale.setScalar(p.currentScale);
            p.group.position.lerpVectors(p.startPos, p.targetPos, easePApp);

            if (pApp >= 1) {
              p.state = 'CLOSE';
              p.timer = 0;
              setHudText(`${p.emoji} ${p.name} (Segure e arraste para mover!)`);
            }
            break;

          case 'CLOSE':
            p.timer += dt;
            p.currentScale = 1.0;
            p.group.scale.setScalar(1.0);

            if (!mouse.isDraggingPlanet || activeGrabbedTarget !== p) {
              p.group.position.y = p.targetPos.y + Math.sin(elapsed * 0.85 + p.orbitRadius) * 0.22;
              p.group.position.x = p.targetPos.x + Math.cos(elapsed * 0.55 + p.orbitRadius) * 0.25;
            }

            if (p.timer >= 10.0) {
              p.state = 'DEPARTING';
              p.timer = 0;
              p.startPos.copy(p.group.position);
              setHudText(`Afastando ${p.name} de volta à sua órbita...`);
            }
            break;

          case 'DEPARTING':
            p.timer += dt;
            const pDep = Math.min(1, p.timer / 3.0);
            const easePDep = pDep < 0.5 ? 4 * pDep * pDep * pDep : 1 - Math.pow(-2 * pDep + 2, 3) / 2;

            const orbitReturn = new THREE.Vector3(
              Math.cos(p.angle) * p.orbitRadius,
              p.yOffset,
              Math.sin(p.angle) * p.orbitRadius - 45
            );

            p.currentScale = THREE.MathUtils.lerp(1.0, p.distantRadius / p.radius, easePDep);
            p.group.scale.setScalar(p.currentScale);
            p.group.position.lerpVectors(p.startPos, orbitReturn, easePDep);

            if (pDep >= 1) {
              cosmosGroup.attach(p.group);
              p.state = 'ORBIT';
              p.timer = 0;
              setHudActive(false);
              setHudText('Em órbita distante');
            }
            break;
        }
      }

      // GARGANTUA BLACK HOLE LIFECYCLE
      if (blackHoleState.active) {
        blackHoleState.pulseScale = THREE.MathUtils.lerp(blackHoleState.pulseScale, 1.0, 0.08);

        switch (blackHoleState.phase) {
          case 'SPAWNING_SUCTION':
            // Surge no lado esquerdo acima da lixeira e cresce até ficar grande e imponente (~0.65)!
            blackHoleState.timer += dt;
            const spawnProgress = Math.min(1, blackHoleState.timer / 1.05);
            // Ease out cubic para uma chegada suave e impactante
            const easeSpawn = 1 - Math.pow(1 - spawnProgress, 3);
            blackHoleState.currentScale = THREE.MathUtils.lerp(0.04, 0.65, easeSpawn);
            blackHoleGroup.scale.setScalar(blackHoleState.currentScale * blackHoleState.pulseScale);
            break;

          case 'ORBIT':
            blackHoleState.angle += dt * 0.028;
            blackHoleGroup.position.x = Math.cos(blackHoleState.angle) * blackHoleState.orbitRadius;
            blackHoleGroup.position.z = Math.sin(blackHoleState.angle) * blackHoleState.orbitRadius - 48;
            blackHoleGroup.position.y = 4.2 + Math.sin(blackHoleState.angle * 1.6) * 2.8;

            blackHoleState.currentScale = 0.36;
            blackHoleGroup.scale.setScalar(blackHoleState.currentScale);
            break;

          case 'APPROACHING':
            blackHoleState.timer += dt;
            const bhApp = Math.min(1, blackHoleState.timer / 3.0);
            const easeBhApp = bhApp < 0.5 ? 4 * bhApp * bhApp * bhApp : 1 - Math.pow(-2 * bhApp + 2, 3) / 2;

            blackHoleState.currentScale = THREE.MathUtils.lerp(0.36, 1.55, easeBhApp);
            blackHoleGroup.scale.setScalar(blackHoleState.currentScale * blackHoleState.pulseScale);
            blackHoleGroup.position.lerpVectors(blackHoleState.startPos, blackHoleState.targetPos, easeBhApp);

            if (bhApp >= 1) {
              blackHoleState.phase = 'CLOSE';
              blackHoleState.timer = 0;
              setHudText(
                blackHoleState.isSiteCleaned
                  ? '🕳️ Buraco Negro Gigante (Fica 10s! Clique 5 vezes nele para restaurar o site)'
                  : '🕳️ Buraco Negro Gargantua (Horizonte de Eventos)'
              );
            }
            break;

          case 'CLOSE':
            blackHoleState.timer += dt;
            blackHoleState.currentScale = 1.55;
            blackHoleGroup.scale.setScalar(blackHoleState.currentScale * blackHoleState.pulseScale);

            if (!mouse.isDraggingPlanet || activeGrabbedTarget !== 'blackhole') {
              blackHoleGroup.position.y = blackHoleState.targetPos.y + Math.sin(elapsed * 0.9) * 0.22;
              blackHoleGroup.position.x = blackHoleState.targetPos.x + Math.cos(elapsed * 0.6) * 0.25;
            }

            // APÓS 10 SEGUNDOS VOLTA À ÓRBITA IGUAL AOS OUTROS PLANETAS!
            // Só se o usuário clicar 5 vezes nele que faz o colapso e restauração do site!
            if (blackHoleState.timer >= 10.0) {
              blackHoleState.phase = 'DEPARTING';
              blackHoleState.timer = 0;
              blackHoleState.startPos.copy(blackHoleGroup.position);
              setHudText('Afastando Buraco Negro de volta à sua órbita profunda...');
            }
            break;

          case 'DEPARTING':
            blackHoleState.timer += dt;
            const bhDep = Math.min(1, blackHoleState.timer / 3.0);
            const easeBhDep = bhDep < 0.5 ? 4 * bhDep * bhDep * bhDep : 1 - Math.pow(-2 * bhDep + 2, 3) / 2;

            const bhOrbitReturn = new THREE.Vector3(
              Math.cos(blackHoleState.angle) * blackHoleState.orbitRadius,
              4.2,
              Math.sin(blackHoleState.angle) * blackHoleState.orbitRadius - 48
            );

            blackHoleState.currentScale = THREE.MathUtils.lerp(1.55, 0.36, easeBhDep);
            blackHoleGroup.scale.setScalar(blackHoleState.currentScale);
            blackHoleGroup.position.lerpVectors(blackHoleState.startPos, bhOrbitReturn, easeBhDep);

            if (bhDep >= 1) {
              cosmosGroup.attach(blackHoleGroup);
              blackHoleState.phase = 'ORBIT';
              blackHoleState.timer = 0;
              blackHoleState.clicks = 0;
              setBlackHoleClicksUI(0);
              setHudActive(false);
              setHudText('Em órbita distante');
            }
            break;

          case 'COLLAPSING':
            blackHoleState.timer += dt;
            const colP = Math.min(1, blackHoleState.timer / 0.7);
            const easeCol = Math.pow(colP, 2);
            blackHoleState.currentScale = THREE.MathUtils.lerp(1.55, 0.001, easeCol);
            blackHoleGroup.scale.setScalar(blackHoleState.currentScale);
            break;
        }
      }

      // ANTI-COLLISION REPULSION: Keep close celestial bodies from ever clipping
      const activeBodies = [];
      if (earthState.current === 'APPROACHING' || earthState.current === 'CLOSE') {
        activeBodies.push({ group: earthGroup, radius: 3.8, id: 'earth' });
      }
      for (const p of activePlanets) {
        if (p.state === 'APPROACHING' || p.state === 'CLOSE') {
          activeBodies.push({
            group: p.group,
            radius: p.id === 'saturn' ? 6.2 : p.radius,
            id: p.id,
          });
        }
      }
      if (blackHoleState.active && (blackHoleState.phase === 'APPROACHING' || blackHoleState.phase === 'CLOSE' || blackHoleState.phase === 'DEPARTING')) {
        activeBodies.push({ group: blackHoleGroup, radius: 6.5, id: 'blackhole' });
      }

      for (let i = 0; i < activeBodies.length; i++) {
        for (let j = i + 1; j < activeBodies.length; j++) {
          const b1 = activeBodies[i];
          const b2 = activeBodies[j];
          const minDist = b1.radius + b2.radius + 1.2;
          const dist = b1.group.position.distanceTo(b2.group.position);
          if (dist < minDist && dist > 0.001) {
            const overlap = (minDist - dist) * 0.5;
            const push = b1.group.position.clone().sub(b2.group.position).normalize().multiplyScalar(overlap);
            b1.group.position.add(push);
            b2.group.position.sub(push);
          }
        }
      }

      // ==========================================
      // ATUALIZAÇÃO DA TARDIS (PASSAGEM CÓSMICA A CADA 30S)
      // ==========================================
      tardisState.timer += dt;
      if (!tardisState.isFlying && tardisState.timer >= tardisState.interval) {
        // Dispara a passagem de cometa da TARDIS
        tardisState.isFlying = true;
        tardisState.flyTimer = 0;
        tardisState.timer = 0;
        tardisGroup.visible = true;
        tardisTrail.visible = true;
        tardisState.history = [];

        // Trajetória diagonal suave pelo campo de visão visível da câmera
        const fromLeft = Math.random() > 0.5;
        const startX = fromLeft ? -28 : 28;
        const endX = fromLeft ? 28 : -28;
        const startY = THREE.MathUtils.randFloat(7, 13);
        const endY = THREE.MathUtils.randFloat(-11, -5);
        const startZ = THREE.MathUtils.randFloat(-10, -5);
        const endZ = THREE.MathUtils.randFloat(1, 5);

        tardisState.startPos.set(startX, startY, startZ);
        tardisState.endPos.set(endX, endY, endZ);
        tardisGroup.position.copy(tardisState.startPos);
        tardisGroup.rotation.set(0, 0, 0);
      }

      if (tardisState.isFlying) {
        tardisState.flyTimer += dt;
        const progress = Math.min(1.0, tardisState.flyTimer / tardisState.flyDuration);

        // Movimento suave de 0 a 1 em exatamente 4 segundos
        tardisGroup.position.lerpVectors(tardisState.startPos, tardisState.endPos, progress);

        // Mantém a TARDIS 100% em pé (vertical), girando suavemente em torno do próprio eixo Y
        tardisGroup.rotation.x = 0;
        tardisGroup.rotation.z = 0;
        tardisGroup.rotation.y += dt * 2.8;

        // Pulso rápido da lanterna luminosa do teto
        const pulse = 0.5 + 0.5 * Math.sin(tardisState.flyTimer * 28.0);
        lampBulbMat.opacity = 0.4 + 0.6 * pulse;
        tardisLight.intensity = 0.8 + 1.2 * pulse;

        // Atualização dos pontos do rastro cósmico de cometa
        tardisState.history.unshift(tardisGroup.position.clone());
        if (tardisState.history.length > tardisTrailCount) {
          tardisState.history.pop();
        }

        const posAttr = tardisTrailGeo.attributes.position;
        for (let i = 0; i < tardisTrailCount; i++) {
          const pt = tardisState.history[i] || tardisGroup.position;
          posAttr.setXYZ(i, pt.x, pt.y, pt.z);
        }
        posAttr.needsUpdate = true;

        if (progress >= 1.0) {
          // Terminaram os 4 segundos -> TARDIS some da tela até os próximos 30s!
          tardisState.isFlying = false;
          tardisGroup.visible = false;
          tardisTrail.visible = false;
          tardisState.history = [];
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('auxclick', onAuxClick);
      window.removeEventListener('blur', onWindowBlur);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTexture.dispose();
      constGeo.dispose();
      constMat.dispose();
      constStarsGeo.dispose();
      constStarsMat.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      cloudsGeo.dispose();
      cloudsMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      gargantuaQuadGeo.dispose();
      gargantuaShaderMat.dispose();
      tardisBodyGeo.dispose();
      tardisWallTex.dispose();
      plinthGeo.dispose();
      pillarGeo.dispose();
      roofBaseGeo.dispose();
      roofMidGeo.dispose();
      lampCupGeo.dispose();
      lampBulbGeo.dispose();
      tardisTrailGeo.dispose();
      tardisTrailMat.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Solar System & Gargantua Canvas */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-0 select-none overflow-hidden"
        style={{
          cursor:
            cursorMode === 'grabbing'
              ? 'grabbing'
              : cursorMode === 'grab'
              ? 'grab'
              : cursorMode === 'pointer'
              ? 'pointer'
              : 'default',
        }}
        aria-hidden="true"
      />

      {/* Floating Hover Indicator when cursor is over Earth, Black Hole, or distant planet in open space */}
      {hoveredTarget && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-fade-in">
          <div className="rounded-full bg-slate-900/95 border border-cyan-500/60 px-5 py-2 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-2xl flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">{hoveredTarget}</span>
          </div>
        </div>
      )}

      {/* Floating Scroll-to-Rotate Hint when in clean mode */}
      {blackHoleActiveUI && (
        <div className="fixed top-6 right-6 z-30 pointer-events-none animate-pulse">
          <div className="rounded-xl border border-cyan-500/40 bg-slate-900/90 px-3.5 py-2 text-[11px] font-mono text-cyan-300 backdrop-blur-md shadow-2xl flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${isRotatingSpaceUI ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
            <span>{isRotatingSpaceUI ? 'Girando o cosmos...' : 'Segure o Scroll (rodinha) e mexa o mouse para girar o espaço'}</span>
          </div>
        </div>
      )}

      {/* CONTROLE INFERIOR ESQUERDO: Apenas a lixeira (quando normal) ou o botão de voltar (quando limpo) */}
      <div className="fixed bottom-6 left-6 z-30 flex items-center">
        {!blackHoleActiveUI ? (
          /* 1. LIXEIRA (Único elemento no canto inferior esquerdo no modo normal) */
          <button
            onClick={() => triggerSuctionRef.current && triggerSuctionRef.current()}
            className="group flex items-center gap-2 rounded-xl border border-rose-500/40 bg-slate-900/85 px-3.5 py-2 text-xs font-mono text-rose-300 backdrop-blur-md hover:border-rose-400 hover:bg-rose-950/50 hover:text-white hover:shadow-[0_0_18px_rgba(244,63,94,0.4)] hover:-translate-y-0.5 transition-all shadow-2xl"
            title="Limpar Site: Buraco Negro surge no lado esquerdo e suga os componentes!"
          >
            <Trash2 className="h-3.5 w-3.5 text-rose-400 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
            <span className="text-[11px] font-medium hidden sm:inline">Limpar Site</span>
          </button>
        ) : (
          /* 2. BOTÃO PARA VOLTAR (Aparece quando o site estiver limpo) */
          <button
            onClick={() => triggerRestoreRef.current && triggerRestoreRef.current()}
            className="group flex items-center gap-2 rounded-xl border border-emerald-500/60 bg-slate-900/95 px-4 py-2 text-xs font-mono text-emerald-300 backdrop-blur-md hover:border-emerald-300 hover:bg-emerald-950/80 hover:text-white hover:shadow-[0_0_22px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all shadow-2xl shadow-emerald-500/25 animate-pulse"
            title="Voltar ao Site: Restaura todos os componentes do portfólio"
          >
            <RotateCcw className="h-3.5 w-3.5 text-emerald-400 group-hover:-rotate-90 transition-transform" />
            <span className="text-[11px] font-bold">Voltar ao Site</span>
          </button>
        )}
      </div>
    </>
  );
}
