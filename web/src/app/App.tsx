import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { SearchInput } from '@/components/ui/SearchInput';
import { getTeachers } from '@/features/teachers/teacherService';
import { getSubjects } from '@/features/subjects/subjectService';
import type { Teacher } from '@/features/teachers/types';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAsync } from '@/hooks/useAsync';
import { useSearch } from '@/hooks/useSearch';

export default function App() {
  const teachersState = useAsync(getTeachers);
  const subjectsState = useAsync(getSubjects);

  const teachers = teachersState.data ?? [];
  const subjects = subjectsState.data ?? [];

  const subjectById = new Map(subjects.map((subject) => [subject.id, subject]));

  const getSearchText = (teacher: Teacher) =>
    [
      teacher.name,
      teacher.abbreviation,
      ...teacher.subjectIds.map((id) => subjectById.get(id)?.name ?? ''),
    ].join(' ');

  const { query, setQuery, results } = useSearch(teachers, getSearchText);

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
    { key: 'hours', header: 'Deputat', render: (teacher) => `${teacher.weeklyHours} Std.` },
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
        title="Lehrkraft"
        description={`${results.length} von ${results.length} Lehrkräfte`}
        actions={
          <>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Name oder Fach"
            ></SearchInput>
            <Button>Neu LehrKraft</Button>
          </>
        }
      />

      {teachersState.error && (
        <p>
          Fehler: {teachersState.error.message}{' '}
          <Button size="sm" variant="secondary" onClick={teachersState.reload}>
            Erneut Versuchen
          </Button>
        </p>
      )}

      {teachersState.isLoading && <p>Lade....</p>}
      {teachersState.data && (
        <Card padded={false}>
          <DataTable
            columns={columns}
            rows={results}
            getRowKey={(teacher) => teacher.id}
          ></DataTable>
        </Card>
      )}
    </div>
  );
}
