import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Vines from "./Vines";
import Footer from "./Footer";
import Node from "./Node";
import { nodes as originalNodes, subnodes as originalSubnodes } from "./data_webdev";
import "./Map.css";

export default function WebDevMap({ user }) {
  const [positions, setPositions] = useState({});
  const [nodes, setNodes] = useState([]);
  const [subnodes, setSubnodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mainX = 585;
    const mainYGap = 500;
    const subnodeSpread = 270;
    const childrenByParent = {};
    originalSubnodes.forEach((subnode) => {
      if (!childrenByParent[subnode.parentId]) childrenByParent[subnode.parentId] = [];
      childrenByParent[subnode.parentId].push(subnode);
    });

    const positionedNodes = originalNodes.map((node, index) => ({
      ...node,
      position: { x: mainX, y: index * mainYGap },
    }));
    const positionedSubnodes = [];
    positionedNodes.forEach((node) => {
      const children = childrenByParent[node.id] || [];
      const gap = children.length > 1 ? (2 * subnodeSpread) / (children.length - 1) : 0;
      children.forEach((child, childIndex) => {
        positionedSubnodes.push({
          ...child,
          position: {
            x: mainX - subnodeSpread + childIndex * gap,
            y: node.position.y + (childIndex % 2 === 0 ? 120 : -120),
          },
        });
      });
    });

    const allPositions = {};
    [...positionedNodes, ...positionedSubnodes].forEach((node) => {
      allPositions[node.id] = node.position;
    });
    setNodes(positionedNodes);
    setSubnodes(positionedSubnodes);
    setPositions(allPositions);
  }, []);

  const handlePosition = (id, position) => {
    setPositions((previous) => ({ ...previous, [id]: position }));
  };

  const getPath = (start, end, main = false) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    if (main) {
      return `M${start.x + 35},${start.y} C${start.x + 35},${start.y + dy * 0.4} ${end.x + 35},${end.y - dy * 0.4} ${end.x + 35},${end.y}`;
    }
    return `M${start.x + 35},${start.y + 27} C${start.x + 35 + dx * 0.5},${start.y + dy * 0.2 + 27} ${end.x - dx * 0.5},${end.y - dy * 0.2 + 27} ${end.x},${end.y + 27}`;
  };

  return (
    <div className="map-container">
      <Vines />
      <Header />
      <section className="roadmap-intro">
        <p className="roadmap-label">FULL-STACK WEB DEVELOPMENT ROADMAP</p>
        <h1>Build from your first webpage to a deployed application</h1>
        <p>
          Work through browser fundamentals, HTML, CSS, JavaScript, React,
          server-side development, data, and deployment. Open a lesson node
          for explanations and practice prompts; check off topics as you learn.
        </p>
      </section>
      <div
        className="map-content"
        style={{ height: `${Math.max(4600, nodes.length * 500 + 200)}px` }}
      >
        {[...nodes, ...subnodes].map((node) => (
          <Node
            key={node.id}
            id={node.id}
            position={node.position}
            text={node.text}
            isSubnode={node.isSubnode || false}
            onPosition={(position) => handlePosition(node.id, position)}
            userId={user.userId}
            onClick={() => navigate("/c", {
              state: {
                text: node.text,
                link: node.link,
                content: node.content,
                compiler: false,
                question: node.question,
                language: "web",
              },
            })}
            map="Web Development"
          />
        ))}
        <svg className="map-svg">
          {nodes.slice(0, -1).map((node, index) => {
            const start = positions[node.id];
            const end = positions[nodes[index + 1].id];
            if (!start || !end) return null;
            return (
              <path
                key={`main-${node.id}`}
                d={getPath(start, end, true)}
                stroke="#14532d"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            );
          })}
          {subnodes.map((subnode) => {
            const start = positions[subnode.parentId];
            const end = positions[subnode.id];
            if (!start || !end) return null;
            return (
              <path
                key={`sub-${subnode.id}`}
                d={getPath(start, end)}
                stroke="#42af73"
                strokeWidth="3"
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
