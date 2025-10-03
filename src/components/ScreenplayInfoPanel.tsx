import { useEffect, useState } from 'react';
import { supabase, Screenplay } from '../lib/supabase';

export default function ScreenplayInfoPanel() {
  const [screenplays, setScreenplays] = useState<Screenplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScreenplays();
  }, []);

  const fetchScreenplays = async () => {
    try {
      const { data, error } = await supabase
        .from('screenplays')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setScreenplays(data || []);
    } catch (error) {
      console.error('Error fetching screenplays:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="panel">
        <h2>Informações do Roteiro</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  if (screenplays.length === 0) {
    return (
      <div className="panel">
        <h2>Informações do Roteiro</h2>
        <p className="empty-state">Nenhum roteiro encontrado</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Informações do Roteiro</h2>
      {screenplays.map((screenplay) => (
        <div key={screenplay.id} className="screenplay-info">
          <div className="info-row">
            <span className="info-label">Título:</span>
            <span className="info-value">{screenplay.title}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Tipo:</span>
            <span className="info-value">{screenplay.type}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Total de Cenas:</span>
            <span className="info-value">{screenplay.total_scenes}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Total de Falas:</span>
            <span className="info-value">{screenplay.total_dialogues}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
