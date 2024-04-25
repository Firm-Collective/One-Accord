import React from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import useMapGL from './hooks';
import styles from './styles.module.css';

const MapGL = () => {
  const { clusters, selectedUser, setSelectedUser, mapRef, viewPort, setViewport, handleMarkerClick, points } =
    useMapGL();

  const getMarkerClassName = (activity) => {
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
    <ReactMapGL
      {...viewPort}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapStyle='mapbox://styles/charlyboy1993/clv4jourp00h901pp4s6v5l81'
      onViewportChange={(newViewport) => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
    >
      {clusters.map((cluster, idx) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          const size = 20 + (pointCount / points.length) * 50;

          return (
            <Marker
              key={`${cluster.properties?.geojsonId}-${cluster.properties?.name}-${idx}`}
              latitude={latitude}
              longitude={longitude}
              className={getClusterClassName()}
              onClick={() => handleMarkerClick(cluster, viewPort, setViewport)}
            >
              <div
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  backgroundColor: '#FF5733', // Naranja más rojizo
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
            className={getMarkerClassName(cluster.properties?.activity)}
          >
            <div
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
          latitude={selectedUser.geometry.coordinates[1]}
          longitude={selectedUser.geometry.coordinates[0]}
          onClose={() => {
            setSelectedUser(null);
          }}
        >
          <div>{selectedUser.properties?.activity}</div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default MapGL;
