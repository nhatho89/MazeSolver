import React, { useState, useEffect } from 'react';
import Button from "./Button";
import './App.scss';

const ROWS = 20;
const COLS = 20;

const generateMaze = () => {
  const maze = [];
  for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLS; j++) {
      row.push(Math.random() < 0.2 ? 1 : 0); // 20% chance of wall 
    }
    maze.push(row);
  }
  maze[0][0] = 0;
  maze[ROWS - 1][COLS - 1] = 0;
  return maze;
};

const generateWeightedMaze = () => {
  const maze = [];
  for (let i = 0; i < ROWS; i++) {
    const row = [];
    for (let j = 0; j < COLS; j++) {
      if (Math.random() < 0.2) {
        row.push(1); // wall
      } else {
        // 70% chance empty (1 cost), 10% chance weighted cost 2-5
        if (Math.random() < 0.1) {
          row.push(Math.floor(Math.random() * 4) + 2); // weight 2-5
        } else {
          row.push(0); // normal empty cell cost=1
        }
      }
    }
    maze.push(row);
  }
  maze[0][0] = 0;
  maze[ROWS - 1][COLS - 1] = 0;
  return maze;
};


const directions = [
  [0, 1], [1, 0], [0, -1], [-1, 0]
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default function MazeSolver() {
  const [maze, setMaze] = useState(generateMaze());
  const [visited, setVisited] = useState([]);
  const [searchType, setSearchType] = useState('bfs');

  const animate = async (path) => {
    for (let i = 0; i < path.length; i++) {
      await sleep(50);
      setVisited(v => [...v, path[i]]);
    }
  };

  const bfs = () => {
    const queue: Array<[[number, number], [number, number][]]> = [[[0, 0], []]];
    const seen = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    while (queue.length > 0) {
      const [[x, y], path] = queue.shift();
      if (x === ROWS - 1 && y === COLS - 1) return [...path, [x, y]];
      if (x < 0 || y < 0 || x >= ROWS || y >= COLS || maze[x][y] === 1 || seen[x][y]) continue;
      seen[x][y] = true;
      for (let [dx, dy] of directions) {
        queue.push([[x + dx, y + dy], [...path, [x, y]]]);
      }
    }
    return [];
  };

  const dfs = () => {
    const stack: Array<[[number, number], [number, number][]]> = [[[0, 0], []]];
    const seen = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    while (stack.length > 0) {
      const [[x, y], path] = stack.pop();
      if (x === ROWS - 1 && y === COLS - 1) return [...path, [x, y]];
      if (x < 0 || y < 0 || x >= ROWS || y >= COLS || maze[x][y] === 1 || seen[x][y]) continue;
      seen[x][y] = true;
      for (let [dx, dy] of directions) {
        stack.push([[x + dx, y + dy], [...path, [x, y]]]);
      }
    }
    return [];
  };

  const dijkstra = () => {
    const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
    const prev = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    dist[0][0] = 0;

    const pq = [[0, 0]];

    while (pq.length > 0) {
      let minIndex = 0;
      for (let i = 1; i < pq.length; i++) {
        const [x, y] = pq[i];
        const [minX, minY] = pq[minIndex];
        if (dist[x][y] < dist[minX][minY]) minIndex = i;
      }
      const [x, y] = pq.splice(minIndex, 1)[0];

      if (x === ROWS - 1 && y === COLS - 1) {
        const path = [];
        let cx = x, cy = y;
        while (cx !== null && cy !== null) {
          path.push([cx, cy]);
          const p = prev[cx][cy];
          if (!p) break;
          [cx, cy] = p;
        }
        return path.reverse();
      }

      for (let [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 && ny >= 0 && nx < ROWS && ny < COLS &&
          maze[nx][ny] !== 1 && 
          dist[x][y] + (maze[nx][ny] > 1 ? maze[nx][ny] : 1) < dist[nx][ny]
        ) {
          dist[nx][ny] = dist[x][y] + (maze[nx][ny] > 1 ? maze[nx][ny] : 1);
          prev[nx][ny] = [x, y];
          pq.push([nx, ny]);
        }
      }
    }
    return [];
  };

  const handleStart = async () => {
    setVisited([]);
    let path = [];
    if (searchType === 'bfs') path = bfs();
    else if (searchType === 'dfs') path = dfs();
    else if (searchType === 'dijkstra') path = dijkstra();
    await animate(path);
  };

  return (
    <div className="maze-container">
      <h1 className="maze-title">Maze Solver</h1>
      <div className="maze-controls">
      <Button onClick={() => {
        setMaze(generateMaze());
        setVisited([]);
        }}>
        Generate Maze</Button>
        <Button onClick={() => {
          setMaze(generateWeightedMaze());
          setVisited([]);
        }}>
          Generate Weighted Maze
        </Button>
        <Button onClick={handleStart}>Start {searchType.toUpperCase()}</Button>
        <select
          className="maze-select"
          onChange={(e) => setSearchType(e.target.value)}
          value={searchType}
        >
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
        </select>
      </div>
      <div className="maze-grid">
        {maze.flatMap((row, i) =>
          row.map((cell, j) => {
            const isVisited = visited.some(([x, y]) => x === i && y === j);
            const isStart = i === 0 && j === 0;
            const isEnd = i === ROWS - 1 && j === COLS - 1;
  
            let cellClass = 'maze-cell ';
            cellClass += cell === 1 ? 'wall' : isStart ? 'start' : isEnd ? 'end' : isVisited ? 'visited' : 'empty';
            const weight = maze[i][j];
            const displayWeight = weight > 1 ? weight : '';
            return (
              <div key={`${i}-${j}`} className={cellClass}>
                {displayWeight}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
  
} 
