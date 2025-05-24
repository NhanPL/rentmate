import React from 'react';
import { Link } from 'react-router';

const Test = () => {
  return (
    <div>
      <input type="name" name="email" className="bg-green-200" />
      <Link to={'/dashboard'}>
        <button className="bg-blue-200">abc</button>
      </Link>
    </div>
  );
};

export default Test;
