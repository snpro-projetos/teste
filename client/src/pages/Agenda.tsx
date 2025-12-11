import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

const mockAppointments = [
  {
    id: 1,
    title: "Reunião com cliente ABC",
    date: "2025-01-20",
    time: "14:00",
    type: "reuniao",
    status: "agendado",
    attendees: 3,
  },
  {
    id: 2,
    title: "Ligação de follow-up",
    date: "2025-01-21",
    time: "10:00",
    type: "ligacao",
    status: "agendado",
    attendees: 1,
  },
  {
    id: 3,
    title: "Apresentação de proposta",
    date: "2025-01-22",
    time: "15:30",
    type: "reuniao",
    status: "agendado",
    attendees: 5,
  },
];

const mockTasks = [
  {
    id: 1,
    title: "Preparar relatório mensal",
    dueDate: "2025-01-18",
    priority: "alta",
    status: "pendente",
  },
  {
    id: 2,
    title: "Enviar proposta para cliente XYZ",
    dueDate: "2025-01-19",
    priority: "média",
    status: "pendente",
  },
  {
    id: 3,
    title: "Revisar contrato",
    dueDate: "2025-01-17",
    priority: "alta",
    status: "concluido",
  },
];

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#240046]">Agenda</h1>
          <p className="text-muted-foreground mt-1">
            Compromissos, tarefas e eventos do negócio
          </p>
        </div>
        <Button className="bg-[#ffcc00] hover:bg-[#ffff33] text-[#240046] font-bold">
          <Plus size={20} className="mr-2" />
          Novo Evento
        </Button>
      </div>

      {/* Tabs */}
      <Card className="p-6 bg-white">
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#f9f7f4]">
            <TabsTrigger value="appointments">Compromissos</TabsTrigger>
            <TabsTrigger value="tasks">Tarefas</TabsTrigger>
            <TabsTrigger value="calendar">Calendário</TabsTrigger>
          </TabsList>

          {/* Appointments */}
          <TabsContent value="appointments" className="mt-6">
            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="p-4 bg-[#f9f7f4] border-l-4 border-l-[#ffcc00] hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[#240046]">
                        {appointment.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {appointment.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {appointment.time}
                        </span>
                        <span className="flex items-center gap-1">
                          👥 {appointment.attendees} participantes
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm">
                        ✓
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tasks */}
          <TabsContent value="tasks" className="mt-6">
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <Card
                  key={task.id}
                  className={`p-4 border-l-4 ${
                    task.status === "concluido"
                      ? "bg-green-50 border-l-green-500 opacity-75"
                      : "bg-[#f9f7f4] border-l-[#ffcc00]"
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.status === "concluido"}
                          onChange={() => {}}
                          className="w-5 h-5 rounded border-[#ffcc00] cursor-pointer"
                        />
                        <h4
                          className={`font-semibold ${
                            task.status === "concluido"
                              ? "line-through text-muted-foreground"
                              : "text-[#240046]"
                          }`}
                        >
                          {task.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground ml-7">
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          Vence em {task.dueDate}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            task.priority === "alta"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {task.priority === "alta" ? "Alta" : "Média"}
                        </span>
                      </div>
                    </div>
                    {task.status === "concluido" && (
                      <CheckCircle size={24} className="text-green-600" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar */}
          <TabsContent value="calendar" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mini Calendar */}
              <Card className="p-4 bg-[#f9f7f4]">
                <h4 className="font-semibold text-[#240046] mb-4">
                  {selectedDate.toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </h4>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
                    <div key={day} className="font-semibold text-[#240046]">
                      {day}
                    </div>
                  ))}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(
                    (day) => (
                      <button
                        key={day}
                        className={`p-2 rounded hover:bg-[#ffcc00]/20 transition-colors ${
                          day === 20
                            ? "bg-[#ffcc00] text-[#240046] font-bold"
                            : "text-[#240046]"
                        }`}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
              </Card>

              {/* Events for Selected Date */}
              <div className="lg:col-span-2">
                <Card className="p-4 bg-[#f9f7f4]">
                  <h4 className="font-semibold text-[#240046] mb-4">
                    Eventos de 20 de janeiro
                  </h4>
                  <div className="space-y-3">
                    {mockAppointments
                      .filter((a) => a.date === "2025-01-20")
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className="p-3 bg-white rounded-lg border border-[#f2f2f2] hover:shadow-md transition-shadow"
                        >
                          <p className="font-medium text-[#240046]">
                            {appointment.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {appointment.time}
                          </p>
                        </div>
                      ))}
                    {mockAppointments.filter((a) => a.date === "2025-01-20")
                      .length === 0 && (
                      <p className="text-muted-foreground text-sm">
                        Nenhum evento agendado para este dia
                      </p>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
