"use client";

import React, { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { skills, Skill, SkillCategory } from "@/data/skills";
import { usePointer } from "@/hooks/usePointer";

interface SkillConstellationProps {
  selectedCategory?: SkillCategory | "All";
  onSelectSkill?: (skill: Skill | null) => void;
}

const categoryColors: Record<SkillCategory, string> = {
  Languages: "#E8DCC4", // Sand
  "Backend & Database": "#2F6B4F", // Green Mid
  Mobile: "#C98A4B", // Copper Gold
  Frontend: "#64B5F6", // Soft Blue Accent
  "Tools & Practices": "#81C784", // Light Forest
};

export const SkillConstellation: React.FC<SkillConstellationProps> = ({
  selectedCategory = "All",
  onSelectSkill,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Filtered skills
  const activeSkills = useMemo(() => {
    if (selectedCategory === "All") return skills;
    return skills.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Skill map for fast lookup
  const skillMap = useMemo(() => {
    const map = new Map<string, Skill>();
    skills.forEach((s) => map.set(s.id, s));
    return map;
  }, []);

  // Compute connections pairs
  const connectionsList = useMemo(() => {
    const lines: { start: [number, number, number]; end: [number, number, number]; isHighlighted: boolean; key: string }[] = [];
    const createdKeys = new Set<string>();

    skills.forEach((skill) => {
      skill.connections.forEach((targetId) => {
        const targetSkill = skillMap.get(targetId);
        if (targetSkill) {
          const key = [skill.id, targetId].sort().join("-");
          if (!createdKeys.has(key)) {
            createdKeys.add(key);
            const isHighlighted =
              hoveredSkillId === skill.id || hoveredSkillId === targetId;

            lines.push({
              start: skill.position,
              end: targetSkill.position,
              isHighlighted,
              key,
            });
          }
        }
      });
    });

    return lines;
  }, [skillMap, hoveredSkillId]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y += delta * 0.05;

      // Slight pull toward pointer
      const targetX = pointer.x * 0.25;
      const targetY = pointer.y * 0.25;
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        delta * 2
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        delta * 2
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Lines between connected skills */}
      {connectionsList.map((conn) => (
        <Line
          key={conn.key}
          points={[conn.start, conn.end]}
          color={conn.isHighlighted ? "#C98A4B" : "#2F6B4F"}
          lineWidth={conn.isHighlighted ? 2.5 : 1.0}
          transparent
          opacity={conn.isHighlighted ? 0.9 : 0.25}
        />
      ))}

      {/* Skill Nodes */}
      {skills.map((skill) => {
        const isHovered = hoveredSkillId === skill.id;
        const isConnectedToHovered =
          hoveredSkillId &&
          (skill.connections.includes(hoveredSkillId) ||
            skillMap.get(hoveredSkillId)?.connections.includes(skill.id));

        const isCategoryMatch =
          selectedCategory === "All" || skill.category === selectedCategory;

        const isDimmed =
          (hoveredSkillId && !isHovered && !isConnectedToHovered) ||
          !isCategoryMatch;

        const nodeColor = isHovered
          ? "#C98A4B"
          : categoryColors[skill.category] || "#F3EBDD";

        return (
          <group
            key={skill.id}
            position={skill.position}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredSkillId(skill.id);
              if (onSelectSkill) onSelectSkill(skill);
            }}
            onPointerOut={() => {
              setHoveredSkillId(null);
              if (onSelectSkill) onSelectSkill(null);
            }}
          >
            {/* Glowing Core Sphere */}
            <mesh scale={isHovered ? 1.4 : 1.0}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isHovered ? 2.0 : isDimmed ? 0.2 : 0.8}
                transparent
                opacity={isDimmed ? 0.3 : 1.0}
              />
            </mesh>

            {/* Outer Ring Glow */}
            {isHovered && (
              <mesh scale={2.2}>
                <ringGeometry args={[0.1, 0.14, 32]} />
                <meshBasicMaterial color="#C98A4B" transparent opacity={0.6} side={THREE.DoubleSide} />
              </mesh>
            )}

            {/* Label Billboard */}
            <Text
              position={[0, 0.3, 0]}
              fontSize={isHovered ? 0.22 : 0.16}
              color={isHovered ? "#C98A4B" : isDimmed ? "#2F6B4F" : "#F3EBDD"}
              anchorX="center"
              anchorY="bottom"
              fillOpacity={isDimmed ? 0.3 : 1.0}
              outlineWidth={0.02}
              outlineColor="#0A2218"
            >
              {skill.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
};
