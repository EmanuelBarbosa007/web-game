import React, { useState, useEffect } from 'react';
import './App.css';


import jogadorImg from './assets/jogador.png';
import pacienteImg from './assets/paciente.png';


const App = () => {
  
  const [estadoEmocionalPaciente, setEstadoEmocionalPaciente] = useState("😟");
  const [saudePaciente, setSaudePaciente] = useState(50);
  const [saudeDoutor, setSaudeDoutor] = useState(50);
  const [tempo, setTempo] = useState(0);
  const [jogoAcabado, setJogoAcabado] = useState(false);
  const [ranking, setRanking] = useState([]);

  
  useEffect(() => {
    let tempoInterval;
    if (!jogoAcabado) {
      tempoInterval = setInterval(() => {
        setTempo((prevTempo) => prevTempo + 1);
      }, 1000);
    }
    return () => clearInterval(tempoInterval);
  }, [jogoAcabado]);

  useEffect(() => {
    if (saudePaciente === 100 && saudeDoutor === 100) {
      setRanking((prevRanking) => [
        ...prevRanking,
        { tempo: tempo },
      ]);
      setJogoAcabado(true);
    }
    if (saudePaciente <= 0) {
      alert("O paciente está em estado crítico e o jogo acabou!");
      setJogoAcabado(true);
    }
  }, [saudePaciente, saudeDoutor, tempo]);

  
  const atualizarSaude = () => {
    setSaudePaciente((prevSaude) => Math.min(Math.max(prevSaude, 0), 100));
    setSaudeDoutor((prevSaude) => Math.min(Math.max(prevSaude, 0), 100));
  };

  const reiniciarJogo = () => {
    setSaudePaciente(50);
    setSaudeDoutor(50);
    setTempo(0);
    setJogoAcabado(false);
    setEstadoEmocionalPaciente("😟");
    setRanking([]);
  };
  
  const mostrarDossie = () => {
    alert(`Ficha do Paciente\nNome: Emanuel Barbosa\nIdade: 18 anos\nMotivo do internamento: Transtorno de Ansiedade\nMuito calmo e geralmente bem comportado\nGosta de Passear\nNão pode tomar medicamentos comuns`);
  };

  const realizarAcao = (efeitoSaudePaciente, efeitoSaudeDoutor, novoEstadoEmocional, mensagem) => {
    setEstadoEmocionalPaciente(novoEstadoEmocional);
    setSaudePaciente((prevSaude) => prevSaude + efeitoSaudePaciente);
    setSaudeDoutor((prevSaude) => prevSaude + efeitoSaudeDoutor);
    atualizarSaude();
    alert(mensagem);
  };
  

  const conversar = () => {
    const respostas = [
      { texto: "O paciente sorri ao ouvir palavras de conforto.", estado: "😊", efeitoSaudePaciente: 5, efeitoSaudeDoutor: 2 },
      { texto: "O paciente parece um pouco mais calmo.", estado: "😌", efeitoSaudePaciente: 2, efeitoSaudeDoutor: 1 },
      { texto: "O paciente parece desconfortável com a conversa.", estado: "😣", efeitoSaudePaciente: -10, efeitoSaudeDoutor: -2 },
    ];

    const respostaEscolhida = respostas[Math.floor(Math.random() * respostas.length)];
    realizarAcao(respostaEscolhida.efeitoSaudePaciente, respostaEscolhida.efeitoSaudeDoutor, respostaEscolhida.estado, respostaEscolhida.texto);
  };

  const passear = () => {
    const areas = ["Sala", "Jardim", "Corredor", "Isolamento"];
    const areaEscolhida = areas[Math.floor(Math.random() * areas.length)];

    let efeitoSaudePaciente = 0;
    let efeitoSaudeDoutor = 0;

    if (areaEscolhida === "Jardim") {
      efeitoSaudePaciente = 5;
      efeitoSaudeDoutor = 3;
      setEstadoEmocionalPaciente("😊");
      alert("O paciente parece relaxado no Jardim.");
    } else if (areaEscolhida === "Corredor") {
      efeitoSaudePaciente = -10;
      efeitoSaudeDoutor = -5;
      setEstadoEmocionalPaciente("😔");
      alert("O paciente parece tenso no Corredor.");
    } else {
      efeitoSaudePaciente = 2;
      efeitoSaudeDoutor = 1;
      setEstadoEmocionalPaciente("😐");
      alert("O paciente está tranquilo na Sala.");
    }

    realizarAcao(efeitoSaudePaciente, efeitoSaudeDoutor, estadoEmocionalPaciente, "");
  };
   
  const isolacao = () => {
    setEstadoEmocionalPaciente("😞");
    setSaudePaciente((prevSaude) => prevSaude - 20);
    setSaudeDoutor((prevSaude) => prevSaude - 5);
    atualizarSaude();
    alert("O paciente foi isolado e parece triste.");
  };

  const terapia = () => {
    realizarAcao(10, 5, "😊", "A terapia foi bem-sucedida!");
  };

  const medicacao = () => {
    const tipoMedicao = Math.random();
    if (tipoMedicao > 0.5) {
      
      realizarAcao(20, 5, "😌", "O paciente tomou a medicação corretamente e está melhor!");
    } else {
      
      realizarAcao(-10, 5, "😣", "A medicação causou um efeito negativo no paciente.");
    }
  };


  const atividades = () => {
    const tipoAtividade = Math.random();
    if (tipoAtividade > 0.5) {
      
      realizarAcao(15, 5, "😃", "O paciente divertiu se muito nas atividades recreativas!");
    } else {
     
      realizarAcao(-10, 5, "😞", "O paciente caiu durante as atividades recreativas.");
    }
  };

  return (
    <div className="container">
      
      <div className="emoji-topo">
        {estadoEmocionalPaciente}
      </div>

      
      <div className="barra-superior">
        <div className="status-esquerda">
          <div className="saude">
            <div className="saude-paciente">
              <span>Saúde (Paciente):</span>
              <div className="barra">
                <div className="progresso" style={{ width: `${saudePaciente}%` }}></div>
              </div>
            </div>
            <div className="saude-doutor">
              <span>Saúde (Jogador):</span>
              <div className="barra">
                <div className="progresso" style={{ width: `${saudeDoutor}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="status-direita">
          <div className="contador-tempo">
            <span>Tempo: {`${String(Math.floor(tempo / 60)).padStart(2, '0')}:${String(tempo % 60).padStart(2, '0')}`}</span>
          </div>
          <div className="botao-dossie" onClick={mostrarDossie}>
            📄
          </div>
        </div>
      </div>

      {/* Imagens do jogador e paciente */}
      <div className="area-jogo">
        <img src={jogadorImg} alt="Jogador" className="imagem-jogador" />
        <img src={pacienteImg} alt="Paciente" className="imagem-paciente" />

        <div className="acoes-esquerda">
          <button onClick={conversar}>Conversar</button>
          <button onClick={passear}>Passear</button>
          <button onClick={isolacao}>Isolamento</button>
        </div>

        <div className="acoes-direita">
          <button onClick={terapia}>Terapia</button>
          <button onClick={medicacao}>Dar Medicação</button>
          <button onClick={atividades}>Atividades Recreativas</button>
        </div>
      </div>

     
      <div id="ranking" style={{ display: ranking.length > 0 ? 'block' : 'none' }}>
        <h2>Ranking Final</h2>
        <div id="ranking-lista">
          {ranking.map((entry, index) => (
            <p key={index}>
              #{index + 1} - Tempo: {`${String(Math.floor(entry.tempo / 60)).padStart(2, '0')}:${String(entry.tempo % 60).padStart(2, '0')}`}
            </p>
          ))}
        </div>
        <button onClick={reiniciarJogo}>Reiniciar Jogo</button>
      </div>
    </div>
  );
};

export default App;
