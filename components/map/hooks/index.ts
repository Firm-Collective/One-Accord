import { useState, useRef, useMemo } from "react";
import useSuperCluster from "use-supercluster";
import mockDataGeoContinents from "../data/mockDataGeoContinents.json";
import getCenter from "geolib/es/getCenter";

type User = {
  type: string;
  properties: {
    geojsonId: number;
    name: string;
    continent: string;
    activity: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

type GeoFeature = {
  type: string;
  properties: {
    geojsonId: number;
    name: string;
    continent: string;
    activity: string;
    country?: string; 
    city?: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
};

const useMapGL = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const mapRef = useRef(null); 

  const points: GeoFeature[] | undefined = useMemo(() => {
    return mockDataGeoContinents?.features.map((user: GeoFeature) => ({
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
    })) as GeoFeature[];
  }, []);

  console.log("🚀 ~ constpoints:GeoFeature[]|undefined=mockDataGeoContinents?.features.map ~ points:", points)
  
  const coordinates = mockDataGeoContinents?.features.map((user: GeoFeature) => ({
    longitude: user.geometry.coordinates[0],
    latitude: user.geometry.coordinates[1]
  }));

  // Implement useMemo

  const center: {latitude: number, longitude: number } = getCenter(coordinates) || { latitude: 52.6376, longitude: -1.135171 };
  
  const [viewPort, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 4,
    });

  // get map bounds
  const bounds =
  mapRef.current && (mapRef.current).getMap()
    ? (mapRef.current).getMap().getBounds().toArray().flat() 
    : null;

  // get clusters
  const { clusters, supercluster } = useSuperCluster({
    points: points ? points.slice(0, 500) : [],
    zoom: viewPort.zoom,
    bounds,
    options: { radius: 75, maxZoom: 100 },
  });

  const handleMarkerClick = (cluster, viewPort, setViewport) => {
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20
    );
    setViewport({
      ...viewPort,
      latitude: cluster?.geometry?.coordinates[1],
      longitude: cluster?.geometry?.coordinates[0],
      zoom: expansionZoom,
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
