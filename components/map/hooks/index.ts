"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import useSuperCluster from "use-supercluster";
import getCenter from "geolib/es/getCenter";
import { createClient } from '@/utils/supabase/client'
import { useQuery } from "react-query";
import { mapAPI, mapKeys} from "../queries"
import { MapRef } from 'react-map-gl';
// import mockDataGeoContinents from "@/utils/data/mockDataGeoContinents.json";

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

type GeolibInputCoordinates = {
  latitude: number;
  longitude: number;
};

type BBox = [number, number, number, number];

const useMapGL = () => {
  const supaClient = createClient()
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const mapRef = useRef<MapRef | null>(null);

  // DB request with useQuery
  const { data: points, isFetching, isLoading } = useQuery([...mapKeys.lists()], async () => {
    const mapData = await mapAPI.getMapData({ supaClient });
    return mapData?.data?.map((item: any) => ({
      type: "Feature",
      properties: {
        cluster: false,
        geojsonId: item.id,
        name: item.User?.username || "",
        country: item.User?.Location?.country || "",
        city: item.User?.Location?.city || "",
        activity: item.Activity?.name || "",
      },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(item.User?.Location?.latitude || "0"),
          parseFloat(item.User?.Location?.longitude || "0")
        ],
      },
    })) || [];
  });
  
  // Implement useMemo
  const coordinates = useMemo(() => points?.map((user) => ({
    longitude: user?.geometry?.coordinates[0],
    latitude: user?.geometry?.coordinates[1]
  })), [points]) || [];
  

  const center = getCenter(coordinates as GeolibInputCoordinates[]);
  
  const defaultLatitude = 0; 
  const defaultLongitude = 0; 

  const [viewPort, setViewport] = useState({
    latitude: center ? center.latitude : defaultLatitude,
    longitude: center ? center.longitude : defaultLongitude,
    zoom: 1,
  });


  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat();
      setMapBounds(bounds as BBox);
    }
  }, [mapRef, viewPort]);

  const [mapBounds, setMapBounds] = useState<BBox | undefined>(undefined);


  // get clusters
  const { clusters, supercluster } = useSuperCluster({
    points: points || [],
    zoom: viewPort.zoom,
    bounds: mapBounds,
    options: { radius: 75, maxZoom: 20 },
    disableRefresh: isFetching
  });

  const handleMarkerClick = (cluster: any) => {
    if (supercluster && cluster.properties && cluster.properties.cluster_id) {
      const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.properties.cluster_id), 20);
      setViewport({
        ...viewPort,
        latitude: cluster.geometry.coordinates[1],
        longitude: cluster.geometry.coordinates[0],
        zoom: expansionZoom,
      });
    }
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
    isLoading,
  };
};

export default useMapGL;
