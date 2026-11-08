import { Button } from '@/components/ui/Button';

export default function App() {
  return (
    <div style={{ padding: 'var(--space-8)', display: 'flex', gap: 'var(--space-3)' }}>
      <Button>Speichern</Button>
      <Button variant="secondary">Abbrechen</Button>
      <Button variant="danger" size="sm">
        Löschen
      </Button>
      <Button disabled>Deaktiviert</Button>
    </div>
  );
}
