import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./PainelEstatisticas.css";

const cores = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

function PainelEstatisticas() {
  const [resumo, setResumo] = useState(null);
  const [topHorarios, setTopHorarios] = useState([]);
  const [topDias, setTopDias] = useState([]);
  const [topBarbeiros, setTopBarbeiros] = useState([]);
  const [topServicos, setTopServicos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // ajuste conforme a chave usada
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const endpoints = [
        { url: "/api/Estatisticas/Resumo", setState: setResumo },
        { url: "/api/Estatisticas/TopHorarios", setState: setTopHorarios },
        { url: "/api/Estatisticas/TopDiasSemana", setState: setTopDias },
        { url: "/api/Estatisticas/TopBarbeiros", setState: setTopBarbeiros },
        { url: "/api/Estatisticas/TopServicos", setState: setTopServicos },
      ];

      for (const endpoint of endpoints) {
        try {
          const res = await fetch(
            `https://backendbarbaemdia.onrender.com${endpoint.url}`,
            {
              headers,
            }
          );

          if (!res.ok) throw new Error(`Erro ${res.status}`);

          const json = await res.json();
          endpoint.setState(json.data);
        } catch (err) {
          console.error(`Erro ao buscar ${endpoint.url}:`, err);
        }
      }
    };

    fetchData();
  }, []);

  const formatter = (value, name) => {
    const nomesLegiveis = {
      totalAgendamentos: "Total Agendamentos",
    };
    return [value, nomesLegiveis[name] || name];
  };

  if (!resumo) return <div>Carregando estatísticas...</div>;

  return (
    <div className="painel-estatisticas">
      <header className="admin-header">
        <h2>DASHBOARD DO MÊS DE {resumo.mes.toUpperCase()}</h2>
      </header>
      <section className="resumo-mensal">
        <div className="card">📅 Agendamentos: {resumo.totalAgendamentos}</div>
        <div className="card">
          ❌ Cancelados: {resumo.totalAgendamentosCancelados}
        </div>
        <div className="card">
          💰 Faturamento: R$ {resumo.totalFaturamento.toFixed(2)}
        </div>
      </section>

      <section className="graficos">
        <div className="grafico">
          <h3>⏰ Horários com mais agendamentos</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topHorarios}>
              <XAxis dataKey="horario" />
              <YAxis />
              <Bar dataKey="totalAgendamentos" fill="#8884d8" />
              <Tooltip formatter={formatter} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico">
          <h3>📆 Dias da semana mais movimentados</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topDias}>
              <XAxis dataKey="diaSemana" />
              <YAxis />
              <Tooltip formatter={formatter} />
              <Bar dataKey="totalAgendamentos" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico">
          <h3>💈 Barbeiros mais agendados</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topBarbeiros}>
              <XAxis dataKey="nomeBarbeiro" />
              <YAxis />
              <Tooltip formatter={formatter} />
              <Bar dataKey="totalAgendamentos" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grafico">
          <h3>✂️ Serviços mais realizados</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={topServicos}
                dataKey="totalAgendamentos"
                nameKey="nomeServico"
                outerRadius={90}
                label
              >
                {topServicos.map((_, index) => (
                  <Cell key={index} fill={cores[index % cores.length]} />
                ))}
              </Pie>
              <Tooltip formatter={formatter} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default PainelEstatisticas;
