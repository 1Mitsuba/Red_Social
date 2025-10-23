import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

// Componente principal del módulo académico
export const AcademicModule = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('materias');
  
  // Datos de ejemplo para materias
  const courses = [
    {
      id: 'MAT101',
      name: 'Cálculo Diferencial',
      code: 'MAT101',
      group: 'A',
      professor: 'Dr. Roberto Sánchez',
      schedule: [
        { day: 'Lunes', time: '08:00 - 10:00', room: 'A101' },
        { day: 'Miércoles', time: '08:00 - 10:00', room: 'A101' }
      ],
      average: 78.5,
      semester: 1
    },
    {
      id: 'INF110',
      name: 'Programación',
      code: 'INF110',
      group: 'B',
      professor: 'Ing. María Gonzales',
      schedule: [
        { day: 'Martes', time: '14:00 - 16:00', room: 'LAB C' }
      ],
      average: 85.0,
      semester: 1
    },
    {
      id: 'FIS100',
      name: 'Física General',
      code: 'FIS100',
      group: 'A',
      professor: 'Dr. Carlos Ramírez',
      schedule: [
        { day: 'Lunes', time: '10:30 - 12:30', room: 'B201' }
      ],
      average: 72.0,
      semester: 1
    },
    {
      id: 'MAT102',
      name: 'Álgebra Lineal',
      code: 'MAT102',
      group: 'C',
      professor: 'Dra. Laura Pérez',
      schedule: [
        { day: 'Martes', time: '10:30 - 12:30', room: 'A103' }
      ],
      average: 80.0,
      semester: 1
    }
  ];
  
  // Datos de ejemplo para notas
  const grades = [
    {
      courseId: 'MAT101',
      evaluations: [
        { name: 'Primer Parcial', score: 75, date: '14/09/2025' },
        { name: 'Segundo Parcial', score: 82, date: '11/10/2025' }
      ]
    },
    {
      courseId: 'INF110',
      evaluations: [
        { name: 'Primer Parcial', score: 85, date: '12/09/2025' },
        { name: 'Proyecto', score: 90, date: '05/10/2025' }
      ]
    },
    {
      courseId: 'FIS100',
      evaluations: [
        { name: 'Laboratorio 1', score: 70, date: '10/09/2025' },
        { name: 'Primer Parcial', score: 72, date: '03/10/2025' }
      ]
    },
    {
      courseId: 'MAT102',
      evaluations: [
        { name: 'Primer Parcial', score: 78, date: '15/09/2025' },
        { name: 'Tarea 1', score: 85, date: '01/10/2025' }
      ]
    }
  ];
  
  // Datos de ejemplo para horario
  const schedule = [
    { day: 'Lunes', time: '08:00 - 10:00', course: 'Cálculo Diferencial', room: 'A101', professor: 'Dr. Roberto Sánchez' },
    { day: 'Lunes', time: '10:30 - 12:30', course: 'Física General', room: 'B201', professor: 'Dr. Carlos Ramírez' },
    { day: 'Martes', time: '10:30 - 12:30', course: 'Álgebra Lineal', room: 'A103', professor: 'Dra. Laura Pérez' },
    { day: 'Martes', time: '14:00 - 16:00', course: 'Programación', room: 'LAB C', professor: 'Ing. María Gonzales' },
    { day: 'Miércoles', time: '08:00 - 10:00', course: 'Cálculo Diferencial', room: 'A101', professor: 'Dr. Roberto Sánchez' }
  ];
  
  // Estado para el curso seleccionado
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Función para renderizar las pestañas
  const renderTabs = () => {
    return (
      <div className="academic-tabs">
        <div 
          className={`academic-tab ${activeTab === 'materias' ? 'active' : ''}`} 
          onClick={() => setActiveTab('materias')}
        >
          Materias
        </div>
        <div 
          className={`academic-tab ${activeTab === 'notas' ? 'active' : ''}`} 
          onClick={() => setActiveTab('notas')}
        >
          Notas
        </div>
        <div 
          className={`academic-tab ${activeTab === 'horario' ? 'active' : ''}`} 
          onClick={() => setActiveTab('horario')}
        >
          Horario
        </div>
      </div>
    );
  };
  
  // Función para renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'materias':
        return (
          <div className="academic-courses-grid">
            {courses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onClick={() => setSelectedCourse(course)}
                isSelected={selectedCourse && selectedCourse.id === course.id}
              />
            ))}
          </div>
        );
      
      case 'notas':
        return <GradesView grades={grades} courses={courses} />;
      
      case 'horario':
        return <ScheduleView schedule={schedule} />;
      
      default:
        return <div>Contenido no disponible</div>;
    }
  };

  return (
    <div className="academic-container">
      <div className="academic-header">
        <h1 className="academic-title">Gestión Académica</h1>
        <div className="academic-search">
          <input type="text" placeholder="Buscar materias..." className="search-input" />
          <span className="search-icon">🔍</span>
        </div>
        <button className="primary-button">Ver Horario</button>
      </div>
      
      {renderTabs()}
      
      <div className="academic-content">
        <div className="academic-main">
          {renderContent()}
        </div>
        <div className="academic-detail">
          {selectedCourse ? (
            <CourseDetail course={selectedCourse} grades={grades.find(g => g.courseId === selectedCourse.id)?.evaluations || []} />
          ) : (
            <div className="no-selection-message">
              Selecciona una materia para ver detalles
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente para mostrar tarjetas de cursos
const CourseCard = ({ course, onClick, isSelected }) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={`course-card ${isSelected ? 'selected' : ''}`} 
      onClick={onClick}
      style={{ 
        background: isSelected 
          ? `linear-gradient(145deg, ${theme.colors.primaryDark}80, ${theme.colors.primary}50)`
          : `linear-gradient(145deg, ${theme.colors.primaryDark}30, ${theme.colors.primary}20)` 
      }}
    >
      <div className="course-code">{course.code}</div>
      <div className="course-group">Grupo {course.group}</div>
      
      <h3 className="course-name">{course.name}</h3>
      
      <div className="course-professor">
        <div className="label">Docente:</div>
        <div className="value">{course.professor}</div>
      </div>
      
      <div className="course-schedule">
        {course.schedule[0] && (
          <>
            <div className="day">{course.schedule[0].day}</div>
            <div className="time">{course.schedule[0].time}</div>
            <div className="room">{course.schedule[0].room}</div>
          </>
        )}
        {course.schedule.length > 1 && <div className="more">+ {course.schedule.length - 1} más</div>}
      </div>
      
      <div className="course-footer">
        <div className="average">Promedio: {course.average}</div>
        <div className="semester">Semestre {course.semester}</div>
      </div>
    </div>
  );
};

// Componente para mostrar detalles de un curso
const CourseDetail = ({ course, grades }) => {
  const { theme } = useTheme();
  
  return (
    <div className="course-detail">
      <div className="course-detail-header">
        <h2 className="course-detail-name">{course.name}</h2>
        <div className="course-detail-meta">@{course.professor.toLowerCase().split(' ').join('.')}</div>
      </div>
      
      <div className="course-detail-content">
        <div className="course-detail-section">
          <h3 className="section-title">Docente: {course.professor}</h3>
        </div>
        
        <div className="course-detail-section">
          <h3 className="section-title">Horarios</h3>
          <div className="schedule-list">
            {course.schedule.map((slot, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-day">{slot.day}:</div>
                <div className="schedule-time">{slot.time}</div>
                <div className="schedule-room">{slot.room}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="course-detail-section">
          <h3 className="section-title">Calificaciones</h3>
          <div className="grades-list">
            <div className="grades-header">
              <div className="col">Evaluación</div>
              <div className="col">Nota</div>
              <div className="col">Fecha</div>
            </div>
            {grades.map((grade, index) => (
              <div key={index} className="grade-item">
                <div className="grade-name">{grade.name}</div>
                <div className="grade-score">{grade.score}</div>
                <div className="grade-date">{grade.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente para mostrar vista de calificaciones
const GradesView = ({ grades, courses }) => {
  return (
    <div className="grades-view">
      <h2 className="section-title">Calificaciones por Materia</h2>
      
      <div className="grades-container">
        {courses.map(course => {
          const courseGrades = grades.find(g => g.courseId === course.id)?.evaluations || [];
          
          return (
            <div key={course.id} className="course-grades-card">
              <div className="course-grades-header">
                <h3>{course.name}</h3>
                <div className="course-code">{course.code}</div>
              </div>
              
              <div className="grades-list">
                {courseGrades.map((grade, index) => (
                  <div key={index} className="grade-row">
                    <div className="grade-name">{grade.name}</div>
                    <div className="grade-score">{grade.score}</div>
                  </div>
                ))}
              </div>
              
              <div className="course-average">
                Promedio: {course.average}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Componente para mostrar vista de horario
const ScheduleView = ({ schedule }) => {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  
  // Organizar el horario por día
  const scheduleByDay = {};
  days.forEach(day => {
    scheduleByDay[day] = schedule.filter(slot => slot.day === day);
  });
  
  return (
    <div className="schedule-view">
      <h2 className="section-title">Horario Semanal</h2>
      
      <div className="weekly-schedule">
        {days.map(day => (
          <div key={day} className="day-column">
            <div className="day-header">{day}</div>
            <div className="day-slots">
              {scheduleByDay[day].length > 0 ? (
                scheduleByDay[day].map((slot, index) => (
                  <div key={index} className="schedule-slot">
                    <div className="slot-time">{slot.time}</div>
                    <div className="slot-course">{slot.course}</div>
                    <div className="slot-room">{slot.room}</div>
                    <div className="slot-professor">{slot.professor}</div>
                  </div>
                ))
              ) : (
                <div className="empty-day">No hay clases</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
