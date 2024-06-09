"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import useSuperCluster from "use-supercluster";
import getCenter from "geolib/es/getCenter";
import { createClient } from '@/utils/supabase/client';
import { useQuery } from "react-query";
import { mapAPI, mapKeys } from "../queries";
import { MapRef } from 'react-map-gl';
import mockData from "@/utils/data/mockDataGeoContinents.json";
import debounce from "lodash.debounce";

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
  const supaClient = createClient();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const mapRef = useRef<MapRef | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [bounds, setBounds] = useState<{ ne: [number, number]; sw: [number, number] }>({
    ne: [-50, 60],  // North-East corner (longitude, latitude)
    sw: [-140, 15], // South-West corner (longitude, latitude)
  });

  const useMockData = false;

  const fetchMapData = async (bounds: { ne: [number, number]; sw: [number, number] }) => {
    if (!bounds) return [];
    const mapData = await mapAPI.getMapData({ supaClient, bounds });
    console.log("Raw map data from database:", mapData);
    return mapData?.data || [];
  };

  const { data: points, isFetching, isLoading } = useQuery(
    [...mapKeys.lists(), bounds], // Unique key for this query with the current bounds (bounds)
    () => fetchMapData(bounds),
    {
      enabled: !useMockData,
      onSuccess: () => setInitialRender(false),
    }
  );

  const mockPoints = useMemo(
    () =>
      mockData.features.map((item) => ({
        type: "Feature",
        properties: {
          cluster: false,
          geojsonId: item.properties.geojsonId,
          name: item.properties.name,
          country: "",
          city: "",
          activity: item.properties.activity,
        },
        geometry: {
          type: "Point",
          coordinates: item.geometry.coordinates,
        },
      })),
    []
  );

  const finalPoints = useMockData ? mockPoints : points;

  const coordinates = useMemo(
    () =>
      finalPoints?.map((user) => ({
        longitude: user?.geometry?.coordinates[0],
        latitude: user?.geometry?.coordinates[1],
      })) || [],
    [finalPoints]
  );

  const center = useMemo(() => {
    if (coordinates.length > 0) {
      return getCenter(coordinates as GeolibInputCoordinates[]);
    } else {
      return { latitude: 0, longitude: 0 }; // Default center
    }
  }, [coordinates]);

  const defaultLatitude = 0;
  const defaultLongitude = 0;

  const [viewPort, setViewport] = useState({
    latitude: center ? center.latitude : defaultLatitude,
    longitude: center ? center.longitude : defaultLongitude,
    zoom: 1,
  });

  const updateBounds = useCallback(() => {
    console.log("🚀 ~ updateBounds ~ mapRef:", mapRef);

    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds();
      console.log("🚀 ~ updateBounds ~ bounds:", bounds);
      setBounds({
        ne: [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
        sw: [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      });
      console.log("🚀 ~ useMapGL ~ updateBounds ~ updated bounds:", {
        ne: [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
        sw: [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
      });
    }
  }, [mapRef]);

  const debouncedUpdateBounds = useMemo(() => debounce(updateBounds, 500), [updateBounds]);

  useEffect(() => {
    if (!mapRef.current) return; // Wait until mapRef is initialized

    const map = mapRef.current.getMap();
    map.on("moveend", debouncedUpdateBounds);
    if (initialRender) {
      updateBounds(); // Initial load
    }

    return () => {
      map.off("moveend", debouncedUpdateBounds);
    };
  }, [mapRef.current, isMapReady, debouncedUpdateBounds, updateBounds, initialRender]);

  const [mapBounds, setMapBounds] = useState<BBox | undefined>([
    bounds.sw[0], bounds.sw[1], bounds.ne[0], bounds.ne[1],
  ]);

  useEffect(() => {
    console.log("Setting mapBounds:", bounds);
    setMapBounds([bounds.sw[0], bounds.sw[1], bounds.ne[0], bounds.ne[1]]);
  }, [bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setIsMapReady(true);
    }
  }, [mapRef.current]);

  const { clusters, supercluster } = useSuperCluster({
    points: finalPoints || [],
    zoom: viewPort.zoom,
    bounds: mapBounds,
    options: { radius: 75, maxZoom: 20 },
    disableRefresh: isFetching,
  });

  const handleMarkerClick = (cluster: any) => {
    if (supercluster && cluster.properties && cluster.properties.cluster_id) {
      const expansionZoom = Math.min(
        supercluster.getClusterExpansionZoom(cluster.properties.cluster_id),
        20
      );
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
    points: finalPoints,
    isLoading: useMockData ? false : isLoading,
  };
};

export default useMapGL;
