import React, { SVGProps } from "react";

export function Loading({
  width = 24,
  height = 24,
  dur = "0.75s",
}: SVGProps<SVGElement>): JSX.Element {
  return (
    <svg
      className="fill-current"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'rgb(242,163,116)', stopOpacity: 1 }} />
          <stop offset="28.5%" style={{ stopColor: 'rgb(154,191,228)', stopOpacity: 1 }} />
          <stop offset="52.5%" style={{ stopColor: 'rgb(237,147,133)', stopOpacity: 1 }} />
          <stop offset="68%" style={{ stopColor: 'rgb(241,162,117)', stopOpacity: 1 }} />
          <stop offset="78%" style={{ stopColor: 'rgb(239,159,123)', stopOpacity: 1 }} />
          <stop offset="91%" style={{ stopColor: 'rgb(236,136,132)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="4" cy="12" r="3" fill="url(#gradient)">
        <animate id="a" begin="0;b.end-0.25s" attributeName="r" dur={dur} values="3;.2;3" />
      </circle>
      <circle cx="12" cy="12" r="3" fill="url(#gradient)">
        <animate begin="a.end-0.6s" attributeName="r" dur={dur} values="3;.2;3" />
      </circle>
      <circle cx="20" cy="12" r="3" fill="url(#gradient)">
        <animate id="b" begin="a.end-0.45s" attributeName="r" dur={dur} values="3;.2;3" />
      </circle>
    </svg>
  );
}
