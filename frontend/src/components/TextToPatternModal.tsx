import React from 'react';
import { useTranslations } from '../i18n';
import { textToGrid } from '../data/characterPatterns';

type Props = {
  open: boolean;
  onSubmit: (text: string) => void;
  onClose: () => void;
};

export const TextToPatternModal: React.FC<Props> = ({ open, onSubmit, onClose }) => {
  const { dictionary } = useTranslations();
  const labels = dictionary.textModal;

  const [text, setText] = React.useState('');
  const [previewGrid, setPreviewGrid] = React.useState<number[][]>([]);

  React.useEffect(() => {
    if (open) {
      setText('');
      setPreviewGrid([]);
    }
  }, [open]);

  React.useEffect(() => {
    const grid = textToGrid(text);
    setPreviewGrid(grid);
  }, [text]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <div className="modal__backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label={labels.title}>
        <div className="modal__header">
          <div>
            <h2>{labels.title}</h2>
            <p className="modal__hint">{labels.description}</p>
          </div>
          <button
            type="button"
            className="modal__close"
            aria-label={labels.cancel}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="modal__body" onSubmit={handleSubmit}>
          <label className="modal__field">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.toUpperCase())}
              placeholder={labels.placeholder}
              autoComplete="off"
              className="w-full rounded border border-gray-300 px-3 py-2"
              autoFocus
            />
          </label>

          {/* Preview Area */}
          <div className="mt-4">
            <h3 className="mb-2 text-sm font-bold text-gray-700">{labels.preview}</h3>
            <div className="overflow-x-auto rounded border border-gray-200 bg-gray-50 p-4">
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: `repeat(7, 10px)`,
                  gridTemplateColumns: `repeat(${previewGrid[0]?.length || 1}, 10px)`,
                  gap: '2px',
                }}
              >
                {previewGrid.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${y}-${x}`}
                      className={`h-2.5 w-2.5 rounded-sm ${cell ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="modal__footer mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              {labels.cancel}
            </button>
            <button
              type="submit"
              disabled={!text}
              className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {labels.generate}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
