"use client";

import { useState, useRef } from "react";
import useSuperCluster from "use-supercluster";
import getCenter from "geolib/es/getCenter";
import { createBrowserClient } from '@supabase/ssr'
import { useQuery } from "react-query";
import { mapAPI, mapKeys} from "../queries"
import mockDataGeoContinents from "@/utils/data/mockDataGeoContinents.json";

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

const useMapGL = () => {
  const supaClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const mapRef = useRef(null); 

  // DB request 
  // useQuery
  // const querryMapInfo = useQuery([...mapKeys.lists()], async () => {
  //   try {
  //     const mapData = await mapAPI.getMapData({ supaClient });
  //     return mapData?.data;
  //   } catch (error) {
  //     console.error("Error al obtener datos del mapa:", error);
  //     throw error;
  //   }
  // }, {
  //   onSuccess: (mapData) => {
  //     if (!mapData) {
  //       console.error("No se encontraron datos en el mapa.");
  //       return [];
  //     }
  
  //     const transformedData = mapData.map((item: any) => ({
  //       type: "Feature",
  //       properties: {
  //         cluster: false,
  //         geojsonId: item.id,
  //         name: item.User?.username || "",
  //         country: item.User?.Location?.country || "",
  //         city: item.User?.Location?.city || "",
  //         activity: item.Activity?.name || "",
  //       },
  //       geometry: {
  //         type: "Point",
  //         coordinates: [
  //           parseFloat(item.User?.Location?.latitude || "0"),
  //           parseFloat(item.User?.Location?.longitude || "0")
  //         ],
  //       },
  //     }));
  
  //     return transformedData;
  //   },
  //   onError: (error) => {
  //     console.error("Error:", error);
  //   },
  // });
  // const points = querryMapInfo.data;

  // Muckup data request 
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
  
 
  
  const coordinates = mockDataGeoContinents?.features?.map((user) => ({
    longitude: user?.geometry?.coordinates[0],
    latitude: user?.geometry?.coordinates[1]
  }))
  

  // Implement useMemo

  const center: {latitude: number, longitude: number } = getCenter(coordinates);
  
  const [viewPort, setViewport] = useState({
    latitude: center.latitud,
    longitude: center.longitud,
    zoom: 0,
    });

  // get map bounds
  const bounds =
  mapRef.current && (mapRef.current).getMap()
    ? (mapRef.current).getMap().getBounds().toArray().flat() 
    : null;

  // get clusters
  const { clusters, supercluster } = useSuperCluster({
    points: points ? points.slice(0, 10) : [],
    zoom: viewPort.zoom,
    bounds,
    options: { radius: 75, maxZoom: 100 },
    // disableRefresh: querryMapInfo.isFetching
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
