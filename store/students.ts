import { create } from 'zustand';
import { Student } from '@/types/student';
import { mockStudents } from '@/data/mockData';

interface StudentsState {
  students: Student[];
  filteredStudents: Student[];
  searchQuery: string;
  selectedStudent: Student | null;
  isLoading: boolean;
}

interface StudentsActions {
  setSearchQuery: (query: string) => void;
  setSelectedStudent: (student: Student | null) => void;
  updateStudent: (studentId: string, updates: Partial<Student>) => void;
  applyFilters: () => void;
}

type StudentsStore = StudentsState & StudentsActions;

export const useStudentsStore = create<StudentsStore>((set, get) => ({
  // State
  students: mockStudents,
  filteredStudents: mockStudents,
  searchQuery: '',
  selectedStudent: null,
  isLoading: false,

  // Actions
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSelectedStudent: (student: Student | null) => {
    set({ selectedStudent: student });
  },

  updateStudent: (studentId: string, updates: Partial<Student>) => {
    set(state => ({
      students: state.students.map(student =>
        student.id === studentId ? { ...student, ...updates } : student
      )
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { students, searchQuery } = get();
    
    let filtered = [...students];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.rank.name.toLowerCase().includes(query)
      );
    }

    set({ filteredStudents: filtered });
  }
}));