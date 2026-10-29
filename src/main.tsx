import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { RevealStack, type OverflowDirection } from './RevealStack';
import './style.css';

function App() {
  const [animate, setAnimate] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [direction, setDirection] = useState<OverflowDirection>('bottom');
  const [height, setHeight] = useState(260);
  const [width, setWidth] = useState(260);
  const [itemSize, setItemSize] = useState(64);
  const [gap, setGap] = useState(8);
  const horizontal = direction === 'left' || direction === 'right';
  return <main><header><span>COMPONENT LAB / 01</span><h1>Room for what fits.</h1><p>A stack that knows its limits. Resize the space; only complete rows stay.</p></header>
    <section className="controls" aria-label="Stack controls">
      <label><input type="checkbox" checked={reverse} onChange={e => setReverse(e.target.checked)} /> Reverse JSX order</label>
      <label><input type="checkbox" checked={animate} onChange={e => setAnimate(e.target.checked)} /> Animate reveals</label>
      <label>Overflow edge <select value={direction} onChange={e => { const value = e.target.value; if (value === 'top' || value === 'bottom' || value === 'left' || value === 'right') setDirection(value); }}><option value="bottom">Bottom ↓</option><option value="top">Top ↑</option><option value="left">Left ←</option><option value="right">Right →</option></select></label>
      <label className="size-control"><span>Available height · <span className="size-value">{height}px</span></span><input aria-label="Available height" type="range" min="0" max="520" value={height} onChange={e => setHeight(Number(e.target.value))} /></label>
      <label className="size-control"><span>Available width · <span className="size-value">{width}px</span></span><input aria-label="Available width" type="range" min="0" max="520" value={width} onChange={e => setWidth(Number(e.target.value))} /></label>
      <label className="size-control"><span>Item size · <span className="size-value">{itemSize}px</span></span><input aria-label="Item size" type="range" min="20" max="160" value={itemSize} onChange={e => setItemSize(Number(e.target.value))} /></label>
      <label className="size-control"><span>Gap · <span className="size-value">{gap}px</span></span><input aria-label="Gap" type="range" min="0" max="40" value={gap} onChange={e => setGap(Number(e.target.value))} /></label>
    </section>
    <section className="preview"><div className="frame" data-horizontal={horizontal} style={{ height, width }}><RevealStack gap={gap} animate={animate} itemSize={itemSize} reverse={reverse} overflowDirection={direction}>
      {['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot', 'Golf', 'Hotel'].map((name, i) => <button className="card" key={name}><span>{String(i + 1).padStart(2, '0')}</span>{name}<small>{itemSize}px item</small></button>)}
    </RevealStack></div></section><footer>CSS container queries · No resize observers · No visibility state</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
