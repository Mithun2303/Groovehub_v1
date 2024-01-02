import React, { useState, useEffect } from 'react';

const CircularProgressBar = ({ strokeWidth, radius, percentage }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const progress = percentage || 0;
    const circumference = 2 * Math.PI * radius;
    const offsetValue = ((100 - progress) / 100) * circumference;
    setOffset(offsetValue);
  }, [percentage, radius]);

  return (
    <svg className="w-32 h-32">
      <circle
        className="progress-ring__circle"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx="16"
        cy="16"
        style={{
          strokeDasharray: `${2 * Math.PI * radius}px ${2 * Math.PI * radius}px`,
          strokeDashoffset: offset,
        }}
      />
      <text x="50%" y="50%" className="text-center text-xl">
        {percentage}%
      </text>
    </svg>
  );
};