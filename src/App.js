import { useRef, useState, useLayoutEffect } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  AccumulativeShadows,
  RandomizedLight,
  OrbitControls,
  Environment,
  useGLTF,
  Clouds,
  Cloud,
  PositionalAudio,
  SpriteAnimator,
  Html,
} from "@react-three/drei";

import * as THREE from "three";

import ExplosionConfetti from "./confetti";

import "./App.css";

function Teddy(props) {
  const { scene, materials } = useGLTF("/models/teddy-bear.glb");

  useLayoutEffect(() => {
    scene.traverse(
      (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true)
    );
    const t = "TCom_Paint_GoldFake_1K_";
    const normal = new THREE.TextureLoader().load(
      `/models/textures/${t}normal.jpg`
    );

    materials["Material.019"].normalMap = normal;
    materials["Material.019"].normalMap.wrapS = THREE.RepeatWrapping;
    materials["Material.019"].normalMap.wrapT = THREE.RepeatWrapping;
    materials["Material.019"].normalMap.repeat.set(10, 10);
    materials["Material.019"].normalScale.set(2, 2);
  });
  return <primitive object={scene} {...props} />;
}

function Cake(props) {
  const { scene } = useGLTF("/models/heart-cake-2.glb");

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;

        // Check if the object has the material you want to modify
        if (obj.material && obj.material.name === "Материал.010") {
          const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(1, 1, 1),
            metalness: 0.5,
            roughness: 0.1,
            transparent: true,
            opacity: 1, // Adjust the opacity as needed
          });

          // Replace the existing material with the glass material
          obj.material = glassMaterial;
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

function Radio(props) {
  const { scene, materials } = useGLTF("/models/radio.glb");
  const ref = useRef();
  let lastDelta = 0;
  let deltaSum = 0;
  let currentRotation = 0.03;
  let topPosition = -0.35;
  let topRotation = 0;

  useFrame((_state, delta) => {
    deltaSum += delta;
    if (deltaSum - lastDelta > 0.27) {
      lastDelta = delta;
      deltaSum = 0;
      if (ref.current.rotation.z !== topRotation) {
        ref.current.rotation.z = topRotation;
        ref.current.position.y = topPosition;
      } else {
        ref.current.rotation.z =
          Math.round(Math.random(1)) === 1 ? currentRotation : -currentRotation;
        ref.current.position.y = -0.34;
      }
    }
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        const normal = new THREE.TextureLoader().load(
          `/models/textures/RadioDis.jpg`
        );

        materials["BMD_PBRMetallic"].normalMap = normal;
        materials["BMD_PBRMetallic"].normalMap.wrapS = THREE.RepeatWrapping;
        materials["BMD_PBRMetallic"].normalMap.wrapT = THREE.RepeatWrapping;
        materials["BMD_PBRMetallic"].normalMap.repeat.set(1, 1);
        materials["BMD_PBRMetallic"].normalScale.set(1, 1);
      }
    });
  }, [scene, materials]);

  return <primitive ref={ref} object={scene} {...props} />;
}

function Rose(props) {
  const { scene, materials } = useGLTF("/models/rose2.glb");

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;

        const t = "TCom_Paint_GoldFake_1K_";

        const normal = new THREE.TextureLoader().load(
          `/models/textures/${t}normal.jpg`
        );
        const metallic = new THREE.TextureLoader().load(
          `/models/textures/${t}metallic.jpg`
        );
        const height = new THREE.TextureLoader().load(
          `/models/textures/${t}height.jpg`
        );

        materials["Material.001"].color.set("darkpink");

        materials["Material.001"].roughness = 0.3;
        materials["Material.001"].metalness = 1;

        materials["Material.001"].transparent = true;
        materials["Material.001"].opacity = 1;

        materials["Material.001"].metalnessMap = metallic;
        materials["Material.001"].metalnessMap.wrapS = THREE.RepeatWrapping;
        materials["Material.001"].metalnessMap.wrapT = THREE.RepeatWrapping;
        materials["Material.001"].metalnessMap.repeat.set(10, 10);

        materials["Material.001"].displacementMap = height;
        materials["Material.001"].displacementMap.wrapS = THREE.RepeatWrapping;
        materials["Material.001"].displacementMap.wrapT = THREE.RepeatWrapping;
        materials["Material.001"].displacementMap.repeat.set(10, 10);
        materials["Material.001"].displacementScale = 0.01;

        materials["Material.001"].normalMap = normal;
        materials["Material.001"].normalMap.wrapS = THREE.RepeatWrapping;
        materials["Material.001"].normalMap.wrapT = THREE.RepeatWrapping;
        materials["Material.001"].normalMap.repeat.set(10, 10);
        materials["Material.001"].normalScale.set(1, 1);
      }
    });
  }, [scene, materials]);

  return <primitive object={scene} {...props} />;
}

function PhotoFrame(props) {
  const { scene } = useGLTF("/models/photo_frame.glb");

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

function RedBaloon(props) {
  const { scene } = useGLTF("/models/red_baloon.glb");
  const ref = useRef();
  const [rotateRight, setRotateRight] = useState(false);

  useFrame((_state, delta) => {
    if (ref.current.rotation.y > 3.34) {
      setRotateRight(false);
    }
    if (ref.current.rotation.y < 2.94) {
      setRotateRight(true);
    }

    rotateRight
      ? (ref.current.rotation.y += delta / 20)
      : (ref.current.rotation.y -= delta / 20);
    rotateRight
      ? (ref.current.position.y += delta / 400)
      : (ref.current.position.y -= delta / 400);
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = false;
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} {...props} />;
}

function RedBaloon2(props) {
  const { scene } = useGLTF("/models/red_baloon2.glb");
  const ref = useRef();
  const [rotateRight, setRotateRight] = useState(true);

  useFrame((_state, delta) => {
    if (ref.current.rotation.y > 3.34) {
      setRotateRight(false);
    }
    if (ref.current.rotation.y < 2.94) {
      setRotateRight(true);
    }

    rotateRight
      ? (ref.current.rotation.y += delta / 20)
      : (ref.current.rotation.y -= delta / 20);
    rotateRight
      ? (ref.current.position.y += delta / 400)
      : (ref.current.position.y -= delta / 400);
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = false;
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} {...props} />;
}

function RedBaloon3(props) {
  const { scene } = useGLTF("/models/red_baloon3.glb");
  const ref = useRef();
  const [rotateRight, setRotateRight] = useState(false);

  useFrame((state, delta) => {
    if (ref.current.rotation.y > -2.94) {
      setRotateRight(false);
    }
    if (ref.current.rotation.y < -3.34) {
      setRotateRight(true);
    }

    rotateRight
      ? (ref.current.rotation.y += delta / 20)
      : (ref.current.rotation.y -= delta / 20);
    rotateRight
      ? (ref.current.position.y += delta / 400)
      : (ref.current.position.y -= delta / 400);
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = false;
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} {...props} />;
}

function PinkBaloon(props) {
  const { scene } = useGLTF("/models/pink_baloon.glb");
  const ref = useRef();
  const [rotateRight, setRotateRight] = useState(true);

  useFrame((state, delta) => {
    if (ref.current.rotation.y > 3.34) {
      setRotateRight(false);
    }
    if (ref.current.rotation.y < 2.94) {
      setRotateRight(true);
    }

    rotateRight
      ? (ref.current.rotation.y += delta / 20)
      : (ref.current.rotation.y -= delta / 20);
    rotateRight
      ? (ref.current.position.y += delta / 400)
      : (ref.current.position.y -= delta / 400);
  });

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = false;
      }
    });
  }, [scene]);

  return <primitive ref={ref} object={scene} {...props} />;
}

function Plane(props) {
  const { scene } = useGLTF("/models/base.glb");

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

function APTDecal(props) {
  const { scene } = useGLTF("/models/apt-decal.glb");

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.receiveShadow = false;
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}

/**
 * APP
 */

function App() {
  const [color] = useState("pink");
  const [ready, setReady] = useState(false);

  return (
    <div id="root" className={"pink"}>
      {ready ? (
        <Canvas
          shadows
          camera={{ position: [0, 7, 14], fov: 35 }}
          onClick={() => {
            setReady(true);
          }}
        >
          <fog attach="fog" args={["pink", 0, 100]} />
          <group position={[0, 0, 0]}>
            <ExplosionConfetti isExploding />
            <Center top position={[0, -50.001, 1]}>
              <Plane rotation={[0, 0, 0]} scale={[3, 5, 3]} />
            </Center>
            <Center top position={[-2, -10, 4.01]}>
              <APTDecal rotation={[0, 11, 0]} scale={1} />
            </Center>
            <Center top position={[0, 0.001, 2]}>
              <Cake rotation={[0, 4, 0]} scale={0.4} />
            </Center>
            <Center top position={[0, -0.06, 0]}>
              <Teddy rotation={[-0.12, 0, 0]} scale={0.3} />
              <PhotoFrame position={[0, 0.11, 0.85]} scale={0.5} />
            </Center>
            <Center top position={[0, -0.06, 0]}>
              <RedBaloon
                position={[-0.75, 0, 0]}
                rotation={[0, 3.14, 0]}
                scale={0.75}
              />
              <RedBaloon2
                position={[0.75, 0, 0]}
                rotation={[0, 3.14, 0]}
                scale={0.75}
              />
            </Center>
            <Center top position={[2, 0, 1]} rotation={[0, -0.5, 0]}>
              <Radio rotation={[0, 0, 0]} position={[0, -0.35, 0]} scale={2} />
              {ready && (
                <PositionalAudio
                  url="/audio/apt.mp3"
                  distance={7}
                  autoplay
                  loop
                />
              )}
              <SpriteAnimator
                scale={[1, 1, 1]}
                position={[0, 0.75, 0.1]}
                startFrame={0}
                fps={12}
                autoPlay={true}
                loop={true}
                textureImageURL={"./hearts.png"}
                textureDataURL={"./hearts.json"}
                alphaTest={0.01}
              />
            </Center>
            <Center top position={[2, 0, 1]} rotation={[0, -0.5, 0]}>
              <PinkBaloon
                position={[0, 0, 0]}
                rotation={[0, 3.14, 0]}
                scale={0.75}
              />
            </Center>
            <Center top position={[-2, 0, 1]}>
              <Rose rotation={[0, 0, 0]} scale={1} />
            </Center>
            <Center top position={[-2, 0, 1]} rotation={[0, 0.5, 0]}>
              <RedBaloon3
                position={[0, 0, 0]}
                rotation={[0, -3.14, 0]}
                scale={0.75}
              />
            </Center>
            <Center top position={[0, -10, -20]}>
              <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud
                  seed={1}
                  scale={2}
                  segments={10}
                  bounds={[10, 1, 10]}
                  volume={20}
                  color="hotpink"
                  fade={200}
                  speed={0.4}
                />
                <Cloud
                  seed={2}
                  scale={1}
                  segments={10}
                  bounds={[10, 1, 10]}
                  volume={20}
                  color="white"
                  fade={200}
                  speed={0.4}
                />
              </Clouds>
            </Center>
            <AccumulativeShadows
              frames={100}
              color={color}
              colorBlend={2}
              toneMapped={true}
              alphaTest={0.75}
              opacity={0.75}
              scale={10}
            >
              <RandomizedLight
                intensity={Math.PI}
                amount={8}
                radius={4}
                ambient={0.5}
                position={[5, 5, -10]}
                bias={0.001}
              />
            </AccumulativeShadows>
            <Center position={[0, 2, -20]}>
              <Center position={[0, 5, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    나는 항상 당신을 너무 사랑합니다!{" "}
                    <span style={{ fontSize: "1.5em" }}>❤️</span>
                  </div>
                </Html>
              </Center>
              <Center position={[-6, 9, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    당신은 미소가 가장 귀엽습니다!{" "}
                    <span style={{ fontSize: "1.5em" }}>😍</span>
                  </div>
                </Html>
              </Center>
              <Center position={[6, 9, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    당신은 항상 가장 아름답습니다!{" "}
                    <span style={{ fontSize: "1.5em" }}>😍</span>
                  </div>
                </Html>
              </Center>
              <Center position={[0, 10, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    생일 축하해, 내 아름다운 ROSÉ{" "}
                    <span style={{ fontSize: "1.5em" }}>😘</span>
                  </div>
                </Html>
              </Center>
              <Center position={[-5.5, 11, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    <span style={{ fontSize: "1.5em" }}>❤️ 😍 🥰 😘 🌹</span>
                  </div>
                </Html>
              </Center>
              <Center position={[5.5, 11, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    <span style={{ fontSize: "1.5em" }}>❤️ 😍 🥰 😘 🌹</span>
                  </div>
                </Html>
              </Center>
              <Center position={[3, 7, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    당신은 항상 나에게 모든 것을 의미합니다!{" "}
                    <span style={{ fontSize: "1.5em" }}>🥰</span>
                  </div>
                </Html>
              </Center>
              <Center position={[-3, 7, -10]}>
                <Html
                  scale={1}
                  rotation={[0, 0, 0]}
                  position={[0, 0, 0]}
                  transform
                  occlude
                >
                  <div className={"annotation"}>
                    난 항상 너와 함께 야!{" "}
                    <span style={{ fontSize: "1.5em" }}>🌹</span>
                  </div>
                </Html>
              </Center>
            </Center>
          </group>
          <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
          <Environment preset="lobby" />
        </Canvas>
      ) : (
        <>
          <div className={"text"}>
            <span>Start the party 🎉</span>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className={"button"}
              onClick={() => {
                setReady(true);
              }}
            >
              ▶️
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
