import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import useMapGL from './hooks';
import styles from './styles.module.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Loading from '@/app/loading';

const MapGL = () => {
  const {
    clusters,
    selectedUser,
    setSelectedUser,
    mapRef,
    viewPort,
    setViewport,
    handleMarkerClick,
    points = [],
    isLoading,
  } = useMapGL();

  const getMarkerClassName = (activity: string | undefined): string => {
    switch (activity) {
      case 'Trumpet':
        return styles['visible-marker-trumpet'];
      case 'Worship':
        return styles['visible-marker-worship'];
      case 'Prayer':
        return styles['visible-marker-prayer'];
      case 'Communion':
        return styles['visible-marker-communion'];
      default:
        return styles['visible-marker'];
    }
  };

  const getClusterClassName = () => {
    return styles['visible-marker-cluster'];
  };

  return (
    <div className='w-[100%] h-[281px] sm:h-full'>
      {isLoading ? (
        <div
          role='status'
          className='flex items-center justify-center h-full w-full bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700 '
        >
          {/** Replace with the glob image */}
          {/* <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z"/>
          </svg> */}
          <span className='sr-only'>Loading...</span>
        </div>
      ) : (
        <ReactMapGL
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={`/api/map`}
          initialViewState={viewPort}
          onMove={(evt) => setViewport(evt.viewState)}
          maxZoom={20}
          minZoom={0}
          ref={mapRef}
        >
          {clusters.map((cluster, idx) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } = cluster.properties;

            if (isCluster) {
              const size = 10 + (pointCount / points.length) * 50;

              return (
                <Marker
                  key={`${cluster.properties?.geojsonId}-${cluster.properties?.name}-${idx}`}
                  latitude={latitude}
                  longitude={longitude}
                  onClick={() => handleMarkerClick(cluster)}
                >
                  <div
                    className={getClusterClassName()}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      backgroundColor: '#ED9385', // Naranja más rojizo
                      color: '#FFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              );
            }

            return (
              <Marker
                key={`${cluster.properties?.geojsonId}-${cluster.properties?.name}-${idx}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className={getMarkerClassName(cluster.properties?.activity)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor:
                      cluster.properties?.activity === 'Trumpet'
                        ? '#FFBF00' // Amarillo brillante
                        : cluster.properties?.activity === 'Worship'
                          ? '#FF007F' // Rosa fluorescente
                          : cluster.properties?.activity === 'Prayer'
                            ? '#39FF14' // Verde fluorescente
                            : cluster.properties?.activity === 'Communion'
                              ? '#00FFFF' // Cian brillante
                              : '#FFFFFF', // Blanco (por defecto)
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    setSelectedUser(cluster);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    setSelectedUser(null);
                  }}
                />
              </Marker>
            );
          })}

          {selectedUser && selectedUser.geometry && selectedUser.geometry.coordinates ? (
            <Popup
              offset={25}
              latitude={selectedUser.geometry.coordinates[1]}
              longitude={selectedUser.geometry.coordinates[0]}
              onClose={() => {
                setSelectedUser(null);
              }}
              closeButton={false}
            >
              <div style={{ color: 'black' }}>{selectedUser.properties?.activity}</div>
            </Popup>
          ) : null}
        </ReactMapGL>
      )}
    </div>
  );
};

export default MapGL;
