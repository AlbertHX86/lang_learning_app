import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Edit2, Trash2, Clock } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useCalendarStore, CalendarEvent } from '../hooks/useCalendarStore';

const COLORS = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316',
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();
  const cells: { day: number; date: string; isCurrentMonth: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = prevDays - i;
    const m = month === 0 ? 11 : month - 1;
    const y = month === 0 ? year - 1 : year;
    cells.push({ day: d, date: formatDate(y, m, d), isCurrentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, date: formatDate(year, month, d), isCurrentMonth: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = month === 11 ? 0 : month + 1;
    const y = month === 11 ? year + 1 : year;
    cells.push({ day: d, date: formatDate(y, m, d), isCurrentMonth: false });
  }
  return cells;
}

const today = new Date();
const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

const emptyForm = (): Omit<CalendarEvent, 'id'> => ({
  title: '',
  date: todayStr,
  startTime: '09:00',
  endTime: '10:00',
  color: COLORS[0],
  description: '',
});

const Calendar = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const { events, addEvent, updateEvent, deleteEvent } = useCalendarStore();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const cells = useMemo(() => getMonthData(year, month), [year, month]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    events.forEach((e) => {
      (map[e.date] ??= []).push(e);
    });
    Object.values(map).forEach((arr) =>
      arr.sort((a, b) => a.startTime.localeCompare(b.startTime))
    );
    return map;
  }, [events]);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };
  const goToday = () => { setYear(today.getFullYear()); setMonth(today.getMonth()); };

  const openNew = (date?: string) => {
    setEditingId(null);
    setForm({ ...emptyForm(), date: date ?? todayStr });
    setShowModal(true);
  };
  const openEdit = (ev: CalendarEvent) => {
    setEditingId(ev.id);
    setForm({ title: ev.title, date: ev.date, startTime: ev.startTime, endTime: ev.endTime, color: ev.color, description: ev.description });
    setShowModal(true);
  };
  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingId) {
      updateEvent(editingId, form);
    } else {
      addEvent({ ...form, id: crypto.randomUUID() });
    }
    setShowModal(false);
  };

  const selectedEvents = selectedDate ? (eventsByDate[selectedDate] ?? []) : [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <button
          onClick={() => openNew()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" /> New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar Grid */}
        <div className={`lg:col-span-3 rounded-xl shadow-lg overflow-hidden ${dark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Month navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <button onClick={prevMonth} className={`p-1.5 rounded-lg ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h2 className="text-lg font-semibold min-w-[180px] text-center">
                {MONTHS[month]} {year}
              </h2>
              <button onClick={nextMonth} className={`p-1.5 rounded-lg ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={goToday}
              className={`text-sm px-3 py-1 rounded-lg border ${dark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              Today
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7">
            {DAYS.map((d) => (
              <div key={d} className={`py-2 text-center text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                {d}
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7">
            {cells.map((cell, i) => {
              const isToday = cell.date === todayStr;
              const dayEvents = eventsByDate[cell.date] ?? [];
              const isSelected = cell.date === selectedDate;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(cell.date)}
                  onDoubleClick={() => openNew(cell.date)}
                  className={`min-h-[90px] p-1.5 border-t cursor-pointer transition-colors
                    ${dark ? 'border-gray-700' : 'border-gray-100'}
                    ${isSelected ? (dark ? 'bg-blue-900/30' : 'bg-blue-50') : (dark ? 'hover:bg-gray-750' : 'hover:bg-gray-50')}
                    ${!cell.isCurrentMonth ? (dark ? 'text-gray-600' : 'text-gray-300') : ''}`}
                >
                  <div className={`text-sm font-medium mb-1 w-7 h-7 flex items-center justify-center rounded-full
                    ${isToday ? 'bg-blue-600 text-white' : ''}`}>
                    {cell.day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <div
                        key={ev.id}
                        onClick={(e) => { e.stopPropagation(); setSelectedDate(cell.date); }}
                        className="text-xs px-1.5 py-0.5 rounded truncate text-white"
                        style={{ backgroundColor: ev.color }}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className={`text-xs px-1.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                        +{dayEvents.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: selected day events */}
        <div className={`rounded-xl shadow-lg p-5 ${dark ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="font-semibold mb-4">
            {selectedDate
              ? new Date(selectedDate + 'T00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
              : 'Select a date'}
          </h3>
          {selectedDate && (
            <button
              onClick={() => openNew(selectedDate)}
              className={`w-full mb-4 flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed transition-colors
                ${dark ? 'border-gray-600 hover:bg-gray-700 text-gray-400' : 'border-gray-300 hover:bg-gray-50 text-gray-500'}`}
            >
              <Plus className="h-4 w-4" /> Add event
            </button>
          )}
          {selectedEvents.length === 0 && selectedDate && (
            <p className={`text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>No events for this day.</p>
          )}
          <div className="space-y-3">
            {selectedEvents.map((ev) => (
              <div
                key={ev.id}
                className={`rounded-lg p-3 border-l-4 ${dark ? 'bg-gray-750 border-gray-700' : 'bg-gray-50'}`}
                style={{ borderLeftColor: ev.color }}
              >
                <div className="flex items-start justify-between">
                  <div className="font-medium text-sm">{ev.title}</div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(ev)} className={`p-1 rounded ${dark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}>
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => deleteEvent(ev.id)} className="p-1 rounded hover:bg-red-100 text-red-500">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className={`flex items-center gap-1 mt-1 text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Clock className="h-3 w-3" />
                  {ev.startTime} - {ev.endTime}
                </div>
                {ev.description && (
                  <p className={`mt-1 text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{ev.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowModal(false)}>
          <div
            className={`w-full max-w-md mx-4 rounded-xl shadow-2xl p-6 ${dark ? 'bg-gray-800' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold">{editingId ? 'Edit Event' : 'New Event'}</h3>
              <button onClick={() => setShowModal(false)} className={`p-1 rounded-lg ${dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Event title"
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none
                    ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none
                    ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Start</label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none
                      ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>End</label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none
                      ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Color</label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-8 h-8 rounded-full transition-transform ${form.color === c ? 'ring-2 ring-offset-2 ring-blue-500 scale-110' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Optional description"
                  rows={3}
                  className={`w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none resize-none
                    ${dark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className={`flex-1 py-2 rounded-lg border transition-colors
                    ${dark ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
