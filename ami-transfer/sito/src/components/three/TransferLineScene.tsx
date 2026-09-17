"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const BLUE = 0x005a80;
const BG = 0x0b2230;
const DARK = 0x1b262c;
const STEEL = 0xaab4be;
const YELLOW = 0xe8b400;
const PITCH = 4.2;

function mat(color: number, metalness: number, roughness: number) {
  return new THREE.MeshStandardMaterial({ color, metalness, roughness });
}

function ease(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export default function TransferLineScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(BG);
    scene.fog = new THREE.Fog(BG, 26, 64);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 200);

    scene.add(new THREE.HemisphereLight(0x9fc0d8, 0x0b1216, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(9, 15, 11);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x74a8d6, 0.45);
    fill.position.set(-12, 6, -9);
    scene.add(fill);

    const root = new THREE.Group();
    scene.add(root);

    const grid = new THREE.GridHelper(80, 40, 0x24404e, 0x17272f);
    grid.position.y = -1.2;
    root.add(grid);

    const bed = new THREE.Mesh(new THREE.BoxGeometry(30, 1.1, 4.4), mat(BLUE, 0.35, 0.55));
    bed.position.y = -0.35;
    root.add(bed);
    [-1.5, 1.5].forEach((z) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(30, 0.28, 0.55), mat(STEEL, 0.9, 0.3));
      rail.position.set(0, 0.32, z);
      root.add(rail);
    });

    const tube = new THREE.Group();
    root.add(tube);
    const tubeMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.34, 34, 28),
      mat(0xc2ccd6, 0.95, 0.22)
    );
    tubeMesh.rotation.z = Math.PI / 2;
    tubeMesh.position.y = 0.95;
    tube.add(tubeMesh);
    for (let i = -4; i <= 4; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.37, 0.045, 8, 24), mat(YELLOW, 0.6, 0.4));
      ring.rotation.y = Math.PI / 2;
      ring.position.set(i * PITCH - PITCH / 2, 0.95, 0);
      tube.add(ring);
    }

    type Station = { head: THREE.Group; spindle: THREE.Mesh; glow: THREE.PointLight };
    const stations: Station[] = [];
    [-2, -1, 0, 1, 2].forEach((k) => {
      const g = new THREE.Group();
      g.position.x = k * PITCH;
      root.add(g);
      [-1.9, 1.9].forEach((z) => {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.55, 4.6, 0.55), mat(BLUE, 0.35, 0.55));
        col.position.set(0, 1.9, z);
        g.add(col);
      });
      const beam = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.7, 4.6), mat(BLUE, 0.35, 0.55));
      beam.position.y = 4.4;
      g.add(beam);

      const head = new THREE.Group();
      head.position.y = 3.2;
      g.add(head);
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.05, 1.2, 1.05), mat(DARK, 0.6, 0.45));
      head.add(body);
      const spindle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.11, 1.0, 14),
        mat(0xd8dee5, 0.95, 0.2)
      );
      spindle.position.y = -1.05;
      head.add(spindle);

      const glow = new THREE.PointLight(YELLOW, 0, 4.5);
      glow.position.set(0, 1.0, 0);
      g.add(glow);
      stations.push({ head, spindle, glow });
    });

    let yaw = -0.5;
    let targetYaw = -0.5;
    let dragging = false;
    let lastX = 0;
    let idle = 0;

    function place() {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h || 1;
      const narrow = w < 780;
      camera.fov = narrow ? 44 : 34;
      camera.updateProjectionMatrix();
      camera.position.set(0, narrow ? 7.5 : 6.4, narrow ? 27 : 24);
      camera.lookAt(0, 1.4, 0);
    }

    const onResize = () => place();
    window.addEventListener("resize", onResize);

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      idle = 0;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      targetYaw += (e.clientX - lastX) * 0.005;
      lastX = e.clientX;
      idle = 0;
      targetYaw = Math.max(-1.25, Math.min(0.25, targetYaw));
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointermove", onPointerMove);

    const clock = new THREE.Clock();
    const T = 2.7;
    let rafId = 0;

    function frame() {
      rafId = requestAnimationFrame(frame);
      const t = clock.getElapsedTime();
      const p = (t % T) / T;

      const adv = p < 0.4 ? ease(p / 0.4) : 1;
      tube.position.x = adv * PITCH - PITCH;

      let cut = 0;
      if (p > 0.48 && p < 0.92) {
        const q = (p - 0.48) / 0.44;
        cut = Math.sin(q * Math.PI);
      }
      stations.forEach((s) => {
        s.head.position.y = 3.2 - cut * 1.35;
        s.spindle.rotation.y += cut * 0.9 + 0.02;
        s.glow.intensity = cut * 2.2;
      });

      if (!dragging) {
        idle += 0.016;
        if (idle > 2.5) targetYaw += 0.0004;
      }
      targetYaw = Math.max(-1.25, Math.min(0.25, targetYaw));
      yaw += (targetYaw - yaw) * 0.06;
      root.rotation.y = yaw;

      renderer.render(scene, camera);
    }

    place();
    if (reduce) {
      renderer.render(scene, camera);
    } else {
      frame();
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointermove", onPointerMove);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />;
}
