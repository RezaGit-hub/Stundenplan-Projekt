import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Badge } from '@/components/ui/Badge';

export default function App() {
  return (
    <div style={{ padding: 'var(--space-8)' }}>
      <PageHeader
        title="Lehrkraft"
        description="3 Lehrkräfte . 3 Aktiv"
        actions={
          <>
            <Button variant="secondary">Importieren</Button>
            <Button>Neue Lehrkrfat</Button>'
          </>
        }
      />
      <Card>
        <Badge>Neutral</Badge> <Badge tone="primary">Mathematik</Badge>{' '}
        <Badge tone="success">aktive</Badge> <Badge tone="warning">Vertretung</Badge>{' '}
        <Badge tone="danger">gesperrt</Badge>
      </Card>
    </div>
  );
}
