import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import Card from '../components/Card';
import Button from '../components/Button';

const AcademicScheduleScreen = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // En producción, esto sería una llamada real a la API
        // const response = await apiService.academic.getSchedule();
        // setSchedule(response.data);
        
        // Datos simulados para desarrollo
        const mockSchedule = generateMockSchedule();
        setSchedule(mockSchedule);
      } catch (err) {
        console.error('Error al cargar el horario:', err);
        setError('No se pudo cargar el horario. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  // Función para generar datos simulados de horario
  const generateMockSchedule = () => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const timeSlots = ['07:00 - 08:30', '08:30 - 10:00', '10:30 - 12:00', '12:00 - 13:30', '14:30 - 16:00', '16:00 - 17:30'];
    const subjects = [
      'Programación Web',
      'Bases de Datos',
      'Algoritmos',
      'Inteligencia Artificial',
      'Redes de Computadores',
      'Sistemas Operativos',
      'Matemáticas Discretas',
      null, // Representando horario libre
      null
    ];
    
    const schedule = {};
    days.forEach(day => {
      schedule[day] = {};
      timeSlots.forEach(timeSlot => {
        // Asignar aleatoriamente materias a los horarios o dejar algunos vacíos
        const randomIndex = Math.floor(Math.random() * subjects.length);
        schedule[day][timeSlot] = subjects[randomIndex];
      });
    });
    
    return { days, timeSlots, schedule };
  };

  const renderScheduleTable = () => {
    if (!schedule) return null;

    return (
      <View style={styles.tableContainer}>
        {/* Encabezado con días */}
        <View style={styles.headerRow}>
          <View style={styles.timeCell}>
            <Text style={[styles.headerText, { color: theme.colors.secondary }]}>Hora</Text>
          </View>
          {schedule.days.map(day => (
            <View key={day} style={styles.dayCell}>
              <Text style={[styles.headerText, { color: theme.colors.text }]}>{day}</Text>
            </View>
          ))}
        </View>
        
        {/* Filas con horarios */}
        {schedule.timeSlots.map(timeSlot => (
          <View key={timeSlot} style={styles.timeRow}>
            <View style={styles.timeCell}>
              <Text style={[styles.timeText, { color: theme.colors.text }]}>{timeSlot}</Text>
            </View>
            {schedule.days.map(day => {
              const subject = schedule.schedule[day][timeSlot];
              return (
                <View 
                  key={`${day}-${timeSlot}`} 
                  style={[
                    styles.subjectCell, 
                    { 
                      backgroundColor: subject ? theme.colors.primary + '20' : theme.colors.card,
                      borderColor: theme.colors.border
                    }
                  ]}
                >
                  {subject ? (
                    <Text style={[styles.subjectText, { color: theme.colors.text }]}>{subject}</Text>
                  ) : (
                    <Text style={[styles.emptyText, { color: theme.colors.secondary }]}>Libre</Text>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      contentContainerStyle={styles.contentContainer}
      horizontal={false}
    >
      <Text style={[styles.pageTitle, { color: theme.colors.text }]}>
        Horario Académico
      </Text>

      <Card
        title="Horario Semanal"
        subtitle={`Periodo Actual: 2025-II`}
        style={styles.scheduleCard}
        contentStyle={styles.scheduleCardContent}
      >
        {loading ? (
          <Text style={{ color: theme.colors.secondary }}>Cargando horario...</Text>
        ) : error ? (
          <View>
            <Text style={{ color: theme.colors.error }}>{error}</Text>
            <Button 
              title="Reintentar" 
              onPress={() => {/* Función para reintentar */}} 
              variant="secondary" 
              style={styles.retryButton}
            />
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            {renderScheduleTable()}
          </ScrollView>
        )}
      </Card>

      <View style={styles.actionsContainer}>
        <Button
          title="Exportar a PDF"
          onPress={() => {/* Función para exportar a PDF */}}
          variant="outline"
          style={styles.actionButton}
        />
        <Button
          title="Exportar a Excel"
          onPress={() => {/* Función para exportar a Excel */}}
          variant="outline"
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  scheduleCard: {
    marginBottom: 24,
  },
  scheduleCardContent: {
    padding: 0,
  },
  tableContainer: {
    minWidth: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  timeRow: {
    flexDirection: 'row',
  },
  timeCell: {
    width: 100,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  dayCell: {
    width: 140,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  subjectCell: {
    width: 140,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    minHeight: 80,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timeText: {
    fontSize: 14,
  },
  subjectText: {
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.6,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  actionButton: {
    marginHorizontal: 8,
  },
  retryButton: {
    marginTop: 16,
    alignSelf: 'center',
  }
});

export default AcademicScheduleScreen;
