import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';

export default function Home() {
  return (
    <div className="container" data-tid="container">
      <h2>Home</h2>
      <Link to={routes.THANHTOAN}>to Thanhtoan</Link>
    </div>
  );
}
