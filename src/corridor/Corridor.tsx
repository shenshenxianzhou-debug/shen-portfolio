import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { Photo } from "../content";

export default function Corridor({
  photos,
  onOpen,
  onDrag,
}: {
  photos: Photo[];
  onOpen: (index: number) => void;
  onDrag?: (dragging: boolean) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const openRef = useRef(onOpen);
  const dragRef = useRef(onDrag);
  openRef.current = onOpen;
  dragRef.current = onDrag;

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#0e0d0b", 7, 26);
    const camera = new THREE.PerspectiveCamera(
      38,
      Math.max(el.clientWidth, 1) / Math.max(el.clientHeight, 1),
      0.1,
      80,
    );
    camera.position.set(0, 0.08, 3.8);

    const geometry = new THREE.PlaneGeometry(2.4, 1.58);
    const meshes: THREE.Mesh[] = [];
    const loader = new THREE.TextureLoader();
    photos.forEach((photo, index) => {
      const material = new THREE.MeshBasicMaterial({ color: "#1c1814" });
      const mesh = new THREE.Mesh(geometry, material);
      const lane = index % 2 === 0 ? -1 : 1;
      const row = Math.floor(index / 2);
      mesh.position.set(lane * 1.42, 0.02, 0.2 - row * 1.85);
      mesh.rotation.y = lane * -0.38;
      mesh.scale.setScalar(1.18);
      mesh.userData.index = index;
      scene.add(mesh);
      meshes.push(mesh);
      loader.load(photo.thumb, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        material.map = texture;
        material.color.set("#ffffff");
        material.needsUpdate = true;
      });
    });

    const floorGeometry = new THREE.PlaneGeometry(16, 90);
    const floorMaterial = new THREE.MeshBasicMaterial({ color: "#14110e" });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -1.42, -22);
    scene.add(floor);

    const maxZ = Math.max(0, (Math.ceil(photos.length / 2) - 1) * 1.85);
    let target = 0;
    let current = 0;
    let mx = 0;
    let my = 0;
    let dragging = false;
    let moved = 0;
    let lastX = 0;

    const resize = () => {
      camera.aspect = Math.max(el.clientWidth, 1) / Math.max(el.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };

    const onWheel = (event: WheelEvent) => {
      const next = target + event.deltaY * 0.0036;
      const leavingBack = target <= 0.02 && event.deltaY < 0;
      const leavingForward = target >= maxZ - 0.02 && event.deltaY > 0;
      if (leavingBack || leavingForward) return;
      event.preventDefault();
      target = Math.min(maxZ, Math.max(0, next));
    };

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = event.clientX;
      dragRef.current?.(true);
      el.setPointerCapture(event.pointerId);
    };

    const onPointerUp = (event: PointerEvent) => {
      dragging = false;
      dragRef.current?.(false);
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      my = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
      if (!dragging) return;
      const dx = event.clientX - lastX;
      moved += Math.abs(dx);
      lastX = event.clientX;
      target = Math.min(maxZ, Math.max(0, target - dx * 0.012));
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onClick = (event: MouseEvent) => {
      if (moved > 8) {
        moved = 0;
        return;
      }
      const rect = el.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(meshes)[0];
      const index = hit?.object.userData.index;
      if (typeof index === "number") openRef.current(index);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("click", onClick);
    window.addEventListener("resize", resize);

    let frame = 0;
    const tick = () => {
      current += (target - current) * 0.085;
      camera.position.z = 3.8 - current;
      camera.position.x += (mx * 0.42 - camera.position.x) * 0.065;
      camera.position.y += (0.12 - my * 0.26 - camera.position.y) * 0.065;
      camera.lookAt(0, 0.02, camera.position.z - 7);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("click", onClick);
      window.removeEventListener("resize", resize);
      meshes.forEach((mesh) => {
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.map?.dispose();
        material.dispose();
      });
      geometry.dispose();
      floorGeometry.dispose();
      floorMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [photos]);

  return <div ref={host} className="corridor-host" data-cursor="drag" />;
}
