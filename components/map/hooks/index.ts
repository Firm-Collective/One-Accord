import { useState, useRef } from "react";
import FlyToInterpolator from "react-map-gl";
import useSuperCluster from "use-supercluster";
import mockDataGeoContinents from "../data/mockDataGeoContinents.json";

const useMapGL = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const mapRef = useRef(null);

  // Implement hooks

  const points = mockDataGeoContinents?.features?.map((user) => ({
    type: "Feature",
    properties: {
      cluster: false,
      geojsonId: user.properties.geojsonId,
      name: user.properties.name,
      country: user.properties.country,
      city: user.properties.city,
      activity: user.properties.activity,
    },
    geometry: {
      type: "Point",
      coordinates: [user.geometry.coordinates[0], user.geometry.coordinates[1]],
    },
  }));
  
  console.log("🚀 ~ points ~ points:", points)
  const [viewPort, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 52.6376,
    longitude: -1.135171,
    zoom: 4,
  });

  // get map bounds
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  // get clusters
  const { clusters, supercluster } = useSuperCluster({
    points: points ? points.slice(0, 3000) : [],
    zoom: viewPort.zoom,
    bounds,
    options: { radius: 75, maxZoom: 100 },
  });
  console.log("🚀 ~ useMapGL ~ clusters:", clusters)

  const handleMarkerClick = (cluster, viewPort, setViewport) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20
    );
    setViewport({
      ...viewPort,
      latitude: cluster.geometry.coordinates[1],
      longitude: cluster.geometry.coordinates[0],
      zoom: expansionZoom,
      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
      transitionDuration: "auto",
    });
  };

  return {
    clusters,
    selectedUser,
    setSelectedUser,
    mapRef,
    viewPort,
    setViewport,
    handleMarkerClick,
    points,
  };
};

export default useMapGL;
