'use client';
import { useState, useRef, useMemo, useEffect } from 'react';
import useSuperCluster from 'use-supercluster';
import getCenter from 'geolib/es/getCenter';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from 'react-query';
import { mapAPI, mapKeys } from '../queries';
import { MapRef } from 'react-map-gl';
import mockData from '@/utils/data/mockDataGeoContinents.json';

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
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const mapRef = useRef<MapRef | null>(null);

  const useMockData = false;

  const {
    data: points,
    isFetching,
    isLoading,
  } = useQuery([...mapKeys.lists()], async () => {
    const mapData = await mapAPI.getMapData({ supaClient });
    console.log('Raw map data from database:', mapData);
    return mapData?.data || [];
  });

  const mockPoints = useMemo(
    () =>
      mockData.features.map((item) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          geojsonId: item.properties.geojsonId,
          name: item.properties.name,
          country: '',
          city: '',
          activity: item.properties.activity,
        },
        geometry: {
          type: 'Point',
          coordinates: item.geometry.coordinates,
        },
      })),
    [],
  );

  const finalPoints = useMockData ? mockPoints : points;

  const coordinates = useMemo(
    () =>
      finalPoints?.map((user) => ({
        longitude: user?.geometry?.coordinates[0],
        latitude: user?.geometry?.coordinates[1],
      })) || [],
    [finalPoints],
  );

  const center = getCenter(coordinates as GeolibInputCoordinates[]);

  const defaultLatitude = 0;
  const defaultLongitude = 0;

  const [viewPort, setViewport] = useState({
    latitude: center ? center.latitude : defaultLatitude,
    longitude: center ? center.longitude : defaultLongitude,
    zoom: 5,
  });

  useEffect(() => {
    if (mapRef.current) {
      const bounds = mapRef.current.getMap().getBounds().toArray().flat();
      setMapBounds(bounds as BBox);
    }
  }, [mapRef, viewPort]);

  const [mapBounds, setMapBounds] = useState<BBox | undefined>(undefined);

  const { clusters, supercluster } = useSuperCluster({
    points: finalPoints || [],
    zoom: viewPort.zoom,
    bounds: mapBounds,
    options: { radius: 75, maxZoom: 20 },
    disableRefresh: isFetching,
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
    points: finalPoints,
    isLoading: useMockData ? false : isLoading,
  };
};

export default useMapGL;
