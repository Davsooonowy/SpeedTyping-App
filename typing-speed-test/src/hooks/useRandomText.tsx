import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

export const useRandomText = () => {
  const [text, setText] = useState('Loading...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomText = async () => {
      try {
        let { data: ids, error: idsError } = await supabase
          .from('texts')
          .select('id');

        if (idsError) throw idsError;

        if (!ids || ids.length === 0) {
          throw new Error('No IDs found');
        }

        const randomIndex = Math.floor(Math.random() * ids.length);
        const randomId = ids[randomIndex].id;

        let { data, error } = await supabase
          .from('texts')
          .select('content')
          .eq('id', randomId)
          .single();

        if (error) throw error;

        if (!data) {
          throw new Error('No data found');
        }

        setText(data.content);
      } catch (error) {
        console.error("Error fetching random text:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomText();
  }, []);

  return { text, loading, error };
};