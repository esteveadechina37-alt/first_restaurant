import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(url);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export const usePost = () => {
  const [loading, setLoading] = useState(false);

  const post = async (url, data) => {
    try {
      setLoading(true);
      const response = await api.post(url, data);
      toast.success('Succès');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { post, loading };
};

export const useUpdate = () => {
  const [loading, setLoading] = useState(false);

  const update = async (url, data) => {
    try {
      setLoading(true);
      const response = await api.put(url, data);
      toast.success('Mise à jour réussie');
      return response.data;
    } catch (error) {
      toast.error('Erreur de mise à jour');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading };
};