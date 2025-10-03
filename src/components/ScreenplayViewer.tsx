import { useEffect, useState } from 'react';
import { supabase, Scene, Dialogue } from '../lib/supabase';

type TabType = 'final' | 'scenes' | 'dialogues';

interface SceneWithDialogues extends Scene {
  dialogues: Dialogue[];
}

export default function ScreenplayViewer() {
  const [activeTab, setActiveTab] = useState<TabType>('final');
  const [scenes, setScenes] = useState<SceneWithDialogues[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScreenplayData();
  }, []);

  const fetchScreenplayData = async () => {
    try {
      const { data: scenesData, error: scenesError } = await supabase
        .from('scenes')
        .select('*')
        .order('scene_number', { ascending: true });

      if (scenesError) throw scenesError;

      const { data: dialoguesData, error: dialoguesError } = await supabase
        .from('dialogues')
        .select('*')
        .order('created_at', { ascending: true });

      if (dialoguesError) throw dialoguesError;

      const scenesWithDialogues = (scenesData || []).map((scene) => ({
        ...scene,
        dialogues: (dialoguesData || []).filter((d) => d.scene_id === scene.id),
      }));

      setScenes(scenesWithDialogues);
    } catch (error) {
      console.error('Error fetching screenplay data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderFinalVersion = () => (
    <div className="screenplay-content">
      {scenes.map((scene) => (
        <div key={scene.id} className="scene-block">
          <div className="scene-header">CENA {scene.scene_number}</div>
          <div className="scene-content">{scene.content}</div>
          {scene.dialogues.length > 0 && (
            <div className="dialogues">
              {scene.dialogues.map((dialogue) => (
                <div key={dialogue.id} className="dialogue">
                  <div className="character-name">{dialogue.character_name}</div>
                  <div className="dialogue-text">{dialogue.dialogue_text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderScenesOnly = () => (
    <div className="screenplay-content">
      {scenes.map((scene) => (
        <div key={scene.id} className="scene-block">
          <div className="scene-header">CENA {scene.scene_number}</div>
          <div className="scene-content">{scene.content}</div>
        </div>
      ))}
    </div>
  );

  const renderDialoguesOnly = () => {
    const allDialogues = scenes.flatMap((scene) =>
      scene.dialogues.map((dialogue) => ({
        ...dialogue,
        sceneNumber: scene.scene_number,
      }))
    );

    return (
      <div className="screenplay-content">
        {allDialogues.map((dialogue) => (
          <div key={dialogue.id} className="dialogue-block">
            <div className="dialogue-meta">
              Cena {dialogue.sceneNumber} - {dialogue.character_name}
            </div>
            <div className="dialogue-text">{dialogue.dialogue_text}</div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="panel">
        <h2>Roteiro</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="panel">
      <h2>Roteiro</h2>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'final' ? 'active' : ''}`}
          onClick={() => setActiveTab('final')}
        >
          Roteiro Final
        </button>
        <button
          className={`tab ${activeTab === 'scenes' ? 'active' : ''}`}
          onClick={() => setActiveTab('scenes')}
        >
          Só Cenas
        </button>
        <button
          className={`tab ${activeTab === 'dialogues' ? 'active' : ''}`}
          onClick={() => setActiveTab('dialogues')}
        >
          Só Falas
        </button>
      </div>
      <div className="tab-content">
        {scenes.length === 0 ? (
          <p className="empty-state">Nenhum roteiro disponível</p>
        ) : (
          <>
            {activeTab === 'final' && renderFinalVersion()}
            {activeTab === 'scenes' && renderScenesOnly()}
            {activeTab === 'dialogues' && renderDialoguesOnly()}
          </>
        )}
      </div>
    </div>
  );
}
