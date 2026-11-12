import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchInput } from '@/components/ui/SearchInput';
import { getSubjects } from '@/features/subjects/subjectService';
import { getTeachers } from '@/features/teachers/teacherService';
import type { Teacher } from '@/features/teachers/types';
import { useAsync } from '@/hooks/useAsync';
import { useSearch } from '@/hooks/useSearch';

export default function App() {
  // >> Zwei unabhängige Ladevorgänge. Jeder hat seinen eigenen State.
  const teachersState = useAsync(getTeachers);
  const subjectsState = useAsync(getSubjects);

  // >> "data" ist null, solange geladen wird. Hooks dürfen nicht bedingt aufgerufen
  // >> werden (kein "if" davor), deshalb geben wir eine leere Liste als Ersatz weiter.
  const teachers = teachersState.data ?? [];
  const subjects = subjectsState.data ?? [];

  // >> Die Fachnamen stehen nur im Subject-Objekt, nicht in der Lehrkraft (die hat nur IDs).
  // >> Wir bauen daraus eine Nachschlagetabelle: ID → Fach. Das ist schneller als bei
  // >> jeder Zelle die ganze Liste mit .find() zu durchsuchen.
  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));

  // >> Die Suchfunktion löst die IDs in Fachnamen auf, damit man auch nach "Mathe" suchen kann.
  const getSearchText = (teacher: Teacher) =>
    [
      teacher.name,
      teacher.abbreviation,
      ...teacher.subjectIds.map((id) => subjectById.get(id)?.name ?? ''),
    ].join(' ');

  const { query, setQuery, results } = useSearch(teachers, getSearchText);

  // >> Die Spalten stehen in der Komponente, weil "render" auf subjectById zugreift,
  // >> und das gibt es erst hier.
  const columns: Column<Teacher>[] = [
    { key: 'name', header: 'Name', render: (teacher) => teacher.name },
    { key: 'abbreviation', header: 'Kürzel', render: (teacher) => teacher.abbreviation },
    {
      key: 'subjects',
      header: 'Fächer',
      render: (teacher) => (
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {teacher.subjectIds.map((id) => (
            <Badge key={id} tone="primary">
              {subjectById.get(id)?.abbreviation ?? '?'}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: 'hours',
      header: 'Deputat',
      render: (teacher) => `${teacher.weeklyHours} Std.`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (teacher) => (
        <Badge tone={teacher.isActive ? 'success' : 'neutral'}>
          {teacher.isActive ? 'aktiv' : 'inaktiv'}
        </Badge>
      ),
    },
  ];

  return (
    <div style={{ padding: 'var(--space-8)' }}>
      <PageHeader
        title="Lehrkräfte"
        description={`${results.length} von ${teachers.length} Lehrkräften`}
        actions={
          <>
            <SearchInput value={query} onChange={setQuery} placeholder="Name oder Fach…" />
            <Button>Neue Lehrkraft</Button>
          </>
        }
      />

      {/* >> Drei Zustände, die jede Datenseite braucht: Fehler, Laden, Daten. */}
      {teachersState.error && (
        <p>
          Fehler: {teachersState.error.message}{' '}
          <Button size="sm" variant="secondary" onClick={teachersState.reload}>
            Erneut versuchen
          </Button>
        </p>
      )}
      {teachersState.isLoading && <p>Lade…</p>}
      {teachersState.data && (
        <Card padded={false}>
          <DataTable columns={columns} rows={results} getRowKey={(teacher) => teacher.id} />
        </Card>
      )}
    </div>
  );
}
