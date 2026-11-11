import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useSearch } from "@/hooks/useSearch";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";

type Teacher = {
  id: string;
  name: string;
  subjects: string[];
  status: 'active' | 'vertretung';
  employment: 'Vollzeit' |'Teilzeit';
};

const teachers: Teacher[] = [
  {id: '1', name: 'Weber', subjects: ['Mathematik'], status: 'active', employment: 'Vollzeit'},
  {id: '1', name: 'Mayer', subjects: ['Mathematik', 'Physik'], status: 'vertretung', employment: 'Vollzeit'},
  {id: '1', name: 'Müller', subjects: ['Deutsch'], status: 'active', employment: 'Teilzeit'},
  {id: '1', name: 'Steffen', subjects: ['Sport'], status: 'active', employment: 'Vollzeit'},
  {id: '1', name: 'Grünner', subjects: ['Region'], status: 'active', employment: 'Teilzeit'},
];

const getTeacherSearchText = (teacher: Teacher) =>
  [teacher.name, ...teacher.subjects].join(' ');


const Columns: Column<Teacher>[] = [
  {key: 'name', header: 'Name', render: (teacher) => teacher.name},
  {
    key: 'subjects', header: ' Fächer', render: (teacher) => (
      <div style={{display: 'flex', gap: 'var(--space-2'}}>
        {teacher.subjects.map((subject) => (
          <Badge key={subject} tone="primary">
            {subject}
          </Badge>
        ))}
      </div>
    ),
  },
  {key: 'status', header: 'Status', render: (teacher) => teacher.status },
  {key: 'employment', header: 'Beschäftigung', render: (teacher) => teacher.employment}
]


export default function App(){
  const {query, setQuery, results} = useSearch(teachers, getTeacherSearchText);

  return(
    <div style={{padding: 'var(--space-8)'}}>
      <PageHeader
        title="Leahrkräfte"
        description={`${results.length} von ${teachers.length} Lehkräfte `}
        actions={
          <>
            <SearchInput value={query} onChange={setQuery} placeholder="Name oder Fach..."/>
            <Button>Neue Lahrkraft</Button>
          </>
        }
      />
      <Card padded={false}>
        <DataTable columns={Columns} rows={results} getRowKey={(teacher) => teacher.id}/>
      </Card>
    </div>
  )
}
