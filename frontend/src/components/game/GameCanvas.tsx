import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useGameStore } from '../../stores/useGameStore';
import { GAME_DATA } from '../../data/gameData';
import { calculateEffectiveGarrison, GRID_SIZE, GRID_OFFSET_X, GRID_OFFSET_Y, GRID_COLS, GRID_ROWS } from '../../utils/gameLogic';
import type { GameNode, Owner } from '../../types/game';

export const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [scale, setScale] = useState(1);
  const nodes = useGameStore(state => state.nodes);
  const commanders = useGameStore(state => state.commanders);
  const selectedNode = useGameStore(state => state.selectedNode);
  const selectNode = useGameStore(state => state.selectNode);
  const getNodeCommanderInfo = useGameStore(state => state.getNodeCommanderInfo);

  // Update canvas size based on container
  const updateCanvasSize = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      setCanvasSize({ width, height });
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [updateCanvasSize]);

  const getNodeColor = (node: GameNode): string => {
    const ownerColors: Record<Owner, string> = {
      player: '#4CAF50',
      enemy: '#F44336', 
      neutral: '#9E9E9E'
    };
    return ownerColors[node.owner];
  };

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
    // Draw subtle grid lines over grass texture
    ctx.strokeStyle = 'rgba(80, 60, 40, 0.3)'; // Earth-tone grid lines
    ctx.lineWidth = 0.5;

    // Draw vertical grid lines
    for (let col = 0; col <= GRID_COLS; col++) {
      const x = GRID_OFFSET_X + (col * GRID_SIZE);
      ctx.beginPath();
      ctx.moveTo(x, GRID_OFFSET_Y);
      ctx.lineTo(x, GRID_OFFSET_Y + (GRID_ROWS * GRID_SIZE));
      ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let row = 0; row <= GRID_ROWS; row++) {
      const y = GRID_OFFSET_Y + (row * GRID_SIZE);
      ctx.beginPath();
      ctx.moveTo(GRID_OFFSET_X, y);
      ctx.lineTo(GRID_OFFSET_X + (GRID_COLS * GRID_SIZE), y);
      ctx.stroke();
    }

    // Add grass texture to grid cells
    for (let col = 0; col < GRID_COLS; col++) {
      for (let row = 0; row < GRID_ROWS; row++) {
        const x = GRID_OFFSET_X + (col * GRID_SIZE);
        const y = GRID_OFFSET_Y + (row * GRID_SIZE);

        // Base grass color with slight variation
        const grassVariation = (col + row) % 3;
        const grassColors = [
          'rgba(60, 80, 40, 0.3)',   // Dark green
          'rgba(70, 90, 50, 0.25)',  // Medium green
          'rgba(80, 100, 60, 0.2)'   // Light green
        ];
        ctx.fillStyle = grassColors[grassVariation];
        ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2);

        // Add grass blade texture
        ctx.strokeStyle = 'rgba(40, 60, 30, 0.4)';
        ctx.lineWidth = 1;

        // Generate random grass blades within each cell
        const grassBlades = 8 + (col * row) % 5; // 8-12 blades per cell
        for (let blade = 0; blade < grassBlades; blade++) {
          const bladeX = x + 5 + ((col * 17 + row * 13 + blade * 7) % (GRID_SIZE - 10));
          const bladeY = y + 5 + ((row * 19 + col * 11 + blade * 3) % (GRID_SIZE - 10));
          const bladeHeight = 3 + (blade % 4);

          ctx.beginPath();
          ctx.moveTo(bladeX, bladeY + bladeHeight);
          ctx.lineTo(bladeX + ((blade % 3) - 1), bladeY);
          ctx.stroke();
        }

        // Add occasional small flowers or details
        if ((col + row * 3) % 7 === 0) {
          ctx.fillStyle = 'rgba(200, 180, 60, 0.4)'; // Small yellow flowers
          const flowerX = x + GRID_SIZE * 0.3 + ((col * 23) % (GRID_SIZE * 0.4));
          const flowerY = y + GRID_SIZE * 0.3 + ((row * 29) % (GRID_SIZE * 0.4));
          ctx.beginPath();
          ctx.arc(flowerX, flowerY, 1.5, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    // Add small center dots to show grid cell centers (where nodes should be positioned)
    ctx.fillStyle = 'rgba(139, 129, 103, 0.15)';
    for (let col = 0; col < GRID_COLS; col++) {
      for (let row = 0; row < GRID_ROWS; row++) {
        const centerX = GRID_OFFSET_X + (col * GRID_SIZE) + (GRID_SIZE / 2);
        const centerY = GRID_OFFSET_Y + (row * GRID_SIZE) + (GRID_SIZE / 2);
        ctx.beginPath();
        ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // Highlight selected node's grid cell
    if (selectedNode) {
      const selectedNodeData = nodes.find(n => n.id === selectedNode);
      if (selectedNodeData) {
        // Calculate which grid cell this node is in (accounting for centered positioning)
        const gridX = Math.round((selectedNodeData.x - GRID_OFFSET_X - GRID_SIZE/2) / GRID_SIZE);
        const gridY = Math.round((selectedNodeData.y - GRID_OFFSET_Y - GRID_SIZE/2) / GRID_SIZE);

        if (gridX >= 0 && gridX < GRID_COLS && gridY >= 0 && gridY < GRID_ROWS) {
          const cellX = GRID_OFFSET_X + (gridX * GRID_SIZE);
          const cellY = GRID_OFFSET_Y + (gridY * GRID_SIZE);

          // Draw highlighted grid cell
          ctx.strokeStyle = 'rgba(76, 175, 80, 0.4)'; // Green highlight
          ctx.lineWidth = 2;
          ctx.strokeRect(cellX + 2, cellY + 2, GRID_SIZE - 4, GRID_SIZE - 4);

          ctx.fillStyle = 'rgba(76, 175, 80, 0.1)';
          ctx.fillRect(cellX + 2, cellY + 2, GRID_SIZE - 4, GRID_SIZE - 4);
        }
      }
    }
  }, [selectedNode, nodes]);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = 'rgba(189, 164, 139, 0.4)'; // Warmer, more visible connection lines
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    // Draw each connection only once by tracking processed pairs
    const processedConnections = new Set<string>();

    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const connectionKey = `${Math.min(node.id, connectionId)}-${Math.max(node.id, connectionId)}`;
        if (processedConnections.has(connectionKey)) return;
        processedConnections.add(connectionKey);

        const connectedNode = nodes.find(n => n.id === connectionId);
        if (connectedNode) {
          ctx.beginPath();

          // Add a subtle glow effect to connections
          ctx.shadowColor = 'rgba(189, 164, 139, 0.6)';
          ctx.shadowBlur = 3;

          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectedNode.x, connectedNode.y);
          ctx.stroke();

          // Reset shadow
          ctx.shadowBlur = 0;
        }
      });
    });
  }, [nodes]);

  const drawNodes = useCallback((ctx: CanvasRenderingContext2D) => {
    nodes.forEach(node => {
      const nodeData = GAME_DATA.nodeTypes[node.type];
      const isSelected = selectedNode === node.id;
      const commanderInfo = getNodeCommanderInfo(node.id);
      
      // Draw node circle
      ctx.fillStyle = getNodeColor(node);
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw selection ring
      if (isSelected) {
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
        ctx.stroke();
      }
      
      // Draw node icon
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(nodeData.icon, node.x, node.y);
      
      // Draw commander indicators
      if (commanderInfo.current > 0) {
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Different colors for different owners
        const commanderColor = node.owner === 'player' ? '#FFD700' : 
                              node.owner === 'enemy' ? '#FF4444' : '#CCCCCC';
        
        // Position commander indicators around the node
        const angleStep = (2 * Math.PI) / Math.max(commanderInfo.current, 4);
        const radius = 30;
        
        commanderInfo.commanders.slice(0, 6).forEach((commander, index) => {
          const angle = index * angleStep;
          const x = node.x + Math.cos(angle) * radius;
          const y = node.y + Math.sin(angle) * radius;
          
          // Get commander class emoji
          let commanderEmoji = '⚔️'; // default
          switch (commander.class) {
            case 'knight': commanderEmoji = '⚔️'; break;
            case 'mage': commanderEmoji = '🔮'; break;
            case 'ranger': commanderEmoji = '🏹'; break;
            case 'warlord': commanderEmoji = '👑'; break;
          }
          
          // Draw small background circle for commander
          ctx.fillStyle = node.owner === 'enemy' ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.7)';
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, 2 * Math.PI);
          ctx.fill();
          
          // Draw commander emoji
          ctx.fillStyle = commanderColor;
          ctx.font = '10px Arial';
          ctx.fillText(commanderEmoji, x, y);
        });
        
        // If more than 6 commanders, show count indicator
        if (commanderInfo.current > 6) {
          ctx.fillStyle = node.owner === 'enemy' ? 'rgba(255, 100, 100, 0.8)' : 'rgba(255, 0, 0, 0.8)';
          ctx.beginPath();
          ctx.arc(node.x + 25, node.y - 25, 8, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '10px Arial';
          ctx.fillText(`+${commanderInfo.current - 6}`, node.x + 25, node.y - 25);
        }
      }
      
      // Draw star level
      ctx.font = '12px Arial';
      ctx.fillStyle = '#FFD700';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const stars = '★'.repeat(node.starLevel);
      ctx.fillText(stars, node.x, node.y - 35);
      
      // Draw garrison value with commander bonus
      const effectiveGarrison = calculateEffectiveGarrison(node, commanderInfo.commanders);
      ctx.font = '10px Arial';
      ctx.fillStyle = '#FFFFFF';
      
      if (effectiveGarrison.commanderBonus > 0) {
        // Show enhanced garrison with commander bonus
        ctx.fillStyle = '#90EE90'; // Light green for enhanced garrison
        ctx.fillText(`${effectiveGarrison.totalPower}`, node.x, node.y + 35);
        // Show base garrison in smaller text
        ctx.font = '8px Arial';
        ctx.fillStyle = '#CCCCCC';
        ctx.fillText(`(${node.garrison})`, node.x, node.y + 45);
      } else {
        // Normal garrison display
        ctx.fillText(node.garrison.toString(), node.x, node.y + 35);
      }
    });
  }, [nodes, selectedNode, getNodeCommanderInfo]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Calculate scale to fit nodes in canvas
    const padding = 50;
    const maxX = Math.max(...nodes.map(n => n.x)) + padding;
    const maxY = Math.max(...nodes.map(n => n.y)) + padding;
    const minX = Math.min(...nodes.map(n => n.x)) - padding;
    const minY = Math.min(...nodes.map(n => n.y)) - padding;
    
    const scaleX = canvas.width / (maxX - minX);
    const scaleY = canvas.height / (maxY - minY);
    const calculatedScale = Math.min(scaleX, scaleY, 1) * scale;
    
    // Center the map
    const offsetX = (canvas.width - (maxX - minX) * calculatedScale) / 2 - minX * calculatedScale;
    const offsetY = (canvas.height - (maxY - minY) * calculatedScale) / 2 - minY * calculatedScale;
    
    ctx.save();
    ctx.translate(offsetX, offsetY);
    ctx.scale(calculatedScale, calculatedScale);
    
    // Draw grid first (background)
    drawGrid(ctx);

    // Draw connections (so they appear behind nodes)
    drawConnections(ctx);

    // Draw nodes
    drawNodes(ctx);
    
    ctx.restore();
  }, [drawGrid, drawConnections, drawNodes, canvasSize, scale, nodes]);

  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = event.clientX - rect.left;
    const clientY = event.clientY - rect.top;
    
    // Calculate the same scale and offset as used in render
    const padding = 50;
    const maxX = Math.max(...nodes.map(n => n.x)) + padding;
    const maxY = Math.max(...nodes.map(n => n.y)) + padding;
    const minX = Math.min(...nodes.map(n => n.x)) - padding;
    const minY = Math.min(...nodes.map(n => n.y)) - padding;
    
    const scaleX = canvas.width / (maxX - minX);
    const scaleY = canvas.height / (maxY - minY);
    const calculatedScale = Math.min(scaleX, scaleY, 1) * scale;
    
    const offsetX = (canvas.width - (maxX - minX) * calculatedScale) / 2 - minX * calculatedScale;
    const offsetY = (canvas.height - (maxY - minY) * calculatedScale) / 2 - minY * calculatedScale;
    
    // Transform click coordinates back to world space
    const worldX = (clientX - offsetX) / calculatedScale;
    const worldY = (clientY - offsetY) / calculatedScale;
    
    // Find clicked node
    const clickedNode = nodes.find(node => {
      const distance = Math.sqrt(Math.pow(worldX - node.x, 2) + Math.pow(worldY - node.y, 2));
      return distance <= 25; // Node radius + selection buffer
    });
    
    if (clickedNode) {
      selectNode(selectedNode === clickedNode.id ? null : clickedNode.id);
    } else {
      selectNode(null);
    }
  }, [nodes, selectedNode, selectNode, scale]);

  useEffect(() => {
    render();
  }, [render]);

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.3));
  const handleResetZoom = () => setScale(1);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700"
    >
      <canvas 
        ref={canvasRef}
        className="w-full h-full cursor-pointer touch-manipulation"
        onClick={handleCanvasClick}
        style={{ display: 'block' }}
      />
      
      {/* Mobile-friendly zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 lg:flex-row lg:gap-2">
        <button 
          onClick={handleZoomOut}
          className="bg-black bg-opacity-70 text-white p-2 lg:p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-lg lg:text-xl"
          aria-label="Zoom out"
        >
          🔍-
        </button>
        <button 
          onClick={handleResetZoom}
          className="bg-black bg-opacity-70 text-white p-2 lg:p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-sm lg:text-base"
          aria-label="Reset zoom"
        >
          ⌂
        </button>
        <button 
          onClick={handleZoomIn}
          className="bg-black bg-opacity-70 text-white p-2 lg:p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center text-lg lg:text-xl"
          aria-label="Zoom in"
        >
          🔍+
        </button>
      </div>
      
      {/* Map legend for mobile */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white p-3 rounded-lg shadow-lg lg:hidden">
        <div className="text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Player</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Enemy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span>Neutral</span>
          </div>
        </div>
      </div>
    </div>
  );
};
