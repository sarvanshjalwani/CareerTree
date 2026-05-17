import Header from "./Header"; 
import Vines from "./Vines";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import Node from "./Node";
import { useNavigate } from "react-router-dom";
import { nodes as originalNodes, subnodes as originalSubnodes } from "./data_c";
import "./Map.css";
export default function Map2({ user }) {
  const [positions, setPositions] = useState({});
  const [nodes, setNodes] = useState([]);
  const [subnodes, setSubnodes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const mainX = 585;     
    const mainYGap = 350;      
    const verticalShift = 120;
    const maxSpread = 270; 
    const verticalRandom = 20;  
    const subnodesByParent = {};
    originalSubnodes.forEach(sn => {
      if (!subnodesByParent[sn.parentId]) subnodesByParent[sn.parentId] = [];
      subnodesByParent[sn.parentId].push(sn);
    });
    const positionedNodes = [];
    const positionedSubnodes = [];
    originalNodes.forEach((node, index) => {
      const parentY = index * mainYGap;
      const parentSubnodes = subnodesByParent[node.id] || [];
      const totalSub = parentSubnodes.length;
      let parentX = mainX;
      if (totalSub > 0) {
        const gap = totalSub > 1 ? (2 * maxSpread) / (totalSub - 1) : 0;
        parentSubnodes.forEach((sub, idx) => {
          const x = parentX - maxSpread + idx * gap;
          let direction = idx % 2 === 0 ? 1 : -1;
          let y = parentY + direction * verticalShift;
          y += (Math.random() - 0.5) * verticalRandom;
          positionedSubnodes.push({ ...sub, position: { x, y } });
        });
        parentX = mainX; 
      }
      positionedNodes.push({ ...node, position: { x: parentX, y: parentY } });
    });
    const allPositions = {};
    positionedNodes.forEach(n => (allPositions[n.id] = n.position));
    positionedSubnodes.forEach(sn => (allPositions[sn.id] = sn.position));
    setNodes(positionedNodes);
    setSubnodes(positionedSubnodes);
    setPositions(allPositions);
  }, []);
  const handlePosition = (id, pos) => {
    setPositions(prev => ({ ...prev, [id]: pos }));
  };
  const getSmoothPath = (start, end, isMainConnection = false) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    if (isMainConnection) {
      const offsetX = 35;
      return {
        path: `M${start.x + offsetX},${start.y} 
               C${start.x + offsetX},${start.y + dy * 0.4} 
                ${end.x + offsetX},${end.y - dy * 0.4} 
                ${end.x + offsetX},${end.y}`,
        stroke: "#103609ff",
        width: 4,
        strokeDasharray: "0"
      };
    }
    const offsetY = 27;
    const offsetX = 35;
    return {
      path: `M${start.x + offsetX},${start.y + offsetY} 
             C${start.x + offsetX + dx * 0.5},${start.y + dy * 0.2 + offsetY} 
              ${end.x - dx * 0.5},${end.y - dy * 0.2 + offsetY} 
              ${end.x},${end.y + offsetY}`,
      stroke: "#42af73ff",
      width: 3,
      strokeDasharray: "0"
    };
  };
  return (
    <div className="map-container">
      <Vines />
      <Header />
      <div className="map-content">
        {[...nodes, ...subnodes].map(node => (
          <Node
            key={node.id}
            id={node.id}
            position={node.position}
            text={node.text}
            isSubnode={node.isSubnode || false}
            onPosition={pos => handlePosition(node.id, pos)}
            userId={user.userId}
            onClick={() =>
              navigate("/c", {
                state: {
                  text: node.text,
                  link: node.link,
                  content: node.content,
                  compiler: node.compiler,
                  question: node.question
                }
              })
            }
            map="C"
          />
        ))}
        <svg className="map-svg">
          {nodes.map((node, index) => {
            if (index === nodes.length - 1) return null;
            const current = positions[node.id];
            const next = positions[nodes[index + 1].id];
            if (!current || !next) return null;
            const { path, stroke, width, strokeDasharray } =
              getSmoothPath(current, next, true);
            return (
              <path
                key={`main-${node.id}`}
                d={path}
                stroke={stroke}
                strokeWidth={width}
                strokeDasharray={strokeDasharray}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
          {subnodes.map(subnode => {
            const parentPos = positions[subnode.parentId];
            const subnodePos = positions[subnode.id];
            if (!parentPos || !subnodePos) return null;
            const { path, stroke, width } = getSmoothPath(parentPos, subnodePos);
            return (
              <path
                key={`sub-${subnode.id}`}
                d={path}
                stroke={stroke}
                strokeWidth={width}
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      </div>
      <Footer />
    </div>
  );
}