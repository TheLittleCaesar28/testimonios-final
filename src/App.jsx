import React, { useState, useEffect, useRef, useCallback } from 'react';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './App.css';

export default function App() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);
  const total = testimonios.length;

  const next = useCallback(() => {
    setIndex(prev => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  const random = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * total);
    } while (newIndex === index && total > 1);
    setIndex(newIndex);
  }, [index, total]);

  const handleUserAction = useCallback((actionFn) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    actionFn();
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % total);
    }, 5000);
  }, [total]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex(prev => (prev + 1) % total);
    }, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [total]);

  return (
    <main className="app">
      <h1>✨ Testimonios de nuestros clientes</h1>
      <Testimonial item={testimonios[index]} />
      <Controls 
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
      />
      <p className="counter">{index + 1} / {total}</p>
    </main>
  );
}